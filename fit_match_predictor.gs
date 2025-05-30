// 🔐 API key removed for security
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getLastRow();

  const height = sheet.getRange(row, 4).getValue(); // Column D
  const weight = sheet.getRange(row, 5).getValue(); // Column E
  const bodyType = sheet.getRange(row, 6).getValue(); // Column F
  const fitPref = sheet.getRange(row, 7).getValue(); // Column G
  const currentSize = sheet.getRange(row, 8).getValue(); // Column H

  const prompt = `
You are a smart fit assistant. Based on the user's height, weight, body type, and fit preference, recommend an ideal clothing size from [XS, S, M, L, XL].

Customer Details:
- Height: ${height}
- Weight: ${weight}
- Body Type: ${bodyType}
- Fit Preference: ${fitPref}
- Usual Clothing Size: ${currentSize}

Respond **only** in this exact JSON format. Confidence should be a percentage between 0% and 100%:

{
  "recommended_size": "...",
  "confidence": "...",
  "reason": "..."
}
If there is any mismatch between usual clothing size and predicted size, or the inputs seem inconsistent, lower the confidence score accordingly.
`;

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + OPENAI_API_KEY
    },
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
    const result = JSON.parse(response.getContentText());
    const rawText = result.choices[0].message.content;

    const cleanedJson = rawText.match(/{[\s\S]+}/);
    if (!cleanedJson) throw new Error('GPT did not return valid JSON');

    const output = JSON.parse(cleanedJson[0]);

    sheet.getRange(row, 9).setValue(output.recommended_size || 'N/A'); // Column I
    sheet.getRange(row, 10).setValue(output.confidence || 'N/A');      // Column J
    sheet.getRange(row, 11).setValue(output.reason || 'N/A');          // Column K

    const rawConfidence = output.confidence.replace('%', '');
    const numericConfidence = parseFloat(rawConfidence);

    if (numericConfidence < 80) {
      const emailRecipient = "raghavperipm@gmail.com";
      const subject = "⚠️ Low Confidence Size Recommendation";
      const message =
        "A low-confidence size prediction was made.\n\n" +
        "Customer Info:\n" +
        `- Name: ${sheet.getRange(row, 2).getValue()}\n` +
        `- Email: ${sheet.getRange(row, 3).getValue()}\n` +
        `- Height: ${height}\n` +
        `- Weight: ${weight}\n` +
        `- Body Type: ${bodyType}\n` +
        `- Fit Preference: ${fitPref}\n` +
        `- Usual Size: ${currentSize}\n\n` +
        "Prediction:\n" +
        `- Recommended Size: ${output.recommended_size}\n` +
        `- Confidence: ${output.confidence}\n` +
        `- Reason: ${output.reason}`;

      MailApp.sendEmail(emailRecipient, subject, message);
    }

  } catch (err) {
    sheet.getRange(row, 9).setValue('Error');
    sheet.getRange(row, 10).setValue('');
    sheet.getRange(row, 11).setValue(err.message);
  }
}
