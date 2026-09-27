import { useState, useMemo } from 'react';
import { DEGREES_CATALOG } from '../data/degrees';
import { DegreeInfo } from '../typesDegrees';

interface DegreeCatalogProps {
  onSelectDegreeForModal?: (degree: DegreeInfo) => void;
  onExploreArmyTests?: () => void;
  onTakeQuiz?: () => void;
}

export function DegreeCatalog({
  onSelectDegreeForModal,
  onExploreArmyTests,
  onTakeQuiz,
}: DegreeCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModalDegree, setSelectedModalDegree] = useState<DegreeInfo | null>(null);

  const categories = [
    { id: 'all', label: 'All Degrees (17+)' },
    { id: 'Aviation & Aerospace', label: '✈️ Aviation & Aerospace' },
    { id: 'Computing & Cybersecurity', label: '🛡️ Cybersecurity & AI' },
    { id: 'Armed Forces & Defense', label: '🎖️ Armed Forces Commission' },
    { id: 'Medical & Allied Health', label: '🩺 Medical & Allied Health' },
    { id: 'Engineering & Tech', label: '⚙️ Engineering & Tech' },
    { id: 'Business, Finance & AI', label: '💼 FinTech & Business' },
    { id: 'Law & Public Policy', label: '⚖️ Law & Policy' },
  ];

  const filteredDegrees = useMemo(() => {
    return DEGREES_CATALOG.filter((deg) => {
      const matchesCategory =
        selectedCategory === 'all' || deg.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        deg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deg.topInstitutionsPakistan.some((inst) =>
          inst.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        deg.careerProspects.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetails = (deg: DegreeInfo) => {
    if (onSelectDegreeForModal) {
      onSelectDegreeForModal(deg);
    } else {
      setSelectedModalDegree(deg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner / Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>Pakistan Higher Education & Commission Encyclopedia</span>
            <span aria-hidden="true">·</span>
            <span>2025-2026 Academic Outlook</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Vast Degrees Directory & Career Paths
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Explore verified requirements, required entry tests, top universities, starting salary packages, and career prospects across <strong>Aviation, Cybersecurity, Armed Forces Commissions, Medicine, Robotics, and FinTech</strong> in Pakistan.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {onTakeQuiz && (
              <button
                onClick={onTakeQuiz}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <span>Take 6-Question Career Suggestion Quiz</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            )}
            {onExploreArmyTests && (
              <button
                onClick={onExploreArmyTests}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-700"
              >
                View Armed Forces (PMA/PAF/Navy/ISSB) Guide
              </button>
            )}
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree, skill, or university..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800 font-mono">{filteredDegrees.length}</span> Degrees Available
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Degrees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDegrees.map((degree) => (
          <div
            key={degree.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between p-5 space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              {/* Category & Demand */}
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="bg-slate-100 font-semibold text-slate-700 px-2.5 py-1 rounded-md">
                  {degree.category}
                </span>
                <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {degree.globalDemand} Demand
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {degree.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Duration: {degree.durationYears}
                </div>
              </div>

              {/* Short Overview */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {degree.overview}
              </p>

              {/* Financial & Salary Box */}
              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1 text-xs">
                <div className="text-[11px] text-slate-400 font-medium">Avg. Starting Package in Pakistan:</div>
                <div className="font-mono font-bold text-slate-900 text-xs">
                  {degree.avgStartingSalaryPKR}
                </div>
              </div>

              {/* Required Entry Tests */}
              <div className="text-xs space-y-1">
                <span className="text-slate-400 font-medium">Required Entry Tests:</span>
                <div className="flex flex-wrap gap-1 font-medium text-slate-800">
                  {degree.entryTestsRequired.slice(0, 3).map((test, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded text-[11px] border border-emerald-100/80 font-medium"
                    >
                      {test}
                    </span>
                  ))}
                  {degree.entryTestsRequired.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{degree.entryTestsRequired.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Top Institutions in Pakistan */}
              <div className="text-xs space-y-1 pt-1 border-t border-slate-100">
                <span className="text-slate-400 font-medium">Top Pakistan Universities:</span>
                <div className="text-slate-700 text-xs line-clamp-2 leading-relaxed">
                  {degree.topInstitutionsPakistan.join(' · ')}
                </div>
              </div>
            </div>

            {/* Action Card Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {degree.careerProspects.length} Key Roles
              </span>
              <button
                onClick={() => handleOpenDetails(degree)}
                className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                Inspect Curriculum & Career &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Internal Modal for Degree Details (if not handled externally) */}
      {selectedModalDegree && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 space-y-1 relative">
              <button
                onClick={() => setSelectedModalDegree(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
              <div className="text-xs text-emerald-400 font-semibold">
                {selectedModalDegree.category} · {selectedModalDegree.durationYears}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedModalDegree.name}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 flex-1">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  Degree Overview & Curriculum Focus
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {selectedModalDegree.overview}
                </p>
              </div>

              {/* Financial & Eligibility Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
                  <div className="text-[11px] text-slate-400 font-medium">Eligibility Criteria:</div>
                  <div className="font-semibold text-slate-900 text-xs mt-1">
                    {selectedModalDegree.eligibility}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
                  <div className="text-[11px] text-slate-400 font-medium">Starting Remuneration (Pakistan):</div>
                  <div className="font-mono font-bold text-emerald-800 text-xs mt-1">
                    {selectedModalDegree.avgStartingSalaryPKR}
                  </div>
                </div>
              </div>

              {/* Career Roles & Pathways */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Prominent Career Prospects & Industry Roles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedModalDegree.careerProspects.map((career, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span className="text-slate-800 font-medium">{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Entry Tests */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  Required Entrance Exams & Admissions Tests
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedModalDegree.entryTestsRequired.map((test, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold px-2.5 py-1 rounded text-xs">
                      {test}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Academy Prep */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recommended Academy Preparation Track
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  {selectedModalDegree.recommendedAcademyTrack}
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  High-Impact Skills You Will Master
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModalDegree.keySkillsRequired.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Pakistan Universities */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Premier Pakistani Universities & Institutes
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {selectedModalDegree.topInstitutionsPakistan.map((inst, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-slate-400">🏛️</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedModalDegree(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
