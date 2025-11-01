"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

const blogs = [
  {
    id: 1,
    slug: "ai-hackathon",
    title: "48 Hours of Innovation: How AI Transformed a Hackathon and Is Shaping the Future",
    date: "February 20, 2025",
    excerpt: "An eye-opening experience at HackHive hackathon, exploring how AI acted as a catalyst for rapid development and its implications for the tech industry.",
    tags: ["AI", "Hackathon", "Innovation", "Technology"],
    readTime: "15 min read"
  }
]

export default function Blog() {
  return (
    <Container size="xl" padding="lg" className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="spacing-lg"
      >
        <h1 className="text-responsive-2xl font-bold">Blog</h1>
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <CardTitle className="text-responsive-xl">
                    <Link href={`/blog/${blog.slug}`} className="link-hover interactive-focus rounded-md">
                      {blog.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  )
}