"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextAnimation } from "@/components/text-animation"

// FAQ data structure
interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  faqs: FAQ[]
}

const faqData: FAQCategory[] = [
  {
    category: "General Enrollment & Requirements",
    faqs: [
      {
        question: "Who can join? Is there an age limit?",
        answer:
          "Students must be between 6 and 35 years old. Programs are open to children, teens, and adults. Training is tailored to each age group and skill level.",
      },
      {
        question: "Do I need prior experience?",
        answer: "No experience needed. We welcome complete beginners and help build a strong martial arts foundation.",
      },
      {
        question: "How do I enroll? Are trial classes available?",
        answer: "Fill out our online form or visit any branch. Trial classes available in person only.",
      },
      {
        question: "Class Timings",
        answer: "Monday to Friday: 6:30–7:30 AM and 8:15–9:30 PM. Weekend/personal slots available on request.",
      },
    ],
  },
  {
    category: "Fees & Discounts",
    faqs: [
      {
        question: "What are the monthly/annual fees?",
        answer: "Varies by age, program, branch. 12 classes/month. Full advance payment required.",
      },
      {
        question: "Are there discounts for families or groups?",
        answer: "Yes. Group and family discounts available.",
      },
    ],
  },
  {
    category: "Training & Progression",
    faqs: [
      {
        question: "How long to earn a black belt?",
        answer: "Typically 3 to 4 years with consistent effort.",
      },
      {
        question: "How do belt promotions work?",
        answer: "Based on attendance, skill, and syllabus knowledge. Held every 3 to 4 months.",
      },
      {
        question: "What if I miss a class?",
        answer: "No makeup sessions. Missed classes marked absent. No fee adjustments.",
      },
    ],
  },
  {
    category: "Specialized Programs & Events",
    faqs: [
      {
        question: "Do you participate in tournaments?",
        answer: "Yes. From local to world-level competitions.",
      },
      {
        question: "How are students selected?",
        answer: "Based on skill, discipline, and instructor recommendation.",
      },
      {
        question: "How do I register for events?",
        answer: "Inform your coach. We'll guide the full process.",
      },
    ],
  },
  {
    category: "Women's Safety & Self-Defense",
    faqs: [
      {
        question: "Are there female instructors?",
        answer: "Yes, at selected branches. We follow zero-tolerance policies for misconduct.",
      },
      {
        question: "What self-defense is taught for women?",
        answer: "Real-world techniques: escape, striking, awareness.",
      },
    ],
  },
]

export default function FAQsPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const toggleQuestion = (category: string, question: string) => {
    const key = `${category}-${question}`
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isQuestionOpen = (category: string, question: string) => {
    const key = `${category}-${question}`
    return !!openQuestions[key]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-black text-white">
        <div className="container py-8 md:py-16">
          <TextAnimation
            text="Frequently Asked Questions"
            type="gradient"
            className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          />

          <div className="max-w-3xl mx-auto px-2 md:px-0">
            {faqData.map((categoryData) => (
              <div key={categoryData.category} className="mb-6">
                <button
                  onClick={() => toggleCategory(categoryData.category)}
                  className="w-full flex items-center justify-between bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <h2 className="text-xl font-bold">{categoryData.category}</h2>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      openCategory === categoryData.category ? "transform rotate-180" : "",
                    )}
                  />
                </button>

                {openCategory === categoryData.category && (
                  <div className="mt-2 pl-4 border-l-2 border-red-600 space-y-2">
                    {categoryData.faqs.map((faq) => (
                      <div key={faq.question} className="bg-gray-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(categoryData.category, faq.question)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700 transition-colors"
                        >
                          <h3 className="font-medium">{faq.question}</h3>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-gray-400 transition-transform duration-200",
                              isQuestionOpen(categoryData.category, faq.question) ? "transform rotate-180" : "",
                            )}
                          />
                        </button>

                        {isQuestionOpen(categoryData.category, faq.question) && (
                          <div className="p-4 pt-0 text-gray-300 bg-gray-800">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
