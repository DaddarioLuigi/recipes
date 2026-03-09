'use client'

import { PageHeader } from '@/components/page-header'
import { RecipeCard } from '@/components/recipe-card'
import { MiniRecipe } from '@/components/mini-recipe'
import { NCABackground } from '@/components/nca-background'
import { motion } from 'framer-motion'

export default function NeuralMixPage() {
  return (
    <main className="min-h-screen bg-card text-foreground relative" style={{ backgroundColor: '#ffffff' }}>
      <NCABackground scheme="cool" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <PageHeader mixName="Neural Mix — Fresh Model" />

        <RecipeCard
          title="03 / RECIPE"
          subtitle="Neural Mix — Fresh Model"
          ingredients={[
            'Sale grosso',
            'Pepe timut',
            'Pepe rosa',
            'Basilico secco',
          ]}
          usageTips={[
            'Sale di finishing su carne e pesce',
            'Salamoia per pollo (2–3 cucchiai/L acqua)',
            'Una presa su patate e verdure al forno',
          ]}
        />

        <MiniRecipe
          title="Patate al forno con Neural Mix"
          description="Taglia le patate a spicchi, condiscile solo con olio extravergine e cuoci a 200°C per 35–40 minuti, girando a metà cottura. A fine cottura, cospargi con una leggera presa di Neural Mix: il mix è già salato, usa con parsimonia. Pepe timut e rosa donano note agrumate e delicate."
        />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-6 border-t border-border text-xs text-muted-foreground font-mono flex justify-between"
        >
          <span>Artificial Intelligence for Science and Technology</span>
          <span>11.03.2026</span>
        </motion.footer>
      </div>
    </main>
  )
}
