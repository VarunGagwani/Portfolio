"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'

interface BlogPostProps {
  post: {
    title: string
    date: string
    readTime: string
    tags: string[]
    content: string
  } | undefined
}

export default function BlogPost({ post }: BlogPostProps) {
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarDays className="h-4 w-4" />
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground mb-1">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-primary">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-primary/5 px-1.5 py-0.5 rounded-md text-sm font-mono text-primary">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-primary/5 p-6 rounded-lg overflow-x-auto mb-6 border border-primary/10 font-mono text-foreground">
                      {children}
                    </pre>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}