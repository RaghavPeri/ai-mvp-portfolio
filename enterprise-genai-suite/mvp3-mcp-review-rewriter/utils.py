# utils.py
import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
import csv
from datetime import datetime

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

print(f"openai_api_key: {openai_api_key}") # Debugging linellm = ChatOpenAI(
model="gpt-4",
temperature=0.7,
openai_api_key=openai_api_key



LOG_FILE = "review_log.csv"

def log_rewrite(original, rewritten, user, tone, evaluation):
    with open(LOG_FILE, "a", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([datetime.now(), user, tone, original, rewritten, evaluation])

def get_recent_rewrites(user, limit=3):
    try:
        with open(LOG_FILE, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = [row for row in reader if row['user'].strip().lower() == user.lower()]
            return rows[-limit:]
    except (FileNotFoundError, IOError) as e:
        print(f"Error reading log file: {e}")
    return []