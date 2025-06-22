async function sendEmbed() {
  const password = document.getElementById("password").value;
  if (password !== "YES") {
    alert("Incorrect password ❌");
    return;
  }

  const token = document.getElementById("botToken").value;
  const channelId = document.getElementById("channelId").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const color = document.getElementById("color").value.replace("#", "");
  const footer = document.getElementById("footer").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const image = document.getElementById("image").value;

  const embed = {
    embeds: [
      {
        title: title,
        description: description,
        color: parseInt(color, 16),
        footer: {
          text: footer
        },
        thumbnail: {
          url: thumbnail
        },
        image: {
          url: image
        }
      }
    ]
  };

  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(embed)
  });

  const result = document.getElementById("result");
  if (res.ok) {
    result.innerText = "✅ Embed sent successfully!";
    result.style.color = "lightgreen";
  } else {
    const err = await res.json();
    result.innerText = "❌ Error: " + JSON.stringify(err);
    result.style.color = "red";
  }
}
