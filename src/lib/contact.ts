/** Shown on the site (mailto links, “Prefer email?”). */
export const PUBLIC_CONTACT_EMAIL =
  import.meta.env.VITE_PUBLIC_CONTACT_EMAIL ?? 'hello@theactivitylab.xyz'

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

  throw new Error('Submit failed')
}
