/**
 * LogoBadge — Logo de OptiMind con anillo de gradiente cónico giratorio
 *
 * Props:
 *   size      – 'sm' | 'md' | 'lg' | 'xl'     (default 'md')
 *   dark      – true = fondo oscuro navy       (default true)
 *   text      – mostrar "OptiMind / Solutions" (default false)
 *   spin      – animar el anillo               (default true)
 */

const CFG = {
  sm: { outer: 34, border: 3, r: 10, ri: 8,  img: 20, fs: '13px', gap: 8  },
  md: { outer: 42, border: 3, r: 12, ri: 10, img: 26, fs: '15px', gap: 10 },
  lg: { outer: 58, border: 4, r: 16, ri: 13, img: 36, fs: '20px', gap: 12 },
  xl: { outer: 76, border: 5, r: 20, ri: 16, img: 48, fs: '26px', gap: 14 },
}

// Gradiente cónico vívido con colores de marca
const RING = 'conic-gradient(from 0deg, #2dd4bf, #14b8a6, #0e9da3, #0a7a80, #0d2137, #0a7a80, #0e9da3, #14b8a6, #2dd4bf)'

export default function LogoBadge({ size = 'md', dark = true, text = false, spin = true }) {
  const c = CFG[size] || CFG.md
  const inner = c.outer - c.border * 2

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: c.gap }}>

      {/* Contenedor del badge */}
      <div style={{ position: 'relative', width: c.outer, height: c.outer, flexShrink: 0 }}>

        {/* ── Glow ambiental detrás ── */}
        <div style={{
          position: 'absolute',
          inset: -6,
          borderRadius: c.r + 6,
          background: 'radial-gradient(ellipse, rgba(14,157,163,0.45) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }} />

        {/* ── Anillo exterior giratorio ── */}
        <div
          className={spin ? 'animate-spin-slow' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: c.r,
            background: RING,
            boxShadow: '0 0 16px rgba(14,157,163,0.5), inset 0 0 4px rgba(45,212,191,0.2)',
          }}
        />

        {/* ── Interior: fondo glass + logo ── */}
        <div style={{
          position: 'absolute',
          inset: c.border,
          borderRadius: c.ri,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark
            ? 'linear-gradient(145deg, rgba(10,26,46,0.97) 0%, rgba(8,52,64,0.93) 100%)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(228,248,250,0.95) 100%)',
          backdropFilter: 'blur(4px)',
        }}>
          {/* Reflejo interno sutil */}
          <div style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',
            borderRadius: '0 0 50% 50%',
            pointerEvents: 'none',
          }} />

          <img
            src="/Logo.png"
            alt="OptiMind Solutions"
            style={{ width: c.img, height: c.img, objectFit: 'contain', position: 'relative', zIndex: 1 }}
          />
        </div>
      </div>

      {/* ── Texto ── */}
      {text && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontSize: c.fs,
            fontWeight: 900,
            letterSpacing: '-0.5px',
            color: dark ? '#ffffff' : '#0d2137',
          }}>
            Opti<span style={{ color: '#2dd4bf' }}>Mind</span>
          </span>
          <span style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(45,212,191,0.55)',
            marginTop: '2px',
          }}>
            Solutions
          </span>
        </div>
      )}
    </div>
  )
}
