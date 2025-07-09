import openai
import os
from dotenv import load_dotenv

load_dotenv()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Function to generate image using DALL-E 3
def generate_image(prompt):
    full_prompt = (
        f"{prompt}, styled for Williams-Sonoma catalog, high-quality lighting, "
        "photo-realistic, elegant composition, no people, no words, no logos, no text overlay" 
    )
    response = client.images.generate(
        model="dall-e-3",
        prompt=full_prompt,
        size="1024x1024",
        quality="standard",
        n=1
    )
    return response.data[0].url # Return the URL of the generated image
