# agents/critique_agent.py

def critique_review(rewritten_review: str, llm) -> str:
    if llm is None:
        raise RuntimeError("LLM was not initialized properly.")

    prompt = f"""
    Evaluate the following customer review across four criteria:
    - Clarity (1–5)
    - Tone Fit to premium brand (1–5)
    - Empathy (1–5)
    - Brand Voice Consistency (1–5)

    For each, rate it like: `Clarity: 4/5. Reason here...`

    Review:
    \"\"\"{rewritten_review}\"\"\"

    Return in this format exactly:
    Clarity: <score>/5. <short reason>
    Tone Fit to premium brand: <score>/5. <short reason>
    Empathy: <score>/5. <short reason>
    Brand Voice Consistency: <score>/5. <short reason>
    """

    #return llm.invoke(prompt)  # ✅ Use `invoke` if on langchain > 0.1.x
    response = llm.invoke(prompt)
    return response.content if hasattr(response, "content") else str(response)

    