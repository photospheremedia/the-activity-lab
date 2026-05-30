import type { VercelRequest, VercelResponse } from '@vercel/node'

const INBOX =
  process.env.FORM_INBOX_EMAIL ??
  process.env.VITE_FORM_INBOX_EMAIL ??
  'photospheremedia00@gmail.com'

const FROM =
  process.env.EMAIL_FROM ?? 'The Activity Lab <noreply@cryptopay.sale>'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(503).json({ error: 'Email service not configured' })
  }

  const { name, email, destination, message } = req.body ?? {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const safeName = String(name).trim()
  const safeEmail = String(email).trim()
  const safeDestination = String(destination || 'Not specified').trim()
  const safeMessage = String(message || 'No additional details').trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const subject = 'The Activity Lab — New trip inquiry'
  const html = `
    <h2>New trip inquiry</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(safeName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(safeEmail)}</td></tr>
      <tr><td><strong>Destination</strong></td><td>${escapeHtml(safeDestination)}</td></tr>
      <tr><td valign="top"><strong>Message</strong></td><td>${escapeHtml(safeMessage).replace(/\n/g, '<br>')}</td></tr>
    </table>
  `.trim()

  const text = [
    'New trip inquiry',
    '',
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Destination: ${safeDestination}`,
    `Message: ${safeMessage}`,
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [INBOX],
        reply_to: safeEmail,
        subject,
        html,
        text,
      }),
    })

    const body = (await response.json().catch(() => ({}))) as {
      message?: string
      id?: string
    }

    if (!response.ok) {
      console.error('Resend send failed', response.status, body)
      return res.status(502).json({ error: 'Failed to send inquiry' })
    }

    return res.status(200).json({ ok: true, id: body.id })
  } catch (error) {
    console.error('Contact handler error', error)
    return res.status(502).json({ error: 'Failed to send inquiry' })
  }
}
