import { useState } from 'react';
import { Academy } from '../types';

interface ComparisonMatrixProps {
  academies: Academy[];
  selectedAcademies: Academy[];
  onRemoveFromCompare: (academyId: string) => void;
  onAddToCompare: (academy: Academy) => void;
  onSelectDetails: (academy: Academy) => void;
  onClearAll: () => void;
}

export function ComparisonMatrix({
  academies,
  selectedAcademies,
  onRemoveFromCompare,
  onAddToCompare,
  onSelectDetails,
  onClearAll,
}: ComparisonMatrixProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'financials' | 'durations' | 'success' | 'tech'>('all');
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Available academies that are not yet selected
  const availableToAdd = academies.filter(
    (a) => !selectedAcademies.some((sel) => sel.id === a.id)
  );

  if (selectedAcademies.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ⚖️
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Academies Selected for Comparison</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
          Select 2 to 4 academies from the directory to inspect their fee structures, course durations, test sessions, and success rates side-by-side.
        </p>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Quick 1-Click Popular Comparisons:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                const kips = academies.find((a) => a.id === 'kips');
                const step = academies.find((a) => a.id === 'step');
                if (kips) onAddToCompare(kips);
                if (step) onAddToCompare(step);
              }}
              className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Compare: KIPS vs STEP by PGC
            </button>
            <button
              onClick={() => {
                const nearpeer = academies.find((a) => a.id === 'nearpeer');
                const topgrade = academies.find((a) => a.id === 'topgrade');
                if (nearpeer) onAddToCompare(nearpeer);
                if (topgrade) onAddToCompare(topgrade);
              }}
              className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Compare: Nearpeer vs TopGrade (Online)
            </button>
            <button
              onClick={() => {
                const kips = academies.find((a) => a.id === 'kips');
                const stars = academies.find((a) => a.id === 'stars');
                const scholars = academies.find((a) => a.id === 'scholars');
                if (kips) onAddToCompare(kips);
                if (stars) onAddToCompare(stars);
                if (scholars) onAddToCompare(scholars);
              }}
              className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Compare: KIPS vs Stars vs Scholar’s
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Bar: Filter Category & Add Academy */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        {/* Category Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Section:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Criteria
          </button>
          <button
            onClick={() => setFilterCategory('financials')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterCategory === 'financials'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Fees & Scholarships
          </button>
          <button
            onClick={() => setFilterCategory('durations')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterCategory === 'durations'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Durations & Schedules
          </button>
          <button
            onClick={() => setFilterCategory('success')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterCategory === 'success'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Success Statistics
          </button>
          <button
            onClick={() => setFilterCategory('tech')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterCategory === 'tech'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            LMS & Campuses
          </button>
        </div>

        {/* Right Action Tools: Add Academy Dropdown & Clear */}
        <div className="flex items-center gap-3">
          {availableToAdd.length > 0 && selectedAcademies.length < 4 && (
            <select
              value=""
              onChange={(e) => {
                const target = academies.find((a) => a.id === e.target.value);
                if (target) onAddToCompare(target);
              }}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="" disabled>
                + Add Academy to Compare ({selectedAcademies.length}/4)
              </option>
              {availableToAdd.map((ac) => (
                <option key={ac.id} value={ac.id}>
                  {ac.name} ({ac.headquarters})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onClearAll}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded cursor-pointer whitespace-nowrap"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Responsive Comparison Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Sticky Header with Academy Cards */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90">
                <th className="p-4 w-52 sm:w-64 min-w-[200px] text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50/95 z-20 shadow-xs">
                  Evaluation Criteria
                </th>
                {selectedAcademies.map((academy) => (
                  <th
                    key={academy.id}
                    className="p-4 w-64 min-w-[240px] text-left align-top border-l border-slate-200/80 bg-white"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug">
                            {academy.name}
                          </h4>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {academy.headquarters}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromCompare(academy.id)}
                          title="Remove from comparison"
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shrink-0"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-amber-500 font-semibold font-mono tabular-nums">★ {academy.rating.toFixed(1)}</span>
                        <span aria-hidden="true">·</span>
                        <span>Est. {academy.established}</span>
                      </div>

                      <button
                        onClick={() => onSelectDetails(academy)}
                        className="w-full py-1.5 px-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center"
                      >
                        Full Profile
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {/* SECTION: 1. OVERVIEW & TARGET TESTS */}
              {(filterCategory === 'all' || filterCategory === 'tech') && (
                <>
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={selectedAcademies.length + 1}
                      className="px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                    >
                      1. General Scope & Coverage
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Entry Tests Offered
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top">
                        <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-medium text-slate-800">
                          {ac.entryTestsCovered.map((t, idx) => (
                            <span key={t}>
                              <span className="text-emerald-800 font-semibold">{t}</span>
                              {idx < ac.entryTestsCovered.length - 1 && ' ·'}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Delivery Format
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top">
                        <span className="font-semibold text-slate-800">
                          {ac.deliveryModes.join(' / ')}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Best Suited For
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-600 leading-relaxed">
                        {ac.bestSuitedFor}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: 2. FINANCIALS & FEE STRUCTURE */}
              {(filterCategory === 'all' || filterCategory === 'financials') && (
                <>
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={selectedAcademies.length + 1}
                      className="px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                    >
                      2. Detailed Fee Structure & Financials
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Regular Full Session Fee
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top">
                        <div className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                          PKR {ac.fee.regularSession.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Standard 10-14 weeks tuition
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Crash / Super Revision Fee
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-semibold text-slate-800 tabular-nums">
                        PKR {ac.fee.crashProgram.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Test Session Only (FLPs)
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-semibold text-slate-800 tabular-nums">
                        PKR {ac.fee.testSessionOnly.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Online / LMS Digital Package
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-semibold text-slate-800 tabular-nums">
                        PKR {ac.fee.onlinePackage.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Books & Study Materials
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700 leading-relaxed">
                        {ac.fee.booksAndMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Installment Policy
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700 leading-relaxed">
                        <span className="font-semibold text-emerald-800">
                          {ac.fee.installmentsAllowed ? 'Yes · ' : 'No'}
                        </span>
                        {ac.fee.installmentDetails}
                      </td>
                    ))}
                  </tr>

                  {/* Scholarships & Concessions Sub-rows */}
                  <tr className="bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-slate-50/50 z-10">
                      Board Position Holders
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-medium text-emerald-800">
                        {ac.scholarships.positionHoldersWaiver}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      90%+ Marks Discount
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700">
                        {ac.scholarships.marks90PlusWaiver}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Kinship / Sibling Concession
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700">
                        {ac.scholarships.kinshipDiscount}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Alumni Concession
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700">
                        {ac.scholarships.alumniDiscount}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: 3. COURSE DURATIONS & RIGOR */}
              {(filterCategory === 'all' || filterCategory === 'durations') && (
                <>
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={selectedAcademies.length + 1}
                      className="px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                    >
                      3. Course Durations & Batch Schedules
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Regular Session Duration
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-bold text-slate-900 tabular-nums">
                        {ac.durations.regularWeeks} Weeks
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Crash Program Duration
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-semibold text-slate-800 tabular-nums">
                        {ac.durations.crashWeeks} Weeks
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Daily Time Commitment
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-medium text-slate-800">
                        {ac.durations.dailyHours}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Shift / Schedule Pattern
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700 leading-relaxed">
                        {ac.durations.schedulePattern}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Testing Frequency & FLPs
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700 leading-relaxed">
                        {ac.durations.testFrequency}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: 4. SUCCESS RATES & RECORD */}
              {(filterCategory === 'all' || filterCategory === 'success') && (
                <>
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={selectedAcademies.length + 1}
                      className="px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                    >
                      4. Verified Success Statistics & Track Record
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Overall Pass / Qualification Rate
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top">
                        <div className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                          {ac.success.overallPassRate}%
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Verified qualifying threshold
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Top National/Provincial Positions
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-bold text-slate-900 tabular-nums">
                        {ac.success.topPositionsCount} Positions
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Annual Medical Selections (MBBS/BDS)
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-bold text-slate-900 tabular-nums">
                        {ac.success.medicalSelectionsAnnual > 0
                          ? `${ac.success.medicalSelectionsAnnual.toLocaleString()}+ students`
                          : 'N/A (Engineering/Business focus)'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Annual Engineering & CS Placements
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-bold text-slate-900 tabular-nums">
                        {ac.success.engineeringSelectionsAnnual > 0
                          ? `${ac.success.engineeringSelectionsAnnual.toLocaleString()}+ students`
                          : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Average Score Improvement
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top font-mono font-semibold text-emerald-700 tabular-nums">
                        +{ac.success.avgScoreImprovement}% from Diagnostic
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Highlight Record
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top text-slate-700 leading-relaxed">
                        {ac.success.highlightRecord}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: 5. STRENGTHS & LIMITATIONS */}
              {(filterCategory === 'all' || filterCategory === 'tech') && (
                <>
                  <tr className="bg-slate-100/70">
                    <td
                      colSpan={selectedAcademies.length + 1}
                      className="px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                    >
                      5. Critical Assessment & Verdict
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Key Strengths
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top space-y-1.5">
                        {ac.strengths.map((s, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Potential Limitations
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top space-y-1.5">
                        {ac.limitations.map((l, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-slate-500">
                            <span className="text-slate-400 font-bold shrink-0 mt-0.5">·</span>
                            <span>{l}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      Contact & Registration
                    </td>
                    {selectedAcademies.map((ac) => (
                      <td key={ac.id} className="p-4 border-l border-slate-100 align-top space-y-1">
                        <div className="font-mono text-xs font-semibold text-slate-800">
                          {ac.contactHelpline}
                        </div>
                        <a
                          href={ac.contactWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline block text-xs truncate"
                        >
                          {ac.contactWebsite.replace('https://', '')}
                        </a>
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
