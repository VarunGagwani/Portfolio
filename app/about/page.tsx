"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { 
  // Programming Languages
  FileCode2, Code2, Braces, Hash, Coffee,
  // Web Technologies
  Globe, Server, Database, Cloud,
  // Tools & Frameworks
  Github, GitBranch, Terminal, Package,
  // Security
  Shield, Lock, Key, AlertTriangle,
  // Data Science
  LineChart, BarChart2, PieChart, TrendingUp,
  // Infrastructure
  Network, Cpu, HardDrive, Settings,
  // Soft Skills
  Users, Brain, Target, Mic
} from "lucide-react"

const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", icon: FileCode2, link: "https://www.python.org/" },
      { name: "JavaScript", icon: Braces, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", icon: Code2, link: "https://www.typescriptlang.org/" },
      { name: "C#", icon: Hash, link: "https://dotnet.microsoft.com/languages/csharp" },
      { name: "Java", icon: Coffee, link: "https://www.java.com/" }
    ]
  },
  {
    category: "Web Technologies",
    items: [
      { name: "React", icon: Globe, link: "https://reactjs.org/" },
      { name: "Node.js", icon: Server, link: "https://nodejs.org/" },
      { name: "PostgreSQL", icon: Database, link: "https://www.postgresql.org/" },
      { name: "AWS", icon: Cloud, link: "https://aws.amazon.com/" }
    ]
  },
  {
    category: "Tools & Frameworks",
    items: [
      { name: "Git", icon: Github, link: "https://git-scm.com/" },
      { name: "CI/CD", icon: GitBranch, link: "https://github.com/features/actions" },
      { name: "Linux", icon: Terminal, link: "https://www.linux.org/" },
      { name: "Docker", icon: Package, link: "https://www.docker.com/" }
    ]
  },
  {
    category: "Security",
    items: [
      { name: "NIST", icon: Shield, link: "https://www.nist.gov/cyberframework" },
      { name: "ISO 27001", icon: Lock, link: "https://www.iso.org/isoiec-27001-information-security.html" },
      { name: "Encryption", icon: Key, link: "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines" },
      { name: "Pen Testing", icon: AlertTriangle, link: "https://owasp.org/www-project-web-security-testing-guide/" }
    ]
  },
  {
    category: "Data Science",
    items: [
      { name: "Machine Learning", icon: LineChart, link: "https://scikit-learn.org/" },
      { name: "Data Analysis", icon: BarChart2, link: "https://pandas.pydata.org/" },
      { name: "Visualization", icon: PieChart, link: "https://d3js.org/" },
      { name: "Predictive Models", icon: TrendingUp, link: "https://pytorch.org/" }
    ]
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Networking", icon: Network, link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html" },
      { name: "System Admin", icon: Cpu, link: "https://www.redhat.com/en/services/certification/rhcsa" },
      { name: "Storage", icon: HardDrive, link: "https://aws.amazon.com/s3/" },
      { name: "DevOps", icon: Settings, link: "https://kubernetes.io/" }
    ]
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Leadership", icon: Users, link: "https://www.pmi.org/certifications/project-management-pmp" },
      { name: "Problem Solving", icon: Brain, link: "https://www.coursera.org/learn/problem-solving" },
      { name: "Project Management", icon: Target, link: "https://www.scrum.org/" },
      { name: "Public Speaking", icon: Mic, link: "https://www.toastmasters.org/" }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function About() {
  return (
    <Container size="xl" padding="lg" className="py-12 lg:py-16">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="spacing-lg"
      >
        <motion.h1 
          className="text-responsive-2xl font-bold"
          variants={itemVariants}
        >
          About Varun Gagwani
        </motion.h1>
        <motion.div 
          className="prose dark:prose-invert max-w-none"
          variants={itemVariants}
        >
          <p className="text-responsive-lg text-muted-foreground leading-relaxed">
            A passionate technologist with expertise in cybersecurity, data science, and full-stack development. 
            He specializes in building secure, data-driven solutions that solve complex business problems.
          </p>
        </motion.div>

        <motion.h2 
          className="text-responsive-xl font-semibold"
          variants={itemVariants}
        >
          Skills & Expertise
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {skills.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="card-hover h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {category.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.name}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground link-hover interactive-focus rounded-md p-1 -m-1"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="text-sm">{item.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  )
}