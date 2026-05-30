import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { getExperienceBySlug } from '../lib/experiences'

type ExperienceModalProps = {
  slug: string | null
  onClose: () => void
}

export function ExperienceModal({ slug, onClose }: ExperienceModalProps) {
  const { t } = useI18n()
  const experience = slug ? getExperienceBySlug(slug) : null
  const open = Boolean(experience)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!experience) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
    >
      <button
        type="button"
        aria-label={t('Close')}
        className="absolute inset-0 bg-forest-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/12 bg-forest-950 shadow-[0_30px_90px_rgba(2,10,8,0.6)] sm:rounded-3xl">
        <div className="relative h-44 shrink-0 sm:h-52">
          <img
            src={experience.image}
            alt={t(experience.title)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-forest-950/60 text-sand-100 backdrop-blur-sm transition-colors hover:bg-forest-950/80"
            aria-label={t('Close')}
          >
            ×
          </button>
          <p className="absolute bottom-4 start-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-200">
            {t(experience.kicker)}
          </p>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          <h2 id="experience-modal-title" className="font-display text-3xl font-bold text-sand-50">
            {t(experience.title)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sand-100/85">{t(experience.description)}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {experience.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-sand-100/20 bg-white/8 px-3 py-1 text-[11px] font-medium text-sand-100/90"
              >
                {t(item)}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-100/55">
                {t('Typical duration')}
              </p>
              <p className="mt-1 text-sm font-semibold text-sand-100">{t(experience.duration)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-100/55">
                {t('Intensity')}
              </p>
              <p className="mt-1 text-sm font-semibold text-sand-100">{t(experience.intensity)}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5">
            {experience.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-sand-100/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" />
                {t(item)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/experiences/${experience.slug}`}
              onClick={onClose}
              className="rounded-full border border-sand-100/25 px-6 py-3 text-center text-sm font-semibold text-sand-100 transition-colors hover:border-sand-100/45 hover:bg-white/5"
            >
              {t('View full details')}
            </Link>
            <Link
              to={{ pathname: '/', hash: '#contact' }}
              onClick={onClose}
              className="rounded-full bg-sand-100 px-6 py-3 text-center text-sm font-semibold text-forest-950 transition-colors hover:bg-white"
            >
              {t('Plan this trip')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
