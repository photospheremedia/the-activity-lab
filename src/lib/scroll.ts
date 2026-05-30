const HEADER_OFFSET = 88

export function scrollToSection(id: string, focusSelector?: string) {
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })

  if (focusSelector) {
    window.setTimeout(() => {
      el.querySelector<HTMLElement>(focusSelector)?.focus({ preventScroll: true })
    }, 450)
  }
}

export function scrollToContact(onComplete?: () => void) {
  scrollToSection('contact')
  onComplete?.()
}
