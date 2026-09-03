# Livraison automatique de ton zip après paiement Fapshi

## 1. Récupère ton lien Google Drive
1. Clic droit sur ton zip dans Drive → **Partager** → "Accessible à tous ceux qui ont le lien"
2. Copie l'ID dans l'URL : `https://drive.google.com/file/d/**ID_ICI**/view`
3. Ton lien direct sera : `https://drive.google.com/uc?export=download&id=ID_ICI`

## 2. Déploie ce projet sur Vercel (gratuit, ~5 min)
1. Va sur https://vercel.com et crée un compte (gratuit, avec GitHub ou email)
2. Clique sur "Add New Project"
3. Importe ce dossier (ou upload-le sur un repo GitHub d'abord, puis connecte-le)
4. Dans **Settings > Environment Variables**, ajoute :
   - `FAPSHI_API_USER` = ton apiuser Fapshi
   - `FAPSHI_API_KEY` = ton apikey Fapshi
   - `DOWNLOAD_URL` = ton lien Google Drive direct (voir étape 1)
5. Clique "Deploy"

Tu obtiens une URL du type : `https://ton-projet.vercel.app`

## 3. Configure Fapshi
Dans ton lien de paiement Fapshi (ou ton code d'initiation de paiement),
mets comme `redirectUrl` :

https://ton-projet.vercel.app/success.html?transId={transId}

⚠️ Vérifie dans la doc Fapshi si {transId} est injecté automatiquement
par eux dans le redirect, ou si tu dois le récupérer autrement.
Sinon, contacte le support Fapshi pour confirmer le format exact
de leur redirection après paiement.

## 4. Sandbox vs Live
Dans `api/check-payment.js`, la ligne :
const baseUrl = "https://live.fapshi.com";

Si tes clés API commencent par `FAK_TEST_`, remplace par :
const baseUrl = "https://sandbox.fapshi.com";

## Test
1. Fais un paiement test
2. Tu dois être redirigé vers ta page success.html
3. Le lien de téléchargement doit apparaître automatiquement
