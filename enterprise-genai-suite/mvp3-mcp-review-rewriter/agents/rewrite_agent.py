# agents/rewrite_agent.py

import os
from dotenv import load_dotenv
#from langchain.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI


load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY is not set in the environment")

# ✅ Shared LLM object that can be imported
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0.7,
    openai_api_key=openai_api_key
)

def rewrite_review(original_review: str, tone_prompt: str) -> str:
    prompt = f"""{tone_prompt}\n\nCustomer Review:\n"{original_review}"\n\nRewritten:"""
    #return llm.predict(prompt)
    return llm.invoke(prompt) # Try this if the above line doesn't work
