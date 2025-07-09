# 🧠 MVP 1: Multi-Modal Content Generator

This MVP enables marketers and creative teams to generate **brand-aligned product copy and visuals** in seconds using OpenAI’s GPT and DALL·E APIs. It supports campaign speed, tone personalization, and batch content generation — reducing dependency on cross-functional request loops.

---

## 📦 Features

- Generate visuals based on **product style prompts** (e.g., “Rustic Fall Kitchen”)
- Select between **emotional, luxurious, or neutral tones** for messaging
- Real-time generation of both **image** and **tone-specific product copy**
- Built-in **session logging** for analytics and A/B performance tracking

---

## ⚙️ How It Works

1. **Input Prompt**: Choose brand style (e.g., Rustic, Minimalist) and tone.
2. **Image Generation**: Calls DALL·E to create campaign visuals.
3. **Copywriting**: Uses GPT to generate branded copy aligned to tone.
4. **Output**: Displayed in app UI and stored in `sessions.csv` for reuse and iteration.

---

## 🧠 Why It’s Enterprise-Grade

- Built for content velocity at scale — campaign-ready assets in one click
- Easily extensible with tagging, approval workflows, or CMS integration
- Templated for seasonal campaigns and tone testing
- Session logging supports post-hoc analysis or retraining

---

## 🛠️ Stack

| Component        | Tech Used               |
|------------------|--------------------------|
| UI               | Streamlit                |
| LLM & Image API  | OpenAI (GPT-4, DALL·E)   |
| Backend Logic    | Python                   |
| Logging          | CSV (for portability)    |

---

## 🗂️ File Structure

├── app.py               → Main Streamlit app UI and routing  
├── image_generator.py   → Handles DALL·E prompt and image output  
├── text_generator.py    → Handles GPT-based tone generation  
├── sessions.csv         → Logs each generation session  
├── logs.txt             → Internal debug logs  
├── utils.py             → Shared helper functions  

---

## ✅ Status

- 🟢 Working MVP
- ⏱️ Built in under 8 hours
- 🔄 Ready for enterprise use or next-phase extension

---

## 🔗 Related

- 📁 [Part of the Enterprise GenAI Suite](../)
- 📹 [Watch the full demo (8:13)](https://youtu.be/0Ht1q3K1rwE?si=a0_m8NHXDx2QEL88)
