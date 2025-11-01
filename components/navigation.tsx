"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Blog", href: "blog" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
]

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const menuButtonRef = React.useRef<HTMLButtonElement>(null)
  
  // Use intersection observer for accurate section detection
  const { activeSection, observeSection, unobserveSection } = useIntersectionObserver({
    threshold: [0.1, 0.5, 0.9],
    rootMargin: '-10% 0px -10% 0px'
  })

  // Set up intersection observer for sections when component mounts
  React.useEffect(() => {
    if (pathname === "/") {
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        if (section.id) {
          observeSection(section.id, section)
        }
      })

      return () => {
        sections.forEach((section) => {
          if (section.id) {
            unobserveSection(section.id)
          }
        })
      }
    }
  }, [pathname, observeSection, unobserveSection])

  // Handle direct page navigation (non-homepage)
  const currentActiveSection = React.useMemo(() => {
    if (pathname === "/") {
      return activeSection || "home"
    }
    
    // Extract section from pathname for direct page access
    const pathSegment = pathname.slice(1) // Remove leading slash
    return pathSegment || "home"
  }, [pathname, activeSection])

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false)
    
    // Return focus to menu button when closing mobile menu
    if (isMenuOpen && menuButtonRef.current) {
      setTimeout(() => {
        menuButtonRef.current?.focus()
      }, 100)
    }
    
    if (pathname.startsWith("/blog/") || pathname !== "/") {
      // Navigate to homepage with hash for non-homepage routes
      router.push(`/#${sectionId}`)
    } else {
      // Smooth scroll to section on homepage
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        })
      }
    }
  }

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive flex h-16 items-center justify-between">
        {/* Mobile menu button */}
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="md:hidden min-h-[44px] min-w-[44px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "transition-all duration-300 hover:text-foreground/80 relative min-h-[44px] flex items-center",
                currentActiveSection === item.href
                  ? "text-foreground after:absolute after:bottom-[-1.2rem] after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 top-16 bg-background/80 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu */}
            <div 
              id="mobile-menu"
              className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg md:hidden z-50"
              role="menu"
              aria-labelledby="mobile-menu-button"
            >
              <nav className="container-responsive py-4 space-y-2">
                {navigation.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      "block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 hover:bg-accent focus:bg-accent min-h-[44px] flex items-center rounded-md",
                      currentActiveSection === item.href
                        ? "text-foreground bg-accent border-l-4 border-primary"
                        : "text-foreground/60"
                    )}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                    autoFocus={index === 0 && isMenuOpen}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="min-h-[44px] min-w-[44px]"
          aria-label="Toggle theme"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}