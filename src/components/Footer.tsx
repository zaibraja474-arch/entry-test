import { NavigationTab } from './Header';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
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
              Pakistan’s unbiased entry test academies directory, degree intelligence, and armed forces commission preparation portal. Helping students choose the right degrees, academies, and career paths with transparent data.
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
                  onClick={() => onSelectTab('degree-quiz')}
                  className="hover:text-white transition-colors cursor-pointer text-emerald-400 font-semibold"
                >
                  Degree Suggester Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('degrees')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Degrees (Aviation, Cyber, AI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('armed-forces')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Army, PAF, Navy & ISSB Guide
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
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fee & Scholarship Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Career Tracks */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Featured Degrees & Tests
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>BS Aviation Management & Aerospace</li>
              <li>BS Cyber Security & AI / Machine Learning</li>
              <li>PMA Long Course & PAF GD Pilot</li>
              <li>Army Technical Cadet Course (TCC)</li>
              <li>Army Medical College (AMC NUMS)</li>
              <li>MDCAT, NUST NET, ECAT & FAST-NU</li>
            </ul>
          </div>

          {/* Notice & Disclaimer */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Student Advisory Notice
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Eligibility criteria, age limitations, and physical standards for Pakistan Army, PAF, and Navy are in accordance with official Armed Forces Selection Centers (AS&RC / I&SC). Academic degree accreditations are verified via HEC, PEC, PMDC, and NCEAC.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} PakEntry. All rights reserved. Dedicated to Pakistani students and aspirants.
          </div>
          <div className="flex items-center gap-4">
            <span>Rawalpindi · Islamabad · Lahore · Karachi · Peshawar · Quetta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
