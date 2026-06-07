import { BookOpen, AlertTriangle, Users, Building2, HardHat, Ruler } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-darkbg pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            About this tool
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">
            Australian Standards Reference
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            A free reference tool for the Australian building and construction industry.
          </p>
        </div>

        <div className="space-y-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-2">
                <Users size={18} className="text-primary" />
              </div>
              <h2 className="text-base font-semibold text-white">Who is it for?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: HardHat, label: 'Builders & tradies', desc: 'Quickly check product compliance before purchasing or installing.' },
                { icon: Ruler, label: 'Designers & drafters', desc: 'Verify standards when specifying materials and products for a project.' },
                { icon: Building2, label: 'Construction professionals', desc: 'Reference key requirements across building classes and room types.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <Icon size={16} className="text-accent mb-2" />
                  <p className="text-sm font-medium text-white mb-1">{label}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/10 rounded-lg p-2">
                <BookOpen size={18} className="text-accent" />
              </div>
              <h2 className="text-base font-semibold text-white">How to use it</h2>
            </div>
            <ol className="space-y-2">
              {[
                'Select your building class — house, office, shop, public building, and more.',
                'Select the room or area you are working in — the list updates based on your building type.',
                'Select the product or material you are specifying or purchasing.',
                'Get the relevant Australian Standards and key compliance requirements instantly.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-amber-900/10 border border-amber-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-900/30 rounded-lg p-2">
                <AlertTriangle size={18} className="text-amber-400" />
              </div>
              <h2 className="text-base font-semibold text-amber-300">Important disclaimer</h2>
            </div>
            <p className="text-sm text-amber-200/60 leading-relaxed">
              This tool is for reference purposes only. Always verify requirements
              with a licensed building professional, certifier, or the relevant
              authority in your state or territory. Standards and NCC requirements
              may change — check the ABCB website for the latest version.
            </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-slate-600">
              Built for the Australian construction industry · Standards based on NCC 2022/2025
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
