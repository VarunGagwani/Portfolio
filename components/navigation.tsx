"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
]

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = React.useState("home")
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id || "home")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const container = document.querySelector('.snap-y')
    if (!container) return

    const section = document.getElementById(sectionId)
    if (!section) return

    setActiveSection(sectionId)
    setIsMenuOpen(false)
    
    if (sectionId === "home") {
      container.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } else {
      section.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "transition-colors hover:text-foreground/80 relative",
                activeSection === item.href
                  ? "text-foreground after:absolute after:bottom-[-1.2rem] after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
                    activeSection === item.href
                      ? "text-foreground bg-accent"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}