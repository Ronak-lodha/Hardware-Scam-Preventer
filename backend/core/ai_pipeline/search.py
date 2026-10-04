from langchain_community.tools import DuckDuckGoSearchRun
import datetime

def search_official_specs(brand: str, model: str) -> str:
    search = DuckDuckGoSearchRun()
    query = f"official site {brand} {model} specifications supported processors generation"
    result = search.invoke(query)
    return result

def search_local_market_price(brand: str, model: str, processor: str, ram: str, storage: str) -> str:
    search = DuckDuckGoSearchRun()
    current_year = datetime.datetime.now().year
    query = f"site:pk OR Pakistan price {brand} {model} {processor} {ram} {storage} {current_year}"
    result = search.invoke(query)
    return result
