# 📄 Product Requirements Document (PRD) – Legal RAG Chatbot MVP

## 🧭 Product Overview
This MVP allows users to input legal questions into a Google Sheet and receive AI-generated answers based on a pre-uploaded legal PDF (e.g., “Tenant Rights”). It uses Retrieval-Augmented Generation (RAG) to identify relevant context from the document and provide grounded answers via OpenAI's GPT model.

---

## 🎯 Goal
- Enable legal Q&A from unstructured documents without building a full app
- Use a familiar interface (Google Sheets) for inputs and outputs
- Ensure scalable architecture with reusable LangChain logic

---

## 🧑‍💼 Target Users
- Legal operations teams
- Non-technical internal users
- Citizen support desks
- PMs or AI builders prototyping legal assistants

---

## 📥 Inputs

| Field | Source | Description |
|-------|--------|-------------|
| Legal PDF | Uploaded via Colab | The base document for all legal knowledge |
| Legal Question | Column A in Google Sheet | Free-form text entered by user |
| Google Sheet | gspread | Acts as the user interface and backend store |

---

## 📤 Outputs

| Field | Description |
|-------|-------------|
| Chatbot Answer (Column B) | Natural language response grounded in PDF context |
| Answered At (Column C) | Timestamp when response is generated |
| Error Log (Column D, optional) | Exception messages for debugging or traceability |

---

## ⚙️ System Design

- **Document Loading**: `PyPDFLoader` loads the PDF
- **Text Chunking**: `CharacterTextSplitter` with overlap for better context
- **Embedding**: `OpenAIEmbeddings` via `langchain-openai`
- **Vector Store**: FAISS for similarity search
- **Retriever**: Finds top-matching chunks using cosine similarity
- **LLM Chain**: `RetrievalQA` with OpenAI LLM
- **Runner**: `RunnableSequence` wraps the logic for future reusability

---

## 🚦 Flow Overview

1. User enters a legal question in Google Sheets (Column A)
2. Colab notebook detects unanswered rows
3. LangChain retrieves relevant chunks from the embedded document
4. LLM generates a response
5. Sheet is updated with the answer and timestamp

---

## 🔒 Privacy & Compliance

- No PII or user authentication required
- Data is read-only and static (PDF) or general-purpose (questions)
- Ideal for use in internal prototyping or citizen education

---

## 🧱 MVP Scope

| Included | Not Included |
|----------|--------------|
| One-document RAG from PDF | Multi-doc selection |
| Google Sheet integration | Full UI or form input |
| Timestamp + error handling | Advanced prompt chaining |
| RunnableSequence-based modularity | Long-term memory or chat history |

---

## 🔼 Future Enhancements

- Add document upload interface for non-technical users
- Support multiple legal PDFs + tagging by jurisdiction
- Convert to API-backed app (FastAPI or Streamlit)
- Add conversation memory or thread-based follow-ups
- Integrate with authentication or access control

---

## 📌 Deployment Notes

| Item | Recommendation |
|------|----------------|
| Colab Runtime | Must run Cell 1 first (setup) and Cell 2 after new questions |
| OpenAI Key | Must be added via `os.environ` or secret manager |
| Sheet Access | Ensure the Google Sheet is shared with the authorized service account |

---

## 🟢 Status
✅ Completed MVP with successful test runs  
🛠️ Ready for productization via API or UI  
🔄 Modular pipeline supports scaling and reuse  
