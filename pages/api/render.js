export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { script = '', voiceEnabled = true } = req.body || {};
  const lines = String(script).split('\n').map(row => {
    const idx = row.indexOf(':');
    const who = idx > -1 ? row.slice(0, idx).trim() : 'left';
    const text = idx > -1 ? row.slice(idx+1).trim() : row.trim();
    return { speaker: /mort/i.test(who) ? 'right' : 'left', text, audioUrl: voiceEnabled ? '' : '' };
  }).filter(l => l.text);
  res.status(200).json({ lines });
}
