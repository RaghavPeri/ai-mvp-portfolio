# 🎯 Audience Targeting Engine – RFM-Based Segmentation, Live Scoring & Prediction Logging

## 📉 Problem
Retail and e-commerce teams often struggle to segment customers in real time and personalize marketing at scale.  
Traditional CRM targeting lacks automation, traceability, and integration with ML-powered insights.

---

## ✅ Solution
This notebook delivers an **end-to-end Customer Segmentation and Prediction MVP** using RFM scoring, KMeans clustering, and Google Sheets integration for live customer scoring.

It covers:

- 🏢 **Customer Segmentation** — Cluster historical customers using Recency, Frequency, and Monetary Value (RFM)
- 🤖 **New User Prediction** — Accept live RFM inputs and instantly classify them into actionable segments
- 📜 **Prediction Log** — Maintain an auditable log of all predicted entries with timestamps and business strategies

---

## 🔍 What It Does
- Loads and cleans transactional data from Google Sheets
- Calculates:
  - **Recency**: Days since last purchase
  - **Frequency**: Total purchase events
  - **MonetaryValue**: Total spend per customer
- Trains a KMeans clustering model and assigns each user to a segment
- Maps each segment to a defined marketing action plan (e.g., 💰 VIP Upsell, 🔐 Promo)
- Accepts new RFM entries via Google Sheets and predicts clusters in real time
- Updates sheets with “Cluster”, “ActionPlan”, and “PredictedAt” columns
- Logs every prediction to a `Prediction_Log` sheet for traceability

---

## 🧬 Inputs Used

| Input Source         | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`Training_Data`](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=133887646) | Historical transactions used to compute RFM and train KMeans               |
| [`RFM`](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=1619733324)              | Transformed RFM features per user                                          |
| [`New User`](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=85261255)           | Sheet where live user RFM entries are predicted in real time              |
| `action_map`         | Python dictionary that maps KMeans cluster to business strategies          |

---

## 📊 Output Columns

| Output Column   | Description                                                           |
|-----------------|------------------------------------------------------------------------|
| `Cluster`       | Predicted segment number from the KMeans model                         |
| `ActionPlan`    | Personalized strategy assigned to that cluster (e.g., 🔹 Retarget, 💰 Loyalty) |
| `PredictedAt`   | Timestamp (EST) when the classification was done                        |

---

## 📁 Files Included (in this repo)

- `Audience_Targeting_Engine.ipynb` — Full Colab notebook for customer segmentation + prediction logging  
- `README.md` — This file

---

## 🤮 Live Sheets (Public Demo)

- [📄 Training Data](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=133887646)
- [📊 RFM Table](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=1619733324)
- [📝 Segmented Customers Output](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=622137695)
- [🤖 New User Predictions](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=85261255)
- [📜 Prediction Log](https://docs.google.com/spreadsheets/d/1ewwoAaG5gWdRgFBYOmDND6oeMJjrCmh93NI6sJqEFRI/edit#gid=2139094980)

---

## 🧬 Tech Stack

- Google Colab  
- `scikit-learn`, `pandas`, `pytz`, `gspread`, `oauth2client`  
- Google Sheets API (read/write automation)

---

## ✨ MVP Highlights

- End-to-end customer segmentation and real-time classification in one Colab notebook
- Uses behavioral RFM scoring for unsupervised clustering
- Auto-assigns business actions to each cluster (Promo, Loyalty, Re-engage)
- Real-time predictions and audit trail captured in a log sheet
- Re-runnable workflow avoids double predictions for already classified rows

---

## 📍 Status

🟢 Working MVP – Fully integrated with Google Sheets for live predictions and traceability.

Ready for CRM campaign targeting, marketing automation, or cohort experimentation.
