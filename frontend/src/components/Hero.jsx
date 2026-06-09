import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="bg-darkbg pt-24 sm:pt-32 pb-10 sm:pb-12 px-4">
      <div className="max-w-3xl mx-auto">

        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
          Australian Standards · NCC Compliance
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Find the right standard
          <span className="text-primary block mt-1">for any building project.</span>
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
          Select your building type, room, and product — get the relevant
          Australian Standards instantly.
        </p>

        <a
          href="#checker"
          className="inline-flex items-center gap-2 bg-primary hover:bg-indigo-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Get started
          <ArrowRight size={15} />
        </a>

      </div>
    </div>
  )
}
