import datetime
import csv
import os

# Ensure sessions.csv exists with proper headers
if not os.path.exists("sessions.csv"):
    with open("sessions.csv", mode="w", newline="") as file:
        writer = csv.writer(file, quoting=csv.QUOTE_ALL)
        writer.writerow(["timestamp", "user", "prompt", "variant", "image_url"])

# Log function with separate fields
def log_event(prompt, image_url, user="anonymous", variant=""):
    with open("sessions.csv", mode="a", newline="") as file:
        writer = csv.writer(file, quoting=csv.QUOTE_ALL)
        writer.writerow([str(datetime.datetime.now()), user, prompt, variant, image_url])
