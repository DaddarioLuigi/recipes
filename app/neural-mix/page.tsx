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
            'Sale marino',
            'Limone',
            'Rosmarino',
            'Pepe rosa',
          ]}
          usageTips={[
            'Su patate al forno',
            'Carne o pesce grigliato',
            'Verdure saltate',
          ]}
        />

        <MiniRecipe
          title="Patate al forno con rosmarino & pepe rosa"
          description="Taglia le patate a spicchi, condiscile con olio, sale marino, pepe rosa schiacciato, rosmarino fresco e scorza di limone grattugiata. Cuoci in forno a 200C per 35-40 minuti girando a meta cottura. Prima di servire, spremi qualche goccia di limone fresco. Un modello fresco e bilanciato."
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
