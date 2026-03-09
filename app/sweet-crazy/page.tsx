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
            'Sale',
            'Prezzemolo',
            'Basilico',
            'Peperoncino di Cayenna',
          ]}
          usageTips={[
            'Crust su bistecca e carne alla griglia',
            'Finishing su pasta e risotti',
            'Come sale aromatizzato su verdure',
          ]}
        />

        <MiniRecipe
          title="Bistecca con Sweet & Crazy"
          description="Il mix è già pronto: usa Sweet & Crazy come sale aromatizzato. Ungi la carne con olio, cospargi con una moderata presa su entrambi i lati (è salato, non esagerare) e lascia riposare 15–20 minuti. Griglia a fuoco vivo. Prezzemolo, basilico e Cayenna creano un output inatteso e memorabile."
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
