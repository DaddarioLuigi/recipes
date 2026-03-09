'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface MiniRecipeProps {
  title: string
  description: string
}

export function MiniRecipe({ title, description }: MiniRecipeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 rounded-lg border border-border p-5 md:p-6"
      style={{ backgroundColor: '#f0f4ff' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-nca-2" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Mini Ricetta Consigliata
        </span>
      </div>
      <h4 className="text-base font-bold text-accent-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
