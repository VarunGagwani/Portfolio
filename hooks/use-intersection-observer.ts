import { useEffect, useState, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [activeSection, setActiveSection] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionsRef = useRef<Map<string, Element>>(new Map())

  const { threshold = 0.5, rootMargin = '-20% 0px -20% 0px', root = null } = options

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0
        let activeSectionId = ''

        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            const target = entry.target as HTMLElement
            activeSectionId = target.id
          }
        })

        // Update active section if we found one
        if (activeSectionId) {
          setActiveSection(activeSectionId)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    // Observe all existing sections
    sectionsRef.current.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, root])

  const observeSection = (id: string, element: Element) => {
    sectionsRef.current.set(id, element)
    if (observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  const unobserveSection = (id: string) => {
    const element = sectionsRef.current.get(id)
    if (element && observerRef.current) {
      observerRef.current.unobserve(element)
      sectionsRef.current.delete(id)
    }
  }

  return {
    activeSection,
    observeSection,
    unobserveSection,
  }
}