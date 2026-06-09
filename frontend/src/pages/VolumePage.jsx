import { useState } from 'react'

const tree = {
  id: 'root', title: 'NCC Volume One', subtitle: 'Class 2 to Class 9', color: '#6366F1',
  children: [
    { id: 'A', title: 'Section A', subtitle: 'Governing requirements', color: '#6366F1', children: [
      { id: 'A1', title: 'Part A1', subtitle: 'Interpreting the NCC', color: '#6366F1', children: [
        { id: 'A1-O', title: 'A1O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A1-P', title: 'A1P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A1-D', title: 'A1D1', subtitle: 'DTS solution', color: '#6366F1' },
      ]},
      { id: 'A2', title: 'Part A2', subtitle: 'Compliance with the NCC', color: '#6366F1', children: [
        { id: 'A2-O', title: 'A2O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A2-P', title: 'A2P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A2-D', title: 'A2D1', subtitle: 'DTS solution', color: '#6366F1' },
        { id: 'A2-G4', title: 'A2G4', subtitle: 'Combination of solutions', color: '#6366F1' },
      ]},
      { id: 'A6', title: 'Part A6', subtitle: 'Building classification', color: '#6366F1', bss: true, children: [
        { id: 'A6-O', title: 'A6O1', subtitle: 'Objective', color: '#6366F1' },
        { id: 'A6-F', title: 'A6F1', subtitle: 'Functional statement', color: '#6366F1' },
        { id: 'A6-P', title: 'A6P1', subtitle: 'Performance requirement', color: '#6366F1' },
        { id: 'A6-D', title: 'A6D1', subtitle: 'DTS → Classes 1-10', color: '#6366F1' },
      ]},
    ]},
    { id: 'B', title: 'Section B', subtitle: 'Structure', color: '#888780', children: [
      { id: 'B1', title: 'Part B1', subtitle: 'Structural provisions', color: '#888780', children: [
        { id: 'B1-O', title: 'B1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'B1-P', title: 'B1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'B1-D', title: 'B1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'C', title: 'Section C', subtitle: 'Fire resistance', color: '#E24B4A', children: [
      { id: 'C1', title: 'Part C1', subtitle: 'Fire resistance', color: '#E24B4A', children: [
        { id: 'C1-O', title: 'C1O1', subtitle: 'Objective', color: '#E24B4A' },
        { id: 'C1-P', title: 'C1P1', subtitle: 'Performance requirement', color: '#E24B4A' },
        { id: 'C1-D', title: 'C1D1', subtitle: 'DTS → FRL ratings', color: '#E24B4A' },
      ]},
      { id: 'C2', title: 'Part C2', subtitle: 'Stability', color: '#E24B4A', children: [
        { id: 'C2-O', title: 'C2O1', subtitle: 'Objective', color: '#E24B4A' },
        { id: 'C2-P', title: 'C2P1', subtitle: 'Performance requirement', color: '#E24B4A' },
        { id: 'C2-D', title: 'C2D1', subtitle: 'DTS solution', color: '#E24B4A' },
      ]},
    ]},
    { id: 'D', title: 'Section D', subtitle: 'Access and egress', color: '#378ADD', children: [
      { id: 'D1', title: 'Part D1', subtitle: 'Access and egress', color: '#378ADD', children: [
        { id: 'D1-O', title: 'D1O1', subtitle: 'Objective', color: '#378ADD' },
        { id: 'D1-P', title: 'D1P1', subtitle: 'Performance requirement', color: '#378ADD' },
        { id: 'D1-D', title: 'D1D1', subtitle: 'DTS solution', color: '#378ADD' },
      ]},
      { id: 'D4', title: 'Part D4', subtitle: 'Disability access', color: '#378ADD', bss: true, children: [
        { id: 'D4-O', title: 'D4O1', subtitle: 'Objective', color: '#378ADD' },
        { id: 'D4-P', title: 'D4P1', subtitle: 'Performance requirement', color: '#378ADD' },
        { id: 'D4-D', title: 'D4D1', subtitle: 'DTS → AS 1428.1', color: '#378ADD', standard: 'AS 1428.1' },
      ]},
    ]},
    { id: 'E', title: 'Section E', subtitle: 'Services', color: '#888780', children: [
      { id: 'E1', title: 'Part E1', subtitle: 'Fire fighting', color: '#888780', children: [
        { id: 'E1-O', title: 'E1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'E1-P', title: 'E1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'E1-D', title: 'E1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
      { id: 'E2', title: 'Part E2', subtitle: 'Smoke hazard', color: '#888780', children: [
        { id: 'E2-O', title: 'E2O1', subtitle: 'Objective', color: '#888780' },
        { id: 'E2-P', title: 'E2P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'E2-D', title: 'E2D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'F', title: 'Section F', subtitle: 'Health and amenity', color: '#1D9E75', children: [
      { id: 'F1', title: 'Part F1', subtitle: 'Surface water', color: '#1D9E75', children: [
        { id: 'F1-O', title: 'F1O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F1-P', title: 'F1P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F1-D', title: 'F1D1', subtitle: 'DTS → AS 4654.2', color: '#1D9E75', standard: 'AS 4654.2' },
      ]},
      { id: 'F2', title: 'Part F2', subtitle: 'Wet areas', color: '#1D9E75', bss: true, children: [
        { id: 'F2-O', title: 'F2O1', subtitle: 'Objective', color: '#1D9E75', desc: 'Minimise risk of water from wet areas causing damage or unhealthy conditions.' },
        { id: 'F2-F', title: 'F2F1, F2F2', subtitle: 'Functional statements', color: '#1D9E75', desc: 'Building must protect against water damage and overflow from bathrooms and laundries.' },
        { id: 'F2-P', title: 'F2P1, F2P2', subtitle: 'Performance requirements', color: '#1D9E75', desc: 'Overflow from bathrooms must be prevented from reaching other units or public spaces.' },
        { id: 'F2-D', title: 'F2D1 → F2D2', subtitle: 'DTS → AS 3740', color: '#1D9E75', standard: 'AS 3740, AS 2588', desc: 'Building elements in wet areas must be waterproof per Specification 26 and comply with AS 3740.' },
      ]},
      { id: 'F3', title: 'Part F3', subtitle: 'Roof and wall cladding', color: '#1D9E75', bss: true, children: [
        { id: 'F3-O', title: 'F3O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F3-P', title: 'F3P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F3-D', title: 'F3D1', subtitle: 'DTS → AS 1288, AS 2047', color: '#1D9E75', standard: 'AS 1288, AS 2047' },
      ]},
      { id: 'F5', title: 'Part F5', subtitle: 'Room heights', color: '#1D9E75', bss: true, children: [
        { id: 'F5-O', title: 'F5O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F5-P', title: 'F5P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F5-D', title: 'F5D2', subtitle: 'DTS → 2.4m minimum', color: '#1D9E75', desc: 'Habitable rooms must have a minimum ceiling height of 2.4m.' },
      ]},
      { id: 'F6', title: 'Part F6', subtitle: 'Light and ventilation', color: '#1D9E75', bss: true, children: [
        { id: 'F6-O', title: 'F6O1', subtitle: 'Objective', color: '#1D9E75' },
        { id: 'F6-P', title: 'F6P1', subtitle: 'Performance requirement', color: '#1D9E75' },
        { id: 'F6-D', title: 'F6D2', subtitle: 'DTS → window area ratios', color: '#1D9E75', desc: 'Natural light: window area at least 10% of floor area. Ventilation: openable area at least 5%.' },
      ]},
    ]},
    { id: 'G', title: 'Section G', subtitle: 'Ancillary provisions', color: '#888780', children: [
      { id: 'G1', title: 'Part G1', subtitle: 'Minor structures', color: '#888780', children: [
        { id: 'G1-O', title: 'G1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'G1-D', title: 'G1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'I', title: 'Section I', subtitle: 'Special use', color: '#888780', children: [
      { id: 'I1', title: 'Part I1', subtitle: 'Class 9b buildings', color: '#888780', children: [
        { id: 'I1-O', title: 'I1O1', subtitle: 'Objective', color: '#888780' },
        { id: 'I1-P', title: 'I1P1', subtitle: 'Performance requirement', color: '#888780' },
        { id: 'I1-D', title: 'I1D1', subtitle: 'DTS solution', color: '#888780' },
      ]},
    ]},
    { id: 'J', title: 'Section J', subtitle: 'Energy efficiency', color: '#BA7517', children: [
      { id: 'J1', title: 'Part J1', subtitle: 'Energy performance', color: '#BA7517', children: [
        { id: 'J1-O', title: 'J1O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J1-P', title: 'J1P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J1-D', title: 'J1D1', subtitle: 'DTS solution', color: '#BA7517' },
      ]},
      { id: 'J4', title: 'Part J4', subtitle: 'Building fabric', color: '#BA7517', bss: true, children: [
        { id: 'J4-O', title: 'J4O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J4-P', title: 'J4P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J4-D', title: 'J4D2', subtitle: 'DTS → AS 4859.1', color: '#BA7517', standard: 'AS 4859.1', desc: 'Minimum R-values for walls, roofs, and floors based on climate zone.' },
      ]},
      { id: 'J5', title: 'Part J5', subtitle: 'Building sealing', color: '#BA7517', bss: true, children: [
        { id: 'J5-O', title: 'J5O1', subtitle: 'Objective', color: '#BA7517' },
        { id: 'J5-P', title: 'J5P1', subtitle: 'Performance requirement', color: '#BA7517' },
        { id: 'J5-D', title: 'J5D2', subtitle: 'DTS → sealing specs', color: '#BA7517' },
      ]},
    ]},
  ]
}

function getNodeAtPath(path) {
  return path.reduce((node, id) => node.children?.find(c => c.id === id) || node, tree)
}

function getAllNodes(node, depth = 0, result = []) {
  result.push({ ...node, depth })
  if (node.children) node.children.forEach(c => getAllNodes(c, depth + 1, result))
  return result
}

function MiniMap({ path }) {
  const allNodes = getAllNodes(tree)
  const maxDepth = 3
  const nodesByDepth = {}
  for (let d = 0; d <= maxDepth; d++) {
    nodesByDepth[d] = allNodes.filter(n => n.depth === d)
  }

  const pathSet = new Set(['root', ...path])
  const activeId = path[path.length - 1] || 'root'

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3" style={{width: '200px', flexShrink: 0}}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">You are here</p>
      {[0, 1, 2, 3].map(depth => {
        const nodes = nodesByDepth[depth] || []
        const labels = ['Volume', 'Section', 'Part', 'Clause']
        return (
          <div key={depth} className="mb-2">
            <p style={{fontSize: '9px', color: '#475569', marginBottom: '3px'}}>{labels[depth]}</p>
            <div className="flex flex-wrap gap-1">
              {nodes.map(node => {
                const isActive = node.id === activeId
                const isInPath = pathSet.has(node.id)
                return (
                  <div
                    key={node.id}
                    className="rounded"
                    style={{
                      width: depth === 0 ? '100%' : depth === 1 ? '28px' : '24px',
                      height: '14px',
                      backgroundColor: isActive ? node.color : isInPath ? node.color + '44' : '#1e293b',
                      border: `1px solid ${isActive ? node.color : isInPath ? node.color + '66' : '#334155'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(isActive || (isInPath && depth <= 2)) && (
                      <span style={{fontSize: '7px', color: isActive ? '#fff' : node.color, fontWeight: 500}}>
                        {node.id === 'root' ? 'V1' : node.id.replace('root', '')}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {path.length > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-700">
          <p style={{fontSize: '9px', color: '#475569', marginBottom: '2px'}}>Path</p>
          <p style={{fontSize: '9px', color: '#06b6d4'}}>
            V1 → {path.join(' → ')}
          </p>
        </div>
      )}
    </div>
  )
}

function NodeBox({ node, onClick, selected, dimmed }) {
  return (
    <button
      onClick={() => onClick(node)}
      disabled={dimmed || !node.children}
      className="flex flex-col items-center justify-center rounded-xl border-2 transition-all px-2 py-2 min-w-0 w-full"
      style={{
        borderColor: selected ? node.color : dimmed ? '#1e293b' : '#334155',
        backgroundColor: selected ? node.color + '22' : dimmed ? '#0a0f1a' : '#0f172a',
        opacity: dimmed ? 0.25 : 1,
        minHeight: '64px',
        cursor: (dimmed || !node.children) ? 'default' : 'pointer',
      }}
    >
      <span className="text-xs font-bold" style={{color: dimmed ? '#334155' : node.color}}>
        {node.title}
      </span>
      <span className="text-center leading-tight mt-0.5" style={{fontSize: '10px', color: dimmed ? '#1e293b' : '#94a3b8'}}>
        {node.subtitle}
      </span>
      {node.bss && !dimmed && (
        <span className="mt-1" style={{fontSize: '9px', color: '#06b6d4'}}>BSS</span>
      )}
      {node.standard && !dimmed && (
        <span className="mt-0.5" style={{fontSize: '9px', color: '#06b6d4'}}>{node.standard}</span>
      )}
    </button>
  )
}

export default function VolumePage() {
  const [path, setPath] = useState([])

  const displayNode = getNodeAtPath(path)
  const displayChildren = displayNode.children || []
  const nextSelectedId = displayChildren.find(c => path.includes(c.id))?.id || null

  const handleClick = (node) => {
    if (!node.children) return
    const idx = path.indexOf(node.id)
    if (idx >= 0) {
      setPath(path.slice(0, idx))
    } else {
      setPath([...path, node.id])
    }
  }

  const goBack = () => setPath(path.slice(0, -1))

  return (
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-8">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">NCC 2022</p>
          <h1 className="text-3xl font-bold text-white mb-2">Volume One</h1>
          <p className="text-slate-400 text-sm">Class 2 to Class 9. Click any node to drill down. Click again to go back up.</p>
        </div>

        <div className="flex gap-6 items-start">

          <div className="flex-1 flex flex-col items-center">

            {path.length > 0 && (
              <button onClick={goBack} className="self-start flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
                ← Back
              </button>
            )}

            <div
              className="rounded-xl border-2 px-6 py-3 mb-2 text-center"
              style={{borderColor: displayNode.color, backgroundColor: displayNode.color + '22'}}
            >
              <p className="text-sm font-bold" style={{color: displayNode.color}}>{displayNode.title}</p>
              <p className="text-xs text-slate-400">{displayNode.subtitle}</p>
            </div>

            {displayNode.desc && (
              <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-xl p-4 mb-2 text-center">
                <p className="text-xs text-slate-300 leading-relaxed">{displayNode.desc}</p>
                {displayNode.standard && (
                  <p className="text-xs text-accent font-medium mt-2">Standard: {displayNode.standard}</p>
                )}
              </div>
            )}

            {displayChildren.length > 0 && (
              <>
                <div className="w-0.5 h-6 bg-slate-600" />
                <div className="relative w-full">
                  {displayChildren.length > 1 && (
                    <div className="absolute bg-slate-600" style={{
                      top: 0, height: '1px',
                      left: `${100 / (displayChildren.length * 2)}%`,
                      right: `${100 / (displayChildren.length * 2)}%`,
                    }} />
                  )}
                  <div className="grid pt-0" style={{
                    gridTemplateColumns: `repeat(${Math.min(displayChildren.length, 5)}, 1fr)`,
                    gap: '8px',
                  }}>
                    {displayChildren.map(child => {
                      const isSelected = nextSelectedId === child.id
                      const isDimmed = nextSelectedId !== null && nextSelectedId !== child.id
                      return (
                        <div key={child.id} className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-slate-600" />
                          <NodeBox node={child} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {nextSelectedId && (() => {
                  const selectedChild = displayChildren.find(c => c.id === nextSelectedId)
                  const grandchildren = selectedChild?.children || []
                  if (grandchildren.length === 0) return null
                  const nextNextId = grandchildren.find(c => path.includes(c.id))?.id || null
                  return (
                    <>
                      <div className="w-0.5 h-6 bg-slate-600 mt-2" />
                      <div className="relative w-full">
                        <div className="grid" style={{
                          gridTemplateColumns: `repeat(${Math.min(grandchildren.length, 5)}, 1fr)`,
                          gap: '8px',
                        }}>
                          {grandchildren.map(gc => {
                            const isSelected = nextNextId === gc.id
                            const isDimmed = nextNextId !== null && nextNextId !== gc.id
                            return (
                              <div key={gc.id} className="flex flex-col items-center">
                                <div className="w-0.5 h-6 bg-slate-600" />
                                <NodeBox node={gc} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </>
            )}
          </div>

          <div className="sticky top-24">
            <MiniMap path={['root', ...path]} />
          </div>

        </div>

        <div className="flex items-center gap-4 mt-10 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent" />
            BSS relevant
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-slate-600" />
            Click to drill down · click again to go back up
          </div>
        </div>
      </div>
    </div>
  )
}
