interface HeroProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onSelectTrack: (track: string) => void;
  selectedTrack: string;
  onOpenMatchmaker: () => void;
}

export function Hero({
  onSearchChange,
  searchQuery,
  onSelectTrack,
  selectedTrack,
  onOpenMatchmaker,
}: HeroProps) {
  const tracks = [
    { id: 'all', label: 'All Entry Tests' },
    { id: 'MDCAT', label: 'MDCAT & NUMS (Medical)' },
    { id: 'NUST NET', label: 'NUST NET & ECAT (Engineering)' },
    { id: 'FAST', label: 'FAST-NU (Computer Science)' },
    { id: 'AKU', label: 'AKU & IBA (Aga Khan / Business)' },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-20">
      {/* Background visual asset with measured scrim for high WCAG contrast */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/hero_students_entry_test_1790507385582.jpg"
          alt="Pakistani students studying for university entry tests"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400">
              <span>Verified 2025-2026 Academic Directory</span>
              <span aria-hidden="true">·</span>
              <span>Pakistan Admissions Authority</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Choose the Right Entry Test Academy in Pakistan with Transparent Facts.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Compare genuine fee structures, course durations, test session frequency, and verified success rate statistics across KIPS, STEP, Stars, Anees Hussain, Nearpeer, and top regional institutes.
            </p>

            {/* Search and Action Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by academy name, city (e.g. Lahore, Karachi), or test..."
                    className="w-full px-4 py-3 text-sm bg-white/95 text-slate-900 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  onClick={onOpenMatchmaker}
                  className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Resolve My Choice (Quiz)
                </button>
              </div>

              {/* Functional track filters */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-medium">Quick Track:</span>
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => onSelectTrack(track.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedTrack === track.id
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust and coverage indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div>
                <span className="text-white font-bold font-mono tabular-nums text-sm">8+</span> Premier Networks Covered
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-white font-bold font-mono tabular-nums text-sm">PKR 9,500 – 65,000</span> Complete Fee Transparency
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-white font-bold font-mono tabular-nums text-sm">18,500+</span> Annual Selections Tracked
              </div>
            </div>
          </div>

          {/* Quick Problem Resolver Callout Card */}
          <div className="lg:col-span-5 bg-slate-800/70 border border-slate-700/80 rounded-xl p-6 backdrop-blur-sm space-y-4">
            <div className="border-b border-slate-700/80 pb-3">
              <h3 className="text-base font-semibold text-white">Stuck on Which Academy to Pick?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Common dilemmas solved through genuine student performance data:
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-white">KIPS vs STEP:</strong> PGC students save PKR 14,000+ at STEP with exceptional mobile app videos, while KIPS offers unmatched publication book series.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-white">Hostel vs Online:</strong> Living in Lahore/Rawalpindi adds PKR 30,000/month in hostel & mess costs. Nearpeer & TopGrade let outstation students save PKR 100k+.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-white">AKU & IBA Specialization:</strong> General Punjab academies fail at AKU/IBA. Anees Hussain in Karachi produces 65%+ of AKU Medical College admissions.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenMatchmaker}
                className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Take 2-Minute Academy Matchmaker</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
