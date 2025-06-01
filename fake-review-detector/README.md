# 🤖 Fake Review Detector – Google Sheets + NLP Classifier

This MVP detects potentially fake or problematic product reviews by classifying them based on labeled examples. It's built to simulate a real-time fraud detection system powered by NLP.

---

## 📉 Problem

Online platforms are flooded with user reviews — but many are spammy, fake, or low-quality. Manual moderation doesn’t scale, and basic keyword filters miss semantic signals.

---

## ✅ Solution

This system uses a TF-IDF + Logistic Regression model trained on labeled reviews. Once trained, the model automatically labels any new review added to the Google Sheet and writes the result back.

---

## 💡 What It Does

- Reads labeled reviews from the `Training Data` tab of a shared Google Sheet
- Trains a supervised ML classifier (TF-IDF + Logistic Regression)
- Prints classification metrics to evaluate model precision and recall
- Plots a confusion matrix to visualize performance on training data
- Accepts new review input in the `New Review` tab (cell A2)
- Predicts the label (Fake / Genuine) and writes it to cell B2
- Designed for retrain-once, label-multiple use — so new reviews can be tested without rebuilding the model

---

## 🧠 Inputs Used

| Input Type | Description |
|------------|-------------|
| `Review`   | Customer review text from Google Sheets |
| `Label`    | Binary classification – Genuine / Fake |

---

## 📊 Output Columns

| Column | Description |
|--------|-------------|
| A2     | New review text (manually entered) |
| B2     | Model-generated label (Fake / Genuine) |

---

## 📁 Files Included

- `Fake_Review_Detector.ipynb` – Full notebook with training, evaluation, and prediction steps
- `README.md` – This file

---

## 🛠️ Tools & Technologies

- Google Colab
- Google Sheets API (via `gspread`)
- scikit-learn (TF-IDF + Logistic Regression)
- pandas
- matplotlib (confusion matrix)

---

## 📌 PM Notes

- **Learn:** NLP classifier using TF-IDF, vectorization, and semantic classification
- **PM Focus:** Trust & integrity signals, classification precision, edge case handling
- **Stack:** Google Colab + scikit-learn + Google Sheets (via `gspread`)
- **Coverage:** Supervised NLP, TF-IDF model training, metrics visualization
- **Edge Cases:** Built to scale via labeled training sheet; re-labeling can refine precision

---

## 🧪 Live Sheets (Public Demo)

- [Training Data Sheet](https://docs.google.com/spreadsheets/d/16SDLUn3LwGAFy1vSRNe1ZIJ8fKCM1hBg2NJANfpLYnU/edit#gid=0)  
- [New Review Sheet](https://docs.google.com/spreadsheets/d/16SDLUn3LwGAFy1vSRNe1ZIJ8fKCM1hBg2NJANfpLYnU/edit#gid=321583912)

---

## ✅ Status

🟢 **Working MVP**  
Live-tested via Google Sheets + Colab. Accurately classifies new reviews and prints evaluation metrics to verify trustworthiness of predictions.
