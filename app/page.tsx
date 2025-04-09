"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookText } from "lucide-react"
import Link from "next/link"
import About from "./about/page"
import Blog from "./blog/page"
import Projects from "./projects/page"
import Experience from "./experience/page"
import Contact from "./contact/page"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startY = 0
    let startTime = 0
    let lastScrollTime = 0
    let touchStartY = 0
    let isTouchScrolling = false
    let lastDirection = 0
    let scrollVelocity = 0
    let lastScrollY = 0
    let lastScrollTimestamp = 0

    const scrollCooldown = 1000 // 1 second cooldown between section changes
    const sections = container.getElementsByTagName('section')
    const totalSections = sections.length
    const minSwipeDistance = 200 // Increased minimum distance for swipe to trigger section change
    const maxSwipeTime = 800 // Increased maximum time for swipe to be considered intentional
    const edgeThreshold = 150 // Increased distance from edge to trigger section change
    const maxVelocity = 0.5 // Maximum allowed scroll velocity (pixels per millisecond)

    const isAtSectionEdge = (section: Element, direction: number) => {
      const sectionRect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (direction > 0) {
        // Scrolling down - check if we're near the bottom
        return sectionRect.bottom <= viewportHeight + edgeThreshold
      } else {
        // Scrolling up - check if we're near the top
        return sectionRect.top >= -edgeThreshold
      }
    }

    const calculateScrollVelocity = (currentY: number, timestamp: number) => {
      const deltaY = Math.abs(currentY - lastScrollY)
      const deltaTime = timestamp - lastScrollTimestamp
      return deltaTime > 0 ? deltaY / deltaTime : 0
    }

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault()
        return
      }

      const currentSection = sections[currentSectionIndex]
      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentSectionIndex + direction

      // Only prevent default if we're going to change sections
      if (nextIndex >= 0 && nextIndex < totalSections && isAtSectionEdge(currentSection, direction)) {
        e.preventDefault()
        setIsScrolling(true)
        setCurrentSectionIndex(nextIndex)
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' })
        lastScrollTime = now
        setTimeout(() => {
          setIsScrolling(false)
        }, scrollCooldown)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (isTouchScrolling) return
      touchStartY = e.touches[0].clientY
      startTime = Date.now()
      lastScrollY = touchStartY
      lastScrollTimestamp = startTime
      scrollVelocity = 0
      lastDirection = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTouchScrolling) {
        e.preventDefault()
        return
      }

      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault()
        return
      }

      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY
      const swipeTime = now - startTime
      
      // Calculate current scroll velocity
      scrollVelocity = calculateScrollVelocity(currentY, now)
      lastScrollY = currentY
      lastScrollTimestamp = now

      // Only process if it's a deliberate swipe gesture and velocity is within limits
      if (swipeTime > maxSwipeTime || 
          Math.abs(deltaY) < minSwipeDistance || 
          scrollVelocity > maxVelocity) {
        return
      }

      const direction = deltaY > 0 ? 1 : -1
      
      // Prevent rapid direction changes
      if (lastDirection !== 0 && lastDirection !== direction) {
        return
      }
      lastDirection = direction

      const nextIndex = currentSectionIndex + direction
      const currentSection = sections[currentSectionIndex]

      if (nextIndex >= 0 && nextIndex < totalSections && isAtSectionEdge(currentSection, direction)) {
        e.preventDefault()
        isTouchScrolling = true
        setIsScrolling(true)
        setCurrentSectionIndex(nextIndex)
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' })
        lastScrollTime = now
        setTimeout(() => {
          isTouchScrolling = false
          setIsScrolling(false)
          lastDirection = 0
        }, scrollCooldown)
      }
    }

    const handleTouchEnd = () => {
      isTouchScrolling = false
      lastDirection = 0
      scrollVelocity = 0
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isScrolling, currentSectionIndex])

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
                  <a href="#blog">
                    Read Blog
                    <BookText className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="about" className="snap-start min-h-screen overflow-y-auto bg-[url('https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-16">
          <About />
        </div>
      </section>

      <section id="blog" className="snap-start min-h-screen overflow-y-auto bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-16">
          <Blog />
        </div>
      </section>

      <section id="projects" className="snap-start min-h-screen overflow-y-auto bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-16">
          <Projects />
        </div>
      </section>

      <section id="experience" className="snap-start min-h-screen overflow-y-auto bg-[url('https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-16">
          <Experience />
        </div>
      </section>

      <section id="contact" className="snap-start min-h-screen overflow-y-auto bg-[url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="w-full min-h-screen bg-background/90 backdrop-blur-sm pt-16">
          <Contact />
        </div>
      </section>
    </div>
  )
}