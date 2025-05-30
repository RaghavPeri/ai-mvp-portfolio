// 🔐 IMPORTANT: API key removed for security
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getLastRow();
  const review = sheet.getRange(row, 4).getValue(); // Column D

  const prompt = `
Classify the following customer review into:
1. Sentiment (Positive, Negative, Mixed)
2. Theme (e.g. Delivery, Taste, Product Quality, Support, etc.)
3. Urgency (Low, Medium, High)

Review: """${review}"""
Give your response as JSON like:
{"sentiment":"...", "theme":"...", "urgency":"...", "flag":"Yes/No"}
`;

  const payload = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": prompt}],
    "temperature": 0.3
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    "payload": JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
    const result = JSON.parse(response.getContentText());
    const output = JSON.parse(result.choices[0].message.content);

    sheet.getRange(row, 5).setValue(output.sentiment);
    sheet.getRange(row, 6).setValue(output.theme);
    sheet.getRange(row, 7).setValue(output.urgency);
    sheet.getRange(row, 8).setValue(output.flag);

    // Email alert logic
    if (output.urgency.toLowerCase() === 'high' && output.flag.toLowerCase() === 'yes') {
      const emailRecipient = "raghavperipm@gmail.com"; 
      const subject = "ALERT: High-Urgency Customer Feedback";
      const message = `A new high-urgency review has been received.\n\nReview:\n${review}\n\nSentiment: ${output.sentiment}\nTheme: ${output.theme}\nUrgency: ${output.urgency}`;
      MailApp.sendEmail(emailRecipient, subject, message);
    }

  } catch (error) {
    Logger.log("OpenAI API Error: " + error.message);
    sheet.getRange(row, 5).setValue("API Error");
    sheet.getRange(row, 6).setValue("-");
    sheet.getRange(row, 7).setValue("-");
    sheet.getRange(row, 8).setValue("No");
  }
}
