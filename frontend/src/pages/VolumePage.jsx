import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const fadeSlideIn = {
  animation: 'fadeSlideIn 0.3s ease forwards',
}

// ─── Search helpers ───────────────────────────────────────────────────────────

function collectAllNodes(node, ancestorPath = [], results = []) {
  const currentPath = (!node.children || node.node_id === node.node_id) ? [...ancestorPath, node.node_id] : []
  // root nodes have no parent so path starts fresh
  const isRoot = !ancestorPath.length || node.is_root
  const path = isRoot ? [] : [...ancestorPath, node.node_id]
  results.push({ node, path: isRoot ? [] : path })
  if (node.children) {
    const nextPath = isRoot ? [node.node_id] : [...ancestorPath, node.node_id]
    node.children.forEach(child => collectAllNodes(child, nextPath, results))
  }
  return results
}

function nodeMatches(node, query) {
  const q = query.toLowerCase().trim()
  if (!q) return false
  const fields = [node.title, node.subtitle, node.standard, node.desc]
    .filter(Boolean).map(f => f.toLowerCase())
  return fields.some(f => f.includes(q))
}

function searchTrees(query, treeV1, treeV2) {
  if (!query.trim()) return []
  const v1Nodes = treeV1 ? collectAllNodes(treeV1) : []
  const v2Nodes = treeV2 ? collectAllNodes(treeV2) : []

  const v1Results = v1Nodes
    .filter(({ node }) => nodeMatches(node, query))
    .map(({ node, path }) => ({ node, path, volume: 1, volumeTree: treeV1 }))

  const v2Results = v2Nodes
    .filter(({ node }) => nodeMatches(node, query))
    .map(({ node, path }) => ({ node, path, volume: 2, volumeTree: treeV2 }))

  return [...v1Results, ...v2Results].slice(0, 12)
}

function buildBreadcrumbs(path, rootTree) {
  if (!rootTree) return []
  const allNodes = collectAllNodes(rootTree)
  const labels = [rootTree.title]
  path.forEach(id => {
    const found = allNodes.find(n => n.node.node_id === id)
    if (found) labels.push(found.node.title)
  })
  return labels
}

// ─── Tree traversal helpers ──────────────────────────────────────────────────

function getNodeAtPath(path, rootTree) {
  if (!rootTree) return null
  return path.reduce((node, id) => {
    if (!node) return null
    return node.children?.find(c => c.node_id === id) || node
  }, rootTree)
}

function getAllNodes(node, depth = 0, result = []) {
  if (!node) return result
  result.push({ ...node, depth })
  if (node.children) node.children.forEach(c => getAllNodes(c, depth + 1, result))
  return result
}

// ─── Components ──────────────────────────────────────────────────────────────

function MiniMap({ path, onNavigate, rootTree }) {
  if (!rootTree) return null
  const pathNodes = [
    { id: rootTree.node_id, label: rootTree.title, color: rootTree.color },
    ...path.map(id => {
      const found = getAllNodes(rootTree).find(n => n.node_id === id)
      return { id, label: found?.title || id, color: found?.color || rootTree.color }
    })
  ]

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mb-6">
      <p style={{fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 500}}>
        Your path
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {pathNodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1">
            {i > 0 && <span style={{fontSize: '10px', color: '#475569'}}>→</span>}
            <button
              onClick={() => onNavigate(i)}
              className="rounded-lg px-2 py-1 transition-all hover:opacity-80"
              style={{
                backgroundColor: node.color + '22',
                border: `1px solid ${node.color + '66'}`,
              }}
            >
              <p style={{fontSize: '10px', color: node.color, fontWeight: 500, lineHeight: 1.3}}>
                {node.label}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NodeBox({ node, onClick, selected, dimmed }) {
  return (
    <button
      onClick={() => onClick(node)}
      disabled={dimmed || !node.children?.length}
      className="flex flex-col items-center justify-center rounded-xl border-2 px-2 py-2 min-w-0 w-full"
      onMouseEnter={e => { if (!dimmed) e.currentTarget.style.transform = 'scale(1.04)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      style={{
        borderColor: selected ? node.color : dimmed ? '#1e293b' : '#334155',
        backgroundColor: selected ? node.color + '22' : dimmed ? '#0a0f1a' : '#0f172a',
        opacity: dimmed ? 0.25 : 1,
        minHeight: '64px',
        cursor: (dimmed || !node.children?.length) ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        animation: selected ? 'pulse 2s ease-in-out infinite' : undefined,
      }}
    >
      <span className="text-xs font-bold" style={{color: dimmed ? '#334155' : node.color}}>
        {node.title}
      </span>
      <span className="text-center leading-tight mt-0.5" style={{fontSize: '10px', color: dimmed ? '#1e293b' : '#94a3b8'}}>
        {node.subtitle}
      </span>
      {node.standard && !dimmed && (
        <span className="mt-0.5" style={{fontSize: '9px', color: '#06b6d4'}}>{node.standard}</span>
      )}
    </button>
  )
}

// ─── Search UI ────────────────────────────────────────────────────────────────

function SearchBar({ onNavigateToResult, treeV1, treeV2 }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (query.trim().length >= 2) {
      const found = searchTrees(query, treeV1, treeV2)
      setResults(found)
      setOpen(true)
    } else {
      setResults([])
      setOpen(false)
    }
  }, [query, treeV1, treeV2])

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (result) => {
    onNavigateToResult(result)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        backgroundColor: '#0f172a', border: '1px solid #334155',
        borderRadius: '10px', padding: '8px 12px',
      }}>
        <Search size={14} color="#475569" style={{ flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by keyword, AS number or section…"
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '13px' }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <X size={13} color="#475569" />
          </button>
        )}
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px',
          zIndex: 50, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          animation: 'fadeSlideIn 0.2s ease forwards',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#475569', fontSize: '12px' }}>
              No results for "{query}"
            </div>
          ) : (
            <>
              <div style={{ padding: '8px 12px 4px', borderBottom: '1px solid #1e293b' }}>
                <span style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
              </div>
              {results.map((result, i) => {
                const breadcrumbs = buildBreadcrumbs(result.path, result.volumeTree)
                const volColor = result.volume === 1 ? '#6366F1' : '#06b6d4'
                return (
                  <button key={i} onClick={() => handleSelect(result)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 12px', background: 'none', border: 'none',
                      borderBottom: i < results.length - 1 ? '1px solid #1e293b' : 'none',
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: result.node.color || '#e2e8f0' }}>
                        {result.node.title}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{result.node.subtitle}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3px' }}>
                      {breadcrumbs.map((crumb, ci) => (
                        <span key={ci} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          {ci > 0 && <span style={{ fontSize: '9px', color: '#334155' }}>→</span>}
                          <span style={{ fontSize: '9px', color: ci === 0 ? volColor : '#475569', fontWeight: ci === 0 ? 600 : 400 }}>
                            {crumb}
                          </span>
                        </span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VolumePage() {
  const [path, setPath] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [activeVolume, setActiveVolume] = useState(1)
  const [treeV1, setTreeV1] = useState(null)
  const [treeV2, setTreeV2] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch both trees on mount
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true)
        const [r1, r2] = await Promise.all([
          fetch(`${API_BASE}/api/ncc-tree/?volume=1`),
          fetch(`${API_BASE}/api/ncc-tree/?volume=2`),
        ])
        if (!r1.ok || !r2.ok) throw new Error('Failed to fetch NCC tree data')
        const [d1, d2] = await Promise.all([r1.json(), r2.json()])
        setTreeV1(d1)
        setTreeV2(d2)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTrees()
  }, [])

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const handleVolumeChange = (vol) => {
    setActiveVolume(vol)
    setPath([])
  }

  const currentTree = activeVolume === 1 ? treeV1 : treeV2
  const displayNode = currentTree ? (getNodeAtPath(path, currentTree) || currentTree) : null
  const displayChildren = displayNode?.children || []
  const nextSelectedId = displayChildren.find(c => path.includes(c.node_id))?.node_id || null

  const handleClick = (node) => {
    if (!node.children?.length) return
    const idx = path.indexOf(node.node_id)
    if (idx >= 0) {
      setPath(path.slice(0, idx))
    } else {
      setPath([...path, node.node_id])
    }
  }

  const goBack = () => setPath(path.slice(0, -1))

  const handleNavigateToResult = (result) => {
    setActiveVolume(result.volume)
    const targetPath = result.node.children?.length
      ? result.path
      : result.path.slice(0, -1)
    setPath(targetPath)
  }

  return (
    <>
    <style>{`
      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(-12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0px rgba(99,102,241,0.4); }
        50% { box-shadow: 0 0 0 6px rgba(99,102,241,0.1); }
      }
    `}</style>
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-6">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">NCC 2022</p>
          <h1 className="text-3xl font-bold text-white mb-4">
            {activeVolume === 1 ? 'Volume One' : 'Volume Two'}
          </h1>
          <SearchBar
            onNavigateToResult={handleNavigateToResult}
            treeV1={treeV1}
            treeV2={treeV2}
          />
        </div>

        <div className="flex gap-3 mb-6">
          {[1, 2].map(vol => (
            <button key={vol} onClick={() => handleVolumeChange(vol)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activeVolume === vol ? (vol === 1 ? '#6366F122' : '#06b6d422') : '#0f172a',
                border: activeVolume === vol ? `2px solid ${vol === 1 ? '#6366F1' : '#06b6d4'}` : '1px solid #334155',
                color: activeVolume === vol ? (vol === 1 ? '#6366F1' : '#06b6d4') : '#64748b',
              }}
            >
              Volume {vol === 1 ? 'One' : 'Two'}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div style={{ color: '#475569', fontSize: '14px' }}>Loading NCC tree…</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-6">
            <p style={{ color: '#f87171', fontSize: '13px' }}>Failed to load tree: {error}</p>
          </div>
        )}

        {/* Tree */}
        {!loading && !error && currentTree && (
          <>
            <MiniMap
              path={path}
              onNavigate={(index) => setPath(path.slice(0, index))}
              rootTree={currentTree}
            />

            <div className="flex flex-col items-center">
              {path.length > 0 && (
                <button onClick={goBack}
                  className="self-start flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
                  ← Back
                </button>
              )}

              {displayNode && (
                <div className="rounded-xl border-2 px-6 py-3 mb-2 text-center"
                  style={{borderColor: displayNode.color, backgroundColor: displayNode.color + '22'}}>
                  <p className="text-sm font-bold" style={{color: displayNode.color}}>{displayNode.title}</p>
                  <p className="text-xs text-slate-400">{displayNode.subtitle}</p>
                </div>
              )}

              {displayNode?.desc && (
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
                    <div style={fadeSlideIn}>
                      <div className="grid pt-0" style={{
                        gridTemplateColumns: `repeat(${Math.min(displayChildren.length, isMobile ? 2 : 5)}, 1fr)`,
                        gap: '8px',
                      }}>
                        {displayChildren.map(child => {
                          const isSelected = nextSelectedId === child.node_id
                          const isDimmed = nextSelectedId !== null && nextSelectedId !== child.node_id
                          return (
                            <div key={child.node_id} className="flex flex-col items-center">
                              <div className="w-0.5 h-6 bg-slate-600" />
                              <NodeBox node={child} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {nextSelectedId && (() => {
                    const selectedChild = displayChildren.find(c => c.node_id === nextSelectedId)
                    const grandchildren = selectedChild?.children || []
                    if (grandchildren.length === 0) return null
                    const nextNextId = grandchildren.find(c => path.includes(c.node_id))?.node_id || null
                    return (
                      <>
                        <div className="w-0.5 h-6 bg-slate-600 mt-2" />
                        <div className="relative w-full">
                          <div style={fadeSlideIn}>
                            <div className="grid" style={{
                              gridTemplateColumns: `repeat(${Math.min(grandchildren.length, isMobile ? 2 : 5)}, 1fr)`,
                              gap: '8px',
                            }}>
                              {grandchildren.map(gc => {
                                const isSelected = nextNextId === gc.node_id
                                const isDimmed = nextNextId !== null && nextNextId !== gc.node_id
                                return (
                                  <div key={gc.node_id} className="flex flex-col items-center">
                                    <div className="w-0.5 h-6 bg-slate-600" />
                                    <NodeBox node={gc} onClick={handleClick} selected={isSelected} dimmed={isDimmed} />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </>
              )}
            </div>
          </>
        )}

      </div>
    </div>
    </>
  )
}
