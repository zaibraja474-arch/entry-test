interface FooterProps {
  onSelectTab: (tab: 'academies' | 'compare' | 'matchmaker' | 'calculator' | 'guides') => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-black tracking-tight text-white">
              PakEntry<span className="text-emerald-500">.</span>
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pakistan’s unbiased entry test academies directory and comparison platform. Helping pre-medical and pre-engineering students make informed decisions with genuine fee and success statistics.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectTab('academies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academies Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('compare')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('matchmaker')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Decision Matchmaker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fee & Scholarship Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guides')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Entry Test Guides & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Major Tests */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Entry Tests
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>MDCAT & NUMS (PMDC Medical)</li>
              <li>NUST NET Series 1, 2, 3, 4</li>
              <li>ECAT (UET Lahore)</li>
              <li>FAST-NU Computer Science</li>
              <li>AKU Medical College & MMI</li>
              <li>IBA Karachi & LUMS SAT</li>
            </ul>
          </div>

          {/* Notice & Disclaimer */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Student Disclaimer
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Fee structures, durations, and scholarship policies are aggregated from official institutional prospectuses and verified student reports for the 2025-2026 academic cycle. Always confirm directly at branch admission desks before remitting bank vouchers.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} PakEntry. All rights reserved. Built for Pakistani students.
          </div>
          <div className="flex items-center gap-4">
            <span>Lahore · Islamabad · Karachi · Multan · Peshawar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
