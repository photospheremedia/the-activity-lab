import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer } from './Footer'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SectionLink } from './components/SectionLink'
import { useI18n } from './i18n'

type InfoSection = { heading: string; body: string }

type InfoPageData = {
  slug: string
  eyebrow: string
  title: string
  intro: string
  sections: InfoSection[]
}

export const INFO_PAGES: InfoPageData[] = [
  {
    slug: 'careers',
    eyebrow: 'Company',
    title: 'Careers',
    intro:
      'We hire guides, planners, and storytellers who treat the outdoors with respect and travelers with care.',
    sections: [
      {
        heading: 'Why work with us',
        body: 'Small, senior team. Real time in the field. Fair pay, certified training budgets, and the autonomy to design trips you would want to take yourself.',
      },
      {
        heading: 'Open roles',
        body: 'We are always looking for IFMGA-track mountain guides, route planners, and guest-experience leads across Mexico and our partner regions. Send us a note and tell us what you love to guide.',
      },
    ],
  },
  {
    slug: 'press',
    eyebrow: 'Company',
    title: 'Press kit',
    intro: 'Logos, founder bios, and high-resolution imagery for journalists and partners.',
    sections: [
      {
        heading: 'About the company',
        body: 'Founded in 2011 in Oaxaca, we run certified small-group hikes and guided adventures rooted in Mexico, with trusted partners worldwide.',
      },
      {
        heading: 'Media requests',
        body: 'For interviews, imagery, or fact-checking, reach our team and we will respond within one business day with everything you need.',
      },
    ],
  },
  {
    slug: 'sustainability',
    eyebrow: 'Company',
    title: 'Sustainability',
    intro:
      'Low-impact travel that supports the communities and landscapes we move through, season after season.',
    sections: [
      {
        heading: 'Local first',
        body: 'We hire local certified guides, stay in locally owned lodges, and route trips to spread value across the regions we visit.',
      },
      {
        heading: 'Leave no trace',
        body: 'Small groups, packed-out waste, and carefully managed trail use keep wild places wild for the travelers who follow.',
      },
    ],
  },
  {
    slug: 'faq',
    eyebrow: 'Support',
    title: 'Trip FAQ',
    intro: 'Answers to the questions travelers ask us most before they book.',
    sections: [
      {
        heading: 'How fit do I need to be?',
        body: 'We grade every trip by intensity and offer routes for all skill levels — from relaxed day hikes to technical multi-day expeditions.',
      },
      {
        heading: 'How big are the groups?',
        body: 'Most trips run with 6 to 12 travelers and a certified guide, for better pace control and deeper local access.',
      },
      {
        heading: 'What is included?',
        body: 'Guiding, logistics, safety support, and a detailed trip brief. Inclusions are listed transparently before you book.',
      },
    ],
  },
  {
    slug: 'booking-terms',
    eyebrow: 'Support',
    title: 'Booking terms',
    intro: 'The essentials on deposits, changes, and cancellations — written in plain language.',
    sections: [
      {
        heading: 'Deposits & payment',
        body: 'A deposit secures your place; the balance is due before departure. We confirm every detail in writing first.',
      },
      {
        heading: 'Changes & cancellations',
        body: 'Plans change. We offer flexible rebooking windows and clear refund tiers depending on how far out you cancel.',
      },
    ],
  },
  {
    slug: 'travel-insurance',
    eyebrow: 'Support',
    title: 'Travel insurance',
    intro:
      'Adventure travel carries real risk. We require coverage so you can focus on the experience.',
    sections: [
      {
        heading: 'What we require',
        body: 'All travelers need insurance covering medical care, emergency evacuation, and trip cancellation appropriate to the activity level.',
      },
      {
        heading: 'How we help',
        body: 'We can recommend trusted providers and outline the activity details your policy should cover for your specific itinerary.',
      },
    ],
  },
  {
    slug: 'privacy',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro: 'How we collect, use, and protect the information you share with us.',
    sections: [
      {
        heading: 'What we collect',
        body: 'Only what we need to plan your trip and stay in touch — your name, contact details, and the trip preferences you provide.',
      },
      {
        heading: 'How we use it',
        body: 'We use your information to plan and run your trip and to respond to your inquiries. We never sell your personal data.',
      },
    ],
  },
  {
    slug: 'terms',
    eyebrow: 'Legal',
    title: 'Terms of Service',
    intro: 'The agreement that governs your use of our website and services.',
    sections: [
      {
        heading: 'Using our services',
        body: 'By booking with us you agree to follow guide instructions, safety briefings, and the reasonable requirements of each itinerary.',
      },
      {
        heading: 'Liability',
        body: 'Adventure travel involves inherent risks. We operate to high safety standards, and travelers accept responsibility for participating informed and prepared.',
      },
    ],
  },
  {
    slug: 'cookies',
    eyebrow: 'Legal',
    title: 'Cookie Settings',
    intro: 'We keep cookies to a minimum — just enough to make the site work well.',
    sections: [
      {
        heading: 'Essential cookies',
        body: 'These remember your language preference and keep the site running smoothly. They cannot be switched off.',
      },
      {
        heading: 'Analytics',
        body: 'We use privacy-friendly analytics to understand what travelers find useful, always in aggregate and never tied to your identity.',
      },
    ],
  },
]

export function InfoPage() {
  const { t } = useI18n()
  const { slug } = useParams()
  const page = INFO_PAGES.find((p) => p.slug === slug) ?? INFO_PAGES[0]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  return (
    <div className="min-h-screen bg-forest-950">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link to="/" className="font-display text-xl font-semibold text-sand-100">
            The Activity Lab
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-sand-100/85 transition-colors hover:border-white/30 hover:text-sand-100 sm:inline-block"
            >
              {t('Back to home')}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(212,137,106,0.22),transparent_45%)]" />
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-20 md:pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-clay-300">
            {t(page.eyebrow)}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-sand-100 md:text-6xl">
            {t(page.title)}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-100/85">{t(page.intro)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-5">
          {page.sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8"
            >
              <h2 className="font-display text-2xl font-semibold text-sand-50">
                {t(section.heading)}
              </h2>
              <p className="mt-3 leading-relaxed text-sand-100/80">{t(section.body)}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-forest-900 to-forest-950 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl text-sand-100">
            {t('Tell us where adventure should take you next.')}
          </p>
          <SectionLink
            section="contact"
            className="shrink-0 rounded-full bg-sand-100 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-white"
          >
            {t('Get in touch')}
          </SectionLink>
        </div>
      </section>

      <Footer />
    </div>
  )
}
