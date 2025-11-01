"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight, BookText } from "lucide-react"
import About from "./about/page"
import Blog from "./blog/page"
import Projects from "./projects/page"
import Experience from "./experience/page"
import Contact from "./contact/page"
import Image from "next/image"
import { useEffect, useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }, [])

  // Improved touch handling for mobile devices
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleTouchStart = () => {
      isScrolling = true
      clearTimeout(scrollTimeout)
    }

    const handleTouchEnd = () => {
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    const handleScroll = () => {
      if (!isScrolling) {
        container.style.scrollBehavior = 'smooth'
      } else {
        container.style.scrollBehavior = 'auto'
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto scroll-smooth">
      <section id="home" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <Container size="xl" padding="lg" className="flex items-center justify-center min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center text-center spacing-lg"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8 relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20"
                >
                  <Image
                    src="/profile.jpg"
                    alt="Varun Gagwani"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Hi, I&apos;m Varun Gagwani
                </motion.h1>
                <motion.p 
                  className="text-responsive-lg leading-relaxed text-muted-foreground max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Cybersecurity Analyst | Data Scientist | Full-Stack Developer
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button asChild className="w-full sm:w-auto min-h-[44px] btn-enhanced">
                    <a href="#projects">
                      View Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full sm:w-auto min-h-[44px] btn-enhanced">
                    <a href="#blog">
                      Read Blog
                      <BookText className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Container>
        </div>
      </section>

      <section id="about" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-20 pb-8">
          <About />
        </div>
      </section>

      <section id="blog" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-20 pb-8">
          <Blog />
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-20 pb-8">
          <Projects />
        </div>
      </section>

      <section id="experience" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-20 pb-8">
          <Experience />
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-[url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-20 pb-8">
          <Contact />
        </div>
      </section>
    </div>
  )
}