export type ExperienceDetail = {
  slug: string
  kicker: string
  title: string
  description: string
  image: string
  meta: string[]
  duration: string
  intensity: string
  highlights: string[]
  overview: string
}

export const EXPERIENCE_DETAILS: ExperienceDetail[] = [
  {
    slug: 'guided-hikes',
    kicker: 'Trek',
    title: 'Guided Hikes',
    description:
      'From volcano summits in Mexico to alpine ridgelines in Patagonia — expert-led treks for every skill level.',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
    meta: ['All skill levels', 'Half-day to multi-day', 'Certified guides'],
    duration: 'Half-day to 8 days',
    intensity: 'Moderate to advanced',
    highlights: [
      'Certified local guides on every route',
      'Weather-window planning built into each itinerary',
      'Small groups with pace matched to your fitness',
      'Gear checklist and acclimatization guidance included',
    ],
    overview:
      'Our guided hikes span volcanic highlands, canyon rims, and alpine traverses. Each route is scouted seasonally and led by guides who live in the region — not fly-in operators.',
  },
  {
    slug: 'outdoor-activities',
    kicker: 'Adventure',
    title: 'Outdoor Activities',
    description:
      'Kayaking, rock climbing, canyon rappelling, and wildlife encounters — curated for thrill and safety.',
    image:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
    meta: ['Water & rock', 'Small groups', 'Safety-first'],
    duration: '2 hours to 3 days',
    intensity: 'Beginner to technical',
    highlights: [
      'Activity-specific safety briefings before every session',
      'Professional-grade equipment provided where needed',
      'Routes matched to experience level and conditions',
      'Optional add-ons to multi-day expedition itineraries',
    ],
    overview:
      'From canyon rappels to coastal kayaking and rock sessions, we pair high-adrenaline activities with conservative safety margins and expert instruction.',
  },
  {
    slug: 'immersive-journeys',
    kicker: 'Expedition',
    title: 'Immersive Journeys',
    description:
      'Multi-day expeditions that blend culture, cuisine, and landscape — travel that stays with you.',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
    meta: ['5–10 days', 'Culture + nature', 'Fully guided'],
    duration: '5 to 10 days',
    intensity: 'Moderate, fully supported',
    highlights: [
      'Day-by-day visual itinerary before you depart',
      'Local hosts, lodges, and culinary experiences woven in',
      'Private or small-group formats available',
      'End-to-end logistics handled by a named trip lead',
    ],
    overview:
      'These are our signature multi-day expeditions — designed like a film treatment with real terrain, cultural depth, and a single point of contact from planning through return.',
  },
]

export function getExperienceBySlug(slug: string) {
  return EXPERIENCE_DETAILS.find((item) => item.slug === slug)
}
