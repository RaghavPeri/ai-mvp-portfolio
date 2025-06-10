# 📄 Legal RAG Chatbot – AI-Powered Q&A with LangChain + Google Sheets

## 📉 Problem
Legal documents are long, complex, and hard to navigate. Non-technical users or citizens may struggle to extract relevant information or understand their rights. Manual lookup is inefficient, and building full apps for Q&A is often overkill at early stages.

## ✅ Solution
This MVP uses Retrieval-Augmented Generation (RAG) to answer legal questions from a pre-uploaded PDF (e.g., "Tenant Rights").  
The user enters a question in Google Sheets. The backend finds relevant sections from the document using vector similarity and returns a GPT-generated response — written directly back into the same Sheet.

⚠️ Note: The Google Sheet linked in the `.ipynb` file is **read-only** for demo purposes. You can duplicate it to your own Drive for live testing.

## 💡 What It Does
- Loads and chunks a legal PDF into overlapping segments using LangChain
- Embeds the chunks using OpenAI's embedding model
- Stores the embeddings in a FAISS vector store for semantic retrieval
- Reads the latest unanswered question from Google Sheets
- Retrieves the most relevant context and runs it through a RetrievalQA chain
- Writes the final answer and a timestamp back to the Google Sheet
- Ignores rows that already contain answers or timestamps

## 🧠 Inputs Used

| Input Type   | Description                                               |
|--------------|-----------------------------------------------------------|
| `Question`   | Legal query entered in Column A of the Google Sheet       |
| `PDF`        | Legal document uploaded to Colab (e.g., "Tenant Rights.pdf") |
| `Vector Store` | FAISS-based store of embedded document chunks            |

## 📊 Output Columns

| Output Column   | Description                                             |
|-----------------|---------------------------------------------------------|
| `Chatbot Answer`| GPT-generated legal response based on document context |
| `Answered At`   | Timestamp in local timezone (EST) when answer is written |
| `Error`         | (Optional) Column D logs any errors during answer generation |

## 📁 Files Included
- `Legal_RAG_Chatbot.ipynb` – Full Colab notebook with LangChain + Google Sheets integration
- `README.md` – This file
- `Tenant Rights.pdf` – The Legal source doc used 

## 🛠️ Tools & Technologies
- Google Colab  
- LangChain (`langchain`, `langchain-community`, `langchain-openai`)  
- OpenAI API (`text-embedding-ada-002`, GPT model)  
- FAISS (vector search)  
- Google Sheets API (`gspread`)  
- Python `RunnableSequence` (LangChain Expression Language)  

## 📈 MVP Highlights
- Chunked PDF context + vector embeddings to enable semantic search
- Used `RunnableSequence` to make logic modular and future-API-ready
- Sheet-based user interface — zero-code for end users
- Built-in timestamping and error logging
- Clean separation of setup (Cell 1) and runtime (Cell 2) for easy reuse

## 🧪 Live Usage

Use the public sheet to test the chatbot workflow:

👉 [Google Sheet – Legal Q&A (View Only)](https://docs.google.com/spreadsheets/d/1_QmYN7ac26U5mzW-fbgmxCKTeOEd9MebsfAO6GIS_Uk/edit?usp=sharing)

**To try it yourself:**
1. **Make a copy** of the Google Sheet into your own Drive.
2. Add a question in **column A** of any blank row.
3. Run the final Colab cell to generate the response in **column B**, with a timestamp in **column C**.

> ⚠️ _Note: The original Sheet is view-only to preserve integrity across demos._


## 🔍 Sample Output
🟨 Question: Can a landlord enter my home without notice?  
🟩 Answer: No, a landlord does not have the right to enter a residential rental premises without consent of the tenant or a judgment from the Superior Court of New Jersey...

## 🔒 Privacy & Compliance
- No personally identifiable information (PII) is stored
- Source document is public and static
- Responses are grounded in a known PDF and do not depend on external APIs beyond OpenAI

## ✅ Status
🟢 Working MVP  
Tested live with Google Sheets and a public legal document. Accurately retrieves legal context and returns reliable answers. MVP is designed to be extended into a web app or API service with minimal changes.
