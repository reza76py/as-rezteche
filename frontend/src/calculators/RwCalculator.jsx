// NCC Section F7 — Rw + Ctr Sound Insulation Checker (F7D5, F7D6)
import { useState } from 'react'

const SEPARATION_TYPES = [
  {
    id: 'sou_sou_wall',
    label: 'Wall — between sole-occupancy units (Class 2/3)',
    metric: 'Rw + Ctr', required: 50, pass: (v) => v >= 50,
  },
  {
    id: 'sou_common_wall',
    label: 'Wall — SOC unit to plant room / corridor / lift / different class (Class 2/3)',
    metric: 'Rw', required: 50, pass: (v) => v >= 50,
  },
  {
    id: 'door_corridor',
    label: 'Door — SOC unit to corridor / lobby / stairway (Class 2/3)',
    metric: 'Rw', required: 30, pass: (v) => v >= 30,
  },
  {
    id: 'sou_sou_floor_airborne',
    label: 'Floor airborne — between sole-occupancy units (Class 2/3)',
    metric: 'Rw + Ctr', required: 50, pass: (v) => v >= 50,
  },
  {
    id: 'sou_sou_floor_impact',
    label: 'Floor impact — between sole-occupancy units (Class 2/3)',
    metric: 'Ln,w', required: 62, pass: (v) => v <= 62,
    note: 'Lower is better — must be ≤ 62',
  },
  {
    id: 'pipe_habitable',
    label: 'Services — pipe/duct adjacent to habitable room (not kitchen)',
    metric: 'Rw + Ctr', required: 40, pass: (v) => v >= 40,
  },
  {
    id: 'pipe_kitchen',
    label: 'Services — pipe/duct adjacent to kitchen or non-habitable room',
    metric: 'Rw + Ctr', required: 25, pass: (v) => v >= 25,
  },
  {
    id: 'class9c_wall',
    label: 'Wall — between SOC units (Class 9c residential care)',
    metric: 'Rw', required: 45, pass: (v) => v >= 45,
  },
  {
    id: 'class9c_floor',
    label: 'Floor airborne — between SOC units (Class 9c residential care)',
    metric: 'Rw', required: 45, pass: (v) => v >= 45,
  },
]

const inputStyle = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: '6px', padding: '6px 8px', color: '#e2e8f0',
  fontSize: '12px', outline: 'none',
}

const labelStyle = { fontSize: '10px', color: '#64748b', marginBottom: '4px' }

export default function RwCalculator() {
  const [sepType, setSepType] = useState('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const selected = SEPARATION_TYPES.find(s => s.id === sepType)
    if (!selected) return
    const val = parseFloat(value)
    if (isNaN(val)) return
    const pass = selected.pass(val)
    setResult({ selected, val, pass })
  }

  const reset = () => { setSepType(''); setValue(''); setResult(null) }

  return (
    <div style={{ backgroundColor: '#0a0f1a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#1D9E75', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        F7 — Sound Insulation Checker (Rw / Rw+Ctr / Ln,w)
      </p>

      <div style={{ marginBottom: '10px' }}>
        <p style={labelStyle}>Separation type</p>
        <select value={sepType} onChange={e => { setSepType(e.target.value); setResult(null) }}
          style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Select separation type…</option>
          {SEPARATION_TYPES.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {sepType && (
        <div style={{ marginBottom: '12px' }}>
          <p style={labelStyle}>
            Measured / rated {SEPARATION_TYPES.find(s => s.id === sepType)?.metric} value
          </p>
          <input
            type="number" step="1" value={value}
            onChange={e => { setValue(e.target.value); setResult(null) }}
            style={inputStyle}
            placeholder="e.g. 52"
          />
          {SEPARATION_TYPES.find(s => s.id === sepType)?.note && (
            <p style={{ fontSize: '10px', color: '#475569', marginTop: '4px' }}>
              {SEPARATION_TYPES.find(s => s.id === sepType).note}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={calculate} style={{
          flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
          backgroundColor: '#1D9E75', color: 'white', fontSize: '12px', fontWeight: 600,
        }}>Check</button>
        <button onClick={reset} style={{
          padding: '8px 16px', borderRadius: '8px', border: '1px solid #334155',
          cursor: 'pointer', backgroundColor: 'transparent', color: '#64748b', fontSize: '12px',
        }}>Reset</button>
      </div>

      {result && (
        <div style={{
          padding: '12px', borderRadius: '8px', textAlign: 'center',
          backgroundColor: result.pass ? '#1D9E7522' : '#E24B4A22',
          border: `1px solid ${result.pass ? '#1D9E75' : '#E24B4A'}`,
        }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: result.pass ? '#1D9E75' : '#E24B4A' }}>
            {result.selected.metric} = {result.val}
          </p>
          <p style={{ fontSize: '11px', color: result.pass ? '#1D9E75' : '#E24B4A', marginTop: '4px' }}>
            {result.pass
              ? `✓ Passes — meets minimum ${result.selected.metric} ${result.selected.id.includes('impact') ? '≤' : '≥'} ${result.selected.required}`
              : `✗ Fails — minimum ${result.selected.metric} ${result.selected.id.includes('impact') ? '≤' : '≥'} ${result.selected.required} required`
            }
          </p>
          <p style={{ fontSize: '10px', color: '#475569', marginTop: '6px' }}>
            Ref: NCC 2022 {result.selected.id.includes('floor') ? 'F7D5' : result.selected.id.includes('pipe') ? 'F7D7' : 'F7D6'}
          </p>
        </div>
      )}
    </div>
  )
}
