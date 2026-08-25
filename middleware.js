// Protezione temporanea del sito in costruzione (Vercel Edge Middleware).
// Le credenziali non sono in questo file: si impostano come variabili
// d'ambiente SITE_USER e SITE_PASSWORD nel progetto Vercel (Settings →
// Environment Variables), perché il repository è pubblico su GitHub.
// Finché quelle due variabili non sono impostate, il sito resta raggiungibile
// normalmente: nessun rischio di restare chiusi fuori per errore.

export default function middleware(request) {
  const utente = process.env.SITE_USER;
  const password = process.env.SITE_PASSWORD;
  if (!utente || !password) return;

  const intestazione = request.headers.get('authorization');
  if (intestazione?.startsWith('Basic ')) {
    const [u, p] = atob(intestazione.slice(6)).split(':');
    if (u === utente && p === password) return;
  }

  return new Response('Accesso riservato: il sito è ancora in costruzione.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Dietro il testo"' },
  });
}
