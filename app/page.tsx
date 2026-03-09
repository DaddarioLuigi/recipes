'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FlaskConical } from 'lucide-react'
import { NCABackground } from '@/components/nca-background'

const pages = [
  { href: '/sweet-crazy', label: 'Sweet & Crazy', sub: 'Unexpected Output', tag: '01' },
  { href: '/pasta-optimization', label: 'Pasta Optimization', sub: 'v1.0', tag: '02' },
  { href: '/neural-mix', label: 'Neural Mix', sub: 'Fresh Model', tag: '03' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-card text-foreground relative" style={{ backgroundColor: '#ffffff' }}>
      <NCABackground scheme="default" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <FlaskConical className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Flavor Experiment
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground text-balance leading-tight">
            Flavor Experiment<br />— Luigi
          </h1>
          <p className="text-lg text-muted-foreground">
            <span className="italic">AI Graduation</span>
            <span className="mx-2 text-border">|</span>
            11.03.2026
          </p>
          <p className="text-xs font-mono text-muted-foreground mt-4 tracking-wide">
            Artificial Intelligence for Science and Technology
          </p>
        </motion.div>

        <div className="space-y-3 flex-1">
          {pages.map((page, i) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            >
              <Link
                href={page.href}
                className="group flex items-center justify-between p-5 rounded-lg border border-border backdrop-blur-sm hover:shadow-sm transition-all duration-200"
                style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-6">{page.tag}</span>
                  <div>
                    <div className="font-bold text-card-foreground">{page.label}</div>
                    <div className="text-sm text-muted-foreground">{page.sub}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 pt-6 border-t border-border text-xs text-muted-foreground font-mono flex justify-between"
        >
          <span>Artificial Intelligence for Science and Technology</span>
          <span>11.03.2026</span>
        </motion.footer>
      </div>
    </main>
  )
}
