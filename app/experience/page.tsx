"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "Preferential InfoSec Consulting Inc.",
    duration: "2020 - Present",
    highlights: [
      "Led comprehensive threat risk assessments for critical infrastructure systems, improving security posture by 40%",
      "Developed and implemented automated security monitoring solutions using Python and AWS",
      "Created machine learning models for predictive maintenance and anomaly detection",
      "Designed and delivered security awareness training programs for 200+ employees",
      "Built interactive BI dashboards reducing reporting time by 60%",
      "Optimized data pipelines and infrastructure, improving operational efficiency by 35%",
      "Led cross-functional teams in implementing NIST framework and security controls",
      "Conducted vulnerability assessments and penetration testing for client systems"
    ],
    skills: [
      "NIST Framework",
      "Risk Assessment",
      "Python (ML/Data)",
      "AWS",
      "Security Architecture",
      "Data Analytics"
    ]
  }
]

export default function Experience() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Experience</h1>
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{experience.company}</h3>
                      <p className="text-muted-foreground">{experience.duration}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}