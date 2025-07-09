import pandas as pd
import json
import streamlit as st
import sys
import os
from agents.rewrite_agent import llm
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


from agents.intent_parser import generate_tone_prompt
from agents.rewrite_agent import rewrite_review, llm
from agents.critique_agent import critique_review
from agents.editor_agent import improve_review_with_feedback
from utils import log_rewrite, get_recent_rewrites

st.set_page_config(page_title="🧠 MCP Review Rewriter (Agentic)", layout="centered")

# ---------------- Session State ----------------
for key, default in {
    "authenticated": False,
    "user": "",
    "login_success": False
}.items():
    if key not in st.session_state:
        st.session_state[key] = default

# ---------------- Login ----------------
if not st.session_state.authenticated:
    st.title("✍️ MCP Review Rewriter")
    with st.form("login_form"):
        user_input = st.text_input("Enter your name")
        access_code = st.text_input("Access code", type="password")
        submit = st.form_submit_button("Login")
        if submit and access_code == "rewrite-ai":
            st.session_state.authenticated = True
            st.session_state.user = user_input
            st.rerun()
    st.stop()

# ---------------- Main App ----------------
user = st.session_state.user
st.markdown(f"👤 Logged in as: `{user}`")
use_memory = st.checkbox("🧠 Use Tone Memory", value=True)
reset_memory = st.checkbox("🗑️ Reset Tone Memory for this session", value=False)

st.markdown("## ✍️ Rewrite and Evaluate Customer Review")

import json

# Load tone memory file
if os.path.exists("tone_memory.json"):
    with open("tone_memory.json", "r") as f:
        tone_memory = json.load(f)
else:
    tone_memory = {}

# Determine default tone
if use_memory and user in tone_memory and not reset_memory:
    default_tone = tone_memory[user]
else:
    default_tone = "Warm & Friendly"

# Show tone selector
tone = st.selectbox("🎯 Choose tone preference:", [
    "Warm & Friendly", "Luxury & Premium", "Helpful & Technical"
], index=["Warm & Friendly", "Luxury & Premium", "Helpful & Technical"].index(default_tone))

# Save selection if memory is ON
if use_memory and not reset_memory:
    tone_memory[user] = tone
    with open("tone_memory.json", "w") as f:
        json.dump(tone_memory, f)


review = st.text_area("📝 Paste a customer review here:")

if st.button("🔁 Rewrite + Evaluate"):
    if not review.strip():
        st.warning("Review text is required.")
    else:
        with st.spinner("Processing..."):
            print("LLM object:", llm)

            # Agent 1: Intent Parser
            tone_prompt = generate_tone_prompt(tone)
            print("1 LLM object:", llm)

            # Agent 2: Rewrite
            draft_review = rewrite_review(review, tone_prompt)
            print("2 LLM object:", llm)

            # Agent 3: Critique
            critique = critique_review(draft_review, llm)
            print("3 LLM object:", llm)

            # Agent 4: Edit Final Version
            final_review = improve_review_with_feedback(draft_review, critique, llm=llm)
            st.success("✅ Done")
            print("4 LLM object:", llm)

        # Output: Rewritten Review
        st.markdown("### ✍️ Rewritten Review")
        st.code(final_review)

        # Output: MCP Evaluation
        st.markdown("### 📊 MCP Evaluation")
        for line in critique.split("\n"):
            if ":" in line:
                key, val = line.split(":", 1)
                #key = key.strip().lstrip("-").strip()  
                #st.markdown(f"**{key.strip()}:** {val.strip()}")
                
                st.markdown(f"**{key}:** {val.strip()}")


        # Log
        log_rewrite(review, final_review, user, tone, critique)

# -----------------------------------
#  Log Download (User Tool)
# -----------------------------------

if st.sidebar.button("📥 Download your session log"):
    try:
        df_all = pd.read_csv("review_log.csv")
        current_user = st.session_state.get("user", "").strip().lower()
        df_user = df_all[df_all["user"].str.strip().str.lower() == current_user]

        if not df_user.empty:
            st.sidebar.download_button(
                label="Download CSV",
                data=df_user.to_csv(index=False),
                file_name=f"{current_user}_session_log.csv",
                mime="text/csv"
            )
        else:
            st.sidebar.info("No sessions found for current user.")

    except Exception as e:
        st.sidebar.warning(f"Couldn't load session log. {e}")


# ---------------- History ----------------
st.markdown("### 🕓 Recent Rewrites")

recent = get_recent_rewrites(user)
if not recent:
    st.info("No recent rewrites found.")
else:
    for row in reversed(recent):
        st.markdown("------")
        st.markdown(f"🕒 **Time:** {row.get('timestamp')}")
        st.markdown(f"🎯 **Tone:** {row.get('tone')}")
        st.markdown(f"📝 **Original:** {row.get('original')[:150]}...")
        st.markdown(f"✍️ **Rewritten:** {row.get('rewritten')[:150]}...")

        st.markdown("**📊 Evaluation:**")
        eval_lines = row.get('evaluation').split("\n")
        for line in eval_lines:
            if ":" in line:
                k, v = line.split(":", 1)
                st.markdown(f"- **{k.strip()}**: {v.strip()}")

# ---------------- Logout ----------------
if st.sidebar.button("🚪 Logout"):
    st.session_state.authenticated = False
    st.session_state.user = ""
    st.success("Logged out.")
    st.rerun()
