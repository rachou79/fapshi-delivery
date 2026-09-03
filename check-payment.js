// api/check-payment.js
// Cette fonction tourne côté serveur sur Vercel.
// Elle vérifie le statut d'un paiement Fapshi et renvoie le lien
// de téléchargement UNIQUEMENT si le paiement est confirmé.

export default async function handler(req, res) {
  const { transId } = req.query;

  if (!transId) {
    return res.status(400).json({ error: "transId manquant" });
  }

  try {
    const apiUser = process.env.FAPSHI_API_USER;
    const apiKey = process.env.FAPSHI_API_KEY;

    // ⚠️ Si ta clé commence par FAK_TEST_, utilise sandbox.fapshi.com
    // Si elle commence par FAK_ (sans TEST), utilise live.fapshi.com
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
      // Paiement confirmé -> on renvoie le lien de téléchargement
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
