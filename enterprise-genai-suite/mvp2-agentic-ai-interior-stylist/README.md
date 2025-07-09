# 🎨 MVP 2: Agentic AI Interior Stylist – Prompt Governance Engine

This MVP helps retail visual teams validate and approve prompt inputs before they’re sent to image-generation models — using a multi-agent workflow. It’s designed to ensure **brand safety, compliance, and style alignment** at the source of generation.

---

## 💡 Features

- Multi-agent flow with:
  - **Style QA Agent** – checks for prompt consistency with brand themes
  - **Compliance Agent** – blocks flagged, unsafe, or sensitive terms
  - **Publishing Agent** – final check before submission
- Session-level logging of all rejections and pass-throughs
- Real-time feedback to the user on *why* a prompt was rejected or passed

---

## ⚙️ How It Works

1. User enters a prompt (e.g., *“Cozy Scandinavian Living Room”*)
2. Each agent processes and validates the input
3. Valid prompts are sent to the image model (or stored for downstream)
4. Invalid prompts return rejection messages with reason codes

---

## 🧠 Why It’s Enterprise-Grade

- Avoids wasteful image generation from unsafe or off-brand prompts
- Enables retail teams to inject brand guidelines into GenAI workflows
- Structured logging supports auditability and training feedback loops

---

## 🛠️ Stack

| Component        | Tech Used            |
|------------------|----------------------|
| Agents           | Custom LangChain-like flow (Python)  
| Interface        | Streamlit  
| Memory/Logs      | CSV-based session logs  
| Core APIs        | OpenAI, modular for DALLE or internal tools  

---

## 📁 File Structure

├── app.py             → Main Streamlit app and prompt submission UI  
├── agents.py          → Logic for Style QA, Compliance, and Publishing agents  
├── utils.py           → Shared helper functions  
├── session_log.csv    → Tracks agent decisions and outcomes  
├── requirements.txt   → Project dependencies  

---

## ✅ Status

- 🟢 Working MVP  
- 🧩 Modular, ready to integrate with any image generation backend  
- 💼 Built for enterprise-grade prompt governance workflows

---

## 🔗 Related

- 📁 [Back to Enterprise GenAI Suite](../)  
- 📹 [Full demo video (8:13)](https://youtu.be/0Ht1q3K1rwE?si=a0_m8NHXDx2QEL88)
