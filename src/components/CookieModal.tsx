import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

type CookieModalProps = {
  open: boolean
  onClose: () => void
}

const ANALYTICS_KEY = 'tal-analytics'

export function CookieModal({ open, onClose }: CookieModalProps) {
  const { t } = useI18n()
  const [analytics, setAnalytics] = useState(true)

  useEffect(() => {
    if (!open) return
    const stored = window.localStorage.getItem(ANALYTICS_KEY)
    setAnalytics(stored !== 'off')
  }, [open])

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

  if (!open) return null

  function savePreferences() {
    window.localStorage.setItem(ANALYTICS_KEY, analytics ? 'on' : 'off')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <button
        type="button"
        aria-label={t('Close')}
        className="absolute inset-0 bg-forest-950/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/12 bg-forest-950 shadow-[0_30px_80px_rgba(2,10,8,0.55)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-400/60 to-transparent" />
        <div className="p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-300">
            {t('Privacy')}
          </p>
          <h2 id="cookie-modal-title" className="font-display mt-2 text-2xl font-semibold text-sand-100">
            {t('Cookie Settings')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sand-100/75">
            {t('We keep cookies to a minimum — just enough to make the site work well.')}
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <p className="text-sm font-semibold text-sand-100">{t('Essential cookies')}</p>
                <p className="mt-1 text-xs leading-relaxed text-sand-100/60">
                  {t('These remember your language preference and keep the site running smoothly. They cannot be switched off.')}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                {t('Always on')}
              </span>
            </div>

            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20">
              <div>
                <p className="text-sm font-semibold text-sand-100">{t('Analytics')}</p>
                <p className="mt-1 text-xs leading-relaxed text-sand-100/60">
                  {t('We use privacy-friendly analytics to understand what travelers find useful, always in aggregate and never tied to your identity.')}
                </p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-clay-400"
              />
            </label>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/privacy"
              onClick={onClose}
              className="text-xs font-medium text-sand-100/55 transition-colors hover:text-sand-100"
            >
              {t('Privacy Policy')} →
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-sand-100/80 transition-colors hover:border-white/30 hover:text-sand-100"
              >
                {t('Cancel')}
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-full bg-sand-100 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-white"
              >
                {t('Save preferences')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
