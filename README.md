# 🚀 AI MVP Portfolio – Raghav Peri

Welcome to my personal AI Product Management portfolio. This repo contains multiple working AI MVPs that solve real-world problems using machine learning, NLP, embeddings, and generative AI workflows.

Each MVP was built hands-on using tools like Google Colab, OpenAI, Google Apps Script, Python, Streamlit, and LangChain — with product thinking baked in.

Use cases span personalization, classification, segmentation, predictive analytics, **recommendation systems**, **model fairness**, **explainability**, **multi-agent orchestration**, **multimodal generation**, and resume/job matching — all aligned to real stakeholder needs across industries like retail, finance, legal, and healthcare.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
> 🎓 **For learners**: Each MVP in this repo is built to teach AI product thinking, fast prototyping, and real business applications using free tools.  
> 💼 **For recruiters**: This is a live portfolio demonstrating AI fluency, product strategy, and technical execution — across NLP, ML, explainability, and real-time pipelines.  
> 🛠️ **For builders**: Fork it, try the MVPs, remix them — all code is licensed under MIT with credit.
---

## 📁 Projects Included

### 1. [🧠 Feedback Classifier – NLP (LLM-based)](./feedback-classifier)  
Auto-tags customer reviews into **sentiment, theme, urgency**, and triggers alerts for high-risk items using GPT + Google Sheets.

**Tech:** Google Apps Script, OpenAI API, Google Forms  
**PM Skills:** NLP fit, urgency detection, automation  
**Status:** ✅ Working MVP

---

### 2. [👕 Fit & Match Predictor – GPT-Enhanced Sizing](./fit-match-predictor)  
Predicts best-fit clothing size with **confidence scores** and alerts for low-confidence predictions to reduce product returns.

**Tech:** Google Forms, Apps Script, GPT  
**PM Skills:** Personalization, prediction confidence, alert logic  
**Status:** ✅ Working MVP

---

### 3. [🌀 Churn Intelligence Layer – Predictive ML](./churn-intelligence-layer)  
Predicts which users are likely to churn and **recommends retention actions**, using synthetic behavioral data and a Random Forest model.

**Tech:** Python, Google Colab, scikit-learn  
**PM Skills:** Metrics ownership, explainability, outcome-driven modeling  
**Status:** ✅ Working MVP

---

### 4. [📊 Resume Analyzer – OpenAI Embedding + Cosine Similarity](./resume-analyzer)  
Evaluates resume-to-job-description semantic match using **AI embeddings and cosine similarity**.  
Supports both static input and Google Docs integration for real-world demo storytelling.

**Tech:** Google Colab, OpenAI Embeddings API, Google Docs API  
**PM Skills:** GTM positioning, semantic search framing, recruiting UX  
**Status:** ✅ Working MVP

---

### 5. [🤖 Fake Review Detector – NLP + Google Sheets](./fake-review-detector)  
Detects potentially fake or problematic product reviews using a supervised NLP classifier (TF-IDF + Logistic Regression) trained on labeled data.

**Tech:** Google Sheets, Google Colab, scikit-learn  
**PM Skills:** Trust & integrity signals, classification precision, data labeling  
**Status:** ✅ Working MVP

---

### 6. [📈 Stock Sentiment Dashboard – VADER + Google Sheets](./stock-sentiment-dashboard)  
Analyzes stock-related news headlines using **VADER sentiment scoring**, visualizes sentiment trends by company and date from Google Sheets.

**Tech:** Google Colab, VADER, Google Sheets API, matplotlib  
**PM Skills:** KPI storytelling, sentiment pipelines, live data integration, exec dashboards  
**Status:** ✅ Working MVP

---

### 7. [📄 Legal RAG Chatbot – LangChain + Google Sheets](./legal-rag-chatbot)  
Answers user-submitted legal questions by semantically retrieving relevant content from a legal PDF using **LangChain’s RetrievalQA**, and returning AI-powered answers via Google Sheets.

**Tech:** Google Colab, LangChain, FAISS, OpenAI, Google Sheets API  
**PM Skills:** RAG design, user-triggered automation, compliance framing, modular pipelines  
**Status:** ✅ Working MVP

---

### 8. [🧠 Responsible AI Validator – SHAP-Based Fairness & Audit Trail](./responsible-ai-validator)  
Validates AI model fairness, transparency, and audit readiness using SHAP explainability across **healthcare (breast cancer)** and **finance (mortgage loan)** datasets. Simulates ethical exclusions, generates global/local explanations, and exports a 5-sheet governance-ready Excel workbook.

**Tech:** Google Colab, scikit-learn, SHAP, pandas, matplotlib  
**PM Skills:** Audit-readiness, fairness explainability, compliance integration, developer handoff  
**Status:** ✅ Working MVP

---

### 9. [🎯 Audience Targeting Engine – Real-Time Segmentation + Live Scoring](./audience-targeting-engine)  
Performs customer segmentation using **RFM (Recency, Frequency, Monetary)** features and a trained KMeans model.  
Accepts live user inputs via Google Sheets, predicts segments in real time, maps them to campaign-ready action plans, and logs results for marketing audits.

**Tech:** Google Colab, scikit-learn, pandas, gspread, pytz, Google Sheets API  
**PM Skills:** Cohort strategy, real-time prediction, ML explainability, audit traceability  
**Status:** ✅ Working MVP

---

### 10. [🎥 Product Recommender – Collaborative Filtering + A/B Strategy](./product-recommender)  
Builds a personalized product recommendation system using **SVD-based collaborative filtering** (via `scikit-surprise`).  
Implements **cold-start fallback logic**, **A/B test simulation**, and **top-N predictions** for unseen users, enabling experimentation and scalable personalization.

**Tech:** Google Colab, scikit-surprise, pandas, numpy, Google Sheets (gspread)  
**PM Skills:** GTM strategy, personalization logic, A/B testing, experimentation roadmap  
**Status:** ✅ Working MVP

---

### 🧩 [MVPs 11–14: Enterprise GenAI Suite – Campaign Automation](./enterprise-genai-suite)

_A suite of enterprise-grade MVPs to accelerate campaign creation using multi-agent systems, image generation, and governance workflows._

---

### 11. [🧠 Multi-Modal Content Generator – GPT + DALL·E](./enterprise-genai-suite/mvp1-multi-modal-content-generator)  
Generates branded copy and visuals with tone sliders, A/B previews, and campaign acceleration tools.  
**Tech:** Streamlit, GPT-4, DALL·E, Redis  
**PM Skills:** Tone control, multimodal AI, experimentation  
**Status:** ✅ Working MVP

---

### 12. [🎨 Agentic Interior Stylist Validator](./enterprise-genai-suite/mvp2-agentic-ai-interior-stylist)  
Uses LangChain agents to validate prompt quality and tone before generating interior visuals with DALL·E.  
**Tech:** LangChain agents, DALL·E, Python  
**PM Skills:** Brand safety, multi-agent validation, visual generation  
**Status:** ✅ Working MVP

---

### 13. [✍️ MCP Review Rewriter – Multi-Agent Rewrite + Governance](./enterprise-genai-suite/mvp3-mcp-review-rewriter)  
Rewrites and critiques customer reviews using a 4-step governance pipeline: `Intent → Rewrite → Critique → Editor`.  
**Tech:** LangChain agents, GPT-4, Streamlit  
**PM Skills:** Governance modeling, agent orchestration, feedback transformation  
**Status:** ✅ Working MVP

---

### 14. [⚙️ AI Orchestrator – Full Campaign Builder with Agents](./enterprise-genai-suite/mvp4-ai-orchestrator)  
A 6-agent orchestration engine that converts structured product data into deployable visuals, copy, and React components.  
**Tech:** Replit agents, LangChain, React, Tailwind, GPT-4  
**PM Skills:** End-to-end automation, data-to-content pipelines, enterprise GenAI  
**Status:** ✅ Working MVP

---

## 🛠️ Tools Used Across MVPs

- **AI Models:** GPT-4, GPT-3.5-turbo, text-embedding-ada-002, DALL·E, Random Forest, VADER Sentiment Analyzer, KMeans, SVD (scikit-surprise)  
- **Languages:** Python, JavaScript (Apps Script)  
- **Tools:** Google Colab, Streamlit, Google Docs API, Google Sheets API, Google Forms, OpenAI API, GitHub  
- **Libraries:** pandas, numpy, scikit-learn (incl. KMeans, Random Forest, preprocessing), scikit-surprise (SVD), vaderSentiment, matplotlib, FAISS, LangChain, SHAP, Redis  
- **Others:** Google Apps Script, cosine similarity, semantic embeddings, TF-IDF, RFM (Recency, Frequency, Monetary), Retrieval-Augmented Generation (RAG), model interpretability (TreeExplainer), Silhouette Score, supervised NLP, A/B testing logic, multi-agent workflows, tone sliders, campaign orchestration, multimodal content generation

---

## 🧭 Project Intent

This repository is part of my hands-on AI Product Management portfolio. Each MVP was created to:

- ✅ Demonstrate real-world AI applications — from personalization and fairness to orchestration and campaign automation  
- 🎯 Simulate product thinking, experimentation, and outcome-first execution  
- 💡 Teach others how to build AI prototypes using free tools like Colab, Sheets, Streamlit, and OpenAI — with a strong focus on stakeholder impact and MVP velocity

---

## 🔐 MIT License Notice

All code in this repo is released under the MIT License:

- You are free to use, adapt, and share  
- Attribution is required (© 2025 Raghav Peri)  
- Perfect for educational, personal, or commercial remixing

 **📮 Feel free to fork, star, or reach out with feedback!**

---

## 🧑‍💼 About Me

I'm Raghav Peri — a Senior Product Manager with a passion for solving complex business problems through data, AI, and rapid experimentation.  
This repo showcases my end-to-end ability to take ideas from insight to MVP using real tools, user empathy, and product thinking.

- **AI Fluency:** LLMs (GPT-4), NLP, Embeddings, SHAP, RAG, LangChain agents + memory, DALL·E, Clustering (KMeans), Recommender Systems (SVD), RFM Segmentation  
- **Product Execution:** Framing problems, validating use cases, architecting multi-agent workflows, designing A/B experiments, ensuring explainability and governance  
- **Rapid MVP Delivery:** Building full-stack MVPs using Colab, Streamlit, Redis, OpenAI, Google Sheets/Docs APIs — with enterprise-grade UX and outcome-first logic  
- **Public Storytelling:** Sharing experiments, frameworks, and case studies across industries like retail, finance, legal, and personalization — all backed by working code

Let’s connect on [LinkedIn](https://www.linkedin.com/in/raghavperi)!

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and share the code for personal, educational, or commercial purposes — with attribution.  
© 2025 Raghav Peri. All rights reserved.

