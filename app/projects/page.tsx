"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Hack-A-Holiday",
    description: "A comprehensive travel planning platform that helps users discover destinations, plan itineraries, and book accommodations. Built during a hackathon with a focus on user experience and modern web technologies.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Hack-A-Holiday/Hack-A-Holiday.git",
    demo: "https://hacktravel.vercel.app/"
  },
  {
    title: "Emotion Classifier",
    description: "Real-time emotion detection system using deep learning and computer vision. Processes live video feed to identify and classify human emotions with high accuracy.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
    github: "https://github.com/VarunGagwani/Emotion-Classifier",
    demo: "https://github.com/VarunGagwani/Emotion-Classifier#demo"
  },
  {
    title: "Study Engine",
    description: "Innovative learning platform that helps students organize and optimize their study materials using AI-powered recommendations and analytics.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "MongoDB", "Machine Learning"],
    github: "https://github.com/VarunGagwani/Study-Engine",
    demo: "https://github.com/VarunGagwani/Study-Engine#demo"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js and Tailwind CSS. Features smooth animations, dark mode, and a clean, professional design.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/VarunGagwani/Portfolio",
    demo: "https://varungagwani.vercel.app/"
  }
]

export default function Projects() {
  return (
    <Container size="xl" padding="lg" className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="spacing-lg"
      >
        <h1 className="text-responsive-2xl font-bold">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden card-hover h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 flex-col sm:flex-row">
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto min-h-[44px] btn-enhanced">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="w-full sm:w-auto min-h-[44px] btn-enhanced">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  )
}