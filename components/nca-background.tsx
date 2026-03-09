'use client'

import { useEffect, useRef, useCallback } from 'react'

const CELL_SIZE = 5
const ALIVE_THRESHOLD = 0.08

interface ColorPalette {
  r: number
  g: number
  b: number
}

interface NCALayer {
  grid: Float32Array
  next: Float32Array
  palette: ColorPalette
  birthMin: number
  birthMax: number
  surviveMin: number
  surviveMax: number
  growthRate: number
  decayRate: number
  alpha: number
}

const COLOR_SCHEMES: Record<string, ColorPalette[]> = {
  default: [
    { r: 167, g: 139, b: 250 },
    { r: 96, g: 165, b: 250 },
    { r: 52, g: 211, b: 153 },
    { r: 251, g: 146, b: 60 },
    { r: 244, g: 114, b: 182 },
  ],
  warm: [
    { r: 251, g: 146, b: 60 },
    { r: 248, g: 113, b: 113 },
    { r: 244, g: 114, b: 182 },
    { r: 251, g: 191, b: 36 },
    { r: 167, g: 139, b: 250 },
  ],
  cool: [
    { r: 96, g: 165, b: 250 },
    { r: 52, g: 211, b: 153 },
    { r: 45, g: 212, b: 191 },
    { r: 129, g: 140, b: 248 },
    { r: 167, g: 139, b: 250 },
  ],
  earth: [
    { r: 52, g: 211, b: 153 },
    { r: 163, g: 230, b: 53 },
    { r: 251, g: 191, b: 36 },
    { r: 251, g: 146, b: 60 },
    { r: 45, g: 212, b: 191 },
  ],
}

function injectSeed(
  grid: Float32Array,
  cols: number,
  rows: number,
  cx: number,
  cy: number,
  radius: number,
  intensity: number
) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist <= radius) {
          const falloff = 1 - dist / radius
          const val = intensity * falloff * (0.6 + Math.random() * 0.4)
          grid[ny * cols + nx] = Math.min(1, Math.max(grid[ny * cols + nx], val))
        }
      }
    }
  }
}

export function NCABackground({ scheme = 'default' }: { scheme?: keyof typeof COLOR_SCHEMES }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layersRef = useRef<NCALayer[]>([])
  const dimsRef = useRef({ cols: 0, rows: 0 })
  const mouseRef = useRef({ x: -1, y: -1, active: false, vx: 0, vy: 0 })
  const scrollRef = useRef({ y: 0, delta: 0, velocity: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 })
  const interactionIntensityRef = useRef(0)

  const palettes = COLOR_SCHEMES[scheme] || COLOR_SCHEMES.default

  const initLayers = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const cols = Math.ceil(canvas.width / CELL_SIZE)
    const rows = Math.ceil(canvas.height / CELL_SIZE)
    dimsRef.current = { cols, rows }

    const variants = [
      { birthMin: 2, birthMax: 3, surviveMin: 2, surviveMax: 4, growthRate: 0.14, decayRate: 0.978, alpha: 0.5 },
      { birthMin: 3, birthMax: 4, surviveMin: 2, surviveMax: 3, growthRate: 0.1, decayRate: 0.985, alpha: 0.45 },
      { birthMin: 2, birthMax: 4, surviveMin: 1, surviveMax: 5, growthRate: 0.18, decayRate: 0.972, alpha: 0.4 },
      { birthMin: 1, birthMax: 3, surviveMin: 2, surviveMax: 4, growthRate: 0.12, decayRate: 0.982, alpha: 0.45 },
      { birthMin: 2, birthMax: 3, surviveMin: 3, surviveMax: 5, growthRate: 0.11, decayRate: 0.987, alpha: 0.4 },
    ]

    const layers: NCALayer[] = palettes.map((palette, i) => {
      const grid = new Float32Array(cols * rows)
      const next = new Float32Array(cols * rows)
      const v = variants[i % variants.length]

      // Initial scattered seeds
      const numSeeds = 3 + Math.floor(Math.random() * 4)
      for (let s = 0; s < numSeeds; s++) {
        const cx = Math.floor(Math.random() * cols)
        const cy = Math.floor(Math.random() * rows)
        const radius = 4 + Math.floor(Math.random() * 8)
        injectSeed(grid, cols, rows, cx, cy, radius, 0.7 + Math.random() * 0.3)
      }

      return { grid, next, palette, ...v }
    })

    layersRef.current = layers
  }, [palettes])

  useEffect(() => {
    initLayers()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let running = true
    let tick = 0

    // --- Mouse tracking ---
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = canvas.width / rect.width
      const now = Date.now()
      const x = (e.clientX - rect.left) * dpr
      const y = (e.clientY - rect.top) * dpr
      const dt = Math.max(1, now - lastMouseRef.current.time)
      const vx = (x - lastMouseRef.current.x) / dt
      const vy = (y - lastMouseRef.current.y) / dt
      mouseRef.current = { x, y, active: true, vx, vy }
      lastMouseRef.current = { x, y, time: now }
      interactionIntensityRef.current = Math.min(1, interactionIntensityRef.current + 0.15)
    }

    const onMouseLeave = () => {
      mouseRef.current.active = false
    }

    // --- Touch tracking ---
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const rect = canvas.getBoundingClientRect()
      const dpr = canvas.width / rect.width
      const now = Date.now()
      const x = (touch.clientX - rect.left) * dpr
      const y = (touch.clientY - rect.top) * dpr
      const dt = Math.max(1, now - lastMouseRef.current.time)
      const vx = (x - lastMouseRef.current.x) / dt
      const vy = (y - lastMouseRef.current.y) / dt
      mouseRef.current = { x, y, active: true, vx, vy }
      lastMouseRef.current = { x, y, time: now }
      interactionIntensityRef.current = Math.min(1, interactionIntensityRef.current + 0.15)
    }

    const onTouchEnd = () => {
      mouseRef.current.active = false
    }

    // --- Scroll tracking ---
    const onScroll = () => {
      const newY = window.scrollY
      const delta = newY - scrollRef.current.y
      scrollRef.current.delta = delta
      scrollRef.current.velocity = Math.abs(delta)
      scrollRef.current.y = newY
      interactionIntensityRef.current = Math.min(1, interactionIntensityRef.current + Math.abs(delta) * 0.005)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    const step = () => {
      if (!running) return
      const { cols, rows } = dimsRef.current
      if (cols === 0 || rows === 0) { requestAnimationFrame(step); return }

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const scroll = scrollRef.current
      const intensity = interactionIntensityRef.current

      // --- Inject cells from mouse movement ---
      if (mouse.active) {
        const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy)
        const mouseCol = Math.floor(mouse.x / CELL_SIZE)
        const mouseRow = Math.floor(mouse.y / CELL_SIZE)

        if (mouseCol >= 0 && mouseCol < cols && mouseRow >= 0 && mouseRow < rows) {
          // Each layer gets cells injected from mouse, with varying radii
          layersRef.current.forEach((layer, i) => {
            const radius = Math.floor(6 + speed * 15 + i * 2)
            const str = 0.5 + Math.min(speed * 8, 0.5)
            injectSeed(layer.grid, cols, rows, mouseCol, mouseRow, radius, str)

            // Scatter trail particles behind the cursor
            if (speed > 0.3) {
              const trailCount = Math.floor(speed * 3)
              for (let t = 0; t < trailCount; t++) {
                const offsetX = mouseCol + Math.floor((Math.random() - 0.5) * radius * 1.5)
                const offsetY = mouseRow + Math.floor((Math.random() - 0.5) * radius * 1.5)
                injectSeed(layer.grid, cols, rows, offsetX, offsetY, 3 + Math.floor(Math.random() * 3), 0.6)
              }
            }
          })
        }
      }

      // --- Inject cells from scroll ---
      if (scroll.velocity > 1) {
        const scrollStrength = Math.min(scroll.velocity / 10, 1)
        layersRef.current.forEach((layer, i) => {
          // Create a horizontal wave of cells based on scroll direction
          const numWavePoints = Math.floor(3 + scrollStrength * 8)
          for (let w = 0; w < numWavePoints; w++) {
            const cx = Math.floor(Math.random() * cols)
            const viewportRow = Math.floor((window.innerHeight * 0.5 + (Math.random() - 0.5) * window.innerHeight * 0.6) / CELL_SIZE * (canvas.width / canvas.offsetWidth))
            const cy = Math.min(rows - 1, Math.max(0, viewportRow + i * 3))
            const radius = Math.floor(4 + scrollStrength * 8 + Math.random() * 4)
            injectSeed(layer.grid, cols, rows, cx, cy, radius, 0.4 + scrollStrength * 0.5)
          }
        })
        scroll.velocity *= 0.85
      }

      // --- Auto seeds (ambient life, boosted when interacting) ---
      const autoSeedChance = tick % (intensity > 0.3 ? 40 : 90) === 0
      if (autoSeedChance) {
        layersRef.current.forEach((layer) => {
          const numSeeds = intensity > 0.3 ? 3 : 1
          for (let s = 0; s < numSeeds; s++) {
            const cx = Math.floor(Math.random() * cols)
            const cy = Math.floor(Math.random() * rows)
            const radius = 3 + Math.floor(Math.random() * 5)
            injectSeed(layer.grid, cols, rows, cx, cy, radius, 0.3 + Math.random() * 0.4)
          }
        })
      }

      // --- Update and render each layer ---
      for (const layer of layersRef.current) {
        const { grid, next, palette, birthMin, birthMax, surviveMin, surviveMax, growthRate, decayRate, alpha } = layer

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = y * cols + x
            const val = grid[idx]
            let aliveN = 0
            let sumN = 0

            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                  const nv = grid[ny * cols + nx]
                  sumN += nv
                  if (nv > ALIVE_THRESHOLD) aliveN++
                }
              }
            }

            const avg = sumN / 8

            if (val < ALIVE_THRESHOLD) {
              if (aliveN >= birthMin && aliveN <= birthMax) {
                next[idx] = Math.min(1, avg * (0.5 + growthRate) + Math.random() * 0.05)
              } else {
                next[idx] = val * decayRate
              }
            } else {
              if (aliveN >= surviveMin && aliveN <= surviveMax) {
                next[idx] = Math.min(1, val + (avg - val) * growthRate + Math.random() * 0.02)
              } else {
                next[idx] = val * decayRate
              }
            }
          }
        }

        // Swap grids
        layer.grid = new Float32Array(next)

        // Draw
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const val = next[y * cols + x]
            if (val > 0.02) {
              const cellAlpha = val * alpha
              ctx.fillStyle = `rgba(${palette.r}, ${palette.g}, ${palette.b}, ${cellAlpha})`
              ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
          }
        }

        // Clear next for reuse
        next.fill(0)
      }

      // Decay interaction intensity
      interactionIntensityRef.current *= 0.97

      tick++
      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)

    const handleResize = () => { initLayers() }
    window.addEventListener('resize', handleResize)
    return () => {
      running = false
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [initLayers])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
