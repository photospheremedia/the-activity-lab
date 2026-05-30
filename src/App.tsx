import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './lib/motion'
import { scrollToContact, scrollToSection } from './lib/scroll'
import { EXPERIENCE_DETAILS } from './lib/experiences'
import { useI18n } from './i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { InfoPage, INFO_PAGES } from './InfoPage'
import { ExperiencePage } from './ExperiencePage'
import { Footer } from './Footer'
import { ExperienceModal } from './components/ExperienceModal'
import { SectionLink } from './components/SectionLink'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@theactivitylab.com'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function PlanTripButton({
  className,
  children,
  onNavigate,
}: {
  className: string
  children: ReactNode
  onNavigate?: () => void
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => scrollToContact(onNavigate)}
    >
      {children}
    </button>
  )
}

const NAV_LINKS = [
  { href: '#experiences', label: 'Activities' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

const EXPERIENCES = EXPERIENCE_DETAILS

const DESTINATIONS = [
  {
    region: 'Mexico',
    highlight: true,
    kicker: 'Home base',
    blurb:
      'Our backyard — volcanic summits, copper canyons, and highland trails we know intimately, season by season.',
    places: ['Oaxaca Highlands', 'Copper Canyon', 'Volcán Iztaccíhuatl', 'Chiapas Jungle'],
    image:
      'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1600&q=80',
  },
  {
    region: 'Central America',
    highlight: false,
    kicker: 'Nearby frontiers',
    blurb: 'Cloud forests and active volcanoes a short hop from our Mexico hubs.',
    places: ['Guatemala Volcanoes', 'Costa Rica Cloud Forest', 'Panama Highlands'],
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    region: 'Worldwide',
    highlight: false,
    kicker: 'Global icons',
    blurb: 'Bucket-list ranges run with vetted local partners.',
    places: ['Patagonia', 'Nepal Himalaya', 'Iceland Highlands', 'Morocco Atlas'],
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
  },
]

const STATS = [
  { value: '40+', label: 'Guided expeditions' },
  { value: '12', label: 'Countries & counting' },
  { value: '2,500+', label: 'Adventurers led' },
  { value: '15', label: 'Years of expertise' },
]

const HERO_BACKDROPS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2560&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=80',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2560&q=80',
]

const TRUST_BADGES = ['Hikes and trekking', 'Outdoor activities', 'Guided experiences']

const PROFESSIONAL_PRIORITIES = [
  {
    title: 'Time-efficient planning',
    detail: 'One planning call, fast route options, and a clear next step within 24 hours.',
  },
  {
    title: 'Safety and duty of care',
    detail: 'Certified local guides, risk-aware itineraries, and 24/7 on-trip support.',
  },
  {
    title: 'Small-group quality',
    detail: 'Intimate groups for better pace control, less waiting, and deeper local access.',
  },
  {
    title: 'Transparent trip scope',
    detail: 'Visible inclusions, activity intensity, and realistic seasonal guidance.',
  },
]

const TRUST_SIGNALS = [
  'Response within 1 business day',
  'Small groups, typically 6-12 travelers',
  'Transparent planning and inclusions',
]

const JOURNEY_STEPS = [
  {
    title: 'Discover',
    meta: '3-minute intake',
    description: 'Tell us your preferred terrain, pace, and comfort level in 3 minutes.',
  },
  {
    title: 'Design',
    meta: '48-hour turnaround',
    description: 'Our route team drafts a cinematic day-by-day itinerary with weather windows.',
  },
  {
    title: 'Deliver',
    meta: 'Trip-ready brief',
    description: 'You get a ready-to-run trip brief with logistics, safety, and local contacts.',
  },
]

const ABOUT_CREDENTIALS = ['Since 2011', 'Oaxaca-based', 'Certified guides', '2,500+ travelers']

const TEAM = [
  {
    name: 'Lucía Moreno',
    role: 'Founder & Lead Guide',
    location: 'Oaxaca, Mexico',
    bio: 'Built the company after 12 seasons guiding Mexico\u2019s highland volcanoes. IFMGA-certified.',
    tags: ['High-altitude', 'Route design'],
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Daniel Reyes',
    role: 'Head of Route Design',
    location: 'Mexico City, Mexico',
    bio: 'Maps every itinerary day-by-day, balancing weather windows, terrain, and recovery.',
    tags: ['Logistics', 'Weather windows'],
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kenji Watanabe',
    role: 'Lead Mountain Guide',
    location: 'Patagonia partner base',
    bio: 'Leads our toughest alpine traverses with a calm, safety-first approach to big terrain.',
    tags: ['Alpine', 'Technical climbs'],
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sofía Navarro',
    role: 'Guest Experience Lead',
    location: 'Guatemala City, Guatemala',
    bio: 'Your point of contact from first call to summit day, handling every detail end to end.',
    tags: ['Concierge', 'Local culture'],
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
]


const TESTIMONIALS = [
  {
    quote:
      'The route planning felt like having a production team behind our trek. Every transition between locations was seamless.',
    name: 'Nadia R.',
    trip: 'Patagonia Traverse',
  },
  {
    quote:
      'The Activity Lab gave us a premium expedition feel without tourist chaos. It felt precise and personal.',
    name: 'Derek C.',
    trip: 'Oaxaca + Chiapas',
  },
  {
    quote:
      'From first call to summit day, every detail was thought through. The visual itinerary was insanely useful.',
    name: 'Amelia V.',
    trip: 'Copper Canyon Loop',
  },
]

const GALLERY_IMAGES = [
  {
    title: 'Alpine dawn ascents',
    location: 'Patagonia',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Jungle river crossings',
    location: 'Chiapas, Mexico',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Volcanic ridge trekking',
    location: 'Central Mexico',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Canyon sunset camps',
    location: 'Copper Canyon',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Highland trail mornings',
    location: 'Oaxaca, Mexico',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Glacier valley routes',
    location: 'Iceland',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80',
  },
]

function Nav() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 48)

      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(y / max, 1) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }

      if (y > lastY && y > 280) setHidden(true)
      else setHidden(false)
      lastY = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  const offscreen = !mounted || (hidden && !menuOpen)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
        offscreen ? '-translate-y-[160%]' : 'translate-y-0'
      }`}
    >
      <div className="h-[2px] w-full bg-sand-100/5">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-clay-400 via-clay-300 to-sand-100"
        />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <nav
        className={`mt-4 flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 sm:px-6 sm:py-3.5 ${
          scrolled || menuOpen
            ? 'border-white/12 bg-forest-950/75 shadow-[0_10px_40px_rgba(6,18,15,0.35)] backdrop-blur-xl'
            : 'border-white/12 bg-forest-950/40 backdrop-blur-md'
        }`}
      >
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-sand-100 transition-opacity hover:opacity-80"
        >
          The Activity Lab
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-sand-100/75 transition-colors hover:text-sand-100"
              >
                {t(link.label)}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-clay-300 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <PlanTripButton className="rounded-full bg-sand-100 px-5 py-2 text-sm font-semibold text-forest-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(245,240,232,0.25)]">
              {t('Plan a trip')}
            </PlanTripButton>
          </li>
        </ul>

        <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher />
        <button
          type="button"
          className="flex flex-col gap-1.5"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-6 bg-sand-100 transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-sand-100 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-sand-100 transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-forest-950/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-sand-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
            <li>
              <PlanTripButton
                className="inline-block rounded-full bg-sand-100 px-5 py-2.5 text-sm font-semibold text-forest-950"
                onNavigate={() => setMenuOpen(false)}
              >
                {t('Plan a trip')}
              </PlanTripButton>
            </li>
          </ul>
        </div>
      )}
      </div>
    </header>
  )
}

function Hero() {
  const { t } = useI18n()
  const heroRef = useRef<HTMLElement | null>(null)
  const backdropRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!heroRef.current) return

    const root = heroRef.current

    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]')
      const ambientLights = gsap.utils.toArray<HTMLElement>('[data-hero-ambient]')
      const headlineLines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
      const divider = root.querySelector<HTMLElement>('[data-hero-divider]')
      const content = root.querySelector<HTMLElement>('[data-hero-content]')

      if (prefersReducedMotion()) {
        gsap.set([revealItems, headlineLines], { opacity: 1, y: 0, yPercent: 0 })
        return
      }

      gsap.set(revealItems, { opacity: 0, y: 28 })
      gsap.set(headlineLines, { yPercent: 115 })
      gsap.set(backdropRefs.current, {
        opacity: (index) => (index === 0 ? 1 : 0),
        scale: 1.08,
      })

      const introTimeline = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(
          headlineLines,
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.12,
          },
          0.1,
        )
        .to(
          revealItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.35,
        )

      if (divider) {
        gsap.set(divider, { scaleX: 0 })
        introTimeline.to(divider, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.5)
      }

      // Cinematic depth: content drifts up and fades as the hero leaves.
      if (content) {
        gsap.to(content, {
          yPercent: -14,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Mouse parallax (desktop, fine pointers only).
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (pointer: fine)', () => {
        const cards = root.querySelector<HTMLElement>('[data-hero-cards]')
        if (!cards) return undefined
        const xToCards = gsap.quickTo(cards, 'x', { duration: 0.7, ease: 'power3' })
        const xToBg = gsap.quickTo(backdropRefs.current, 'xPercent', { duration: 1, ease: 'power3' })

        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5
          xToCards(nx * 30)
          xToBg(nx * -2.2)
        }

        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })

      ambientLights.forEach((light, index) => {
        gsap.to(light, {
          x: index === 0 ? 34 : -32,
          y: index === 0 ? -26 : 28,
          scale: index === 0 ? 1.12 : 1.16,
          duration: index === 0 ? 7.6 : 8.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      const transitionTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.25 })

      HERO_BACKDROPS.forEach((_, index) => {
        const current = backdropRefs.current[index]
        const next = backdropRefs.current[(index + 1) % HERO_BACKDROPS.length]
        if (!current || !next) return

        transitionTimeline
          .to(current, {
            scale: 1.16,
            duration: 5.2,
            ease: 'sine.inOut',
          })
          .to(
            current,
            {
              opacity: 0,
              duration: 1.15,
              ease: 'power2.inOut',
            },
            '-=1.15',
          )
          .fromTo(
            next,
            {
              opacity: 0,
              scale: 1.07,
            },
            {
              opacity: 1,
              scale: 1.13,
              duration: 1.15,
              ease: 'power2.inOut',
            },
            '<',
          )
      })
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
      {HERO_BACKDROPS.map((image, index) => (
        <div
          key={image}
          ref={(el) => {
            backdropRefs.current[index] = el
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div
        data-hero-ambient
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-clay-400/35 blur-3xl"
      />
      <div
        data-hero-ambient
        className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-sand-100/18 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,137,106,0.25),transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/35 via-forest-950/72 to-forest-950" />

      <div
        data-hero-content
        className="relative mx-auto mt-20 grid w-full max-w-6xl gap-10 px-6 pb-24 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
      >
        <div>
          <p
            data-hero-reveal
            className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-clay-200"
          >
            <span data-hero-divider className="inline-block h-px w-10 origin-left bg-clay-300" />
            {t('Travel and Adventure')}
          </p>
          <h1 className="font-display max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight text-sand-100 md:text-7xl">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                {t('Bespoke adventure journeys,')}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                {t('crafted for real explorers.')}
              </span>
            </span>
          </h1>
          <p data-hero-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/88">
            {t(
              'From volcanic summits in Mexico to iconic trails worldwide, The Activity Lab designs guided hikes and outdoor experiences that balance challenge, safety, and streamlined logistics for professionals with limited time.',
            )}
          </p>
          <div data-hero-reveal className="mt-9 flex flex-wrap gap-4">
            <PlanTripButton className="rounded-full bg-sand-100 px-8 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-white">
              {t('Start your adventure')}
            </PlanTripButton>
            <a
              href="#experiences"
              className="rounded-full border border-sand-100/60 px-8 py-3.5 text-sm font-semibold text-sand-100 transition-colors hover:border-sand-100 hover:bg-white/15"
            >
              {t('See activities')}
            </a>
          </div>
          <div data-hero-reveal className="mt-10 flex flex-wrap gap-3">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-sand-100/35 bg-white/18 px-3 py-1 text-xs font-medium text-sand-100/90 backdrop-blur-sm"
              >
                {t(badge)}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-reveal data-hero-cards className="grid gap-4 [will-change:transform]">
          <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors hover:bg-white/15">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-100/75">{t('Featured trip')}</p>
            <p className="font-display mt-3 text-3xl text-sand-100">{t('Mexico Highlands Traverse')}</p>
            <p className="mt-2 text-sm text-sand-100/88">{t('Six days of guided ridge hikes, canyon routes, and cultural immersion')}</p>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/12 bg-forest-900/55 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-sand-100/70">{t('Destinations')}</p>
              <p className="mt-2 font-display text-4xl text-clay-300">12+</p>
              <p className="text-xs text-sand-100/80">{t('Mexico and worldwide locations')}</p>
            </article>
            <article className="rounded-2xl border border-white/12 bg-forest-900/55 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-sand-100/70">{t('Guided trips')}</p>
              <p className="mt-2 font-display text-4xl text-clay-300">40+</p>
              <p className="text-xs text-sand-100/80">{t('Curated hikes and active expeditions')}</p>
            </article>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <a
          href="#experiences"
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-sand-100/75"
          aria-label="Scroll to experiences"
        >
          {t('Scroll')}
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}

function ProfessionalFocus() {
  const { t } = useI18n()
  return (
    <section className="scroll-mt-24 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">
              {t('Built for professionals')}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-forest-950 md:text-5xl">
              {t('What serious travelers actually optimize for.')}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-950/78">
            {t(
              'Research-backed priorities: less friction, better safety, smaller groups, and clearer planning confidence before booking.',
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PROFESSIONAL_PRIORITIES.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-2xl border border-forest-950/10 bg-sand-50 p-6"
            >
              <h3 className="font-display text-2xl text-forest-950">{t(item.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-950/80">{t(item.detail)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const EXPEDITION_CHAPTERS = [
  {
    tag: 'Chapter 01 — Basecamp',
    title: 'Wake up inside the range.',
    copy: 'Acclimatize at altitude with certified local guides as first light moves across camp.',
    video: 'https://videos.pexels.com/video-files/857195/857195-hd_1280_720_25fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Chapter 02 — The approach',
    title: 'Move between landscapes.',
    copy: 'Valleys, ridgelines, and the quiet roads that connect one horizon to the next.',
    video: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Chapter 03 — New horizons',
    title: 'Every summit opens the next.',
    copy: 'From snowline to coastline, each expedition is designed to lead into the one after it.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
  },
] as const

const TRAIL_VIEWBOX = { w: 1000, h: 600 }

function JourneyFilm() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const context = gsap.context(() => {
      const stage = root.querySelector<HTMLElement>('[data-stage]')
      const videos = gsap.utils.toArray<HTMLVideoElement>('[data-chapter-video]')
      const trailPath = root.querySelector<SVGPathElement>('[data-trail-path]')
      const marker = root.querySelector<HTMLElement>('[data-trail-marker]')
      const progressBar = root.querySelector<HTMLElement>('[data-film-progress]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-film-reveal]')

      gsap.from(reveals, {
        opacity: 0,
        yPercent: 60,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: stage, start: 'top 70%', once: true },
      })

      if (!stage || !trailPath || !marker) return

      const pathLength = trailPath.getTotalLength()
      const svg = trailPath.ownerSVGElement
      let viewW = svg?.clientWidth ?? stage.clientWidth
      let viewH = svg?.clientHeight ?? stage.clientHeight

      const setX = gsap.quickSetter(marker, 'x', 'px')
      const setY = gsap.quickSetter(marker, 'y', 'px')
      gsap.set(marker, { xPercent: -50, yPercent: -50 })

      const placeMarker = (lengthAlong: number) => {
        const point = trailPath.getPointAtLength(lengthAlong)
        setX((point.x / TRAIL_VIEWBOX.w) * viewW)
        setY((point.y / TRAIL_VIEWBOX.h) * viewH)
      }

      gsap.set(trailPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
      placeMarker(0)

      if (prefersReducedMotion()) {
        gsap.set(trailPath, { strokeDashoffset: 0 })
        gsap.set(videos.slice(1), { opacity: 0 })
        gsap.set(progressBar, { scaleX: 1 })
        placeMarker(pathLength)
        return
      }

      const handleResize = () => {
        viewW = svg?.clientWidth ?? stage.clientWidth
        viewH = svg?.clientHeight ?? stage.clientHeight
      }
      window.addEventListener('resize', handleResize)

      const progress = { value: 0 }
      const advanceChapter = () => {
        const value = progress.value
        placeMarker(pathLength * value)
        const idx = value < 0.34 ? 0 : value < 0.7 ? 1 : 2
        setActiveChapter(idx)
      }

      const mm = gsap.matchMedia()

      // Mobile: scroll-linked (no pin) experience — robust against viewport resizing.
      mm.add('(max-width: 599px)', () => {
        gsap.set(videos, { opacity: (i) => (i === 0 ? 1 : 0) })
        progress.value = 0

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top 80%',
            end: 'bottom 25%',
            scrub: 0.5,
          },
        })

        timeline.to(trailPath, { strokeDashoffset: 0, duration: 3 }, 0)
        timeline.to(progressBar, { scaleX: 1, duration: 3 }, 0)
        timeline.to(progress, { value: 1, duration: 3, onUpdate: advanceChapter }, 0)

        videos.forEach((video, index) => {
          if (index > 0) {
            timeline.to(videos[index - 1], { opacity: 0, duration: 0.6 }, index)
            timeline.to(video, { opacity: 1, duration: 0.6 }, index)
          }
        })

        return () => {
          gsap.set(videos, { clearProps: 'opacity' })
        }
      })

      // Desktop: pinned cinematic film with autoplaying video chapters.
      mm.add('(min-width: 600px)', () => {
        videos.forEach((video) => {
          video.play().catch(() => {})
        })
        progress.value = 0

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        timeline.to(trailPath, { strokeDashoffset: 0, duration: 3 }, 0)
        timeline.to(progressBar, { scaleX: 1, duration: 3 }, 0)
        timeline.to(progress, { value: 1, duration: 3, onUpdate: advanceChapter }, 0)

        videos.forEach((video, index) => {
          gsap.set(video, { opacity: index === 0 ? 1 : 0, scale: 1.08 })
          timeline.to(video, { scale: 1, duration: 3 }, 0)
          if (index > 0) {
            timeline.to(videos[index - 1], { opacity: 0, duration: 0.6 }, index)
            timeline.to(video, { opacity: 1, duration: 0.6 }, index)
          }
        })

        return () => {
          gsap.set(videos, { clearProps: 'opacity,scale' })
        }
      })

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, sectionRef)

    return () => context.revert()
  }, [])

  const chapter = EXPEDITION_CHAPTERS[activeChapter]

  return (
    <section ref={sectionRef} className="relative bg-forest-950">
      <div data-stage className="relative min-h-[100svh] w-full overflow-hidden">
        {EXPEDITION_CHAPTERS.map((item, index) => (
          <video
            key={item.video}
            data-chapter-video
            className="absolute inset-0 h-full w-full object-cover"
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="auto"
            style={{ opacity: index === 0 ? 1 : 0 }}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/12 to-forest-950/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/12 to-transparent" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_2px_6px_rgba(6,18,15,0.65)]"
          viewBox="0 0 1000 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            data-trail-path
            d="M60 540 C 240 500 320 410 470 392 C 640 372 720 250 940 96"
            stroke="rgba(245, 240, 232, 0.95)"
            strokeWidth="3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Frosted legibility layer: separates the bright trail from the white headline. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[84%] bg-gradient-to-t from-forest-950/90 via-forest-950/45 to-transparent md:backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black_48%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_48%,transparent)]" />

        <span
          data-trail-marker
          className="pointer-events-none absolute left-0 top-0 z-[6] h-4 w-4 rounded-full bg-sand-50 shadow-[0_0_0_7px_rgba(212,137,106,0.22)] ring-2 ring-clay-300"
        />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-12 px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-center justify-between gap-4">
            <p
              data-film-reveal
              className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-100/85"
            >
              {t('Expedition film')}
            </p>
            <span
              data-film-reveal
              className="rounded-full border border-sand-100/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-100 backdrop-blur-sm"
            >
              {t('Scroll to travel')}
            </span>
          </div>

          <div className="max-w-3xl">
            <div
              key={activeChapter}
              className="film-chapter-in"
              style={{ textShadow: '0 2px 22px rgba(6,18,15,0.55)' }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-200">
                {t(chapter.tag)}
              </p>
              <h2 className="font-display mt-3 text-4xl font-bold leading-[1.04] tracking-tight text-sand-50 md:text-6xl">
                {t(chapter.title)}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/90">
                {t(chapter.copy)}
              </p>
            </div>

            <div data-film-reveal className="mt-8 grid gap-3 sm:grid-cols-3">
              {EXPEDITION_CHAPTERS.map((item, index) => (
                <div
                  key={item.tag}
                  className={`rounded-2xl border p-4 backdrop-blur-sm transition-colors duration-300 ${
                    index === activeChapter
                      ? 'border-clay-300/70 bg-white/15'
                      : 'border-sand-100/15 bg-white/5'
                  }`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sand-100/70">
                    {`0${index + 1}`}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-sand-50">{t(item.title)}</span>
                </div>
              ))}
            </div>

            <div
              data-film-reveal
              className="mt-8 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-sand-100/20"
            >
              <div
                data-film-progress
                className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-clay-300 to-sand-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experiences() {
  const { t } = useI18n()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  return (
    <section id="experiences" className="scroll-mt-24 bg-sand-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">
              {t('What we offer')}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-forest-950 md:text-5xl">
              {t('Signature experiences for every style of adventurer.')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-forest-950/82">
              {t(
                'Join day hikes, multi-day trekking routes, and technical outdoor activities led by expert guides and tailored to your pace.',
              )}
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-950/78">
            {t('Every itinerary is personalized, safety-first, and built around meaningful local insight.')}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={exp.title}
              data-reveal
              role="button"
              tabIndex={0}
              onClick={() => setActiveSlug(exp.slug)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActiveSlug(exp.slug)
                }
              }}
              className="group relative isolate flex min-h-[420px] cursor-pointer overflow-hidden rounded-3xl ring-1 ring-forest-950/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(15,31,26,0.24)] md:min-h-[520px]"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/5" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span
                aria-hidden
                className="absolute right-6 top-5 font-display text-6xl font-bold leading-none text-sand-100/15 transition-colors duration-500 group-hover:text-sand-100/25"
              >
                {`0${index + 1}`}
              </span>

              <div className="relative flex h-full w-full flex-col justify-end p-7 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-200">
                  {t(exp.kicker)}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold text-sand-50 md:text-3xl">
                  {t(exp.title)}
                </h3>
                <span className="mt-3 block h-px w-10 origin-left bg-clay-300 transition-transform duration-500 group-hover:scale-x-[2.4]" />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-sand-100/85">
                  {t(exp.description)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.meta.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-sand-100/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-sand-100/90 backdrop-blur-sm"
                    >
                      {t(item)}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand-50">
                  {t('Explore')}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
                  >
                    &gt;
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ExperienceModal slug={activeSlug} onClose={() => setActiveSlug(null)} />
    </section>
  )
}

function Destinations() {
  const { t } = useI18n()
  return (
    <section id="destinations" className="scroll-mt-24 bg-forest-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-400">
              {t('Destinations')}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-sand-100 md:text-5xl">
              {t('Mexico at the core, the world within reach.')}
            </h2>
          </div>
          <p className="max-w-sm text-sand-100/82">
            {t(
              "We specialize in Mexico's most compelling landscapes while also curating guided journeys across globally renowned adventure regions.",
            )}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {DESTINATIONS.map((dest, index) => (
            <article
              key={dest.region}
              data-reveal
              className={`group relative isolate overflow-hidden rounded-3xl ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(2,10,8,0.5)] ${
                index === 0 ? 'min-h-[440px] md:col-span-2 md:min-h-[460px]' : 'min-h-[360px]'
              }`}
            >
              <img
                src={dest.image}
                alt={dest.region}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 -z-10 ${
                  index === 0
                    ? 'bg-[linear-gradient(to_top,rgba(15,31,26,0.97)_0%,rgba(15,31,26,0.82)_44%,rgba(15,31,26,0.42)_68%,rgba(15,31,26,0)_100%)] md:bg-[linear-gradient(to_right,rgba(15,31,26,0.95)_0%,rgba(15,31,26,0.7)_45%,rgba(15,31,26,0.25)_75%,rgba(15,31,26,0)_100%)]'
                    : 'bg-[linear-gradient(to_top,rgba(15,31,26,0.97)_0%,rgba(15,31,26,0.82)_44%,rgba(15,31,26,0.42)_68%,rgba(15,31,26,0)_100%)]'
                }`}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span
                aria-hidden
                className="absolute right-6 top-5 font-display text-6xl font-bold leading-none text-sand-100/15 transition-colors duration-500 group-hover:text-sand-100/25"
              >
                {`0${index + 1}`}
              </span>

              <div className="relative flex h-full flex-col justify-end p-7 md:max-w-xl md:p-10">
                <p
                  className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-200"
                  style={{ textShadow: '0 1px 12px rgba(7,16,13,0.6)' }}
                >
                  {t(dest.kicker)}
                  {dest.highlight && (
                    <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[10px] tracking-[0.16em] text-forest-950">
                      {t('Featured')}
                    </span>
                  )}
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold text-sand-100 md:text-4xl">
                  {t(dest.region)}
                </h3>
                <span className="mt-3 block h-px w-10 origin-left bg-clay-300 transition-transform duration-500 group-hover:scale-x-[2.4]" />
                <p
                  className="mt-4 max-w-md text-sm leading-relaxed text-sand-100/85"
                  style={{ textShadow: '0 1px 14px rgba(7,16,13,0.55)' }}
                >
                  {t(dest.blurb)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {dest.places.map((place) => (
                    <li
                      key={place}
                      className="rounded-full border border-sand-100/25 bg-white/10 px-3 py-1 text-[13px] text-sand-100/90 backdrop-blur-sm transition-colors duration-300 group-hover:border-sand-100/40"
                    >
                      {t(place)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <SectionLink
                    section="contact"
                    className="inline-flex items-center gap-2 rounded-full border border-sand-100/45 bg-white/14 px-4 py-2 text-sm font-semibold text-sand-100 backdrop-blur-sm transition-all duration-300 hover:bg-white/24"
                  >
                    {t('Plan this trip')}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    >
                      -&gt;
                    </span>
                  </SectionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisualGallery() {
  const { t } = useI18n()
  const galleryRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!galleryRef.current) return

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-gallery-card]')
      const images = gsap.utils.toArray<HTMLElement>('[data-gallery-image]')

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      gsap.set(cards, { willChange: 'transform, opacity' })
      gsap.set(images, { willChange: 'transform' })

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          clipPath: 'inset(18% 0 16% 0 round 1rem)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0% 0 round 1rem)',
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 72%',
            once: true,
          },
        },
      )

      cards.forEach((card, index) => {
        const image = images[index]
        if (!image) return

        gsap.fromTo(
          image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, galleryRef)

    return () => context.revert()
  }, [])

  return (
    <section id="gallery" ref={galleryRef} className="scroll-mt-24 bg-sand-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">{t('Photo journal')}</p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-forest-950 md:text-5xl">
              {t('More places. More visual depth.')}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-950/78">
            {t(
              'A premium gallery strip inspired by modern cover pages, with cinematic parallax and richer destination storytelling.',
            )}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((item, index) => (
            <article
              key={item.title}
              data-gallery-card
              className={`group relative overflow-hidden rounded-2xl border border-forest-950/10 bg-forest-950 ${
                index % 3 === 0 ? 'sm:row-span-2 sm:min-h-[440px]' : 'min-h-[260px]'
              }`}
            >
              <img
                data-gallery-image
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/92 via-forest-950/28 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-sand-100/82">
                  {t(item.location)}
                </p>
                <h3 className="font-display mt-2 text-2xl leading-tight text-sand-100">{t(item.title)}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="scroll-mt-24 bg-sand-100 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">
              {t('About')}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-forest-950 md:text-5xl">
              {t('Local expertise, global adventure standards.')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-forest-950/82">
              {t(
                'We build active travel experiences for people who want more than sightseeing — real movement, real terrain, and memorable places.',
              )}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-forest-950/82">
              {t(
                'With deep roots in Mexico and trusted partners worldwide, we deliver guided journeys that feel both authentic and meticulously organized.',
              )}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ABOUT_CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-forest-950/12 bg-white px-4 py-2 text-sm font-medium text-forest-950/80 shadow-sm"
                >
                  {t(item)}
                </li>
              ))}
            </ul>

            <div className="group relative mt-10 overflow-hidden rounded-3xl ring-1 ring-forest-950/10">
              <img
                src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80"
                alt="A guided trekker on a high mountain ridge trail"
                loading="lazy"
                className="aspect-[16/11] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay-200">
                    {t('On the trail')}
                  </p>
                  <p className="font-display mt-1 text-xl text-sand-50">
                    {t('Real terrain, expertly guided.')}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-md">
                  <p className="font-display text-2xl leading-none text-sand-50">98%</p>
                  <p className="mt-1 text-[11px] font-medium text-sand-100/85">{t('Would return')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-2 md:pl-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">
              {t('How it works')}
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-forest-950 md:text-3xl">
              {t('Three phases from idea to trailhead.')}
            </h3>

            <ol className="relative mt-8 space-y-5">
              <span
                aria-hidden
                className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-clay-400 via-clay-400/40 to-forest-950/10"
              />
              {JOURNEY_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  data-reveal
                  className="group relative flex items-stretch gap-5"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-500 font-display text-lg font-semibold text-sand-50 shadow-[0_8px_22px_rgba(135,67,42,0.35)] ring-4 ring-sand-100 transition-transform duration-300 group-hover:scale-110">
                    {index + 1}
                  </span>
                  <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-950/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_45px_rgba(15,31,26,0.12)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-700">
                        {t('Phase')} 0{index + 1}
                      </p>
                      <span className="rounded-full bg-sand-50 px-2.5 py-1 text-[11px] font-medium text-forest-950/70 ring-1 ring-forest-950/8">
                        {t(step.meta)}
                      </span>
                    </div>
                    <p className="font-display mt-2 text-2xl text-forest-950">{t(step.title)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-forest-950/80">
                      {t(step.description)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Team() {
  const { t } = useI18n()
  return (
    <section id="team" className="scroll-mt-24 bg-sand-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">{t('Our team')}</p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-forest-950 md:text-5xl">
              {t('The people behind every expedition.')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-forest-950/82">
              {t(
                'A small, certified crew of guides and planners who live in the regions we travel — and obsess over the details so you do not have to.',
              )}
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-forest-950/78">
            {t(
              'Every trip is led by a named guide you will meet before departure. No anonymous handoffs, ever.',
            )}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article key={member.name} data-reveal className="group">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-forest-950/10">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 flex translate-y-2 flex-wrap gap-1.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sand-100/30 bg-white/15 px-2.5 py-1 text-[11px] font-medium text-sand-50 backdrop-blur-sm"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl font-semibold text-forest-950">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-clay-700">{t(member.role)}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-forest-950/55">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5 text-clay-500"
                  >
                    <path
                      d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {t(member.location)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-forest-950/75">{t(member.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,137,106,0.22),transparent_40%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand-100">
              {t('Traveler stories')}
            </p>
            <h3 className="font-display mt-3 text-4xl font-bold tracking-tight text-sand-100">
              {t('Experiences that earn repeat travelers.')}
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/30 bg-white/18 p-4">
                  <p className="font-display text-3xl text-sand-50">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-sand-100">{t(stat.label)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((item, index) => (
              <blockquote
                key={item.name}
                data-reveal
                className={`rounded-2xl border border-white/12 bg-white/6 p-6 backdrop-blur-sm ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <p className="text-base leading-relaxed text-sand-100/90">&ldquo;{t(item.quote)}&rdquo;</p>
                <footer className="mt-4 text-sm">
                  <span className="font-semibold text-clay-300">{item.name}</span>
                  <span className="text-sand-100/78"> · {t(item.trip)}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<FormStatus>('idle')

  useEffect(() => {
    if (window.location.hash === '#contact') {
      scrollToContact()
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('submitting')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          destination: data.get('destination') || 'Not specified',
          message: data.get('message') || 'No additional details',
          _subject: 'The Activity Lab — New trip inquiry',
          _template: 'table',
        }),
      })

      if (!response.ok) throw new Error('Submit failed')

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-forest-900 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-forest-950 to-forest-900 p-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-300">
              {t('Contact')}
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-sand-100 md:text-5xl">
              {t('Tell us where adventure should take you next.')}
            </h2>
            <p className="mt-4 text-lg text-sand-100/88">
              {t(
                'Share your goals, dates, and experience level. We turn that into a practical, expert guided plan designed for busy professionals and high-expectation travelers.',
              )}
            </p>
            <div className="mt-8 space-y-3 text-sm text-sand-100/85">
              <p>{t('Response target: within 1 business day')}</p>
              <p>{t('Trip planning options from approximately $1,900 per traveler')}</p>
              <p>{t('Formats: private guided, team retreat, milestone expedition')}</p>
              <p>
                {t('Prefer email?')}{' '}
                <a className="font-semibold text-clay-300 hover:text-clay-200" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_SIGNALS.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-sand-100/30 bg-white/10 px-3 py-1 text-xs font-medium text-sand-100"
                >
                  {t(signal)}
                </span>
              ))}
            </div>
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl border border-clay-500/30 bg-white/5 p-8 text-center">
              <p className="font-display text-2xl font-semibold text-sand-100">{t('You are on the list!')}</p>
              <p className="mt-3 text-sand-100/85">
                {t(
                  'Thanks for reaching out. We will review your trip details and get back to you within 1-2 business days.',
                )}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-clay-400 transition-colors hover:text-clay-500"
              >
                {t('Send another inquiry')}
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <p className="text-xs font-medium text-sand-100/85">
                {t('Trusted by 2,500+ adventurers. Small groups. Local certified guides.')}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder={t('Your name')}
                  required
                  className="rounded-xl border border-sand-100/10 bg-white/5 px-4 py-3 text-sand-100 placeholder:text-sand-100/40 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('Email address')}
                  required
                  className="rounded-xl border border-sand-100/10 bg-white/5 px-4 py-3 text-sand-100 placeholder:text-sand-100/40 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500"
                />
              </div>
              <input
                type="text"
                name="destination"
                placeholder={t('Dream destination (for example Oaxaca, Patagonia)')}
                className="w-full rounded-xl border border-sand-100/10 bg-white/5 px-4 py-3 text-sand-100 placeholder:text-sand-100/40 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500"
              />
              <textarea
                name="message"
                rows={4}
                placeholder={t('Tell us about your group, dates, and experience level')}
                className="w-full resize-none rounded-xl border border-sand-100/10 bg-white/5 px-4 py-3 text-sand-100 placeholder:text-sand-100/40 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500"
              />
              {status === 'error' && (
                <p className="text-sm text-red-300" role="alert">
                  {t('Something went wrong. Please try again or email us at')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-red-200">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-full bg-sand-100 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {status === 'submitting' ? t('Sending...') : t('Send inquiry')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Landing() {
  const appRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const timer = window.setTimeout(() => scrollToSection(id), 120)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!appRef.current) return

    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      if (prefersReducedMotion()) {
        gsap.set(revealItems, { opacity: 1, y: 0, clearProps: 'all' })
        return
      }
      gsap.set(revealItems, { willChange: 'transform, opacity' })

      ScrollTrigger.batch(revealItems, {
        once: true,
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 40, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              ease: 'power4.out',
              stagger: 0.1,
              clearProps: 'willChange,transform',
            },
          )
        },
      })
    }, appRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={appRef}>
      <Nav />
      <main>
        <Hero />
        <ProfessionalFocus />
        <JourneyFilm />
        <Experiences />
        <Destinations />
        <VisualGallery />
        <About />
        <Team />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/experiences/:slug" element={<ExperiencePage />} />
      {INFO_PAGES.map((page) => (
        <Route key={page.slug} path={`/${page.slug}`} element={<InfoPage />} />
      ))}
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
