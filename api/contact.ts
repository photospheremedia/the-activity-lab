import type { VercelRequest, VercelResponse } from '@vercel/node'

const INBOX =
  process.env.FORM_INBOX_EMAIL ??
  process.env.VITE_FORM_INBOX_EMAIL ??
  'photospheremedia00@gmail.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, destination, message } = req.body ?? {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(INBOX)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        destination: destination || 'Not specified',
        message: message || 'No additional details',
        _subject: 'The Activity Lab — New trip inquiry',
        _template: 'table',
      }),
    })

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to send inquiry' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Failed to send inquiry' })
  }
}
