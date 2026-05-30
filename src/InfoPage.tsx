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
        body: 'Real time in the field. Fair pay, certified training budgets, and the autonomy to design trips you would want to take yourself.',
      },
      {
        heading: 'Open roles',
        body: 'We are always looking for IFMGA-track mountain guides, route planners, and guest-experience leads. Send us a note through the contact form and tell us what you love to guide.',
      },
    ],
  },
  {
    slug: 'press',
    eyebrow: 'Company',
    title: 'Press kit',
    intro: 'Logos and high-resolution imagery for journalists and partners.',
    sections: [
      {
        heading: 'About the company',
        body: 'Since 2011 we have run certified small-group hikes and guided adventures with trusted partners worldwide.',
      },
      {
        heading: 'Media requests',
        body: 'For interviews, imagery, or fact-checking, use the contact form and we will respond within one business day with everything you need.',
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
