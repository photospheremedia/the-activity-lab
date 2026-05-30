import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionLink } from './components/SectionLink'
import { useI18n } from './i18n'

type FooterLink =
  | { label: string; section: string }
  | { label: string; to: string; route: true }

const FOOTER_LINKS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Guided hikes', section: 'experiences' },
      { label: 'Destinations', section: 'destinations' },
      { label: 'Photo journal', section: 'gallery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', section: 'about' },
      { label: 'Careers', to: '/careers', route: true },
      { label: 'Press kit', to: '/press', route: true },
      { label: 'Sustainability', to: '/sustainability', route: true },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', section: 'contact' },
      { label: 'Trip FAQ', to: '/faq', route: true },
      { label: 'Booking terms', to: '/booking-terms', route: true },
      { label: 'Travel insurance', to: '/travel-insurance', route: true },
    ],
  },
]

function FooterLinkItem({ link, className }: { link: FooterLink; className: string }) {
  const { t } = useI18n()

  if ('route' in link && link.route) {
    return (
      <Link to={link.to} className={className}>
        {t(link.label)}
      </Link>
    )
  }

  if ('section' in link) {
    return (
      <SectionLink section={link.section} className={className}>
        {t(link.label)}
      </SectionLink>
    )
  }

  return null
}

export function Footer() {
  const { t } = useI18n()
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="border-t border-white/10 bg-forest-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="font-display text-2xl font-semibold text-sand-100">
              The Activity Lab
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-100/65">
              {t(
                'Certified, small-group hikes and guided adventures worldwide. Real terrain, meticulously organized.',
              )}
            </p>

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

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_LINKS.map((column) => (
              <div key={column.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand-100/55">
                  {t(column.title)}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem
                        link={link}
                        className="text-sm text-sand-100/75 transition-colors hover:text-sand-100"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-sand-100/45">
          &copy; {new Date().getFullYear()} The Activity Lab. {t('All rights reserved.')}
        </p>
      </div>
    </footer>
  )
}
