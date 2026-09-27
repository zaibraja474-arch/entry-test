interface HeaderProps {
  activeTab: 'academies' | 'compare' | 'matchmaker' | 'calculator' | 'guides';
  setActiveTab: (tab: 'academies' | 'compare' | 'matchmaker' | 'calculator' | 'guides') => void;
  compareCount: number;
}

export function Header({ activeTab, setActiveTab, compareCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('academies')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
            PakEntry<span className="text-emerald-600">.</span>
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('academies')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-sm whitespace-nowrap ${
              activeTab === 'academies'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Academies Directory
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-sm whitespace-nowrap relative ${
              activeTab === 'compare'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Compare Academies
            {compareCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center bg-emerald-600 text-white text-xs font-mono rounded-full px-1.5 py-0.2">
                {compareCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-sm whitespace-nowrap ${
              activeTab === 'matchmaker'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Academy Matchmaker
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-sm whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Fee & Scholarship Calculator
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-sm whitespace-nowrap ${
              activeTab === 'guides'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Entry Test Guides & FAQs
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('matchmaker')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            Find My Academy
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('academies')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'academies' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Academies
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'compare' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Compare ({compareCount})
        </button>
        <button
          onClick={() => setActiveTab('matchmaker')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'matchmaker' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Matchmaker
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'calculator' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Fee Calculator
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'guides' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Guides
        </button>
      </div>
    </header>
  );
}
