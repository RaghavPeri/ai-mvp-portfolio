# 🧠 Feedback Classifier – NLP (LLM-based)

## Problem
Customer feedback often arrives in bulk and in unstructured form, making it hard for businesses to triage urgent issues or understand themes without manual tagging.

## Solution
I built an automated review classification MVP using Google Forms, Sheets, Apps Script, and OpenAI's GPT API. It classifies reviews in real-time based on:

- **Sentiment** (Positive, Negative, Mixed)
- **Theme** (e.g., Delivery, Product Quality, Taste)
- **Urgency** (Low, Medium, High)
- **Escalation Flag** (Yes/No)

It also sends **email alerts** for high-urgency flagged reviews.

## How It Works
1. User submits a review via Google Form
2. Google Apps Script sends the review to OpenAI’s Chat API
3. GPT classifies the review and logs the result into Google Sheets
4. If urgent + flagged, an email is sent to the product team

## Tools & Technologies
- 🧩 Google Forms & Sheets
- 🧠 OpenAI GPT-3.5-turbo (via Apps Script API call)
- ⚙️ Apps Script automation
- 📬 MailApp alert system

## Output Sample
| Review | Sentiment | Theme | Urgency | Flag |
|--------|-----------|--------|---------|------|
| "I’m extremely disappointed. The product arrived shattered, customer support was unhelpful, and I need a refund immediately." | Negative | Product Quality, Support | High | Yes |

## File Contents
- `feedback_classifier.gs` – Script to classify reviews (API key removed for security)
- `Feedback Classifier Data (Responses).csv` – Sample data collected via Google Form

## Status
✅ Built and tested as a working MVP  
📬 API key intentionally removed from the uploaded script
