# 🌀 Churn Intelligence Layer – Predictive ML for Customer Retention

## 📉 Problem

Businesses often struggle to identify which customers are likely to churn before it happens. Without early warning signals, teams miss opportunities to proactively retain high-value users — impacting revenue and LTV.

## ✅ Solution

Built a Random Forest-based churn prediction model using synthetic customer data. The model predicts churn likelihood based on behavioral and engagement features and suggests retention actions.

## 💡 What It Does

- Simulates customer data (100 fake users with realistic churn signals)
- Trains a supervised ML model (Random Forest) to predict churn (0 or 1)
- Outputs predictions alongside customer names
- Recommends actions based on risk
  - `Send retention offer` for churn risks
  - `Keep regular flow` for stable users

## 🧠 Features Used

| Feature               | Description                                   |
|-----------------------|-----------------------------------------------|
| last_login_days       | Days since the customer last logged in        |
| support_tickets       | # of support tickets raised in 30 days        |
| email_open_rate       | Marketing email engagement rate               |
| subscription_status   | Account state: active, paused, cancelled      |
| tenure_months         | How long they’ve been a customer              |
| delivery_issues       | If they had recent delivery issues            |

## 📊 Output Columns

| Column       | Description                          |
|--------------|--------------------------------------|
| name         | Customer name                        |
| Features     | All above features                   |
| Actual       | Actual churn label (0 = stay, 1 = left) |
| Predicted    | Model prediction (0 or 1)            |
| Action       | Recommended retention strategy       |

## 📁 Files Included

- `Churn_Model.ipynb` – Notebook with full ML pipeline and visualizations
- `churn_data_sample.csv` – Final prediction output with actions
- `README.md` – This file

## 📈 Model Insights

- Trained a Random Forest Classifier using scikit-learn
- Achieved balanced accuracy on synthetic test data
- Plotted feature importance to understand drivers of churn

## 🔍 Sample Output

```csv
name,last_login_days,support_tickets,email_open_rate,...,Actual,Predicted,Action
Customer_1,30,2,0.43,...,1,1,Send retention offer
Customer_2,7,0,0.75,...,0,0,Keep regular flow

## 🛠️ Tools & Technologies

- Python (Google Colab)
- Pandas, NumPy
- scikit-learn (Random Forest)
- Matplotlib (feature importance plot)

## 📌 Note

This MVP was built on synthetic data to demonstrate the feasibility of churn modeling and action generation. It can be easily scaled with real customer datasets.

## ✅ Status
🟢 **Working MVP**  
Trained and tested on synthetic churn data. Predictions and retention actions generated with model insights visualized.

