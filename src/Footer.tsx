import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from './i18n'

const FOOTER_CONTACT = {
  name: 'Salim Spai',
  phoneTel: '+14387639268',
  phoneDisplay: '+1 (438) 763-9268',
} as const

export function Footer() {
  const { t } = useI18n()
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="border-t border-white/10 bg-forest-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div>
          <Link to="/" className="font-display text-2xl font-semibold text-sand-100">
            The Activity Lab
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-100/65">
            {t(
              'Certified, small-group hikes and guided adventures worldwide. Real terrain, meticulously organized.',
            )}
          </p>

          <div className="mt-6 max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-100/70">
              {t('Contact')}
            </p>
            <p className="mt-2 font-display text-lg text-sand-100">{FOOTER_CONTACT.name}</p>
            <a
              href={`tel:${FOOTER_CONTACT.phoneTel}`}
              className="mt-1 inline-block text-sm text-clay-300 transition-colors hover:text-clay-200"
            >
              {FOOTER_CONTACT.phoneDisplay}
            </a>
          </div>

          {subscribed ? (
            <div className="mt-6 max-w-sm rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <p className="font-display text-lg text-sand-100">{t('You are subscribed!')}</p>
              <p className="mt-2 text-sm text-sand-100/75">
                {t('Thanks — your first trail note arrives within a week.')}
              </p>
            </div>
          ) : (
            <form
              className="mt-6 max-w-sm"
              onSubmit={(event) => {
                event.preventDefault()
                setSubscribed(true)
              }}
            >
              <label
                htmlFor="footer-email"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-100/70"
              >
                {t('Trail notes newsletter')}
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-sand-100 placeholder:text-sand-100/40 focus:border-clay-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-sand-100 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-white"
                >
                  {t('Subscribe')}
                </button>
              </div>
              <p className="mt-2 text-xs text-sand-100/45">
                {t('One thoughtful email a month. No spam, unsubscribe anytime.')}
              </p>
            </form>
          )}
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-sand-100/45">
          &copy; {new Date().getFullYear()} The Activity Lab. {t('All rights reserved.')}
        </p>
      </div>
    </footer>
  )
}
