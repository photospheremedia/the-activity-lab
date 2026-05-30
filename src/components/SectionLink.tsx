import { type MouseEvent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../lib/scroll'

type SectionLinkProps = {
  section: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}

export function SectionLink({ section, className, children, onNavigate }: SectionLinkProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onNavigate?.()

    if (pathname === '/') {
      scrollToSection(section)
      window.history.replaceState(null, '', `#${section}`)
      return
    }

    navigate({ pathname: '/', hash: `#${section}` })
  }

  return (
    <a href={`/#${section}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
