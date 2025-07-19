# ✍️ MVP 3: MCP Review Rewriter

This MVP transforms raw customer feedback into **tone-aligned, empathetic, and brand-consistent** messaging using a structured agent workflow. It applies principles from the **Model Context Protocol (MCP)** to enforce tone quality across generated outputs.

> **Note**: This project is part of a generic AI MVP portfolio designed to demonstrate enterprise AI capabilities.  
> Any references to companies, brands, or enterprise scenarios are purely illustrative and not affiliated with any real organization.  
> All branding and enterprise use cases are hypothetical and used only to contextualize the MVP's potential applications.

---

## 💡 Features

- Accepts blunt or poorly structured customer reviews as input
- Allows tone selection (e.g., Warm & Friendly, Luxury, Professional)
- Rewrites review and scores it using 4-point MCP rubric:
  - Clarity
  - Empathy
  - Brand Voice
  - Tone Fit
- Modular agent pipeline with logging and memory for QA

---

## ⚙️ How It Works

1. **IntentParserAgent** identifies review purpose and context  
2. **RewriteAgent** transforms tone, structure, and voice  
3. **CritiqueAgent** evaluates the output using the MCP scoring framework  
4. **EditorAgent** refines output based on critique  
5. Optional: Memory file stores tone preference for future reviews

---

## 🧠 Why It’s Enterprise-Grade

- Ensures tone consistency across all CX communication  
- Can be used for internal training, moderation, or personalization  
- Easily extendable to legal, healthcare, or luxury retail tone audits

---

## 🛠️ Stack

| Component       | Tech Used                  |
|-----------------|----------------------------|
| LLM Backend     | OpenAI (GPT-4)  
| Workflow Logic  | Multi-agent LangChain-style architecture  
| Memory          | JSON-based tone tracking  
| Interface       | Streamlit  
| Evaluation      | Rule-based + LLM scoring  

---

## 📁 File Structure

├── app.py                → Streamlit interface for review input/output  
├── requirements.txt      → Project dependencies  
├── review_log.csv        → Logs of original + rewritten reviews and scores  
├── tone_memory.json      → Stores tone history per session  
├── agents/               → Modular agent logic  
│   ├── __init__.py  
│   ├── intent_parser.py  → Classifies the review intent  
│   ├── rewrite_agent.py  → Rewrites review text  
│   ├── critique_agent.py → Scores output using MCP  
│   └── editor_agent.py   → Refines and finalizes review  


---

## ✅ Status

- 🟢 Working MVP  
- ✅ MCP-aligned, extensible  
- 🧩 Integratable into moderation or CX review systems

---

## 🔗 Related

- 📁 [Back to Enterprise GenAI Suite](../)  
- 📹 [Watch demo (8:13)](https://youtu.be/0Ht1q3K1rwE?si=a0_m8NHXDx2QEL88)
