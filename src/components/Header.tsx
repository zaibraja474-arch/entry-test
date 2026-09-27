export type NavigationTab =
  | 'academies'
  | 'compare'
  | 'matchmaker'
  | 'calculator'
  | 'guides'
  | 'degree-quiz'
  | 'degrees'
  | 'armed-forces';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  compareCount: number;
}

export function Header({ activeTab, setActiveTab, compareCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => setActiveTab('academies')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-1.5"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
            PakEntry<span className="text-emerald-600">.</span>
          </span>
          <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            & Degrees
          </span>
        </button>

        {/* Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('academies')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'academies'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Academies
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap relative ${
              activeTab === 'compare'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Compare ({compareCount})
          </button>
          <button
            onClick={() => setActiveTab('degree-quiz')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'degree-quiz'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Degree Suggester Quiz
          </button>
          <button
            onClick={() => setActiveTab('degrees')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'degrees'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            All Degrees (Aviation, Cyber, Tech)
          </button>
          <button
            onClick={() => setActiveTab('armed-forces')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'armed-forces'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Army, PAF, Navy & ISSB
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`cursor-pointer transition-colors py-1 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Fee Calculator
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('degree-quiz')}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Suggest My Degree</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Navigation Scroll */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('academies')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'academies' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Academies
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'compare' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Compare ({compareCount})
        </button>
        <button
          onClick={() => setActiveTab('degree-quiz')}
          className={`px-2.5 py-1 rounded whitespace-nowrap font-bold ${activeTab === 'degree-quiz' ? 'text-emerald-800 bg-emerald-100' : 'text-emerald-700'}`}
        >
          Degree Quiz
        </button>
        <button
          onClick={() => setActiveTab('degrees')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'degrees' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Aviation, Cyber & Degrees
        </button>
        <button
          onClick={() => setActiveTab('armed-forces')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'armed-forces' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Army, PAF, Navy & ISSB
        </button>
        <button
          onClick={() => setActiveTab('matchmaker')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'matchmaker' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Matchmaker
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'calculator' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Fee Calculator
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'guides' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
        >
          Test Guides
        </button>
      </div>
    </header>
  );
}
