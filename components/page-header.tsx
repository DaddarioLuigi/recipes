'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  mixName: string
}

export function PageHeader({ mixName }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pb-8 mb-10"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground text-balance">
        Flavor Experiment — Luigi
      </h1>
      <p className="text-base md:text-lg text-muted-foreground mb-4">
        <span className="italic">AI Graduation</span>
        <span className="mx-2 text-border">|</span>
        11.03.2026
      </p>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-foreground" style={{ backgroundColor: '#f5f5f5' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-nca-2 animate-pulse" />
        <span className="text-sm font-mono">{mixName}</span>
      </div>
    </motion.header>
  )
}
