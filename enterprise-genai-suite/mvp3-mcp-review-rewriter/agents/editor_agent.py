def improve_review_with_feedback(rewritten_review: str, critique_feedback: str, llm) -> str:
  if not llm:
      raise RuntimeError("LLM was not initialized properly.")

  prompt = f"""
You are an editor improving customer reviews.

Given the following critique:
{critique_feedback}

Revise the review below to address all feedback:

"{rewritten_review}"

Improved Review:
"""
  #return llm.invoke(prompt)  # ✅ Use .invoke for consistency
  response = llm.invoke(prompt)
  return response.content if hasattr(response, "content") else str(response)

