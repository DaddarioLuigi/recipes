'use client'

import { PageHeader } from '@/components/page-header'
import { RecipeCard } from '@/components/recipe-card'
import { MiniRecipe } from '@/components/mini-recipe'
import { NCABackground } from '@/components/nca-background'
import { motion } from 'framer-motion'

export default function SweetCrazyPage() {
  return (
    <main className="min-h-screen bg-card text-foreground relative" style={{ backgroundColor: '#ffffff' }}>
      <NCABackground scheme="warm" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <PageHeader mixName="Sweet & Crazy — Unexpected Output" />

        <RecipeCard
          title="01 / RECIPE"
          subtitle="Sweet & Crazy — Unexpected Output"
          ingredients={[
            'Fiocchi di sale',
            'Zucchero di canna',
            'Cacao',
            'Peperoncino',
          ]}
          usageTips={[
            'Carne alla griglia',
            'Fragole',
            'Cioccolato fondente',
          ]}
        />

        <MiniRecipe
          title="Fragole al pepe & cacao"
          description="Lavate le fragole e tagliatele a meta. In una ciotola, mescola un pizzico di peperoncino, un cucchiaino di cacao amaro e un po' di zucchero di canna. Cospargi il mix sulle fragole, aggiungi fiocchi di sale e lascia riposare 10 minuti prima di servire. Perfetto come dessert inatteso."
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
