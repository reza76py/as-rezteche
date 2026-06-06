import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const priorityStyle = {
  high: 'bg-green-900/30 text-green-400 border border-green-800/40',
  medium: 'bg-amber-900/20 text-amber-400 border border-amber-800/30',
  low: 'bg-slate-800 text-slate-400 border border-slate-700',
}

export default function StandardsPage() {
  const [standards, setStandards] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    axios.get(`${API}/api/standards/`)
      .then(res => setStandards(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-darkbg pt-24 px-4">
      <p className="text-slate-500 text-sm">Loading standards...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Reference library
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">Standards library</h1>
          <p className="text-slate-400 text-sm">
            All Australian Standards covered by this tool. Click any standard to read more.
          </p>
        </div>

        <div className="space-y-3">
          {standards.map(s => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
              <button
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-white">{s.code}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyle[s.priority]}`}>
                      {s.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{s.title}</p>
                </div>
                <span className="text-slate-500 mt-1 flex-shrink-0">
                  {expanded === s.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {expanded === s.id && (
                <div className="px-5 pb-5 border-t border-slate-800">
                  <p className="text-sm text-slate-300 leading-relaxed mt-4 mb-4">
                    {s.full_description}
                  </p>
                  {s.rules && s.rules.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Key requirements
                      </p>
                      {s.rules.map(rule => (
                        <div key={rule.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-sm text-slate-200 mb-1">{rule.requirement}</p>
                          {rule.key_numbers && (
                            <p className="text-xs text-accent font-medium">{rule.key_numbers}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
