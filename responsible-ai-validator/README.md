# 🧠 Responsible AI Validator – SHAP-Based Fairness, Explainability & Audit Trails

## 📉 Problem
AI/ML models are often deployed without sufficient transparency or governance, leading to ethical risks, biased predictions, and audit failures.  
Business leaders, compliance teams, and regulators increasingly demand explainable, auditable, and fair AI systems.

## ✅ Solution
This notebook demonstrates an **end-to-end Responsible AI workflow** using SHAP explainability, fairness audits, and governance-ready reporting.

It includes two model pipelines built with different domains:

- 🧬 **Breast Cancer Prediction** – medical dataset with simulated ethical feature exclusion
- 💰 **Mortgage Loan Approval** – financial dataset with bias simulation and governance trail

---

## 💡 What It Does

- Trains models on both healthcare and finance datasets
- Applies responsible AI techniques:
  - Excludes sensitive features (e.g. `duration`, `mean area`)
  - Uses SHAP for global + local model interpretability
  - Visualizes fairness using SHAP histograms
- Logs model metadata for governance
- Exports a 5-sheet audit-friendly Excel file with SHAP + predictions

---

## 🧠 Inputs Used

| Input             | Description                                                  |
|------------------|--------------------------------------------------------------|
| `X` / `y`         | Feature matrix and target label (from sklearn datasets)      |
| `excluded_features` | Simulated sensitive feature (e.g., `duration`, `mean area`) |
| `shap_values`     | SHAP explanation scores per prediction and feature           |

---

## 📊 Output Columns (Excel Export)

| Sheet Name                | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| `README`                  | Guide to each sheet’s content and purpose                    |
| `trained_customer_data`   | Full training data with Customer_ID and label                |
| `excluded_features_simulated` | Simulated sensitive features (for fairness tracking)       |
| `predictions_with_shap`   | Predictions, SHAP values, and customer metadata              |
| `human_oversight_metadata`| Compliance sheet with reviewer name, status, exclusions      |

---

## 🧪 Fairness & Explainability Steps

- ✅ SHAP Summary Plot → Visualizes global feature influence  
- ✅ SHAP Force Plot → Explains one prediction per customer  
- ✅ SHAP Histogram → Audits fairness of one feature  
- ✅ CSV Log → Saves SHAP scores for governance tracking  
- ✅ Metadata → Simulates human oversight for review  

---

## 📁 Files Generated

### 🔹 Breast Cancer Model Output

- `Responsible_AI_Validator_Demo_Breast_Cancer_Classifier.xlsx` – Main 5-tab Excel output containing:
  - `trained_customer_data` – Model training data with labels and Customer IDs
  - `excluded_features_simulated` – Simulated sensitive feature (e.g., `mean area`)
  - `predictions_with_shap` – Test predictions with SHAP values and metadata
  - `human_oversight_metadata` – Compliance log with reviewer, comments, and status
  - `README` – Sheet-level explanations for stakeholders and auditors

### 🔸 Mortgage Loan Model Output

- `Responsible_AI_Validator_Demo_Mortgage_Loan_Model.xlsx` – Main 5-tab Excel output containing:
  - `trained_customer_data` – Model training data with labels and Customer IDs
  - `excluded_features_simulated` – Simulated sensitive feature (e.g., `duration`)
  - `predictions_with_shap` – Test predictions with SHAP values and metadata
  - `human_oversight_metadata` – Compliance log with reviewer, comments, and status
  - `README` – Sheet-level explanations for stakeholders and auditors

---

## 🛠️ Tools & Technologies

- Google Colab  
- SHAP (TreeExplainer)  
- scikit-learn  
- Pandas, NumPy, Matplotlib  

---

## ✅ MVP Highlights

- Demonstrates responsible AI in both **healthcare** and **finance**
- Mimics real audit trails and model approval workflows  
- Simulates fairness via ethical feature exclusions  
- Explains predictions globally (summary) and locally (force plots)  
- Fully exportable for compliance or stakeholder demos  

---

## 🔍 Sample Output Snippets

### 🔹 Breast Cancer Model Output:
📈 SHAP Summary Plot: Visualizes top impactful features
![image](https://github.com/user-attachments/assets/a0e9c676-ad6f-4fbe-8236-2f88978391f9)

🔬 Force Plot: Shows how each feature contributed to a decision
![image](https://github.com/user-attachments/assets/75960874-fe94-4ce4-9fe8-7ea12f0fd7b8)

⚖️ Histogram: Audits fairness of a selected feature
![image](https://github.com/user-attachments/assets/50316250-be4e-4bca-b016-d5030ea6d945)


### 🔸 Mortgage Loan Model Output
📈 SHAP Summary Plot: Visualizes top impactful features
![image](https://github.com/user-attachments/assets/2132bf0f-de27-4a5f-9e28-86ccaba18b8a)

🔬 Force Plot: Shows how each feature contributed to a decision
![image](https://github.com/user-attachments/assets/c596215f-e5ba-40c5-80aa-5fd92cac3d69)

⚖️ Histogram: Audits fairness of a selected feature
![image](https://github.com/user-attachments/assets/faafabd8-585a-4824-a98d-8b659ea9fe5d)


---

## 📌 Notes

- The “excluded feature” is manually simulated to replicate fairness analysis workflows.  
- Outputs are designed to be demo-ready and easily integrated into compliance reviews.  
- Works with any binary classification dataset – swap in your own and retrain.

---

## ✅ Status

🟢 Fully working end-to-end Responsible AI MVP  
Supports fairness, explainability, audit readiness, and executive storytelling.

