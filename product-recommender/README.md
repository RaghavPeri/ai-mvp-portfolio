# 🎬 Product Recommender – SVD-Based Personalization, Cold-Start Handling & A/B Impact Simulation

---

## 📉 Problem  
Modern product or content platforms struggle to offer personalized recommendations for both new and returning users.  
Traditional recommendation methods fail to adapt to unseen users or leverage known user behavior for precise predictions.  
Without measurable experiments (like A/B tests), it's hard to validate whether personalization actually improves outcomes.

---

## ✅ Solution  
This notebook delivers a personalized recommendation MVP using matrix factorization (SVD), Google Sheets integration for live inputs, and a built-in A/B test simulation to measure impact.

It covers:

- 🎯 **Personalized Recommendations** — Predict what a known user might enjoy using collaborative filtering  
- 🧊 **Cold Start Logic** — For new users, intelligently handle combinations of genre/movie input  
- 🧪 **A/B Testing** — Simulate CTR uplift from AI recommendations vs no recommendations

---

## 💡 What It Does 

- Loads user–movie rating data and movie metadata from Google Sheets  
- Trains a Surprise SVD model for matrix factorization-based recommendation  
- For **known users**: predicts top unseen movies  
- For **new users**: returns genre/movie-based suggestions across 4 input scenarios  
- Explains recommendations using genre overlaps with past user preferences  
- Simulates an A/B test for 1,000 users and visualizes CTR lift  
- Captures real-time recommendations through readable printouts

---

## 🧬 Inputs Used  

| Input Sheet | Description |
|-------------|-------------|
| `data` | Historical user–movie ratings (user_id, movie_id, rating, timestamp) |
| `item` | Movie metadata (title, genre tags, movie_id) |
| `New_User` | Live input sheet where users enter genre, favorite movie, and user ID |

---

## 📊 Output Columns  

| Output | Description |
|--------|-------------|
| Top 5 Recommendations | Based on either collaborative filtering or genre/movie logic |
| Genre Match Explanation | Matching genres and example movies the user liked before |
| A/B Test CTR | Control vs Test click-through rate and uplift |

---

## 📁 Files Included (in this repo)

- `Product_Recommender.ipynb` — Full Colab notebook with recommendation engine, new user handling, and A/B test simulation  
- `README.md` — This file  
- 🔗 *[Google Sheet – Input + Live Test Sheet (View Only)](https://docs.google.com/spreadsheets/d/1zvBjkYAhkfLN_Z1CEmSMC7fVw1y7b8RjNfZkbEFYII4/edit?gid=0#gid=0)*

---

## 🤖 Live Sheets (Public Demo)

- `data` tab — Ratings data  
- `item` tab — Movie metadata  
- `New_User` tab — Real-time test inputs

---

## 🛠️ Tools & Technologies

- Google Colab  
- scikit-surprise (SVD model)  
- pandas, numpy  
- gspread + oauth2client (for Google Sheets I/O)  
- matplotlib (for A/B test visualization)

---

## ✅ MVP Highlights

- Matrix factorization–based personalization using real ratings  
- Cold-start coverage via genre/movie fallback logic  
- 4-way input handling for new users (nothing, genre-only, movie-only, both)  
- CTR uplift simulation via randomized A/B test for validation  
- Genre-based explanation to improve transparency  
- Real-time integration with Google Sheets for easy testing

---

## 📌 Notes

On **first run**, the notebook **downgrades NumPy to 1.23.5** to maintain compatibility with `scikit-surprise`.  
This triggers a **Colab runtime restart**, which is expected. After restart, re-run the notebook from the top.

**Reason**: NumPy 2.x breaks compatibility with legacy Surprise models, which expect legacy array shape conventions.

---

## ✅ Status

🟢 Working MVP – Fully tested with Google Sheets and cold-start logic.  
Ready for personalization testing, A/B experimentation, or real-time recommender demos.
