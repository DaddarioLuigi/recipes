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
            'Zucchero di canna',
            'Cannella',
            'Cacao',
            'Peperoncino di Cayenna',
          ]}
          usageTips={[
            'Salamoia per maiale o pollo (2–3 cucchiai/L acqua)',
            'Finishing su pasta al burro',
            'Una presa su dessert e frutta',
          ]}
        />

        <MiniRecipe
          title="Salamoia per maiale con Sweet & Crazy"
          description="Sciogli 2–3 cucchiai di Sweet & Crazy in 1 L di acqua fredda. Immergi la carne (lonza, coscia) e lascia in frigorifero 4–6 ore. Asciuga, asciuga bene e cuoci in forno o in padella. Sale e zucchero penetrano, cannella e cacao donano un profilo dolce-speziato. Ottimizzato per chi ama osare."
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
