/** Shown on the site (mailto links, “Prefer email?”). */
export const PUBLIC_CONTACT_EMAIL =
  import.meta.env.VITE_PUBLIC_CONTACT_EMAIL ?? 'hello@theactivitylab.com'

/** Dev-only fallback when `/api/contact` is unavailable (vite without vercel dev). */
const DEV_INBOX = import.meta.env.VITE_FORM_INBOX_EMAIL

export type ContactPayload = {
  name: string
  email: string
  destination: string
  message: string
}

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (response.ok) return

  if (import.meta.env.DEV && DEV_INBOX) {
    const devResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DEV_INBOX)}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        _subject: 'The Activity Lab — New trip inquiry',
        _template: 'table',
      }),
    })
    if (devResponse.ok) return
  }

  throw new Error('Submit failed')
}
