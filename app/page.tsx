"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import About from "./about/page"
import Projects from "./projects/page"
import Experience from "./experience/page"
import Contact from "./contact/page"
import Image from "next/image"
import { useEffect, useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isScrolling = false
    let startY = 0
    const sections = container.getElementsByTagName('section')
    let currentSectionIndex = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentSectionIndex + direction

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling = true
        currentSectionIndex = nextIndex
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          isScrolling = false
        }, 1000)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (isScrolling) return

      const currentY = e.touches[0].clientY
      const direction = startY > currentY ? 1 : -1
      const nextIndex = currentSectionIndex + direction

      if (Math.abs(startY - currentY) > 50 && nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling = true
        currentSectionIndex = nextIndex
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          isScrolling = false
        }, 1000)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <section id="home" className="snap-start h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="container px-4 flex flex-col items-center text-center"
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
                className="text-3xl md:text-4xl font-bold tracking-tight sm:text-6xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Hi, I&apos;m Varun Gagwani
              </motion.h1>
              <motion.p 
                className="mt-4 md:mt-6 text-base md:text-lg leading-8 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Cybersecurity Analyst | Data Scientist | Full-Stack Developer
              </motion.p>
              <motion.div 
                className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button asChild className="w-full md:w-auto">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full md:w-auto">
                  <a href="/resume.pdf" download>
                    Download Resume
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="about" className="snap-start min-h-screen bg-[url('https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-background/90 backdrop-blur-sm">
          <About />
        </div>
      </section>

      <section id="projects" className="snap-start min-h-screen bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-background/90 backdrop-blur-sm">
          <Projects />
        </div>
      </section>

      <section id="experience" className="snap-start min-h-screen bg-[url('https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-background/90 backdrop-blur-sm">
          <Experience />
        </div>
      </section>

      <section id="contact" className="snap-start min-h-screen bg-[url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full bg-background/90 backdrop-blur-sm">
          <Contact />
        </div>
      </section>
    </div>
  )
}