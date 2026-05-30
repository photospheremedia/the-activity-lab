# Wild Traverse

A one-page cover website for **Wild Traverse** — a travel and adventure business offering hikes, outdoor activities, and guided experiences around the world, with a focus on Mexico.

## Brand name

**Wild Traverse** was chosen based on adventure-travel naming best practices:

- **Short & memorable** (2 words, easy to say and spell)
- **Evokes motion & terrain** — "traverse" signals crossing landscapes and pushing boundaries
- **No geographic lock-in** — works globally while Mexico can be featured as a signature region
- **Domain-friendly** — clean for `wildtraverse.com` or similar

### Alternatives considered

| Name | Vibe |
|------|------|
| Camino Wild | Spanish "path/journey" nod to Latin America |
| Ridge & River | Terrain-forward, classic adventure |
| Summit & Soul | Emotional, experience-focused |
| Peregrine Path | Premium, evocative |

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
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

## Sections

1. **Hero** — Full-viewport immersive header with CTAs
2. **Experiences** — Hikes, outdoor activities, immersive journeys
3. **Destinations** — Mexico (signature), Central America, worldwide
4. **About** — Stats and value proposition
5. **Testimonial** — Social proof
6. **Contact** — Inquiry form
7. **Footer**

## Contact form

Trip inquiries are sent via [FormSubmit.co](https://formsubmit.co/) (no backend required).

1. Copy `.env.example` to `.env`
2. Set `VITE_CONTACT_EMAIL` to your real inbox
3. Submit a test inquiry once — FormSubmit sends a confirmation email you must accept

```bash
cp .env.example .env
```

## Next steps

- Replace Unsplash placeholder images with your own photography
- Connect the contact form to email (Resend, Formspree, etc.)
- Register domain and deploy (Vercel, Netlify, Cloudflare Pages)
- Add real social links and booking integration when ready
