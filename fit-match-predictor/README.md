# 👕 Fit & Match Predictor – GPT-Enhanced Size Recommender

## 📉 Problem

Online shoppers often struggle with finding the right clothing size due to variations in body type, fit preferences, and brand differences. This leads to high return rates and poor customer experience.

## ✅ Solution

Built a smart, GPT-powered Fit Assistant that recommends a clothing size and confidence level based on user inputs such as height, weight, body type, and fit preference. It flags low-confidence predictions and alerts the product team when inputs are ambiguous or inconsistent.

## 💡 What It Does

- Collects user inputs via Google Form
- Sends inputs to OpenAI’s GPT-3.5-turbo via Apps Script
- GPT returns:
  - Recommended clothing size (`XS`–`XL`)
  - Confidence level (as a %)
  - Reasoning behind the recommendation
- Logs results in Google Sheets
- Sends email alerts when confidence < 80%

## 🛠️ Tools & Technologies

- Google Forms + Sheets
- Google Apps Script
- OpenAI GPT-3.5-turbo API
- MailApp for email notifications

## 📊 Output Columns

| Column | Description |
|--------|-------------|
| I | Recommended Size |
| J | Confidence % |
| K | Reason / Justification |

If the confidence is low, an email is triggered with the customer details and model prediction.

## 🔐 Notes

- API key has been removed from the uploaded `.gs` file for security.
- All logic is handled within the Apps Script environment.

## 📁 Files Included

- `fit_predictor.gs` – Script to run GPT size prediction and alert logic
- `Fit Predictor Data.csv` – Sample user inputs from the Google Form
- `README.md` – This file

## 📌 Example Use Case

**User Input:**
- Height: 160 cm
- Weight: 62 kg
- Body Type: Athletic
- Fit Preference: Slim
- Usual Size: M

**Output (from GPT):**

```json
{
  "recommended_size": "S",
  "confidence": "72%",
  "reason": "Based on slim fit preference and athletic build, a smaller size is recommended. Confidence is moderate due to variance from user's usual size."
}
```

## ✅ Status
🟢 Working MVP
Fully tested with Google Forms, Sheets, Apps Script, and OpenAI API. Predicts size with confidence scoring and alert logic.
