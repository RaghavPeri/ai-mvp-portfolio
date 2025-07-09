# app.py
import streamlit as st
from agents import run_agent_workflow
from utils import log_event, get_recent_prompts
import pandas as pd
import os

st.set_page_config(page_title="AI Interior Stylist", layout="centered")

# -------------------------------
# Session Initialization
# -------------------------------
for key, default in {
    "authenticated": False,
    "user": "",
    "login_success": False
}.items():
    if key not in st.session_state:
        st.session_state[key] = default

# -------------------------------
# Login Flow
# -------------------------------
if not st.session_state.authenticated:
    st.title("🛋️ AI Interior Stylist – Agentic Content Studio")
    st.markdown("Please log in to start submitting prompts.")

    with st.form("login_form"):
        user_input = st.text_input("Enter your name or email")
        access_code = st.text_input("🔐 Access code", type="password")
        submit = st.form_submit_button("Login")

        if submit:
            if access_code == "interior-ai":
                st.session_state.authenticated = True
                st.session_state.user = user_input
                st.session_state.login_success = True
            else:
                st.error("❌ Invalid access code.")

    if st.session_state.login_success:
        st.success("✅ Logged in successfully.")
        st.session_state.login_success = False
        st.rerun()

    st.stop()

# -------------------------------
# Main App UI
# -------------------------------
user = st.session_state.user
st.title("🎯 Interior Stylist Prompt Generator")
st.markdown(f"👤 Logged in as: `{user}`")

popular_styles = [
    "Cozy Scandinavian Living Room",
    "Modern Japandi Bedroom",
    "Rustic Kitchen with Industrial Accents",
    "Art Deco Home Office",
    "Minimalist Zen Spa Bathroom"
]

preset = st.selectbox("🎨 Choose a style preset (optional):", [""] + popular_styles)
prompt = st.text_input("📝 Enter your own interior styling prompt:", value=preset if preset else "")

if prompt.strip():
    with st.spinner("🤖 Running agentic validation..."):
        result = run_agent_workflow(prompt.strip())
        st.success("✅ Review complete!")
        st.markdown("### 📄 Agent Response")
        st.code(result)
        log_event(prompt.strip(), user.strip().lower(), result)
else:
    st.info("Please enter a prompt or select a preset above.")

st.divider()

# -------------------------------
# Session Log Export
# -------------------------------
if st.sidebar.button("📥 Download session log"):
    try:
        # Check if file exists first
        if not os.path.exists("session_log.csv"):
            st.sidebar.info("No session log found.")
        else:
            df_all = pd.read_csv("session_log.csv")
            user_id = st.session_state.get("user", "").strip().lower()
            
            # Filter for current user
            df_user = df_all[df_all["user"].str.strip().str.lower() == user_id]
            
            if not df_user.empty:
                st.sidebar.download_button(
                    label="Download CSV",
                    data=df_user.to_csv(index=False),
                    file_name=f"{user_id}_session_log.csv",
                    mime="text/csv"
                )
            else:
                st.sidebar.info("No sessions found for current user.")

    except Exception as e:
        st.sidebar.warning(f"Couldn't load session log. Error: {e}")
        
# -------------------------------
# Recent Prompt Results
# -------------------------------
st.markdown("### 🕓 Recent Prompts")


try:
    recent = get_recent_prompts(user.strip().lower())

    if not recent:
        st.info("No previous prompts found.")
    else:
        for row in reversed(recent):
            st.markdown("------")
            st.markdown(f"📝 **Prompt:** `{row.get('prompt', '')}`")
            st.markdown(f"📄 **Result:**")
            st.markdown(f"{row.get('result', '')[:300]}...")  # Preview first 300 chars
except Exception as e:
    st.warning(f"Couldn’t load prompt history: {e}")



# -------------------------------
# Logout
# -------------------------------
if st.sidebar.button("🚪 Logout"):
    st.session_state.authenticated = False
    st.session_state.user = ""
    st.success("👋 Logged out.")
    st.rerun()
