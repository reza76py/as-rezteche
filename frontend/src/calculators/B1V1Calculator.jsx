// NCC Section B1 — Structural Reliability Calculator (β index)
import React from 'react'

export default function B1V1Calculator() {
  const [R, setR] = React.useState('')
  const [S, setS] = React.useState('')
  const [VR, setVR] = React.useState('')
  const [VS, setVS] = React.useState('')
  const [result, setResult] = React.useState(null)

  const calculate = () => {
    const r = parseFloat(R)
    const s = parseFloat(S)
    const vr = parseFloat(VR) / 100
    const vs = parseFloat(VS) / 100
    if ([r, s, vr, vs].some(isNaN)) return
    const CR = Math.exp(vr * vr)
    const CS = Math.exp(vs * vs)
    const beta = Math.log((r / s) * Math.sqrt(CS / CR)) / Math.sqrt(Math.log(CR * CS))
    setResult(beta)
  }

  const pass = result !== null && result >= 3.0

  return (
    <div style={{ backgroundColor: '#0a0f1a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#888780', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        B1V1 — Structural Reliability (β index)
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'Mean resistance R', val: R, set: setR },
          { label: 'Mean load S', val: S, set: setS },
          { label: 'Coeff. variation VR (%)', val: VR, set: setVR },
          { label: 'Coeff. variation VS (%)', val: VS, set: setVS },
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
        backgroundColor: '#6366F1', color: 'white', fontSize: '12px', fontWeight: 600,
      }}>
        Calculate β
      </button>
      {result !== null && (
        <div style={{
          marginTop: '12px', padding: '10px', borderRadius: '8px', textAlign: 'center',
          backgroundColor: pass ? '#1D9E7522' : '#E24B4A22',
          border: `1px solid ${pass ? '#1D9E75' : '#E24B4A'}`,
        }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: pass ? '#1D9E75' : '#E24B4A' }}>
            β = {result.toFixed(3)}
          </p>
          <p style={{ fontSize: '11px', color: pass ? '#1D9E75' : '#E24B4A', marginTop: '4px' }}>
            {pass ? '✓ Passes — β ≥ 3.0' : '✗ Fails — β < 3.0'}
          </p>
        </div>
      )}
    </div>
  )
}
