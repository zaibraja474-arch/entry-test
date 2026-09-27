import { useState, useMemo } from 'react';
import { ACADEMIES_DATA } from './data/academies';
import { Academy } from './types';
import { DegreeInfo } from './typesDegrees';
import { Header, NavigationTab } from './components/Header';
import { Hero } from './components/Hero';
import { AcademyCard } from './components/AcademyCard';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { AcademyMatchmaker } from './components/AcademyMatchmaker';
import { FeeScholarshipCalculator } from './components/FeeScholarshipCalculator';
import { AcademyModal } from './components/AcademyModal';
import { EntryTestGuide } from './components/EntryTestGuide';
import { DegreeCatalog } from './components/DegreeCatalog';
import { DegreeSuggesterQuiz } from './components/DegreeSuggesterQuiz';
import { ArmedForcesGuide } from './components/ArmedForcesGuide';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('academies');

  // Search & Filter state for Academies
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'success' | 'fee-asc' | 'fee-desc' | 'rating'>('success');

  // Comparison state (up to 4 academies)
  const [comparedAcademyIds, setComparedAcademyIds] = useState<string[]>(['kips', 'step']);

  // Selected academy for full modal
  const [selectedAcademyForModal, setSelectedAcademyForModal] = useState<Academy | null>(null);

  // Toggle compare handler
  const handleToggleCompare = (academy: Academy) => {
    setComparedAcademyIds((prev) => {
      if (prev.includes(academy.id)) {
        return prev.filter((id) => id !== academy.id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(0, 3), academy.id];
        }
        return [...prev, academy.id];
      }
    });
  };

  const handleAddToCompare = (academy: Academy) => {
    if (!comparedAcademyIds.includes(academy.id)) {
      setComparedAcademyIds((prev) => {
        if (prev.length >= 4) {
          return [...prev.slice(0, 3), academy.id];
        }
        return [...prev, academy.id];
      });
    }
  };

  const handleRemoveFromCompare = (academyId: string) => {
    setComparedAcademyIds((prev) => prev.filter((id) => id !== academyId));
  };

  const handleClearAllCompare = () => {
    setComparedAcademyIds([]);
  };

  // Compare multiple selected academies from Matchmaker
  const handleCompareMultiple = (academiesToCompare: Academy[]) => {
    setComparedAcademyIds(academiesToCompare.map((a) => a.id));
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered and sorted academies list
  const filteredAcademies = useMemo(() => {
    return ACADEMIES_DATA.filter((academy) => {
      const matchesSearch =
        searchQuery === '' ||
        academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        academy.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
        academy.entryTestsCovered.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        academy.branches.some((b) => b.city.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTrack =
        selectedTrack === 'all' ||
        academy.entryTestsCovered.includes(selectedTrack as any);

      const matchesMode =
        selectedMode === 'all' ||
        academy.deliveryModes.some((m) => m.toLowerCase().includes(selectedMode.toLowerCase()));

      const matchesCity =
        selectedCity === 'all' ||
        academy.branches.some((b) => b.city.toLowerCase().includes(selectedCity.toLowerCase())) ||
        academy.headquarters.toLowerCase().includes(selectedCity.toLowerCase());

      return matchesSearch && matchesTrack && matchesMode && matchesCity;
    }).sort((a, b) => {
      if (sortBy === 'success') {
        return b.success.overallPassRate - a.success.overallPassRate;
      }
      if (sortBy === 'fee-asc') {
        return a.fee.regularSession - b.fee.regularSession;
      }
      if (sortBy === 'fee-desc') {
        return b.fee.regularSession - a.fee.regularSession;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [searchQuery, selectedTrack, selectedMode, selectedCity, sortBy]);

  const comparedAcademiesList = useMemo(() => {
    return ACADEMIES_DATA.filter((a) => comparedAcademyIds.includes(a.id));
  }, [comparedAcademyIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedAcademyIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        {/* HERO SECTION (Shown primarily on Academies tab) */}
        {activeTab === 'academies' && (
          <Hero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTrack={selectedTrack}
            onSelectTrack={setSelectedTrack}
            onOpenMatchmaker={() => {
              setActiveTab('matchmaker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDegreeQuiz={() => {
              setActiveTab('degree-quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDegrees={() => {
              setActiveTab('degrees');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArmedForces={() => {
              setActiveTab('armed-forces');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: ACADEMIES DIRECTORY */}
          {activeTab === 'academies' && (
            <div className="space-y-8">
              {/* Directory Filter & Sorting Bar */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Filter Groups */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {/* Delivery Format */}
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="mode-select" className="text-slate-500 font-medium">Format:</label>
                      <select
                        id="mode-select"
                        value={selectedMode}
                        onChange={(e) => setSelectedMode(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="all">All Formats</option>
                        <option value="on-campus">On-Campus Only</option>
                        <option value="online">Online LMS</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>

                    {/* City Filter */}
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="city-select" className="text-slate-500 font-medium">City Presence:</label>
                      <select
                        id="city-select"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="all">All Pakistan / Online</option>
                        <option value="lahore">Lahore</option>
                        <option value="islamabad">Islamabad / Rawalpindi</option>
                        <option value="karachi">Karachi</option>
                        <option value="multan">Multan</option>
                        <option value="faisalabad">Faisalabad</option>
                      </select>
                    </div>

                    {/* Sorting */}
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="sort-select" className="text-slate-500 font-medium">Sort By:</label>
                      <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="success">Highest Pass Rate %</option>
                        <option value="fee-asc">Lowest Regular Fee</option>
                        <option value="fee-desc">Highest Regular Fee</option>
                        <option value="rating">Top Student Rating</option>
                      </select>
                    </div>
                  </div>

                  {/* Results Count & Quick Reset */}
                  <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-slate-500">
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      Showing {filteredAcademies.length} of {ACADEMIES_DATA.length} Institutions
                    </span>
                    {(searchQuery || selectedTrack !== 'all' || selectedMode !== 'all' || selectedCity !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedTrack('all');
                          setSelectedMode('all');
                          setSelectedCity('all');
                        }}
                        className="text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Academies Grid */}
              {filteredAcademies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAcademies.map((academy) => (
                    <AcademyCard
                      key={academy.id}
                      academy={academy}
                      onSelectDetails={setSelectedAcademyForModal}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedAcademyIds.includes(academy.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg">
                    🔍
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No academies match your active filters</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try broadening your search term or switching to &ldquo;All Entry Tests&rdquo; to view all options.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTrack('all');
                      setSelectedMode('all');
                      setSelectedCity('all');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    View All Academies
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SIDE-BY-SIDE COMPARISON MATRIX */}
          {activeTab === 'compare' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Side-by-Side Academy Comparison
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct feature matrix comparing fees, batch lengths, test frequencies, and positions across your selected academies.
                    </p>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-slate-500">
                    Comparing {comparedAcademiesList.length} of 4 Max Academies
                  </div>
                </div>
              </div>

              <ComparisonMatrix
                academies={ACADEMIES_DATA}
                selectedAcademies={comparedAcademiesList}
                onRemoveFromCompare={handleRemoveFromCompare}
                onAddToCompare={handleAddToCompare}
                onSelectDetails={setSelectedAcademyForModal}
                onClearAll={handleClearAllCompare}
              />
            </div>
          )}

          {/* TAB 3: DEGREE SUGGESTER QUIZ */}
          {activeTab === 'degree-quiz' && (
            <DegreeSuggesterQuiz
              onSelectDegree={() => {
                setActiveTab('degrees');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDirectory={() => {
                setActiveTab('degrees');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* TAB 4: ALL DEGREES DIRECTORY (Aviation, Cyber, Medicine, etc.) */}
          {activeTab === 'degrees' && (
            <DegreeCatalog
              onTakeQuiz={() => {
                setActiveTab('degree-quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreArmyTests={() => {
                setActiveTab('armed-forces');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* TAB 5: ARMED FORCES TESTS & COMMISSIONS (Army, PAF, Navy, ISSB) */}
          {activeTab === 'armed-forces' && <ArmedForcesGuide />}

          {/* TAB 6: ACADEMY MATCHMAKER (DECISION WIZARD) */}
          {activeTab === 'matchmaker' && (
            <AcademyMatchmaker
              academies={ACADEMIES_DATA}
              onSelectDetails={setSelectedAcademyForModal}
              onCompareAcademies={handleCompareMultiple}
            />
          )}

          {/* TAB 7: FEE & SCHOLARSHIP CALCULATOR */}
          {activeTab === 'calculator' && (
            <FeeScholarshipCalculator
              academies={ACADEMIES_DATA}
              onSelectDetails={setSelectedAcademyForModal}
              onAddToCompare={handleAddToCompare}
            />
          )}

          {/* TAB 8: ENTRY TEST GUIDES & DILEMMAS */}
          {activeTab === 'guides' && <EntryTestGuide />}
        </div>
      </main>

      {/* Floating Bottom Comparison Tray (Visible when 1+ academies selected) */}
      {comparedAcademyIds.length > 0 && activeTab !== 'compare' && (
        <aside aria-label="Selected Academies Comparison Bar" className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-30 bg-slate-950/95 text-white backdrop-blur-md rounded-xl p-3 sm:p-4 border border-slate-800 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto text-xs py-1">
            <span className="font-bold text-emerald-400 whitespace-nowrap">
              Compare ({comparedAcademyIds.length}/4):
            </span>
            {comparedAcademiesList.map((ac) => (
              <span
                key={ac.id}
                className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{ac.name.split(' ')[0]}</span>
                <button
                  onClick={() => handleRemoveFromCompare(ac.id)}
                  className="text-slate-400 hover:text-white cursor-pointer ml-1"
                  title="Remove"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveTab('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Open Comparison Matrix &rarr;
            </button>
            <button
              onClick={handleClearAllCompare}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 cursor-pointer hidden sm:inline"
            >
              Clear
            </button>
          </div>
        </aside>
      )}

      {/* Full Details Modal */}
      <AcademyModal
        academy={selectedAcademyForModal}
        onClose={() => setSelectedAcademyForModal(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={
          selectedAcademyForModal
            ? comparedAcademyIds.includes(selectedAcademyForModal.id)
            : false
        }
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
