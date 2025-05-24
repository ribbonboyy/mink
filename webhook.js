document.getElementById('sendBtn').addEventListener('click', async () => {
  const password = prompt("Enter staff password:");
  if (password !== "JIZZCORDSTAFFPASSWORD") {
    alert("Incorrect password.");
    return;
  }

  const content = document.getElementById('chatbox').value;
  const webhookUrl = document.getElementById('webhookUrl').value;

  if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    alert("Invalid webhook URL.");
    return;
  }

  // Simple formatting replacements for Markdown
  let formattedMessage = content
    .replace(/\*(.*?)\*/g, '**$1**')  // *bold* -> **bold**
    .replace(/_(.*?)_/g, '*$1*');     // _italic_ -> *italic*

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: formattedMessage })
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
