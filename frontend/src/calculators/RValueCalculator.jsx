// NCC Section J4 — R-Value Calculator (J4D4 roof/ceiling, J4D6 walls, J4D7 floors)
import { useState } from 'react'

const CLIMATE_ZONES = [
  { zone: '1', name: 'Zone 1 — Hot humid (Darwin, Cairns)', roof: 3.7, wall: 1.4, floor: 1.0 },
  { zone: '2', name: 'Zone 2 — Warm humid (Brisbane, Townsville)', roof: 3.7, wall: 1.4, floor: 1.0 },
  { zone: '3', name: 'Zone 3 — Hot dry (Alice Springs, Newman)', roof: 3.7, wall: 1.4, floor: 1.0 },
  { zone: '4', name: 'Zone 4 — Mixed (Sydney, Perth)', roof: 3.7, wall: 1.4, floor: 1.0 },
  { zone: '5', name: 'Zone 5 — Cool temperate (Melbourne, ACT)', roof: 3.7, wall: 1.4, floor: 1.0 },
  { zone: '6', name: 'Zone 6 — Temperate (Adelaide, parts of VIC)', roof: 3.2, wall: 1.4, floor: 1.25 },
  { zone: '7', name: 'Zone 7 — Cool (Canberra, alpine areas)', roof: 3.7, wall: 2.8, floor: 1.75 },
  { zone: '8', name: 'Zone 8 — Alpine (high altitude areas)', roof: 4.8, wall: 3.8, floor: 3.25 },
]

const inputStyle = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: '6px', padding: '6px 8px', color: '#e2e8f0',
  fontSize: '12px', outline: 'none',
}

const labelStyle = { fontSize: '10px', color: '#64748b', marginBottom: '4px' }

export default function RValueCalculator() {
  const [zone, setZone] = useState('')
  const [roofR, setRoofR] = useState('')
  const [wallR, setWallR] = useState('')
  const [floorR, setFloorR] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const selected = CLIMATE_ZONES.find(z => z.zone === zone)
    if (!selected) return
    const roof = parseFloat(roofR)
    const wall = parseFloat(wallR)
    const floor = parseFloat(floorR)
    const roofPass = !isNaN(roof) ? roof >= selected.roof : null
    const wallPass = !isNaN(wall) ? wall >= selected.wall : null
    const floorPass = !isNaN(floor) ? floor >= selected.floor : null
    setResult({ selected, roof, wall, floor, roofPass, wallPass, floorPass })
  }

  const reset = () => { setZone(''); setRoofR(''); setWallR(''); setFloorR(''); setResult(null) }

  const ResultCard = ({ label, actual, required, pass }) => {
    if (isNaN(actual)) return null
    return (
      <div style={{
        flex: 1, padding: '10px', borderRadius: '8px', textAlign: 'center',
        backgroundColor: pass ? '#1D9E7522' : '#E24B4A22',
        border: `1px solid ${pass ? '#1D9E75' : '#E24B4A'}`,
      }}>
        <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}>{label}</p>
        <p style={{ fontSize: '16px', fontWeight: 700, color: pass ? '#1D9E75' : '#E24B4A' }}>
          R{actual.toFixed(1)}
        </p>
        <p style={{ fontSize: '10px', color: pass ? '#1D9E75' : '#E24B4A' }}>
          {pass ? `✓ ≥ R${required}` : `✗ min R${required}`}
        </p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0a0f1a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#BA7517', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        J4 — R-Value Checker by Climate Zone
      </p>

      <div style={{ marginBottom: '10px' }}>
        <p style={labelStyle}>Climate zone</p>
        <select value={zone} onChange={e => setZone(e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Select climate zone…</option>
          {CLIMATE_ZONES.map(z => (
            <option key={z.zone} value={z.zone}>{z.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'Roof/ceiling R-Value', val: roofR, set: setRoofR },
          { label: 'Wall R-Value', val: wallR, set: setWallR },
          { label: 'Floor R-Value', val: floorR, set: setFloorR },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <p style={labelStyle}>{label}</p>
            <input type="number" step="0.1" value={val} onChange={e => set(e.target.value)} style={inputStyle} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={calculate} style={{
          flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
          backgroundColor: '#BA7517', color: 'white', fontSize: '12px', fontWeight: 600,
        }}>Check R-Values</button>
        <button onClick={reset} style={{
          padding: '8px 16px', borderRadius: '8px', border: '1px solid #334155',
          cursor: 'pointer', backgroundColor: 'transparent', color: '#64748b', fontSize: '12px',
        }}>Reset</button>
      </div>

      {result && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <ResultCard label="Roof / Ceiling" actual={result.roof} required={result.selected.roof} pass={result.roofPass} />
          <ResultCard label="Wall" actual={result.wall} required={result.selected.wall} pass={result.wallPass} />
          <ResultCard label="Floor" actual={result.floor} required={result.selected.floor} pass={result.floorPass} />
        </div>
      )}
    </div>
  )
}
