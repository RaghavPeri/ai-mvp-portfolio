# agents.py
from langchain.agents import initialize_agent, AgentType, tool
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()
llm = ChatOpenAI(model="gpt-4", temperature=0.7, openai_api_key=os.getenv("OPENAI_API_KEY"))

# -------------------------------
# Tool 1 – Style QA
# -------------------------------
@tool
def check_style(prompt: str) -> str:
    """Check if the design style fits rustic-modern or Scandinavian themes."""
    banned = ["violence", "erotic", "durty", "gothic", "dark", "sad", "depressing", "death", "horror", "scary", "fear", "terror", "fright", "anxiety", "anxious", "panic", "panic", "stress"]
    found = [w for w in banned if w in prompt.lower()]
    return f"❌ Style QA Failed – Found: {', '.join(found)}" if found else "✅ Style QA Passed"

# -------------------------------
# Tool 2 – Compliance Checker
# -------------------------------
@tool
def check_compliance(prompt: str) -> str:
    """Check if the prompt violates banned word policies (e.g., 'cheap', 'replica')."""
    banned = ["cheap", "replica", "knockoff", "fake", "counterfeit", "imitation", "substandard", "inferior", "low-quality", "low-cost", "inexpensive", "budget", "discount", "sale", "clearance"]
    found = [w for w in banned if w in prompt.lower()]
    return f"❌ Compliance Failed – Found: {', '.join(found)}" if found else "✅ Compliance Passed"

# -------------------------------
# Tool 3 – Publisher
# -------------------------------
@tool
def publish_content(prompt: str) -> str:
    """Simulate publishing the validated prompt."""
    return f"📦 Content Published: '{prompt}'"

# Optional agent (not used here but kept for future use if needed)
tools = [check_style, check_compliance, publish_content]
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# -------------------------------
# Manual Execution of Each Tool
# -------------------------------
def run_agent_workflow(prompt: str) -> dict:
    """Manually run each agentic tool and return a structured result dictionary."""

    style_result = check_style.invoke(prompt)
    compliance_result = check_compliance.invoke(prompt)

    if "❌" in compliance_result or "❌" in style_result:
        publish_result = "⛔ Publishing blocked due to compliance failure."
    else:
        publish_result = publish_content.invoke(prompt)

    return {
        "Style QA": style_result,
        "Compliance Check": compliance_result,
        "Publishing": publish_result
    }
