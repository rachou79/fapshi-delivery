export default async function handler(req, res) {
  try {
    const apiUser = process.env.FAPSHI_API_USER;
    const apiKey = process.env.FAPSHI_API_KEY;
    const baseUrl = "https://live.fapshi.com";

    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const protocol = "https";
    const siteUrl = `${protocol}://${host}`;

    const response = await fetch(`${baseUrl}/initiate-pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiuser: apiUser,
        apikey: apiKey,
      },
      body: JSON.stringify({
        amount: 5000,
        redirectUrl: `${siteUrl}/success.html`,
        message: "Le Dernier Message Saison 1",
      }),
    });

    const data = await response.json();

    if (data.link) {
      return res.status(200).json({ success: true, paymentLink: data.link });
    } else {
      return res.status(400).json({ success: false, error: data.message || "Erreur inconnue" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
}
