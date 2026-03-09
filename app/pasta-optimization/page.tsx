'use client'

import { PageHeader } from '@/components/page-header'
import { RecipeCard } from '@/components/recipe-card'
import { MiniRecipe } from '@/components/mini-recipe'
import { NCABackground } from '@/components/nca-background'
import { motion } from 'framer-motion'

export default function PastaOptimizationPage() {
  return (
    <main className="min-h-screen bg-card text-foreground relative" style={{ backgroundColor: '#ffffff' }}>
      <NCABackground scheme="earth" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <PageHeader mixName="Pasta Optimization v1.0" />

        <RecipeCard
          title="02 / RECIPE"
          subtitle="Pasta Optimization v1.0"
          ingredients={[
            'Pomodoro secco',
            'Aglio',
            'Basilico',
            'Prezzemolo',
            'Peperoncino',
          ]}
          usageTips={[
            'Pasta veloce',
            'Bruschette',
            'Verdure in padella',
          ]}
        />

        <MiniRecipe
          title="Spaghetti aglio, pomodoro secco & basilico"
          description="Cuoci gli spaghetti al dente. In padella, scalda olio con aglio affettato finche dorato, aggiungi i pomodori secchi a pezzetti e il peperoncino. Unisci la pasta scolata con poca acqua di cottura, manteca a fuoco alto e finisci con basilico fresco e prezzemolo tritato. Semplice, veloce, ottimizzato."
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
