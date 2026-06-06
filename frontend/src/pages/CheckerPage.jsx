import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, RotateCcw, AlertCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export default function CheckerPage() {
  const [buildingClasses, setBuildingClasses] = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [productCategories, setProductCategories] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/building-classes/`).then(r => setBuildingClasses(r.data))
    axios.get(`${API}/api/rooms/`).then(r => setRoomTypes(r.data))
    axios.get(`${API}/api/categories/`).then(r => setProductCategories(r.data))
  }, [])

  const handleCheck = () => {
    if (!selectedClass && !selectedRoom && !selectedProduct) return
    setLoading(true)
    setSearched(true)
    axios.post(`${API}/api/check/`, {
      building_class: selectedClass || null,
      room_type: selectedRoom || null,
      product_category: selectedProduct || null,
    })
      .then(r => setResults(r.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  const handleReset = () => {
    setSelectedClass('')
    setSelectedRoom('')
    setSelectedProduct('')
    setResults(null)
    setSearched(false)
  }

  const selectClass = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"

  return (
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Australian Standards · Compliance Reference
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">
            Standards compliance checker
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Select your building type, room, and product to instantly find the relevant
            Australian Standards and key compliance requirements.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Building type
              </label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={selectClass}>
                <option value="">Any</option>
                {buildingClasses.map(bc => (
                  <option key={bc.id} value={bc.id}>Class {bc.code} — {bc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Room / area
              </label>
              <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} className={selectClass}>
                <option value="">Any</option>
                {roomTypes.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Product / material
              </label>
              <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className={selectClass}>
                <option value="">Any</option>
                {productCategories.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCheck}
              disabled={!selectedClass && !selectedRoom && !selectedProduct}
              className="flex items-center gap-2 bg-primary hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <Search size={15} />
              Check standards
            </button>
            {searched && (
              <button onClick={handleReset} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-2 transition-colors">
                <RotateCcw size={14} />
                Reset
              </button>
            )}
          </div>
        </div>

        {loading && (
          <p className="text-sm text-slate-400">Checking standards...</p>
        )}

        {!loading && searched && results && (
          <div>
            {results.count === 0 ? (
              <div className="flex items-start gap-3 bg-amber-900/20 border border-amber-800/40 rounded-xl p-5 text-sm text-amber-300">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                No specific requirements found for this combination. Try selecting fewer filters or browse the Standards library.
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                  {results.count} requirement{results.count !== 1 ? 's' : ''} found
                </p>
                <div className="space-y-4">
                  {results.results.map(rule => (
                    <div key={rule.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {rule.standard_code}
                        </span>
                        <span className="text-xs text-slate-500">{rule.standard_title}</span>
                      </div>
                      <p className="text-sm text-slate-200 mb-3 leading-relaxed">
                        {rule.requirement}
                      </p>
                      {rule.key_numbers && (
                        <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 mb-3">
                          <p className="text-xs font-semibold text-accent">{rule.key_numbers}</p>
                        </div>
                      )}
                      {rule.reason && (
                        <p className="text-xs text-slate-500 leading-relaxed">{rule.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
