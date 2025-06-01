# 📄 Resume Analyzer – AI-Powered Fit Scoring with Embeddings

## 📉 Problem
Recruiters and hiring managers often struggle to screen large volumes of resumes against job descriptions (JDs). Manual scanning is time-consuming and inconsistent, and keyword matches miss semantic relevance — leading to missed opportunities and poor candidate-role alignment.

## ✅ Solution
This MVP uses OpenAI’s embeddings to semantically compare a resume against a job description, calculate their similarity using cosine distance, and flag the quality of match. Two modes are supported:
- 🔁 Google Docs Integration for real-time input
- ✍️ Static input mode for prototyping

## 💡 What It Does
- Pulls resume and JD from Google Docs using their document IDs  
  (Resume Doc: `1y7FNZx-3COkRc2BFHpmM8bZtn68NI2qyRR3Z8xzkdjs`  
   JD Doc: `1vzwDrxWsxsxz92w56Ds1GNKOBhSfwgbf0uRTIFaKDv4`)
- Converts both into vector embeddings using `text-embedding-ada-002`
- Computes cosine similarity between resume and JD
- Flags match strength with a 70% cutoff
- Alternate version allows manual text input for quick tests

## 🧠 Inputs Used

| Input Type      | Description                                          |
|-----------------|------------------------------------------------------|
| `resume_text`   | Candidate resume pulled from Google Docs             |
| `jd_text`       | Job description pulled from Google Docs              |
| `embedding_model` | OpenAI’s `text-embedding-ada-002` (1536-dim vectors) |

## 📊 Output Columns

| Output          | Description                                         |
|----------------|-----------------------------------------------------|
| `Similarity %`  | Numeric match score based on cosine similarity     |
| `Match Signal`  | ✅ "Strong Match" if score > 70%, else ❌ "Weak Match" |

## 🧪 Alternate Usage: Static Resume + JD (Manual Entry)
If you don’t want to use Google Docs, this notebook includes a second mode for quick local testing.  
Simply paste your resume and job description into the provided `resume_text` and `jd_text` sections in the static version block.  
No document setup or API connection needed — great for prototyping or debugging locally.


## 📁 Files Included
- `Resume_Analyzer.ipynb` – Colab notebook with both dynamic and static modes
- `README.md` – This file

## 🛠️ Tools & Technologies
- Google Colab  
- Google Docs API (for resume and JD content)  
- OpenAI API (`text-embedding-ada-002`)  
- NumPy and scikit-learn (cosine similarity calculation)

## 📈 MVP Highlights
- Built two seamless input modes:
  - 🔁 Google Docs Integration for automation
  - ✍️ Static version for quick prototyping
- Framed resume-JD semantic score as a product-fit metric
- Reusable logic for any profile-to-criteria matching use case
- Can be extended into recruiting platforms, ATS, or AI copilots

## 🔍 Sample Output
🔍 Similarity Score: 78.47%
✅ Resume is a strong match for the job.


## 📌 Notes
- API key is excluded in the GitHub version for security. Replace with your actual OpenAI key before running.
- Google Docs referenced above are private and editable only by the author.

## ✅ Status
🟢 Working MVP  
Live-tested via Google Docs and static input. Scores align with human judgment and support real-world recruiting use cases.
