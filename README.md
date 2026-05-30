# The Activity Lab

A multilingual marketing site for **The Activity Lab** — guided hikes, outdoor adventures, and immersive experiences across Mexico and worldwide.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [React Router](https://reactrouter.com/) for info and experience pages
- Google Fonts: Fraunces (display) + DM Sans (body)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Contact form

Trip inquiries are sent through `/api/contact` (Vercel serverless) via **Resend** to your private inbox.

1. Copy `.env.example` to `.env.local` for local `vercel dev`
2. In Vercel (Production): `RESEND_API_KEY`, `EMAIL_FROM`, `FORM_INBOX_EMAIL=photospheremedia00@gmail.com`
3. `VITE_PUBLIC_CONTACT_EMAIL` — address shown on the site (`hello@theactivitylab.xyz`)

```bash
cp .env.example .env.local
vercel dev   # runs the API route locally with env from .env.local
```

## Deploy

Connected to [photospheremedia/the-activity-lab](https://github.com/photospheremedia/the-activity-lab) on Vercel at [theactivitylab.xyz](https://theactivitylab.xyz).

## Domain & email (Porkbun)

DNS for **theactivitylab.xyz** is on Porkbun. Web records point at Vercel; email uses Porkbun’s free forwarding (`hello@theactivitylab.xyz` → your private inbox).

```bash
cp .env.porkbun.example .env.porkbun   # or symlink ../crypto-pay/.env.porkbun
npm run dns:plan                       # audit MX/SPF + Vercel records
npm run dns:apply                      # create missing records via Porkbun API
```

Then in [Porkbun Domain Management](https://porkbun.com/account/domains) → **theactivitylab.xyz** → Email (envelope icon), create:

- **hello** → your private Gmail inbox

The Porkbun API manages DNS (MX/SPF) but not forward rules — those are set in the dashboard once per address.
