import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Footer } from './Footer'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SectionLink } from './components/SectionLink'
import { getExperienceBySlug } from './lib/experiences'
import { useI18n } from './i18n'

export function ExperiencePage() {
  const { t } = useI18n()
  const { slug } = useParams()
  const navigate = useNavigate()
  const experience = slug ? getExperienceBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!experience) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-forest-950 px-6 text-center">
        <p className="font-display text-3xl text-sand-100">{t('Experience not found')}</p>
        <Link to="/" className="mt-6 rounded-full bg-sand-100 px-6 py-3 text-sm font-semibold text-forest-950">
          {t('Back to home')}
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-forest-950">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link to="/" className="font-display text-xl font-semibold text-sand-100">
            The Activity Lab
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-sand-100/85 transition-colors hover:border-white/30 hover:text-sand-100 sm:inline-block"
            >
              {t('Back')}
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={experience.image} alt={t(experience.title)} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/50" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-20 md:pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-clay-300">
            {t(experience.kicker)}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-sand-100 md:text-6xl">
            {t(experience.title)}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-100/85">{t(experience.description)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {experience.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-sand-100/25 bg-white/10 px-3 py-1 text-xs font-medium text-sand-100/90"
              >
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-sand-50">{t('Overview')}</h2>
          <p className="mt-3 leading-relaxed text-sand-100/80">{t(experience.overview)}</p>
        </article>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay-300">
              {t('Typical duration')}
            </p>
            <p className="mt-2 font-display text-xl text-sand-100">{t(experience.duration)}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay-300">
              {t('Intensity')}
            </p>
            <p className="mt-2 font-display text-xl text-sand-100">{t(experience.intensity)}</p>
          </article>
        </div>

        <article className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-sand-50">{t('What is included')}</h2>
          <ul className="mt-4 space-y-3">
            {experience.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-sand-100/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" />
                {t(item)}
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-forest-900 to-forest-950 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl text-sand-100">
            {t('Ready to plan this experience?')}
          </p>
          <SectionLink
            section="contact"
            className="shrink-0 rounded-full bg-sand-100 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-white"
          >
            {t('Plan this trip')}
          </SectionLink>
        </div>
      </section>

      <Footer />
    </div>
  )
}
