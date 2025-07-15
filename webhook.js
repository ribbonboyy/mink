document.getElementById('sendBtn').addEventListener('click', async () => {
  const password = prompt("Enter staff password:");
  if (password !== "W") {
    alert("Incorrect password.");
    return;
  }

  const content = document.getElementById('chatbox').value;
  const webhookUrl = document.getElementById('webhookUrl').value;
  const sendAsEmbed = document.getElementById('embedCheckbox').checked;

  if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    alert("Invalid webhook URL.");
    return;
  }

  // Simple formatting replacements for Markdown
  let formattedMessage = content
    .replace(/\*(.*?)\*/g, '**$1**')  // *bold* -> **bold**
    .replace(/_(.*?)_/g, '*$1*');     // _italic_ -> *italic*

  // Build payload
  let payload = {};
  if (sendAsEmbed) {
    payload = {
      embeds: [
        {
          title: "New Message",
          description: formattedMessage,
          color: 0x3498db
        }
      ]
    };
  } else {
    payload = {
      content: formattedMessage
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert("Message sent successfully.");
    } else {
      alert("Failed to send message.");
    }
  } catch (error) {
    alert("Error sending message: " + error.message);
  }
});
