from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import PydanticOutputParser

class EvaluationResult(BaseModel):
    scam_status: str = Field(description="Status: 'Green', 'Orange', or 'Red'")
    official_specs_summary: str = Field(description="Summary of official specs")
    fair_market_price_range: str = Field(description="Market price range in PKR")
    final_verdict: str = Field(description="Final detailed explanation")

def evaluate_laptop(specs: dict, official_specs_context: str, market_price_context: str) -> dict:
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
    parser = PydanticOutputParser(pydantic_object=EvaluationResult)
    prompt = PromptTemplate(
        template="""You are a tech scam detection expert.
Evaluate the laptop details provided by the user against official specs and local Pakistani market prices.

User specs:
{specs}

Official specs context:
{official_specs_context}

Market price context:
{market_price_context}

Rules:
1. Generation Scam Detector: If the official launch specs of the provided model do not support the CPU generation entered by the user, flag it immediately as 'Red'.
2. Market Context: If the user price is more than 15% above the fetched local market average, flag as 'Orange'.
3. Otherwise, if it seems fair, flag as 'Green'.

{format_instructions}
""",
        input_variables=["specs", "official_specs_context", "market_price_context"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    chain = prompt | llm | parser
    result = chain.invoke({
        "specs": str(specs),
        "official_specs_context": official_specs_context,
        "market_price_context": market_price_context
    })
    return result.model_dump()
