import csv
from datetime import datetime
import os

LOG_FILE = "session_log.csv"

# Ensure session_log.csv exists with proper headers
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "user", "prompt", "result"])

# -------------------------------
# Log Each Session
# -------------------------------
def log_event(prompt, user, result):
    """Append prompt + result + user + timestamp to CSV log file."""
    row = [datetime.now().strftime("%Y-%m-%d %H:%M:%S"), user, prompt, result]

    try:
        with open(LOG_FILE, "a", newline='') as f:
            writer = csv.writer(f)
            writer.writerow(row)
    except Exception as e:
        print(f"❌ Failed to log event: {e}")

# -------------------------------
# Load Recent Prompts for a User
# -------------------------------

def get_recent_prompts(user, limit=3):
    """Return the most recent prompt+result pairs for the given user."""
    try:
        with open(LOG_FILE, newline='') as f:
            reader = csv.DictReader(f)
            rows = [
                row for row in reader 
                if row.get("user", "").strip().lower() == user.lower()
            ]

        # Sort by timestamp (newest first), then take top N
        rows.sort(
            key=lambda x: datetime.strptime(x.get("timestamp", "1970-01-01 00:00:00"), "%Y-%m-%d %H:%M:%S"),
            reverse=True
        )

        return rows[:limit] if rows else []
    except Exception as e:
        print(f"⚠️ Couldn't read session log: {e}")
        return []