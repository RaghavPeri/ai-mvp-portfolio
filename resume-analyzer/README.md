# 📄 Resume Analyzer – AI-Powered Fit Scoring with Embeddings

## 📉 Problem

Recruiters and hiring managers often struggle to screen large volumes of resumes against job descriptions (JDs). Manual scanning is time-consuming and inconsistent, and keyword matches miss semantic relevance — leading to missed opportunities and poor candidate-role alignment.

## ✅ Solution

This MVP uses OpenAI’s embeddings to semantically compare a resume against a job description, calculate their similarity using cosine distance, and flag the quality of match. Two modes are supported: **Google Docs integration** for real-time input, and **Static input** for prototyping.

## 💡 What It Does

- Pulls resume and JD from Google Docs using their document IDs
- Converts both into vector embeddings using `text-embedding-ada-002`
- Computes cosine similarity between resume and JD
- Flags match strength with a 70% cutoff
- Includes an alternate version that allows manual text input

## 🧠 Inputs Used

| Input Type        | Description                                                |
|-------------------|------------------------------------------------------------|
| `resume_text`     | Candidate resume pulled directly from Google Docs          |
| `jd_text`         | Job description document pulled from Google Docs           |
| `embedding_model` | OpenAI’s `text-embedding-ada-002` for 1536-dim embeddings  |

## 📊 Output Columns

| Output         | Description                                                  |
|----------------|--------------------------------------------------------------|
| `Similarity %` | Numeric match score based on cosine similarity (0–100%)      |
| `Match Signal` | "✅ Strong Match" if score > 70%, else "❌ Weak Match"        |

## 📁 Files Included

- `Resume_Analyzer.ipynb` – Colab notebook with both dynamic and static modes
- `README.md` – This file

## 🛠️ Tools & Technologies

- **Google Colab**
- **Google Docs API** (for resume and JD content)
- **OpenAI API** (`text-embedding-ada-002`)
- **NumPy** and **scikit-learn** (cosine similarity)

## 📈 MVP Highlights

- Built two seamless input modes: 
  - Google Docs Integration for automation
  - Static version for quick tests
- Framed resume-JD semantic score as a product-fit metric
- Reusable logic for any profile-to-criteria matching system
- Can be extended into recruiting platforms, ATS, or AI copilots

## 🔍 Sample Output

```plaintext
🔍 Similarity Score: 78.47%
✅ Resume is a strong match for the job.
```

## 📌 **Note**  
API key is excluded in the GitHub version for security. You must replace it with your actual OpenAI key before running the notebook.

## ✅ **Status**  
🟢 Working MVP  
Live-tested via Google Docs integration and static input. Scores match human judgment and support use-case validation.
