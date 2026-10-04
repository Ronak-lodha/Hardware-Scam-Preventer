from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import PydanticOutputParser

class LaptopSpecs(BaseModel):
    brand: str = Field(description="The brand of the laptop")
    model: str = Field(description="The specific model of the laptop")
    processor: str = Field(description="The processor details")
    ram: str = Field(description="RAM capacity")
    storage: str = Field(description="Storage capacity")
    user_price_pkr: int = Field(description="The price offered by the user in PKR")

def parse_input(user_input: str) -> dict:
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
    parser = PydanticOutputParser(pydantic_object=LaptopSpecs)
    prompt = PromptTemplate(
        template="Extract the laptop specifications and price from the following text.\n{format_instructions}\n{text}\n",
        input_variables=["text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    chain = prompt | llm | parser
    result = chain.invoke({"text": user_input})
    return result.model_dump()
