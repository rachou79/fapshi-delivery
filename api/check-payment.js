export default async function handler(req, res) {
  const { transId } = req.query;

  if (!transId) {
    return res.status(400).json({ error: "transId manquant" });
  }

  try {
    const apiUser = process.env.FAPSHI_API_USER;
    const apiKey = process.env.FAPSHI_API_KEY;
    const baseUrl = "https://live.fapshi.com";

    const response = await fetch(`${baseUrl}/payment-status/${transId}`, {
      method: "GET",
      headers: {
        apiuser: apiUser,
        apikey: apiKey,
      },
    });

    const data = await response.json();

    if (data.status === "SUCCESSFUL") {
      return res.status(200).json({
        success: true,
        downloadUrl: process.env.DOWNLOAD_URL,
      });
    } else {
      return res.status(200).json({
        success: false,
        status: data.status || "INCONNU",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur de vérification" });
  }
}
