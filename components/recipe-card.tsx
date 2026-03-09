'use client'

import { motion } from 'framer-motion'
import { Beaker, ChefHat } from 'lucide-react'

interface RecipeCardProps {
  title: string
  subtitle: string
  ingredients: string[]
  usageTips: string[]
}

export function RecipeCard({ title, subtitle, ingredients, usageTips }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-lg border border-border bg-card p-6 md:p-8 shadow-sm"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="text-xs font-mono text-muted-foreground mb-1 tracking-wider">{title}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6">{subtitle}</h2>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Beaker className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ingredienti</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-mono"
            >
              {ing}
            </motion.span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <ChefHat className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"Consigli d'uso"}</h3>
        </div>
        <ul className="space-y-2">
          {usageTips.map((tip, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 text-card-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-nca-2 shrink-0" />
              <span className="text-sm">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
