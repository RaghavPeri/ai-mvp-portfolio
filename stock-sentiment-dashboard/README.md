# 📈 Stock Sentiment Dashboard – Google Sheets + VADER

This MVP analyzes and visualizes sentiment from stock-related news headlines stored in Google Sheets. It uses the VADER sentiment model to generate scores and plots time-based sentiment trends by company.

---

## 🧠 Problem

Stock market sentiment shifts rapidly based on news. Manually tracking sentiment across companies and time periods is inefficient and lacks data-driven insight.

---

## ✅ Solution

Use VADER-based sentiment analysis to score news headlines stored in Google Sheets and visualize sentiment trends by company and date — enabling live dashboarding and quick insight generation.

---

## 💡 What It Does

- Reads stock headlines from a `Headlines` tab in Google Sheets  
- Applies VADER sentiment scoring (compound score from –1 to +1)  
- Plots sentiment trends by company and date  
- Supports dynamic updates by re-running the notebook after adding new headlines  

---

## 🧠 Inputs Used

| Input Type | Description |
|------------|-------------|
| `Date`     | Date the headline was published |
| `Company`  | Company name (e.g., Apple, Amazon, Tesla) |
| `Headline` | News text to score for sentiment |

---

## 📊 Output Columns

| Output Column     | Description                                |
|-------------------|--------------------------------------------|
| `Sentiment Score` | VADER compound sentiment score (–1 to +1)  |
| `Line Chart`      | Trend graph of sentiment by company & date |

---

## 📁 Files Included

- `Stock_Sentiment_Dashboard.ipynb` – Full notebook with Google Sheets integration and sentiment chart
- `README.md` – This file

---

## 🛠️ Tools & Technologies

- Google Colab  
- Google Sheets API (via `gspread`)  
- VADER Sentiment Analyzer (`vaderSentiment`)  
- `pandas` for data handling  
- `matplotlib` for visualization

---

## 📌 PM Notes

- **Learn**: Sentiment analysis using VADER + visual dashboards
- **PM Focus**: KPI storytelling, exec reporting, trend visualization
- **Stack**: Google Colab + VADER + matplotlib + Google Sheets
- **Coverage**: Sentiment scoring, dashboarding, pipeline thinking
- **Dynamic Updates**: Re-runnable for new headlines without retraining

---

## 🧪 Live Usage

## Public Demo

- [Headlines Sheet](https://docs.google.com/spreadsheets/d/1KslSoDZp9MofJTE7e3YvdifvnAVNQpNEMSyoNCXrOTI/edit#gid=0)


To update the dashboard:
1. Add new headlines in the Google Sheet (tab: `Headlines`)
2. Re-run the final dashboard cell — no code changes needed

---

## ✅ Status

🟢 **Working MVP**  
Live-tested using Google Sheets + Colab. Automatically processes sentiment from headlines and updates the chart. Supports repeat use with no retraining.

This MVP enables real-time sentiment monitoring of stock-related news using a simple but powerful VADER model. Designed with dashboarding and product storytelling in mind, it reflects:
- Lightweight sentiment pipelines  
- Google Sheets as a no-code input source  
- Executable dashboard for data storytelling and KPI analysis  
