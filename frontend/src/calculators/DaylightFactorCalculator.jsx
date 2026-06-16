// NCC Section F6V3 — Daylight Factor Verification Method
import React from 'react'

export default function DaylightFactorCalculator() {
  const [W, setW] = React.useState('')
  const [A, setA] = React.useState('')
  const [T, setT] = React.useState('')
  const [theta, setTheta] = React.useState('')
  const [R, setR] = React.useState('')
  const [result, setResult] = React.useState(null)

  const calculate = () => {
    const w = parseFloat(W)
    const a = parseFloat(A)
    const t = parseFloat(T)
    const th = parseFloat(theta)
    const r = parseFloat(R)
    if ([w, a, t, th, r].some(isNaN)) return
    if (a <= 0 || r >= 1) return
    const sinTheta = Math.sin((th * Math.PI) / 180)
    const df = (w * t * sinTheta) / (a * (1 - r * r)) * 100
    setResult(df)
  }

  const pass = result !== null && result >= 2.0

  return (
    <div style={{ backgroundColor: '#0a0f1a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#1D9E75', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        F6V3 — Daylight Factor
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'Window net area W (m²)', val: W, set: setW },
          { label: 'Total surface area A (m²)', val: A, set: setA },
          { label: 'Transmittance T (0–1)', val: T, set: setT },
          { label: 'Sky angle θ (degrees)', val: theta, set: setTheta },
          { label: 'Avg. reflectance R (0–1)', val: R, set: setR },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <p style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>{label}</p>
            <input
              type="number"
              value={val}
              onChange={e => set(e.target.value)}
              style={{
                width: '100%', background: '#0f172a', border: '1px solid #334155',
                borderRadius: '6px', padding: '6px 8px', color: '#e2e8f0', fontSize: '12px', outline: 'none',
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={calculate} style={{
        width: '100%', padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
        backgroundColor: '#1D9E75', color: 'white', fontSize: '12px', fontWeight: 600,
      }}>
        Calculate DF
      </button>
      {result !== null && (
        <div style={{
          marginTop: '12px', padding: '10px', borderRadius: '8px', textAlign: 'center',
          backgroundColor: pass ? '#1D9E7522' : '#E24B4A22',
          border: `1px solid ${pass ? '#1D9E75' : '#E24B4A'}`,
        }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: pass ? '#1D9E75' : '#E24B4A' }}>
            DF = {result.toFixed(2)}%
          </p>
          <p style={{ fontSize: '11px', color: pass ? '#1D9E75' : '#E24B4A', marginTop: '4px' }}>
            {pass ? '✓ Passes — DF ≥ 2%' : '✗ Fails — DF < 2%'}
          </p>
        </div>
      )}
    </div>
  )
}
