'use client'

import { useRef, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { motion } from 'framer-motion'
import { Download, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NCABackground } from '@/components/nca-background'

const QR_PAGES = [
  {
    id: 'sweet-crazy',
    label: 'Sweet & Crazy',
    subtitle: 'Unexpected Output',
    path: '/sweet-crazy',
    tag: '01',
  },
  {
    id: 'pasta-optimization',
    label: 'Pasta Optimization',
    subtitle: 'v1.0',
    path: '/pasta-optimization',
    tag: '02',
  },
  {
    id: 'neural-mix',
    label: 'Neural Mix',
    subtitle: 'Fresh Model',
    path: '/neural-mix',
    tag: '03',
  },
]

function QRItem({
  page,
  origin,
  index,
}: {
  page: (typeof QR_PAGES)[0]
  origin: string
  index: number
}) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `qr-${page.id}.png`
    link.click()
  }, [page.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col items-center gap-4 p-6 rounded-lg border border-border backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
    >
      <div className="text-xs font-mono text-muted-foreground">{page.tag} / QR</div>
      <div ref={canvasRef} className="p-3 bg-card rounded-lg border border-border">
        <QRCodeCanvas
          value={`${origin}${page.path}`}
          size={160}
          bgColor="#ffffff"
          fgColor="#1a1a1a"
          level="M"
        />
      </div>
      <div className="text-center">
        <div className="font-bold text-sm text-card-foreground">{page.label}</div>
        <div className="text-xs text-muted-foreground">{page.subtitle}</div>
        <div className="text-xs font-mono text-muted-foreground mt-1 break-all">{origin}{page.path}</div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="w-full flex items-center gap-2"
      >
        <Download className="w-3 h-3" />
        Download QR
      </Button>
    </motion.div>
  )
}

const DEPLOY_URL = 'https://v0-ai-recipe-website-alpha.vercel.app'

export default function SecretPage() {
  const origin = DEPLOY_URL

  return (
    <main className="min-h-screen bg-card text-foreground relative" style={{ backgroundColor: '#ffffff' }}>
      <NCABackground scheme="default" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Pagina Segreta
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">QR Code Archive</h1>
          <p className="text-sm text-muted-foreground font-mono">
            Flavor Experiment — Luigi | AI Graduation | 11.03.2026
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Artificial Intelligence for Science and Technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QR_PAGES.map((page, index) => (
            <QRItem key={page.id} page={page} origin={origin} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-6 border-t border-border text-xs text-muted-foreground font-mono flex justify-between"
        >
          <span>access_level: restricted</span>
          <span>11.03.2026</span>
        </motion.div>
      </div>
    </main>
  )
}
