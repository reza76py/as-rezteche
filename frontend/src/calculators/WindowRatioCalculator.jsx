// NCC Section F6D3 — Window / Floor Ratio Calculator
import React from 'react'

export default function WindowRatioCalculator() {
  const [floorArea, setFloorArea] = React.useState('')
  const [windowArea, setWindowArea] = React.useState('')
  const [roofLightArea, setRoofLightArea] = React.useState('')
  const [result, setResult] = React.useState(null)

  const calculate = () => {
    const af = parseFloat(floorArea)
    const aw = parseFloat(windowArea)
    const ar = parseFloat(roofLightArea) || 0
    if ([af, aw].some(isNaN) || af <= 0) return
    const windowRatio = (aw / af) * 100
    const roofLightRatio = (ar / af) * 100
    setResult({ windowRatio, roofLightRatio })
  }

  const windowPass = result !== null && result.windowRatio >= 10
  const roofPass = result !== null && result.roofLightRatio >= 3
  const overallPass = windowPass && roofPass

  return (
    <div style={{ backgroundColor: '#0a0f1a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#1D9E75', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        F6D3 — Window / Floor Ratio
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'Floor area Af (m²)', val: floorArea, set: setFloorArea },
          { label: 'Window area Aw (m²)', val: windowArea, set: setWindowArea },
          { label: 'Roof light area Ar (m²)', val: roofLightArea, set: setRoofLightArea },
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
        Calculate Ratios
      </button>
      {result !== null && (
        <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            padding: '10px', borderRadius: '8px', textAlign: 'center',
            backgroundColor: windowPass ? '#1D9E7522' : '#E24B4A22',
            border: `1px solid ${windowPass ? '#1D9E75' : '#E24B4A'}`,
          }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: windowPass ? '#1D9E75' : '#E24B4A' }}>
              {result.windowRatio.toFixed(1)}%
            </p>
            <p style={{ fontSize: '10px', color: windowPass ? '#1D9E75' : '#E24B4A', marginTop: '2px' }}>
              Window ratio — {windowPass ? '✓ ≥ 10%' : '✗ < 10%'}
            </p>
          </div>
          <div style={{
            padding: '10px', borderRadius: '8px', textAlign: 'center',
            backgroundColor: roofPass ? '#1D9E7522' : '#E24B4A22',
            border: `1px solid ${roofPass ? '#1D9E75' : '#E24B4A'}`,
          }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: roofPass ? '#1D9E75' : '#E24B4A' }}>
              {result.roofLightRatio.toFixed(1)}%
            </p>
            <p style={{ fontSize: '10px', color: roofPass ? '#1D9E75' : '#E24B4A', marginTop: '2px' }}>
              Roof light ratio — {roofPass ? '✓ ≥ 3%' : '✗ < 3%'}
            </p>
          </div>
          <div style={{
            gridColumn: '1 / -1', padding: '8px', borderRadius: '8px', textAlign: 'center',
            backgroundColor: overallPass ? '#1D9E7522' : '#E24B4A22',
            border: `1px solid ${overallPass ? '#1D9E75' : '#E24B4A'}`,
          }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: overallPass ? '#1D9E75' : '#E24B4A' }}>
              {overallPass ? '✓ Complies with F6D3' : '✗ Does not comply with F6D3'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
