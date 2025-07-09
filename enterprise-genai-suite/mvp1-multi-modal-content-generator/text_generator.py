from openai import OpenAI
client = OpenAI()

# Function to generate text using OpenAI's API
def generate_caption(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You're a product copywriter for interior designs."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content # Return the generated text
