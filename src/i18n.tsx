import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'en' | 'es' | 'fr' | 'ar'

export const LANGUAGES: { code: Lang; label: string; short: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'es', label: 'Español', short: 'ES', dir: 'ltr' },
  { code: 'fr', label: 'Français', short: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl' },
]

const STORAGE_KEY = 'tal-lang'

type Dict = Record<string, string>

const es: Dict = {
  // Nav
  Activities: 'Actividades',
  Destinations: 'Destinos',
  Contact: 'Contacto',
  'Plan a trip': 'Planea un viaje',
  // Hero
  'Travel and Adventure': 'Viajes y aventura',
  'Bespoke adventure journeys,': 'Viajes de aventura a medida,',
  'crafted for real explorers.': 'creados para verdaderos exploradores.',
  'From volcanic summits in Mexico to iconic trails worldwide, The Activity Lab designs guided hikes and outdoor experiences that balance challenge, safety, and streamlined logistics for professionals with limited time.':
    'Desde cumbres volcánicas en México hasta senderos icónicos en todo el mundo, The Activity Lab diseña caminatas guiadas y experiencias al aire libre que equilibran desafío, seguridad y una logística ágil para profesionales con poco tiempo.',
  'Start your adventure': 'Comienza tu aventura',
  'See activities': 'Ver actividades',
  'Hikes and trekking': 'Senderismo y trekking',
  'Outdoor activities': 'Actividades al aire libre',
  'Guided experiences': 'Experiencias guiadas',
  'Featured trip': 'Viaje destacado',
  'Mexico Highlands Traverse': 'Travesía por las Tierras Altas de México',
  'Six days of guided ridge hikes, canyon routes, and cultural immersion':
    'Seis días de caminatas guiadas por cordales, rutas de cañón e inmersión cultural',
  'Mexico and worldwide locations': 'México y destinos en todo el mundo',
  'Guided trips': 'Viajes guiados',
  'Curated hikes and active expeditions': 'Caminatas seleccionadas y expediciones activas',
  Scroll: 'Desliza',
  // Professional focus
  'Built for professionals': 'Diseñado para profesionales',
  'What serious travelers actually optimize for.':
    'Lo que de verdad priorizan los viajeros exigentes.',
  'Research-backed priorities: less friction, better safety, smaller groups, and clearer planning confidence before booking.':
    'Prioridades respaldadas por estudios: menos fricción, mayor seguridad, grupos más pequeños y más confianza al planificar antes de reservar.',
  'Time-efficient planning': 'Planificación que ahorra tiempo',
  'One planning call, fast route options, and a clear next step within 24 hours.':
    'Una llamada de planificación, opciones de ruta rápidas y un siguiente paso claro en 24 horas.',
  'Safety and duty of care': 'Seguridad y deber de cuidado',
  'Certified local guides, risk-aware itineraries, and 24/7 on-trip support.':
    'Guías locales certificados, itinerarios conscientes del riesgo y soporte 24/7 durante el viaje.',
  'Small-group quality': 'Calidad de grupos pequeños',
  'Intimate groups for better pace control, less waiting, and deeper local access.':
    'Grupos reducidos para controlar mejor el ritmo, esperar menos y acceder más a fondo a lo local.',
  'Transparent trip scope': 'Alcance del viaje transparente',
  'Visible inclusions, activity intensity, and realistic seasonal guidance.':
    'Inclusiones visibles, intensidad de las actividades y orientación estacional realista.',
  // Journey film
  'Expedition film': 'Película de expedición',
  'Scroll to travel': 'Desplázate para viajar',
  'Chapter 01 — Basecamp': 'Capítulo 01 — Campamento base',
  'Wake up inside the range.': 'Despierta dentro de la cordillera.',
  'Acclimatize at altitude with certified local guides as first light moves across camp.':
    'Aclimátate en altura con guías locales certificados mientras la primera luz recorre el campamento.',
  'Chapter 02 — The approach': 'Capítulo 02 — La aproximación',
  'Move between landscapes.': 'Muévete entre paisajes.',
  'Valleys, ridgelines, and the quiet roads that connect one horizon to the next.':
    'Valles, cordales y los caminos silenciosos que conectan un horizonte con el siguiente.',
  'Chapter 03 — New horizons': 'Capítulo 03 — Nuevos horizontes',
  'Every summit opens the next.': 'Cada cumbre abre la siguiente.',
  'From snowline to coastline, each expedition is designed to lead into the one after it.':
    'De la línea de nieve a la costa, cada expedición está pensada para dar paso a la siguiente.',
  // Experiences
  'What we offer': 'Lo que ofrecemos',
  'Signature experiences for every style of adventurer.':
    'Experiencias exclusivas para cada tipo de aventurero.',
  'Join day hikes, multi-day trekking routes, and technical outdoor activities led by expert guides and tailored to your pace.':
    'Únete a caminatas de un día, rutas de trekking de varios días y actividades técnicas al aire libre guiadas por expertos y adaptadas a tu ritmo.',
  'Every itinerary is personalized, safety-first, and built around meaningful local insight.':
    'Cada itinerario es personalizado, prioriza la seguridad y se construye con un conocimiento local valioso.',
  Explore: 'Explorar',
  Trek: 'Trekking',
  'Guided Hikes': 'Caminatas guiadas',
  'From volcano summits in Mexico to alpine ridgelines in Patagonia — expert-led treks for every skill level.':
    'Desde cumbres volcánicas en México hasta cordales alpinos en la Patagonia: travesías guiadas por expertos para todos los niveles.',
  'All skill levels': 'Todos los niveles',
  'Half-day to multi-day': 'De medio día a varios días',
  'Certified guides': 'Guías certificados',
  Adventure: 'Aventura',
  'Outdoor Activities': 'Actividades al aire libre',
  'Kayaking, rock climbing, canyon rappelling, and wildlife encounters — curated for thrill and safety.':
    'Kayak, escalada en roca, rápel en cañones y encuentros con la fauna: seleccionados para la emoción y la seguridad.',
  'Water & rock': 'Agua y roca',
  'Small groups': 'Grupos pequeños',
  'Safety-first': 'Seguridad ante todo',
  Expedition: 'Expedición',
  'Immersive Journeys': 'Viajes inmersivos',
  'Multi-day expeditions that blend culture, cuisine, and landscape — travel that stays with you.':
    'Expediciones de varios días que combinan cultura, gastronomía y paisaje: viajes que te marcan.',
  '5–10 days': '5–10 días',
  'Culture + nature': 'Cultura + naturaleza',
  'Fully guided': 'Totalmente guiado',
  // Destinations
  'Mexico at the core, the world within reach.': 'México en el corazón, el mundo a tu alcance.',
  "We specialize in Mexico's most compelling landscapes while also curating guided journeys across globally renowned adventure regions.":
    'Nos especializamos en los paisajes más fascinantes de México y también diseñamos viajes guiados por regiones de aventura reconocidas en todo el mundo.',
  Featured: 'Destacado',
  'Plan this trip': 'Planea este viaje',
  'Home base': 'Base de operaciones',
  'Our backyard — volcanic summits, copper canyons, and highland trails we know intimately, season by season.':
    'Nuestro patio trasero: cumbres volcánicas, cañones de cobre y senderos de altura que conocemos a fondo, temporada tras temporada.',
  Mexico: 'México',
  'Oaxaca Highlands': 'Tierras Altas de Oaxaca',
  'Copper Canyon': 'Barrancas del Cobre',
  'Volcán Iztaccíhuatl': 'Volcán Iztaccíhuatl',
  'Chiapas Jungle': 'Selva de Chiapas',
  'Nearby frontiers': 'Fronteras cercanas',
  'Cloud forests and active volcanoes a short hop from our Mexico hubs.':
    'Bosques nubosos y volcanes activos a un paso de nuestros centros en México.',
  'Central America': 'Centroamérica',
  'Guatemala Volcanoes': 'Volcanes de Guatemala',
  'Costa Rica Cloud Forest': 'Bosque Nuboso de Costa Rica',
  'Panama Highlands': 'Tierras Altas de Panamá',
  'Global icons': 'Íconos mundiales',
  'Bucket-list ranges run with vetted local partners.':
    'Cordilleras de ensueño con socios locales de confianza.',
  Worldwide: 'Todo el mundo',
  Patagonia: 'Patagonia',
  'Nepal Himalaya': 'Himalaya de Nepal',
  'Iceland Highlands': 'Tierras Altas de Islandia',
  'Morocco Atlas': 'Atlas de Marruecos',
  // Gallery
  'Photo journal': 'Diario fotográfico',
  'More places. More visual depth.': 'Más lugares. Más profundidad visual.',
  'A premium gallery strip inspired by modern cover pages, with cinematic parallax and richer destination storytelling.':
    'Una galería premium inspirada en las portadas modernas, con parallax cinematográfico y un relato más rico de cada destino.',
  'Alpine dawn ascents': 'Ascensos alpinos al amanecer',
  'Jungle river crossings': 'Cruces de ríos en la selva',
  'Chiapas, Mexico': 'Chiapas, México',
  'Volcanic ridge trekking': 'Trekking por cordales volcánicos',
  'Central Mexico': 'Centro de México',
  'Canyon sunset camps': 'Campamentos al atardecer en cañones',
  'Highland trail mornings': 'Mañanas en senderos de altura',
  'Oaxaca, Mexico': 'Oaxaca, México',
  'Glacier valley routes': 'Rutas por valles glaciares',
  Iceland: 'Islandia',
  // About
  About: 'Nosotros',
  'Local expertise, global adventure standards.':
    'Experiencia local, estándares de aventura globales.',
  'We build active travel experiences for people who want more than sightseeing — real movement, real terrain, and memorable places.':
    'Creamos experiencias de viaje activo para quienes quieren algo más que turismo: movimiento real, terreno real y lugares memorables.',
  'With deep roots in Mexico and trusted partners worldwide, we deliver guided journeys that feel both authentic and meticulously organized.':
    'Con raíces profundas en México y socios de confianza en todo el mundo, ofrecemos viajes guiados que se sienten auténticos y meticulosamente organizados.',
  'Since 2011': 'Desde 2011',
  'Oaxaca-based': 'Con base en Oaxaca',
  '2,500+ travelers': 'Más de 2.500 viajeros',
  'On the trail': 'En el sendero',
  'Real terrain, expertly guided.': 'Terreno real, con guía experta.',
  'Would return': 'Repetirían',
  'How it works': 'Cómo funciona',
  'Three phases from idea to trailhead.': 'Tres fases, de la idea al punto de partida.',
  Discover: 'Descubre',
  '3-minute intake': 'Cuestionario de 3 minutos',
  'Tell us your preferred terrain, pace, and comfort level in 3 minutes.':
    'Cuéntanos en 3 minutos tu terreno preferido, tu ritmo y tu nivel de comodidad.',
  Design: 'Diseña',
  '48-hour turnaround': 'Respuesta en 48 horas',
  'We draft a cinematic day-by-day itinerary with weather windows.':
    'Diseñamos un itinerario cinematográfico día a día con ventanas climáticas.',
  Deliver: 'Entrega',
  'Trip-ready brief': 'Dossier listo para viajar',
  'You get a ready-to-run trip brief with logistics, safety, and local contacts.':
    'Recibes un dossier de viaje listo para usar con logística, seguridad y contactos locales.',
  // Contact
  'Tell us where adventure should take you next.':
    'Cuéntanos a dónde debería llevarte la próxima aventura.',
  'Share your goals, dates, and experience level. We turn that into a practical, expert guided plan designed for busy professionals and high-expectation travelers.':
    'Comparte tus objetivos, fechas y nivel de experiencia. Lo convertimos en un plan práctico y guiado por expertos, pensado para profesionales ocupados y viajeros exigentes.',
  'Response target: within 1 business day': 'Tiempo de respuesta: en 1 día hábil',
  'Trip planning options from approximately $1,900 per traveler':
    'Opciones de planificación desde aproximadamente 1.900 USD por viajero',
  'Formats: private guided, team retreat, milestone expedition':
    'Formatos: guiado privado, retiro de equipo, expedición conmemorativa',
  'Prefer email?': '¿Prefieres el correo?',
  'Response within 1 business day': 'Respuesta en 1 día hábil',
  'Small groups, typically 6-12 travelers': 'Grupos pequeños, normalmente de 6 a 12 viajeros',
  'Transparent planning and inclusions': 'Planificación e inclusiones transparentes',
  'You are on the list!': '¡Ya estás en la lista!',
  'Thanks for reaching out. We will review your trip details and get back to you within 1-2 business days.':
    'Gracias por escribirnos. Revisaremos los detalles de tu viaje y te responderemos en 1-2 días hábiles.',
  'Send another inquiry': 'Enviar otra consulta',
  'Trusted by 2,500+ adventurers. Small groups. Local certified guides.':
    'Con la confianza de más de 2.500 aventureros. Grupos pequeños. Guías locales certificados.',
  'Your name': 'Tu nombre',
  'Email address': 'Correo electrónico',
  'Dream destination (for example Oaxaca, Patagonia)':
    'Destino soñado (por ejemplo, Oaxaca, Patagonia)',
  'Tell us about your group, dates, and experience level':
    'Cuéntanos sobre tu grupo, fechas y nivel de experiencia',
  'Something went wrong. Please try again or email us at':
    'Algo salió mal. Inténtalo de nuevo o escríbenos a',
  'Sending...': 'Enviando...',
  'Send inquiry': 'Enviar consulta',
  // Footer
  'Certified, small-group hikes and guided adventures worldwide. Real terrain, meticulously organized.':
    'Caminatas certificadas en grupos pequeños y aventuras guiadas en todo el mundo. Terreno real, meticulosamente organizado.',
  'Trail notes newsletter': 'Boletín «Notas del sendero»',
  Subscribe: 'Suscribirse',
  'One thoughtful email a month. No spam, unsubscribe anytime.':
    'Un correo cuidado al mes. Sin spam, cancela cuando quieras.',
  'Guided hikes': 'Caminatas guiadas',
  Company: 'Empresa',
  Support: 'Soporte',
  'About us': 'Sobre nosotros',
  Careers: 'Empleo',
  'Press kit': 'Kit de prensa',
  Sustainability: 'Sostenibilidad',
  'Trip FAQ': 'Preguntas frecuentes',
  'Booking terms': 'Condiciones de reserva',
  'Travel insurance': 'Seguro de viaje',
  'Member · Adventure Travel Trade Association': 'Miembro · Adventure Travel Trade Association',
  'IFMGA-certified guides': 'Guías certificados por la IFMGA',
  'Fully licensed & insured': 'Totalmente autorizados y asegurados',
  'All rights reserved.': 'Todos los derechos reservados.',
  'Privacy Policy': 'Política de privacidad',
  'Terms of Service': 'Términos del servicio',
  'Cookie Settings': 'Configuración de cookies',
  'Made with care in Oaxaca, Mexico': 'Hecho con cariño en Oaxaca, México',
  // Info pages
  'Back to home': 'Volver al inicio',
  'Get in touch': 'Ponte en contacto',
  Language: 'Idioma',
  Phase: 'Fase',
  Legal: 'Legal',
  // Careers
  'We hire guides, planners, and storytellers who treat the outdoors with respect and travelers with care.':
    'Contratamos guías, planificadores y narradores que tratan la naturaleza con respeto y a los viajeros con esmero.',
  'Why work with us': 'Por qué trabajar con nosotros',
  'Small, senior team. Real time in the field. Fair pay, certified training budgets, and the autonomy to design trips you would want to take yourself.':
    'Un equipo reducido y experimentado. Tiempo real en el terreno. Salario justo, presupuesto para formación certificada y autonomía para diseñar los viajes que tú mismo querrías hacer.',
  'Open roles': 'Vacantes abiertas',
  'We are always looking for IFMGA-track mountain guides, route planners, and guest-experience leads across Mexico and our partner regions. Send us a note and tell us what you love to guide.':
    'Siempre buscamos guías de montaña con vía IFMGA, planificadores de rutas y responsables de experiencia del cliente en México y nuestras regiones asociadas. Escríbenos y cuéntanos qué te gusta guiar.',
  // Press
  'Logos, founder bios, and high-resolution imagery for journalists and partners.':
    'Logotipos, biografías de los fundadores e imágenes en alta resolución para periodistas y socios.',
  'About the company': 'Sobre la empresa',
  'Founded in 2011 in Oaxaca, we run certified small-group hikes and guided adventures rooted in Mexico, with trusted partners worldwide.':
    'Fundada en 2011 en Oaxaca, ofrecemos caminatas certificadas en grupos pequeños y aventuras guiadas con raíces en México y socios de confianza en todo el mundo.',
  'Media requests': 'Solicitudes de prensa',
  'For interviews, imagery, or fact-checking, reach our team and we will respond within one business day with everything you need.':
    'Para entrevistas, imágenes o verificación de datos, contacta a nuestro equipo y te responderemos en un día hábil con todo lo que necesites.',
  // Sustainability
  'Low-impact travel that supports the communities and landscapes we move through, season after season.':
    'Viajes de bajo impacto que apoyan a las comunidades y los paisajes por los que pasamos, temporada tras temporada.',
  'Local first': 'Lo local primero',
  'We hire local certified guides, stay in locally owned lodges, and route trips to spread value across the regions we visit.':
    'Contratamos guías locales certificados, nos alojamos en establecimientos de propiedad local y diseñamos rutas para repartir el valor por las regiones que visitamos.',
  'Leave no trace': 'No dejar rastro',
  'Small groups, packed-out waste, and carefully managed trail use keep wild places wild for the travelers who follow.':
    'Grupos pequeños, residuos que nos llevamos y un uso cuidadoso de los senderos mantienen los lugares salvajes para quienes vengan después.',
  // FAQ
  'Answers to the questions travelers ask us most before they book.':
    'Respuestas a las preguntas que más nos hacen los viajeros antes de reservar.',
  'How fit do I need to be?': '¿Qué nivel de forma física necesito?',
  'We grade every trip by intensity and offer routes for all skill levels — from relaxed day hikes to technical multi-day expeditions.':
    'Clasificamos cada viaje por intensidad y ofrecemos rutas para todos los niveles, desde caminatas tranquilas de un día hasta expediciones técnicas de varios días.',
  'How big are the groups?': '¿De qué tamaño son los grupos?',
  'Most trips run with 6 to 12 travelers and a certified guide, for better pace control and deeper local access.':
    'La mayoría de los viajes son de 6 a 12 viajeros con un guía certificado, para controlar mejor el ritmo y acceder más a fondo a lo local.',
  'What is included?': '¿Qué incluye?',
  'Guiding, logistics, safety support, and a detailed trip brief. Inclusions are listed transparently before you book.':
    'Guía, logística, soporte de seguridad y un dossier detallado del viaje. Las inclusiones se detallan con transparencia antes de reservar.',
  // Booking terms
  'The essentials on deposits, changes, and cancellations — written in plain language.':
    'Lo esencial sobre depósitos, cambios y cancelaciones, en lenguaje claro.',
  'Deposits & payment': 'Depósitos y pago',
  'A deposit secures your place; the balance is due before departure. We confirm every detail in writing first.':
    'Un depósito reserva tu plaza; el resto se paga antes de la salida. Primero confirmamos cada detalle por escrito.',
  'Changes & cancellations': 'Cambios y cancelaciones',
  'Plans change. We offer flexible rebooking windows and clear refund tiers depending on how far out you cancel.':
    'Los planes cambian. Ofrecemos ventanas flexibles de reprogramación y niveles de reembolso claros según la antelación con la que canceles.',
  // Travel insurance
  'Adventure travel carries real risk. We require coverage so you can focus on the experience.':
    'El turismo de aventura conlleva riesgos reales. Exigimos cobertura para que puedas centrarte en la experiencia.',
  'What we require': 'Qué exigimos',
  'All travelers need insurance covering medical care, emergency evacuation, and trip cancellation appropriate to the activity level.':
    'Todos los viajeros necesitan un seguro que cubra atención médica, evacuación de emergencia y cancelación del viaje, acorde con el nivel de actividad.',
  'How we help': 'Cómo ayudamos',
  'We can recommend trusted providers and outline the activity details your policy should cover for your specific itinerary.':
    'Podemos recomendarte proveedores de confianza y detallar las actividades que tu póliza debería cubrir para tu itinerario concreto.',
  // Privacy
  'How we collect, use, and protect the information you share with us.':
    'Cómo recopilamos, usamos y protegemos la información que compartes con nosotros.',
  'What we collect': 'Qué recopilamos',
  'Only what we need to plan your trip and stay in touch — your name, contact details, and the trip preferences you provide.':
    'Solo lo necesario para planificar tu viaje y mantener el contacto: tu nombre, tus datos de contacto y las preferencias de viaje que nos indiques.',
  'How we use it': 'Cómo la usamos',
  'We use your information to plan and run your trip and to respond to your inquiries. We never sell your personal data.':
    'Usamos tu información para planificar y operar tu viaje y para responder a tus consultas. Nunca vendemos tus datos personales.',
  // Terms
  'The agreement that governs your use of our website and services.':
    'El acuerdo que rige el uso de nuestro sitio web y servicios.',
  'Using our services': 'Uso de nuestros servicios',
  'By booking with us you agree to follow guide instructions, safety briefings, and the reasonable requirements of each itinerary.':
    'Al reservar con nosotros aceptas seguir las instrucciones del guía, las charlas de seguridad y los requisitos razonables de cada itinerario.',
  Liability: 'Responsabilidad',
  'Adventure travel involves inherent risks. We operate to high safety standards, and travelers accept responsibility for participating informed and prepared.':
    'El turismo de aventura implica riesgos inherentes. Operamos con altos estándares de seguridad y los viajeros aceptan participar informados y preparados.',
  // Cookies
  'We keep cookies to a minimum — just enough to make the site work well.':
    'Reducimos las cookies al mínimo, solo las necesarias para que el sitio funcione bien.',
  'Essential cookies': 'Cookies esenciales',
  'These remember your language preference and keep the site running smoothly. They cannot be switched off.':
    'Recuerdan tu preferencia de idioma y mantienen el sitio funcionando con fluidez. No se pueden desactivar.',
  Analytics: 'Analítica',
  'We use privacy-friendly analytics to understand what travelers find useful, always in aggregate and never tied to your identity.':
    'Usamos analítica respetuosa con la privacidad para entender qué resulta útil a los viajeros, siempre de forma agregada y nunca vinculada a tu identidad.',
  Close: 'Cerrar',
  Privacy: 'Privacidad',
  'Always on': 'Siempre activas',
  Cancel: 'Cancelar',
  'Save preferences': 'Guardar preferencias',
  'Typical duration': 'Duración habitual',
  Intensity: 'Intensidad',
  'View full details': 'Ver detalles completos',
  Overview: 'Resumen',
  'What is included': 'Qué incluye',
  'Ready to plan this experience?': '¿Listo para planear esta experiencia?',
  Back: 'Volver',
  'Experience not found': 'Experiencia no encontrada',
  'You are subscribed!': '¡Ya estás suscrito!',
  'Thanks — your first trail note arrives within a week.':
    'Gracias — tu primera nota del sendero llegará en una semana.',
  'Half-day to 8 days': 'De medio día a 8 días',
  'Moderate to advanced': 'Moderado a avanzado',
  '2 hours to 3 days': 'De 2 horas a 3 días',
  'Beginner to technical': 'Principiante a técnico',
  '5 to 10 days': 'De 5 a 10 días',
  'Moderate, fully supported': 'Moderado, con apoyo completo',
  'Certified local guides on every route':
    'Guías locales certificados en cada ruta',
  'Weather-window planning built into each itinerary':
    'Planificación con ventanas climáticas en cada itinerario',
  'Small groups with pace matched to your fitness':
    'Grupos pequeños con ritmo adaptado a tu condición física',
  'Gear checklist and acclimatization guidance included':
    'Lista de equipo y orientación de aclimatación incluidas',
  'Our guided hikes span volcanic highlands, canyon rims, and alpine traverses. Each route is scouted seasonally and led by guides who live in the region — not fly-in operators.':
    'Nuestras caminatas guiadas abarcan tierras altas volcánicas, bordes de cañón y travesías alpinas. Cada ruta se explora temporada a temporada y la dirigen guías que viven en la región, no operadores externos.',
  'Activity-specific safety briefings before every session':
    'Charlas de seguridad específicas antes de cada sesión',
  'Professional-grade equipment provided where needed':
    'Equipo de grado profesional cuando se necesita',
  'Routes matched to experience level and conditions':
    'Rutas adaptadas al nivel de experiencia y a las condiciones',
  'Optional add-ons to multi-day expedition itineraries':
    'Complementos opcionales para itinerarios de expedición de varios días',
  'From canyon rappels to coastal kayaking and rock sessions, we pair high-adrenaline activities with conservative safety margins and expert instruction.':
    'Desde rápel en cañones hasta kayak costero y sesiones de roca, combinamos actividades de alta adrenalina con márgenes de seguridad conservadores e instrucción experta.',
  'Day-by-day visual itinerary before you depart':
    'Itinerario visual día a día antes de partir',
  'Local hosts, lodges, and culinary experiences woven in':
    'Anfitriones locales, lodges y experiencias culinarias integradas',
  'Private or small-group formats available':
    'Formatos privados o en grupos pequeños disponibles',
  'End-to-end logistics handled by a named trip lead':
    'Logística de principio a fin gestionada por un responsable de viaje identificado',
  'These are our signature multi-day expeditions — designed like a film treatment with real terrain, cultural depth, and a single point of contact from planning through return.':
    'Estas son nuestras expediciones insignia de varios días, diseñadas como un tratamiento cinematográfico con terreno real, profundidad cultural y un único punto de contacto desde la planificación hasta el regreso.',
}

const fr: Dict = {
  Activities: 'Activités',
  Destinations: 'Destinations',
  Contact: 'Contact',
  'Plan a trip': 'Planifier un voyage',
  'Travel and Adventure': 'Voyage et aventure',
  'Bespoke adventure journeys,': 'Des voyages d’aventure sur mesure,',
  'crafted for real explorers.': 'conçus pour les vrais explorateurs.',
  'From volcanic summits in Mexico to iconic trails worldwide, The Activity Lab designs guided hikes and outdoor experiences that balance challenge, safety, and streamlined logistics for professionals with limited time.':
    'Des sommets volcaniques du Mexique aux sentiers emblématiques du monde entier, The Activity Lab conçoit des randonnées guidées et des expériences en plein air qui allient défi, sécurité et logistique simplifiée pour les professionnels au temps limité.',
  'Start your adventure': 'Commencez votre aventure',
  'See activities': 'Voir les activités',
  'Hikes and trekking': 'Randonnée et trekking',
  'Outdoor activities': 'Activités de plein air',
  'Guided experiences': 'Expériences guidées',
  'Featured trip': 'Voyage à la une',
  'Mexico Highlands Traverse': 'Traversée des hauts plateaux du Mexique',
  'Six days of guided ridge hikes, canyon routes, and cultural immersion':
    'Six jours de randonnées guidées sur les crêtes, d’itinéraires de canyon et d’immersion culturelle',
  'Mexico and worldwide locations': 'Mexique et destinations dans le monde entier',
  'Guided trips': 'Voyages guidés',
  'Curated hikes and active expeditions': 'Randonnées sélectionnées et expéditions actives',
  Scroll: 'Défiler',
  'Built for professionals': 'Conçu pour les professionnels',
  'What serious travelers actually optimize for.':
    'Ce que les voyageurs exigeants optimisent vraiment.',
  'Research-backed priorities: less friction, better safety, smaller groups, and clearer planning confidence before booking.':
    'Des priorités fondées sur la recherche : moins de friction, plus de sécurité, des groupes plus petits et une planification plus sereine avant la réservation.',
  'Time-efficient planning': 'Une planification qui gagne du temps',
  'One planning call, fast route options, and a clear next step within 24 hours.':
    'Un appel de planification, des options d’itinéraire rapides et une étape suivante claire sous 24 heures.',
  'Safety and duty of care': 'Sécurité et devoir de protection',
  'Certified local guides, risk-aware itineraries, and 24/7 on-trip support.':
    'Des guides locaux certifiés, des itinéraires attentifs aux risques et une assistance 24/7 pendant le voyage.',
  'Small-group quality': 'La qualité des petits groupes',
  'Intimate groups for better pace control, less waiting, and deeper local access.':
    'Des groupes intimes pour mieux maîtriser le rythme, moins attendre et accéder plus profondément au local.',
  'Transparent trip scope': 'Un périmètre de voyage transparent',
  'Visible inclusions, activity intensity, and realistic seasonal guidance.':
    'Des prestations visibles, l’intensité des activités et des conseils saisonniers réalistes.',
  'Expedition film': 'Film d’expédition',
  'Scroll to travel': 'Défilez pour voyager',
  'Chapter 01 — Basecamp': 'Chapitre 01 — Camp de base',
  'Wake up inside the range.': 'Réveillez-vous au cœur du massif.',
  'Acclimatize at altitude with certified local guides as first light moves across camp.':
    'Acclimatez-vous en altitude avec des guides locaux certifiés tandis que la première lumière traverse le camp.',
  'Chapter 02 — The approach': 'Chapitre 02 — L’approche',
  'Move between landscapes.': 'Passez d’un paysage à l’autre.',
  'Valleys, ridgelines, and the quiet roads that connect one horizon to the next.':
    'Vallées, lignes de crête et routes tranquilles qui relient un horizon au suivant.',
  'Chapter 03 — New horizons': 'Chapitre 03 — Nouveaux horizons',
  'Every summit opens the next.': 'Chaque sommet ouvre le suivant.',
  'From snowline to coastline, each expedition is designed to lead into the one after it.':
    'De la ligne de neige au littoral, chaque expédition est conçue pour mener à la suivante.',
  'What we offer': 'Ce que nous proposons',
  'Signature experiences for every style of adventurer.':
    'Des expériences signature pour chaque style d’aventurier.',
  'Join day hikes, multi-day trekking routes, and technical outdoor activities led by expert guides and tailored to your pace.':
    'Participez à des randonnées d’une journée, des treks de plusieurs jours et des activités techniques de plein air encadrés par des experts et adaptés à votre rythme.',
  'Every itinerary is personalized, safety-first, and built around meaningful local insight.':
    'Chaque itinéraire est personnalisé, privilégie la sécurité et s’appuie sur une connaissance locale précieuse.',
  Explore: 'Explorer',
  Trek: 'Trek',
  'Guided Hikes': 'Randonnées guidées',
  'From volcano summits in Mexico to alpine ridgelines in Patagonia — expert-led treks for every skill level.':
    'Des sommets volcaniques du Mexique aux crêtes alpines de Patagonie — des treks encadrés par des experts pour tous les niveaux.',
  'All skill levels': 'Tous niveaux',
  'Half-day to multi-day': 'D’une demi-journée à plusieurs jours',
  'Certified guides': 'Guides certifiés',
  Adventure: 'Aventure',
  'Outdoor Activities': 'Activités de plein air',
  'Kayaking, rock climbing, canyon rappelling, and wildlife encounters — curated for thrill and safety.':
    'Kayak, escalade, rappel en canyon et rencontres avec la faune — sélectionnés pour le frisson et la sécurité.',
  'Water & rock': 'Eau et roche',
  'Small groups': 'Petits groupes',
  'Safety-first': 'Sécurité d’abord',
  Expedition: 'Expédition',
  'Immersive Journeys': 'Voyages immersifs',
  'Multi-day expeditions that blend culture, cuisine, and landscape — travel that stays with you.':
    'Des expéditions de plusieurs jours qui mêlent culture, gastronomie et paysages — un voyage qui vous marque.',
  '5–10 days': '5–10 jours',
  'Culture + nature': 'Culture + nature',
  'Fully guided': 'Entièrement guidé',
  'Mexico at the core, the world within reach.': 'Le Mexique au cœur, le monde à portée.',
  "We specialize in Mexico's most compelling landscapes while also curating guided journeys across globally renowned adventure regions.":
    'Nous sommes spécialisés dans les paysages les plus marquants du Mexique, tout en concevant des voyages guidés dans des régions d’aventure mondialement reconnues.',
  Featured: 'À la une',
  'Plan this trip': 'Planifier ce voyage',
  'Home base': 'Camp de base',
  'Our backyard — volcanic summits, copper canyons, and highland trails we know intimately, season by season.':
    'Notre terrain de jeu — sommets volcaniques, canyons de cuivre et sentiers d’altitude que nous connaissons intimement, saison après saison.',
  Mexico: 'Mexique',
  'Oaxaca Highlands': 'Hauts plateaux d’Oaxaca',
  'Copper Canyon': 'Canyon du Cuivre',
  'Volcán Iztaccíhuatl': 'Volcan Iztaccíhuatl',
  'Chiapas Jungle': 'Jungle du Chiapas',
  'Nearby frontiers': 'Frontières voisines',
  'Cloud forests and active volcanoes a short hop from our Mexico hubs.':
    'Forêts de nuages et volcans actifs à deux pas de nos bases au Mexique.',
  'Central America': 'Amérique centrale',
  'Guatemala Volcanoes': 'Volcans du Guatemala',
  'Costa Rica Cloud Forest': 'Forêt de nuages du Costa Rica',
  'Panama Highlands': 'Hauts plateaux du Panama',
  'Global icons': 'Icônes mondiales',
  'Bucket-list ranges run with vetted local partners.':
    'Des massifs de rêve avec des partenaires locaux soigneusement sélectionnés.',
  Worldwide: 'Monde entier',
  Patagonia: 'Patagonie',
  'Nepal Himalaya': 'Himalaya du Népal',
  'Iceland Highlands': 'Hautes terres d’Islande',
  'Morocco Atlas': 'Atlas marocain',
  'Photo journal': 'Journal photo',
  'More places. More visual depth.': 'Plus de lieux. Plus de profondeur visuelle.',
  'A premium gallery strip inspired by modern cover pages, with cinematic parallax and richer destination storytelling.':
    'Une galerie premium inspirée des couvertures modernes, avec un parallaxe cinématographique et une narration de destination plus riche.',
  'Alpine dawn ascents': 'Ascensions alpines à l’aube',
  'Jungle river crossings': 'Traversées de rivières en jungle',
  'Chiapas, Mexico': 'Chiapas, Mexique',
  'Volcanic ridge trekking': 'Trek sur des crêtes volcaniques',
  'Central Mexico': 'Mexique central',
  'Canyon sunset camps': 'Camps au coucher du soleil dans les canyons',
  'Highland trail mornings': 'Matins sur les sentiers d’altitude',
  'Oaxaca, Mexico': 'Oaxaca, Mexique',
  'Glacier valley routes': 'Itinéraires de vallées glaciaires',
  Iceland: 'Islande',
  About: 'À propos',
  'Local expertise, global adventure standards.':
    'Une expertise locale, des standards d’aventure mondiaux.',
  'We build active travel experiences for people who want more than sightseeing — real movement, real terrain, and memorable places.':
    'Nous créons des voyages actifs pour celles et ceux qui veulent plus que du tourisme : du vrai mouvement, du vrai terrain et des lieux mémorables.',
  'With deep roots in Mexico and trusted partners worldwide, we deliver guided journeys that feel both authentic and meticulously organized.':
    'Avec des racines profondes au Mexique et des partenaires de confiance dans le monde entier, nous proposons des voyages guidés à la fois authentiques et minutieusement organisés.',
  'Since 2011': 'Depuis 2011',
  'Oaxaca-based': 'Basés à Oaxaca',
  '2,500+ travelers': 'Plus de 2 500 voyageurs',
  'On the trail': 'Sur le sentier',
  'Real terrain, expertly guided.': 'Du vrai terrain, guidé par des experts.',
  'Would return': 'Reviendraient',
  'How it works': 'Comment ça marche',
  'Three phases from idea to trailhead.': 'Trois phases, de l’idée au départ du sentier.',
  Discover: 'Découvrir',
  '3-minute intake': 'Questionnaire de 3 minutes',
  'Tell us your preferred terrain, pace, and comfort level in 3 minutes.':
    'Indiquez-nous en 3 minutes votre terrain préféré, votre rythme et votre niveau de confort.',
  Design: 'Concevoir',
  '48-hour turnaround': 'Réponse sous 48 heures',
  'We draft a cinematic day-by-day itinerary with weather windows.':
    'Nous concevons un itinéraire cinématographique jour après jour avec des fenêtres météo.',
  Deliver: 'Livrer',
  'Trip-ready brief': 'Dossier prêt à partir',
  'You get a ready-to-run trip brief with logistics, safety, and local contacts.':
    'Vous recevez un dossier de voyage clé en main avec logistique, sécurité et contacts locaux.',
  'Tell us where adventure should take you next.':
    'Dites-nous où l’aventure devrait vous emmener ensuite.',
  'Share your goals, dates, and experience level. We turn that into a practical, expert guided plan designed for busy professionals and high-expectation travelers.':
    'Partagez vos objectifs, vos dates et votre niveau d’expérience. Nous en faisons un plan concret, guidé par des experts, conçu pour les professionnels occupés et les voyageurs exigeants.',
  'Response target: within 1 business day': 'Délai de réponse : sous 1 jour ouvré',
  'Trip planning options from approximately $1,900 per traveler':
    'Formules de planification à partir d’environ 1 900 $ par voyageur',
  'Formats: private guided, team retreat, milestone expedition':
    'Formats : guidé privé, séminaire d’équipe, expédition anniversaire',
  'Prefer email?': 'Vous préférez l’e-mail ?',
  'Response within 1 business day': 'Réponse sous 1 jour ouvré',
  'Small groups, typically 6-12 travelers': 'Petits groupes, généralement 6 à 12 voyageurs',
  'Transparent planning and inclusions': 'Planification et prestations transparentes',
  'You are on the list!': 'Vous êtes sur la liste !',
  'Thanks for reaching out. We will review your trip details and get back to you within 1-2 business days.':
    'Merci de nous avoir contactés. Nous étudierons les détails de votre voyage et reviendrons vers vous sous 1 à 2 jours ouvrés.',
  'Send another inquiry': 'Envoyer une autre demande',
  'Trusted by 2,500+ adventurers. Small groups. Local certified guides.':
    'Plébiscité par plus de 2 500 aventuriers. Petits groupes. Guides locaux certifiés.',
  'Your name': 'Votre nom',
  'Email address': 'Adresse e-mail',
  'Dream destination (for example Oaxaca, Patagonia)':
    'Destination de rêve (par exemple Oaxaca, Patagonie)',
  'Tell us about your group, dates, and experience level':
    'Parlez-nous de votre groupe, vos dates et votre niveau d’expérience',
  'Something went wrong. Please try again or email us at':
    'Une erreur s’est produite. Réessayez ou écrivez-nous à',
  'Sending...': 'Envoi...',
  'Send inquiry': 'Envoyer la demande',
  'Certified, small-group hikes and guided adventures worldwide. Real terrain, meticulously organized.':
    'Randonnées certifiées en petits groupes et aventures guidées dans le monde entier. Du vrai terrain, organisé avec minutie.',
  'Trail notes newsletter': 'Newsletter « Carnet de sentier »',
  Subscribe: 'S’abonner',
  'One thoughtful email a month. No spam, unsubscribe anytime.':
    'Un e-mail soigné par mois. Pas de spam, désabonnement à tout moment.',
  'Guided hikes': 'Randonnées guidées',
  Company: 'Entreprise',
  Support: 'Assistance',
  'About us': 'À propos de nous',
  Careers: 'Carrières',
  'Press kit': 'Kit presse',
  Sustainability: 'Durabilité',
  'Trip FAQ': 'FAQ voyage',
  'Booking terms': 'Conditions de réservation',
  'Travel insurance': 'Assurance voyage',
  'Member · Adventure Travel Trade Association': 'Membre · Adventure Travel Trade Association',
  'IFMGA-certified guides': 'Guides certifiés IFMGA',
  'Fully licensed & insured': 'Entièrement agréés et assurés',
  'All rights reserved.': 'Tous droits réservés.',
  'Privacy Policy': 'Politique de confidentialité',
  'Terms of Service': 'Conditions d’utilisation',
  'Cookie Settings': 'Paramètres des cookies',
  'Made with care in Oaxaca, Mexico': 'Conçu avec soin à Oaxaca, Mexique',
  'Back to home': 'Retour à l’accueil',
  'Get in touch': 'Nous contacter',
  Language: 'Langue',
  Phase: 'Phase',
  Legal: 'Mentions légales',
  'We hire guides, planners, and storytellers who treat the outdoors with respect and travelers with care.':
    'Nous recrutons des guides, des planificateurs et des conteurs qui respectent la nature et prennent soin des voyageurs.',
  'Why work with us': 'Pourquoi nous rejoindre',
  'Small, senior team. Real time in the field. Fair pay, certified training budgets, and the autonomy to design trips you would want to take yourself.':
    'Une petite équipe expérimentée. Du vrai temps sur le terrain. Une rémunération juste, des budgets de formation certifiée et l’autonomie pour concevoir les voyages que vous aimeriez faire vous-même.',
  'Open roles': 'Postes ouverts',
  'We are always looking for IFMGA-track mountain guides, route planners, and guest-experience leads across Mexico and our partner regions. Send us a note and tell us what you love to guide.':
    'Nous recherchons en permanence des guides de montagne en filière IFMGA, des planificateurs d’itinéraires et des responsables de l’expérience client au Mexique et dans nos régions partenaires. Écrivez-nous et dites-nous ce que vous aimez guider.',
  'Logos, founder bios, and high-resolution imagery for journalists and partners.':
    'Logos, biographies des fondateurs et images haute résolution pour les journalistes et les partenaires.',
  'About the company': 'À propos de l’entreprise',
  'Founded in 2011 in Oaxaca, we run certified small-group hikes and guided adventures rooted in Mexico, with trusted partners worldwide.':
    'Fondée en 2011 à Oaxaca, nous proposons des randonnées certifiées en petits groupes et des aventures guidées enracinées au Mexique, avec des partenaires de confiance dans le monde entier.',
  'Media requests': 'Demandes presse',
  'For interviews, imagery, or fact-checking, reach our team and we will respond within one business day with everything you need.':
    'Pour des interviews, des images ou des vérifications, contactez notre équipe : nous répondons sous un jour ouvré avec tout ce qu’il vous faut.',
  'Low-impact travel that supports the communities and landscapes we move through, season after season.':
    'Un voyage à faible impact qui soutient les communautés et les paysages que nous traversons, saison après saison.',
  'Local first': 'Le local d’abord',
  'We hire local certified guides, stay in locally owned lodges, and route trips to spread value across the regions we visit.':
    'Nous employons des guides locaux certifiés, logeons dans des hébergements appartenant à des locaux et concevons des itinéraires qui répartissent la valeur dans les régions visitées.',
  'Leave no trace': 'Ne laisser aucune trace',
  'Small groups, packed-out waste, and carefully managed trail use keep wild places wild for the travelers who follow.':
    'Des petits groupes, des déchets remportés et une gestion soignée des sentiers préservent les espaces sauvages pour les voyageurs qui suivent.',
  'Answers to the questions travelers ask us most before they book.':
    'Les réponses aux questions que les voyageurs nous posent le plus avant de réserver.',
  'How fit do I need to be?': 'Quelle condition physique faut-il ?',
  'We grade every trip by intensity and offer routes for all skill levels — from relaxed day hikes to technical multi-day expeditions.':
    'Nous classons chaque voyage par intensité et proposons des itinéraires pour tous les niveaux — de la randonnée tranquille d’une journée à l’expédition technique de plusieurs jours.',
  'How big are the groups?': 'Quelle est la taille des groupes ?',
  'Most trips run with 6 to 12 travelers and a certified guide, for better pace control and deeper local access.':
    'La plupart des voyages réunissent 6 à 12 voyageurs et un guide certifié, pour mieux maîtriser le rythme et accéder plus profondément au local.',
  'What is included?': 'Qu’est-ce qui est inclus ?',
  'Guiding, logistics, safety support, and a detailed trip brief. Inclusions are listed transparently before you book.':
    'L’encadrement, la logistique, l’assistance sécurité et un dossier de voyage détaillé. Les prestations sont listées en toute transparence avant la réservation.',
  'The essentials on deposits, changes, and cancellations — written in plain language.':
    'L’essentiel sur les acomptes, les modifications et les annulations — en termes clairs.',
  'Deposits & payment': 'Acomptes et paiement',
  'A deposit secures your place; the balance is due before departure. We confirm every detail in writing first.':
    'Un acompte réserve votre place ; le solde est dû avant le départ. Nous confirmons d’abord chaque détail par écrit.',
  'Changes & cancellations': 'Modifications et annulations',
  'Plans change. We offer flexible rebooking windows and clear refund tiers depending on how far out you cancel.':
    'Les plans changent. Nous offrons des fenêtres de report flexibles et des paliers de remboursement clairs selon l’anticipation de votre annulation.',
  'Adventure travel carries real risk. We require coverage so you can focus on the experience.':
    'Le voyage d’aventure comporte de vrais risques. Nous exigeons une assurance pour que vous puissiez vous concentrer sur l’expérience.',
  'What we require': 'Ce que nous exigeons',
  'All travelers need insurance covering medical care, emergency evacuation, and trip cancellation appropriate to the activity level.':
    'Tous les voyageurs doivent disposer d’une assurance couvrant les soins médicaux, l’évacuation d’urgence et l’annulation, adaptée au niveau d’activité.',
  'How we help': 'Comment nous aidons',
  'We can recommend trusted providers and outline the activity details your policy should cover for your specific itinerary.':
    'Nous pouvons recommander des prestataires de confiance et préciser les activités que votre contrat doit couvrir pour votre itinéraire.',
  'How we collect, use, and protect the information you share with us.':
    'Comment nous collectons, utilisons et protégeons les informations que vous partagez avec nous.',
  'What we collect': 'Ce que nous collectons',
  'Only what we need to plan your trip and stay in touch — your name, contact details, and the trip preferences you provide.':
    'Uniquement ce dont nous avons besoin pour planifier votre voyage et rester en contact : votre nom, vos coordonnées et les préférences que vous nous communiquez.',
  'How we use it': 'Comment nous l’utilisons',
  'We use your information to plan and run your trip and to respond to your inquiries. We never sell your personal data.':
    'Nous utilisons vos informations pour planifier et organiser votre voyage et répondre à vos demandes. Nous ne vendons jamais vos données personnelles.',
  'The agreement that governs your use of our website and services.':
    'L’accord qui régit votre utilisation de notre site et de nos services.',
  'Using our services': 'Utilisation de nos services',
  'By booking with us you agree to follow guide instructions, safety briefings, and the reasonable requirements of each itinerary.':
    'En réservant avec nous, vous acceptez de suivre les consignes des guides, les briefings de sécurité et les exigences raisonnables de chaque itinéraire.',
  Liability: 'Responsabilité',
  'Adventure travel involves inherent risks. We operate to high safety standards, and travelers accept responsibility for participating informed and prepared.':
    'Le voyage d’aventure comporte des risques inhérents. Nous appliquons des normes de sécurité élevées, et les voyageurs acceptent de participer informés et préparés.',
  'We keep cookies to a minimum — just enough to make the site work well.':
    'Nous limitons les cookies au minimum — juste assez pour que le site fonctionne bien.',
  'Essential cookies': 'Cookies essentiels',
  'These remember your language preference and keep the site running smoothly. They cannot be switched off.':
    'Ils mémorisent votre préférence de langue et assurent le bon fonctionnement du site. Ils ne peuvent pas être désactivés.',
  Analytics: 'Analytique',
  'We use privacy-friendly analytics to understand what travelers find useful, always in aggregate and never tied to your identity.':
    'Nous utilisons une analytique respectueuse de la vie privée pour comprendre ce qui est utile aux voyageurs, toujours de façon agrégée et jamais liée à votre identité.',
  Close: 'Fermer',
  Privacy: 'Confidentialité',
  'Always on': 'Toujours actifs',
  Cancel: 'Annuler',
  'Save preferences': 'Enregistrer les préférences',
  'Typical duration': 'Durée habituelle',
  Intensity: 'Intensité',
  'View full details': 'Voir tous les détails',
  Overview: 'Aperçu',
  'What is included': 'Ce qui est inclus',
  'Ready to plan this experience?': 'Prêt à planifier cette expérience ?',
  Back: 'Retour',
  'Experience not found': 'Expérience introuvable',
  'You are subscribed!': 'Vous êtes abonné !',
  'Thanks — your first trail note arrives within a week.':
    'Merci — votre première note de sentier arrive sous une semaine.',
  'Half-day to 8 days': 'D’une demi-journée à 8 jours',
  'Moderate to advanced': 'Modéré à avancé',
  '2 hours to 3 days': 'De 2 heures à 3 jours',
  'Beginner to technical': 'Débutant à technique',
  '5 to 10 days': 'De 5 à 10 jours',
  'Moderate, fully supported': 'Modéré, entièrement encadré',
  'Certified local guides on every route':
    'Guides locaux certifiés sur chaque itinéraire',
  'Weather-window planning built into each itinerary':
    'Planification des fenêtres météo intégrée à chaque itinéraire',
  'Small groups with pace matched to your fitness':
    'Petits groupes au rythme adapté à votre condition physique',
  'Gear checklist and acclimatization guidance included':
    'Liste d’équipement et conseils d’acclimatation inclus',
  'Our guided hikes span volcanic highlands, canyon rims, and alpine traverses. Each route is scouted seasonally and led by guides who live in the region — not fly-in operators.':
    'Nos randonnées guidées couvrent les hauts plateaux volcaniques, les crêtes de canyon et les traversées alpines. Chaque itinéraire est reconnu saison après saison et mené par des guides qui vivent dans la région — pas des opérateurs extérieurs.',
  'Activity-specific safety briefings before every session':
    'Briefings de sécurité spécifiques à chaque activité avant chaque session',
  'Professional-grade equipment provided where needed':
    'Équipement de qualité professionnelle fourni si nécessaire',
  'Routes matched to experience level and conditions':
    'Itinéraires adaptés au niveau d’expérience et aux conditions',
  'Optional add-ons to multi-day expedition itineraries':
    'Options complémentaires pour les itinéraires d’expédition de plusieurs jours',
  'From canyon rappels to coastal kayaking and rock sessions, we pair high-adrenaline activities with conservative safety margins and expert instruction.':
    'Du rappel en canyon au kayak côtier et aux sessions sur rocher, nous associons activités à forte adrénaline, marges de sécurité prudentes et encadrement expert.',
  'Day-by-day visual itinerary before you depart':
    'Itinéraire visuel jour par jour avant le départ',
  'Local hosts, lodges, and culinary experiences woven in':
    'Hôtes locaux, lodges et expériences culinaires intégrés',
  'Private or small-group formats available':
    'Formats privés ou en petits groupes disponibles',
  'End-to-end logistics handled by a named trip lead':
    'Logistique de bout en bout gérée par un responsable de voyage identifié',
  'These are our signature multi-day expeditions — designed like a film treatment with real terrain, cultural depth, and a single point of contact from planning through return.':
    'Ce sont nos expéditions phares de plusieurs jours — conçues comme un traitement cinématographique avec du vrai terrain, une profondeur culturelle et un interlocuteur unique de la planification au retour.',
}

const ar: Dict = {
  Activities: 'الأنشطة',
  Destinations: 'الوجهات',
  Contact: 'اتصل بنا',
  'Plan a trip': 'خطّط لرحلة',
  'Travel and Adventure': 'السفر والمغامرة',
  'Bespoke adventure journeys,': 'رحلات مغامرة مصمّمة خصيصًا،',
  'crafted for real explorers.': 'صُمّمت للمستكشفين الحقيقيين.',
  'From volcanic summits in Mexico to iconic trails worldwide, The Activity Lab designs guided hikes and outdoor experiences that balance challenge, safety, and streamlined logistics for professionals with limited time.':
    'من القمم البركانية في المكسيك إلى المسارات الأيقونية حول العالم، يصمّم The Activity Lab رحلات مشي موجَّهة وتجارب في الهواء الطلق توازن بين التحدّي والسلامة واللوجستيات السلسة للمحترفين ذوي الوقت المحدود.',
  'Start your adventure': 'ابدأ مغامرتك',
  'See activities': 'استعرض الأنشطة',
  'Hikes and trekking': 'المشي والترحال',
  'Outdoor activities': 'أنشطة الهواء الطلق',
  'Guided experiences': 'تجارب موجَّهة',
  'Featured trip': 'رحلة مميّزة',
  'Mexico Highlands Traverse': 'عبور مرتفعات المكسيك',
  'Six days of guided ridge hikes, canyon routes, and cultural immersion':
    'ستة أيام من المشي الموجَّه على القمم ومسارات الأودية والانغماس الثقافي',
  'Mexico and worldwide locations': 'المكسيك ووجهات حول العالم',
  'Guided trips': 'رحلات موجَّهة',
  'Curated hikes and active expeditions': 'رحلات مشي منتقاة ورحلات استكشافية نشطة',
  Scroll: 'مرّر',
  'Built for professionals': 'مصمَّم للمحترفين',
  'What serious travelers actually optimize for.': 'ما الذي يهتمّ به المسافرون الجادّون فعلًا.',
  'Research-backed priorities: less friction, better safety, smaller groups, and clearer planning confidence before booking.':
    'أولويات مدعومة بالأبحاث: احتكاك أقل، وسلامة أفضل، ومجموعات أصغر، وثقة أوضح في التخطيط قبل الحجز.',
  'Time-efficient planning': 'تخطيط موفِّر للوقت',
  'One planning call, fast route options, and a clear next step within 24 hours.':
    'مكالمة تخطيط واحدة، وخيارات مسار سريعة، وخطوة تالية واضحة خلال 24 ساعة.',
  'Safety and duty of care': 'السلامة وواجب الرعاية',
  'Certified local guides, risk-aware itineraries, and 24/7 on-trip support.':
    'مرشدون محلّيون معتمدون، ومسارات تراعي المخاطر، ودعم على مدار الساعة أثناء الرحلة.',
  'Small-group quality': 'جودة المجموعات الصغيرة',
  'Intimate groups for better pace control, less waiting, and deeper local access.':
    'مجموعات صغيرة لتحكّم أفضل في الإيقاع، وانتظار أقل، ووصول أعمق إلى المحلّي.',
  'Transparent trip scope': 'نطاق رحلة شفّاف',
  'Visible inclusions, activity intensity, and realistic seasonal guidance.':
    'ما يشمله البرنامج بوضوح، وشدّة النشاط، وإرشاد موسمي واقعي.',
  'Expedition film': 'فيلم الرحلة',
  'Scroll to travel': 'مرّر للسفر',
  'Chapter 01 — Basecamp': 'الفصل 01 — المخيّم الأساسي',
  'Wake up inside the range.': 'استيقظ داخل سلسلة الجبال.',
  'Acclimatize at altitude with certified local guides as first light moves across camp.':
    'تأقلم مع الارتفاع بصحبة مرشدين محلّيين معتمدين بينما ينساب أول ضوء عبر المخيّم.',
  'Chapter 02 — The approach': 'الفصل 02 — الاقتراب',
  'Move between landscapes.': 'تنقّل بين المناظر الطبيعية.',
  'Valleys, ridgelines, and the quiet roads that connect one horizon to the next.':
    'وديان وخطوط قمم وطرق هادئة تربط أُفقًا بآخر.',
  'Chapter 03 — New horizons': 'الفصل 03 — آفاق جديدة',
  'Every summit opens the next.': 'كل قمّة تفتح التي تليها.',
  'From snowline to coastline, each expedition is designed to lead into the one after it.':
    'من خط الثلج إلى الساحل، صُمّمت كل رحلة لتقود إلى التي تليها.',
  'What we offer': 'ما نقدّمه',
  'Signature experiences for every style of adventurer.': 'تجارب مميّزة لكل نوع من المغامرين.',
  'Join day hikes, multi-day trekking routes, and technical outdoor activities led by expert guides and tailored to your pace.':
    'انضمّ إلى رحلات مشي ليوم واحد، ومسارات ترحال لعدّة أيام، وأنشطة خارجية تقنية بقيادة خبراء ومصمّمة وفق إيقاعك.',
  'Every itinerary is personalized, safety-first, and built around meaningful local insight.':
    'كل برنامج مخصّص، يضع السلامة أولًا، ويُبنى على معرفة محلّية ذات قيمة.',
  Explore: 'اكتشف',
  Trek: 'ترحال',
  'Guided Hikes': 'رحلات مشي موجَّهة',
  'From volcano summits in Mexico to alpine ridgelines in Patagonia — expert-led treks for every skill level.':
    'من القمم البركانية في المكسيك إلى القمم الألبية في باتاغونيا — رحلات بقيادة خبراء لكل المستويات.',
  'All skill levels': 'كل المستويات',
  'Half-day to multi-day': 'من نصف يوم إلى عدّة أيام',
  'Certified guides': 'مرشدون معتمدون',
  Adventure: 'مغامرة',
  'Outdoor Activities': 'أنشطة الهواء الطلق',
  'Kayaking, rock climbing, canyon rappelling, and wildlife encounters — curated for thrill and safety.':
    'تجديف الكاياك، وتسلّق الصخور، والنزول بالحبال في الأودية، ولقاءات الحياة البرّية — منتقاة للإثارة والسلامة.',
  'Water & rock': 'ماء وصخر',
  'Small groups': 'مجموعات صغيرة',
  'Safety-first': 'السلامة أولًا',
  Expedition: 'رحلة استكشافية',
  'Immersive Journeys': 'رحلات غامرة',
  'Multi-day expeditions that blend culture, cuisine, and landscape — travel that stays with you.':
    'رحلات استكشافية لعدّة أيام تمزج الثقافة والمطبخ والمناظر — سفر يبقى معك.',
  '5–10 days': '5–10 أيام',
  'Culture + nature': 'ثقافة + طبيعة',
  'Fully guided': 'موجَّه بالكامل',
  'Mexico at the core, the world within reach.': 'المكسيك في القلب، والعالم في المتناول.',
  "We specialize in Mexico's most compelling landscapes while also curating guided journeys across globally renowned adventure regions.":
    'نتخصّص في أكثر مناظر المكسيك إبهارًا، ونصمّم أيضًا رحلات موجَّهة عبر مناطق مغامرة مشهورة عالميًا.',
  Featured: 'مميّز',
  'Plan this trip': 'خطّط لهذه الرحلة',
  'Home base': 'القاعدة الرئيسية',
  'Our backyard — volcanic summits, copper canyons, and highland trails we know intimately, season by season.':
    'فناؤنا الخلفي — قمم بركانية، وأودية نحاسية، ومسارات مرتفعة نعرفها عن قرب، موسمًا بعد موسم.',
  Mexico: 'المكسيك',
  'Oaxaca Highlands': 'مرتفعات واهاكا',
  'Copper Canyon': 'وادي النحاس',
  'Volcán Iztaccíhuatl': 'بركان إيستاكسيواتل',
  'Chiapas Jungle': 'أدغال تشياباس',
  'Nearby frontiers': 'حدود قريبة',
  'Cloud forests and active volcanoes a short hop from our Mexico hubs.':
    'غابات ضبابية وبراكين نشطة على بُعد خطوة من مراكزنا في المكسيك.',
  'Central America': 'أمريكا الوسطى',
  'Guatemala Volcanoes': 'براكين غواتيمالا',
  'Costa Rica Cloud Forest': 'غابة كوستاريكا الضبابية',
  'Panama Highlands': 'مرتفعات بنما',
  'Global icons': 'أيقونات عالمية',
  'Bucket-list ranges run with vetted local partners.':
    'سلاسل جبلية من قائمة الأحلام نديرها مع شركاء محلّيين موثوقين.',
  Worldwide: 'حول العالم',
  Patagonia: 'باتاغونيا',
  'Nepal Himalaya': 'هيمالايا نيبال',
  'Iceland Highlands': 'مرتفعات آيسلندا',
  'Morocco Atlas': 'أطلس المغرب',
  'Photo journal': 'يوميات مصوّرة',
  'More places. More visual depth.': 'أماكن أكثر. عمق بصري أكبر.',
  'A premium gallery strip inspired by modern cover pages, with cinematic parallax and richer destination storytelling.':
    'شريط معرض راقٍ مستوحى من أغلفة عصرية، مع تأثير بارالاكس سينمائي وسرد أغنى للوجهات.',
  'Alpine dawn ascents': 'صعود ألبي عند الفجر',
  'Jungle river crossings': 'عبور أنهار الأدغال',
  'Chiapas, Mexico': 'تشياباس، المكسيك',
  'Volcanic ridge trekking': 'ترحال على القمم البركانية',
  'Central Mexico': 'وسط المكسيك',
  'Canyon sunset camps': 'مخيّمات الأودية عند الغروب',
  'Highland trail mornings': 'صباحات على مسارات المرتفعات',
  'Oaxaca, Mexico': 'واهاكا، المكسيك',
  'Glacier valley routes': 'مسارات وديان الأنهار الجليدية',
  Iceland: 'آيسلندا',
  About: 'من نحن',
  'Local expertise, global adventure standards.': 'خبرة محلّية، ومعايير مغامرة عالمية.',
  'We build active travel experiences for people who want more than sightseeing — real movement, real terrain, and memorable places.':
    'نصنع تجارب سفر نشطة لمن يريدون أكثر من مجرّد مشاهدة المعالم — حركة حقيقية، وتضاريس حقيقية، وأماكن لا تُنسى.',
  'With deep roots in Mexico and trusted partners worldwide, we deliver guided journeys that feel both authentic and meticulously organized.':
    'بجذور عميقة في المكسيك وشركاء موثوقين حول العالم، نقدّم رحلات موجَّهة أصيلة ومنظَّمة بدقّة.',
  'Since 2011': 'منذ 2011',
  'Oaxaca-based': 'مقرّنا واهاكا',
  '2,500+ travelers': 'أكثر من 2,500 مسافر',
  'On the trail': 'على المسار',
  'Real terrain, expertly guided.': 'تضاريس حقيقية، بإرشاد خبير.',
  'Would return': 'سيعودون',
  'How it works': 'كيف يعمل',
  'Three phases from idea to trailhead.': 'ثلاث مراحل من الفكرة إلى نقطة الانطلاق.',
  Discover: 'اكتشف',
  '3-minute intake': 'استبيان من 3 دقائق',
  'Tell us your preferred terrain, pace, and comfort level in 3 minutes.':
    'أخبرنا خلال 3 دقائق عن التضاريس المفضّلة لديك وإيقاعك ومستوى راحتك.',
  Design: 'نصمّم',
  '48-hour turnaround': 'إنجاز خلال 48 ساعة',
  'We draft a cinematic day-by-day itinerary with weather windows.':
    'نصمّم برنامجًا يوميًا بطابع سينمائي مع نوافذ مناخية.',
  Deliver: 'نسلّم',
  'Trip-ready brief': 'ملخّص جاهز للرحلة',
  'You get a ready-to-run trip brief with logistics, safety, and local contacts.':
    'تحصل على ملخّص رحلة جاهز للتنفيذ يشمل اللوجستيات والسلامة وجهات الاتصال المحلّية.',
  'Tell us where adventure should take you next.': 'أخبرنا إلى أين يجب أن تأخذك المغامرة القادمة.',
  'Share your goals, dates, and experience level. We turn that into a practical, expert guided plan designed for busy professionals and high-expectation travelers.':
    'شاركنا أهدافك وتواريخك ومستوى خبرتك. نحوّل ذلك إلى خطة عملية بإرشاد خبير، مصمّمة للمحترفين المشغولين والمسافرين أصحاب التوقّعات العالية.',
  'Response target: within 1 business day': 'زمن الردّ: خلال يوم عمل واحد',
  'Trip planning options from approximately $1,900 per traveler':
    'خيارات تخطيط الرحلات تبدأ من نحو 1,900 دولار لكل مسافر',
  'Formats: private guided, team retreat, milestone expedition':
    'الصيغ: إرشاد خاص، خلوة للفريق، رحلة احتفالية',
  'Prefer email?': 'تفضّل البريد الإلكتروني؟',
  'Response within 1 business day': 'ردّ خلال يوم عمل واحد',
  'Small groups, typically 6-12 travelers': 'مجموعات صغيرة، عادةً من 6 إلى 12 مسافرًا',
  'Transparent planning and inclusions': 'تخطيط وخدمات شفّافة',
  'You are on the list!': 'أنت الآن على القائمة!',
  'Thanks for reaching out. We will review your trip details and get back to you within 1-2 business days.':
    'شكرًا لتواصلك. سنراجع تفاصيل رحلتك ونعاود التواصل معك خلال يوم إلى يومَي عمل.',
  'Send another inquiry': 'إرسال استفسار آخر',
  'Trusted by 2,500+ adventurers. Small groups. Local certified guides.':
    'موثوق من أكثر من 2,500 مغامر. مجموعات صغيرة. مرشدون محلّيون معتمدون.',
  'Your name': 'اسمك',
  'Email address': 'البريد الإلكتروني',
  'Dream destination (for example Oaxaca, Patagonia)': 'وجهة الأحلام (مثلًا واهاكا، باتاغونيا)',
  'Tell us about your group, dates, and experience level':
    'حدّثنا عن مجموعتك وتواريخك ومستوى خبرتك',
  'Something went wrong. Please try again or email us at': 'حدث خطأ ما. حاول مجددًا أو راسلنا على',
  'Sending...': 'جارٍ الإرسال...',
  'Send inquiry': 'إرسال الاستفسار',
  'Certified, small-group hikes and guided adventures worldwide. Real terrain, meticulously organized.':
    'رحلات مشي معتمدة في مجموعات صغيرة ومغامرات موجَّهة حول العالم. تضاريس حقيقية، منظَّمة بدقّة.',
  'Trail notes newsletter': 'نشرة «ملاحظات المسار»',
  Subscribe: 'اشترك',
  'One thoughtful email a month. No spam, unsubscribe anytime.':
    'بريد واحد مدروس شهريًا. بلا إزعاج، يمكنك إلغاء الاشتراك في أي وقت.',
  'Guided hikes': 'رحلات مشي موجَّهة',
  Company: 'الشركة',
  Support: 'الدعم',
  'About us': 'معلومات عنّا',
  Careers: 'الوظائف',
  'Press kit': 'حزمة إعلامية',
  Sustainability: 'الاستدامة',
  'Trip FAQ': 'أسئلة شائعة عن الرحلات',
  'Booking terms': 'شروط الحجز',
  'Travel insurance': 'تأمين السفر',
  'Member · Adventure Travel Trade Association': 'عضو · Adventure Travel Trade Association',
  'IFMGA-certified guides': 'مرشدون معتمدون من IFMGA',
  'Fully licensed & insured': 'مرخّصون ومؤمَّنون بالكامل',
  'All rights reserved.': 'جميع الحقوق محفوظة.',
  'Privacy Policy': 'سياسة الخصوصية',
  'Terms of Service': 'شروط الخدمة',
  'Cookie Settings': 'إعدادات الكوكيز',
  'Made with care in Oaxaca, Mexico': 'صُنع بعناية في واهاكا، المكسيك',
  'Back to home': 'العودة إلى الرئيسية',
  'Get in touch': 'تواصل معنا',
  Language: 'اللغة',
  Phase: 'المرحلة',
  Legal: 'الشؤون القانونية',
  'We hire guides, planners, and storytellers who treat the outdoors with respect and travelers with care.':
    'نوظّف مرشدين ومخطّطين ورواةً يعاملون الطبيعة باحترام والمسافرين بعناية.',
  'Why work with us': 'لماذا تعمل معنا',
  'Small, senior team. Real time in the field. Fair pay, certified training budgets, and the autonomy to design trips you would want to take yourself.':
    'فريق صغير وذو خبرة. وقت حقيقي في الميدان. أجر عادل، وميزانيات تدريب معتمدة، وحرية في تصميم رحلات تودّ خوضها بنفسك.',
  'Open roles': 'وظائف شاغرة',
  'We are always looking for IFMGA-track mountain guides, route planners, and guest-experience leads across Mexico and our partner regions. Send us a note and tell us what you love to guide.':
    'نبحث دائمًا عن مرشدي جبال على مسار IFMGA، ومخطّطي مسارات، ومسؤولي تجربة الضيوف في المكسيك ومناطق شركائنا. راسلنا وأخبرنا بما تحبّ إرشاده.',
  'Logos, founder bios, and high-resolution imagery for journalists and partners.':
    'شعارات، ونبذ عن المؤسِّسين، وصور عالية الدقّة للصحفيين والشركاء.',
  'About the company': 'عن الشركة',
  'Founded in 2011 in Oaxaca, we run certified small-group hikes and guided adventures rooted in Mexico, with trusted partners worldwide.':
    'تأسّست عام 2011 في واهاكا، ونقدّم رحلات مشي معتمدة في مجموعات صغيرة ومغامرات موجَّهة متجذّرة في المكسيك، مع شركاء موثوقين حول العالم.',
  'Media requests': 'طلبات الإعلام',
  'For interviews, imagery, or fact-checking, reach our team and we will respond within one business day with everything you need.':
    'للمقابلات أو الصور أو التحقّق من المعلومات، تواصل مع فريقنا وسنردّ خلال يوم عمل واحد بكل ما تحتاجه.',
  'Low-impact travel that supports the communities and landscapes we move through, season after season.':
    'سفر منخفض الأثر يدعم المجتمعات والمناظر التي نمرّ بها، موسمًا بعد موسم.',
  'Local first': 'المحلّي أولًا',
  'We hire local certified guides, stay in locally owned lodges, and route trips to spread value across the regions we visit.':
    'نوظّف مرشدين محلّيين معتمدين، ونقيم في نُزل مملوكة محلّيًا، ونصمّم المسارات لتوزيع القيمة على المناطق التي نزورها.',
  'Leave no trace': 'لا تترك أثرًا',
  'Small groups, packed-out waste, and carefully managed trail use keep wild places wild for the travelers who follow.':
    'المجموعات الصغيرة، وإخراج النفايات معنا، والاستخدام المدروس للمسارات تُبقي الأماكن البرّية على طبيعتها لمن يأتون بعدنا.',
  'Answers to the questions travelers ask us most before they book.':
    'إجابات عن أكثر الأسئلة التي يطرحها المسافرون قبل الحجز.',
  'How fit do I need to be?': 'ما مستوى اللياقة المطلوب؟',
  'We grade every trip by intensity and offer routes for all skill levels — from relaxed day hikes to technical multi-day expeditions.':
    'نصنّف كل رحلة حسب شدّتها ونوفّر مسارات لكل المستويات — من رحلات مشي هادئة ليوم واحد إلى رحلات تقنية لعدّة أيام.',
  'How big are the groups?': 'ما حجم المجموعات؟',
  'Most trips run with 6 to 12 travelers and a certified guide, for better pace control and deeper local access.':
    'تُنفَّذ معظم الرحلات بمجموعة من 6 إلى 12 مسافرًا ومرشد معتمد، لتحكّم أفضل في الإيقاع ووصول أعمق إلى المحلّي.',
  'What is included?': 'ماذا يشمل؟',
  'Guiding, logistics, safety support, and a detailed trip brief. Inclusions are listed transparently before you book.':
    'الإرشاد، واللوجستيات، ودعم السلامة، وملخّص رحلة مفصّل. تُذكر التفاصيل بشفافية قبل الحجز.',
  'The essentials on deposits, changes, and cancellations — written in plain language.':
    'أساسيات الدفعات والتغييرات والإلغاءات — بلغة واضحة.',
  'Deposits & payment': 'الدفعات والسداد',
  'A deposit secures your place; the balance is due before departure. We confirm every detail in writing first.':
    'تحجز الدفعة المقدّمة مكانك؛ ويُسدّد المتبقّي قبل الانطلاق. نؤكّد كل تفصيل كتابيًا أولًا.',
  'Changes & cancellations': 'التغييرات والإلغاءات',
  'Plans change. We offer flexible rebooking windows and clear refund tiers depending on how far out you cancel.':
    'تتغيّر الخطط. نوفّر نوافذ إعادة حجز مرنة ومستويات استرداد واضحة حسب مدى تبكيرك في الإلغاء.',
  'Adventure travel carries real risk. We require coverage so you can focus on the experience.':
    'تحمل سياحة المغامرة مخاطر حقيقية. نشترط وجود تغطية تأمينية كي تركّز على التجربة.',
  'What we require': 'ما نشترطه',
  'All travelers need insurance covering medical care, emergency evacuation, and trip cancellation appropriate to the activity level.':
    'يحتاج جميع المسافرين إلى تأمين يغطّي الرعاية الطبّية والإخلاء الطارئ وإلغاء الرحلة بما يناسب مستوى النشاط.',
  'How we help': 'كيف نساعد',
  'We can recommend trusted providers and outline the activity details your policy should cover for your specific itinerary.':
    'يمكننا ترشيح مزوّدين موثوقين وتوضيح تفاصيل الأنشطة التي ينبغي أن تغطّيها وثيقتك لبرنامجك المحدّد.',
  'How we collect, use, and protect the information you share with us.':
    'كيف نجمع المعلومات التي تشاركها معنا ونستخدمها ونحميها.',
  'What we collect': 'ما نجمعه',
  'Only what we need to plan your trip and stay in touch — your name, contact details, and the trip preferences you provide.':
    'فقط ما نحتاجه لتخطيط رحلتك والبقاء على تواصل — اسمك، وبيانات الاتصال، وتفضيلات الرحلة التي تقدّمها.',
  'How we use it': 'كيف نستخدمها',
  'We use your information to plan and run your trip and to respond to your inquiries. We never sell your personal data.':
    'نستخدم معلوماتك لتخطيط رحلتك وتنفيذها وللردّ على استفساراتك. لا نبيع بياناتك الشخصية أبدًا.',
  'The agreement that governs your use of our website and services.':
    'الاتفاق الذي يحكم استخدامك لموقعنا وخدماتنا.',
  'Using our services': 'استخدام خدماتنا',
  'By booking with us you agree to follow guide instructions, safety briefings, and the reasonable requirements of each itinerary.':
    'بالحجز معنا، فإنك توافق على اتّباع تعليمات المرشد، وإحاطات السلامة، والمتطلّبات المعقولة لكل برنامج.',
  Liability: 'المسؤولية',
  'Adventure travel involves inherent risks. We operate to high safety standards, and travelers accept responsibility for participating informed and prepared.':
    'تنطوي سياحة المغامرة على مخاطر متأصّلة. نعمل وفق معايير سلامة عالية، ويتحمّل المسافرون مسؤولية المشاركة وهم على دراية واستعداد.',
  'We keep cookies to a minimum — just enough to make the site work well.':
    'نُبقي ملفّات الكوكيز عند الحدّ الأدنى — بما يكفي فقط لعمل الموقع جيدًا.',
  'Essential cookies': 'كوكيز أساسية',
  'These remember your language preference and keep the site running smoothly. They cannot be switched off.':
    'تتذكّر تفضيلك للّغة وتُبقي الموقع يعمل بسلاسة. ولا يمكن إيقافها.',
  Analytics: 'التحليلات',
  'We use privacy-friendly analytics to understand what travelers find useful, always in aggregate and never tied to your identity.':
    'نستخدم تحليلات تحترم الخصوصية لفهم ما يجده المسافرون مفيدًا، دائمًا بشكل إجمالي ودون ربطه بهويّتك.',
  Close: 'إغلاق',
  Privacy: 'الخصوصية',
  'Always on': 'دائمًا مفعّلة',
  Cancel: 'إلغاء',
  'Save preferences': 'حفظ التفضيلات',
  'Typical duration': 'المدة المعتادة',
  Intensity: 'الشدّة',
  'View full details': 'عرض التفاصيل الكاملة',
  Overview: 'نظرة عامة',
  'What is included': 'ما يشمله البرنامج',
  'Ready to plan this experience?': 'هل أنت مستعد لتخطيط هذه التجربة؟',
  Back: 'رجوع',
  'Experience not found': 'التجربة غير موجودة',
  'You are subscribed!': 'أنت مشترك!',
  'Thanks — your first trail note arrives within a week.':
    'شكرًا — ستصلك أول ملاحظة من المسار خلال أسبوع.',
  'Half-day to 8 days': 'من نصف يوم إلى 8 أيام',
  'Moderate to advanced': 'متوسط إلى متقدّم',
  '2 hours to 3 days': 'من ساعتين إلى 3 أيام',
  'Beginner to technical': 'مبتدئ إلى تقني',
  '5 to 10 days': 'من 5 إلى 10 أيام',
  'Moderate, fully supported': 'متوسط، بدعم كامل',
  'Certified local guides on every route':
    'مرشدون محلّيون معتمدون في كل مسار',
  'Weather-window planning built into each itinerary':
    'تخطيط النوافذ المناخية مدمج في كل برنامج',
  'Small groups with pace matched to your fitness':
    'مجموعات صغيرة بإيقاع يناسب لياقتك',
  'Gear checklist and acclimatization guidance included':
    'قائمة معدات وإرشاد للتأقلم مشمولان',
  'Our guided hikes span volcanic highlands, canyon rims, and alpine traverses. Each route is scouted seasonally and led by guides who live in the region — not fly-in operators.':
    'تمتد رحلات المشي الموجَّهة لدينا عبر المرتفعات البركانية وحافة الأودية والعبورات الألبية. يُستكشف كل مسار موسمًا بعد موسم ويقوده مرشدون يعيشون في المنطقة — وليس مشغّلون خارجيون.',
  'Activity-specific safety briefings before every session':
    'إحاطات أمان خاصة بكل نشاط قبل كل جلسة',
  'Professional-grade equipment provided where needed':
    'معدات بمستوى احترافي تُوفَّر عند الحاجة',
  'Routes matched to experience level and conditions':
    'مسارات تتوافق مع مستوى الخبرة والظروف',
  'Optional add-ons to multi-day expedition itineraries':
    'إضافات اختيارية لبرامج الرحلات لعدّة أيام',
  'From canyon rappels to coastal kayaking and rock sessions, we pair high-adrenaline activities with conservative safety margins and expert instruction.':
    'من النزول بالحبال في الأودية إلى التجديف الساحلي وجلسات الصخور، نمزج أنشطة عالية الأدرينalin مع هوامش أمان محافظة وإرشاد خبير.',
  'Day-by-day visual itinerary before you depart':
    'برنامج مرئي يومًا بيوم قبل المغادرة',
  'Local hosts, lodges, and culinary experiences woven in':
    'مضيفون محلّيون ونُزل وتجارب طهي مدمجة',
  'Private or small-group formats available':
    'صيغ خاصة أو مجموعات صغيرة متاحة',
  'End-to-end logistics handled by a named trip lead':
    'لوجستيات من البداية للنهاية يديرها مسؤول رحلة بالاسم',
  'These are our signature multi-day expeditions — designed like a film treatment with real terrain, cultural depth, and a single point of contact from planning through return.':
    'هذه رحلاتنا الاستكشافية المميّزة لعدّة أيام — مصمّمة كمعالجة سينمائية بتضاريس حقيقية وعمق ثقافي ونقطة تواصل واحدة من التخطيط حتى العودة.',
}

const DICTS: Record<Exclude<Lang, 'en'>, Dict> = { es, fr, ar }

type I18nValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isSwitching: boolean
  setLang: (lang: Lang) => void
  t: (en: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored
  const nav = window.navigator.language.slice(0, 2).toLowerCase()
  const match = LANGUAGES.find((l) => l.code === nav)
  return match ? match.code : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)
  const [isSwitching, setIsSwitching] = useState(false)
  const switchTimerRef = useRef<number | null>(null)

  const dir = useMemo<'ltr' | 'rtl'>(
    () => LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr',
    [lang],
  )

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  useEffect(
    () => () => {
      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current)
      }
    },
    [],
  )

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return
      setLangState(next)
      setIsSwitching(true)

      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current)
      }

      switchTimerRef.current = window.setTimeout(() => {
        setIsSwitching(false)
        switchTimerRef.current = null
      }, 260)
    },
    [lang],
  )

  const t = useCallback(
    (en: string) => {
      if (lang === 'en') return en
      return DICTS[lang][en] ?? en
    },
    [lang],
  )

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, isSwitching, setLang, t }),
    [lang, dir, isSwitching, setLang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
