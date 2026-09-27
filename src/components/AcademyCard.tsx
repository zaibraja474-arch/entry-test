import { Academy } from '../types';

interface AcademyCardProps {
  academy: Academy;
  onSelectDetails: (academy: Academy) => void;
  onToggleCompare: (academy: Academy) => void;
  isCompared: boolean;
}

export function AcademyCard({
  academy,
  onSelectDetails,
  onToggleCompare,
  isCompared,
}: AcademyCardProps) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs">
      <div>
        {/* Card Header Image & Brand Anchor */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={academy.image}
            alt={academy.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Top Info Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-medium">
              Est. {academy.established}
            </span>
            <span className="bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono tabular-nums flex items-center gap-1 text-amber-300">
              ★ {academy.rating.toFixed(1)} ({academy.reviewsCount.toLocaleString()})
            </span>
          </div>

          {/* Bottom Title Area over gradient */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
              {academy.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
              <span>{academy.headquarters}</span>
              <span aria-hidden="true">·</span>
              <span>{academy.deliveryModes.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Tagline */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {academy.tagline}
          </p>

          {/* Unboxed Metadata: Entry Tests Covered */}
          <div className="pt-1 border-t border-slate-100">
            <div className="text-xs text-slate-400 font-medium mb-1">Entry Tests Covered:</div>
            <div className="text-xs font-medium text-slate-800 leading-relaxed flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {academy.entryTestsCovered.map((test, index) => (
                <span key={test} className="flex items-center gap-1.5">
                  <span className="font-semibold text-emerald-800">{test}</span>
                  {index < academy.entryTestsCovered.length - 1 && (
                    <span aria-hidden="true" className="text-slate-300">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Financials & Fee Structure Summary */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Regular Session Fee</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                PKR {academy.fee.regularSession.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Crash / Super Revision</span>
              <span className="font-mono font-semibold text-slate-700 tabular-nums">
                PKR {academy.fee.crashProgram.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Test Session Only</span>
              <span className="font-mono font-semibold text-slate-700 tabular-nums">
                PKR {academy.fee.testSessionOnly.toLocaleString()}
              </span>
            </div>
            <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span>Books & Material</span>
              <span className="text-slate-700 font-medium truncate max-w-[170px]" title={academy.fee.booksAndMaterial}>
                {academy.fee.booksAndMaterial.includes('Included') ? 'Included in Tuition' : 'Available'}
              </span>
            </div>
          </div>

          {/* Course Duration & Rigor */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="border border-slate-100 rounded-lg p-2.5 bg-white">
              <div className="text-slate-400 font-medium">Duration</div>
              <div className="text-slate-800 font-semibold font-mono tabular-nums mt-0.5">
                {academy.durations.regularWeeks} Weeks Regular
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                {academy.durations.dailyHours}
              </div>
            </div>

            <div className="border border-slate-100 rounded-lg p-2.5 bg-white">
              <div className="text-slate-400 font-medium">Success Rate</div>
              <div className="text-emerald-700 font-bold font-mono tabular-nums mt-0.5">
                {academy.success.overallPassRate}% Pass Rate
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                {academy.success.topPositionsCount} National Ranks
              </div>
            </div>
          </div>

          {/* Scholarship Highlight */}
          <div className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5">
            <div className="font-semibold text-emerald-900 mb-0.5">Scholarship Rule:</div>
            <div className="line-clamp-2 leading-relaxed text-emerald-800">
              {academy.scholarships.marks90PlusWaiver}
            </div>
          </div>

          {/* Best Suited For Callout */}
          <div className="text-xs text-slate-500">
            <span className="font-medium text-slate-700">Best for: </span>
            <span>{academy.bestSuitedFor}</span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Compare Checkbox Toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-700 hover:text-slate-900">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare(academy)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
          />
          <span>{isCompared ? 'Added to Compare' : 'Add to Compare'}</span>
        </label>

        {/* View Profile Action */}
        <button
          onClick={() => onSelectDetails(academy)}
          className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          View Full Breakdown
        </button>
      </div>
    </article>
  );
}
