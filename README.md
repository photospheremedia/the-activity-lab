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

Trip inquiries are sent through a serverless `/api/contact` route (FormSubmit on the backend).

1. Copy `.env.example` to `.env.local`
2. Set `VITE_PUBLIC_CONTACT_EMAIL` to the address shown on the site (`hello@theactivitylab.com`)
3. Set `FORM_INBOX_EMAIL` (or `VITE_FORM_INBOX_EMAIL` for local dev) to your private inbox
4. Submit a test inquiry once — FormSubmit sends a confirmation email you must accept

```bash
cp .env.example .env.local
```

## Deploy

Connected to [photospheremedia/the-activity-lab](https://github.com/photospheremedia/the-activity-lab) on Vercel.
