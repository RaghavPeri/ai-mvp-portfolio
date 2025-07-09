# WS Content Generator – generates images and product descriptions using AI
import streamlit as st
from image_generator import generate_image
from text_generator import generate_caption
from utils import log_event
import pandas as pd

# -----------------------------------
# Setup and Session Initialization
# -----------------------------------
st.set_page_config(page_title="WS Content Generator", layout="centered")

# Initialize session state keys once
for key, default in {
    "authenticated": False,
    "user": "",
    "login_success": False
}.items():
    if key not in st.session_state:
        st.session_state[key] = default

# -----------------------------------
# Login Form (Role-based Access)
# -----------------------------------
if not st.session_state.authenticated:
    st.title("🏢 Williams-Sonoma AI Content Studio")
    st.markdown("Welcome! Please log in to generate AI-powered product visuals and descriptions for marketing.")
    with st.form(key="login_form"):
        user_input = st.text_input("Enter your name or email", key="user_input")
        access_code = st.text_input("🔐 Enter access code", type="password", key="code_input")
        submit = st.form_submit_button("Login")

        if submit:
            if access_code == "ws-ai":
                st.session_state.authenticated = True
                st.session_state.user = user_input
                st.session_state.login_success = True
            else:
                st.error("❌ Incorrect access code.")

    # Show success message only immediately after login
    if st.session_state.login_success:
        st.success("✅ Access granted.")
        st.session_state.login_success = False
        st.rerun()


    st.stop()  # Ensures rest of app doesn't show until rerun confirms login

# -----------------------------------
# Main App UI (After Login)
# -----------------------------------
user = st.session_state.user
st.markdown("## 🛋️ Williams-Sonoma AI Content Studio")
st.markdown(f"👤 Logged in as: `{st.session_state.user}`")
st.divider()
st.markdown("### 🎯 Generate New Style Content")

# Step 0: Popular Style Presets
st.markdown("####  🎨 Pick a Visual Style")

popular_styles = [
    "Rustic Fall Kitchen",
    "Coastal Summer Brunch",
    "Modern Farmhouse Dining Room",
    "Tuscan Outdoor Patio",
    "Luxury Chef’s Kitchen"
]

selected_preset = st.selectbox("Pick a popular style (optional):", [""] + popular_styles)

# Step 1: Prompt input for image generation
# Pre-fill the prompt with the selected preset if available
prompt = st.text_input("📝 Enter your style or theme:", value=selected_preset if selected_preset else "")


# Step 2: A/B Testing toggle for tone variant
st.markdown("### 🧪 A/B Test the Tone of Your Product Copy")
variant = st.radio("Choose a tone style:", [
    "A – Warm & Cozy (emotional)",
    "B – Modern & Sleek (luxury tone)"
])

# Step 3: Generate content if prompt is entered
if prompt.strip():
    with st.spinner("Creating image..."):
        image_url = generate_image(prompt.strip())
        if image_url:
            st.image(image_url, caption="AI-generated visual", use_container_width=True)
        else:
            st.error("⚠️ Could not generate image. Please try again.")

    with st.spinner("Writing caption..."):
        if variant.startswith("A"):
            caption_prompt = f"Write a warm, cozy product description for a scene in {prompt} style. Use the Williams-Sonoma tone."
        else:
            caption_prompt = f"Write a sleek, modern luxury product description for a scene in {prompt} style. Use the Williams-Sonoma tone."

        caption = generate_caption(caption_prompt)
        st.markdown("### 📝 Product Description")
        st.write(caption)

    # Step 4: Log session data for analysis
    log_event(prompt.strip(), image_url, user.strip().lower(), variant)
else:
    st.warning("Please enter a valid style or choose one from the list.")

st.divider()

# -----------------------------------
#  Log Download (User Tool)
# -----------------------------------

if st.sidebar.button("📥 Download your session log"):
    try:
        df_all = pd.read_csv("sessions.csv")
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

# -----------------------------------
# 🖼️ Display Recent Images
# -----------------------------------
import csv
st.markdown("### 🖼️ Your Recent Images")

try:
    current_user = st.session_state.get("user", "").strip().lower()

    with open("sessions.csv", newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        recent_rows = []

        for row in reader:
            row_user = row.get("user", "").strip().lower()
            if row_user == current_user:
                recent_rows.append(row)

        if not recent_rows:
            st.info("No previous images found for this user.")
        else:
            for row in recent_rows[-3:][::-1]:
                st.image(row["image_url"], caption=row["prompt"], use_container_width=True)

except Exception as e:
    st.warning(f"Couldn't load previous images. {e}")

# -----------------------------------
# Logout (Visible After Login)
# -----------------------------------
if st.session_state.authenticated:
    if st.sidebar.button("🚪 Logout"):
        st.session_state.authenticated = False
        st.session_state.user = ""
        st.success("👋 You’ve been logged out.")
        st.rerun()
