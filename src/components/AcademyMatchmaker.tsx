import { useState } from 'react';
import { Academy } from '../types';

interface AcademyMatchmakerProps {
  academies: Academy[];
  onSelectDetails: (academy: Academy) => void;
  onCompareAcademies: (academies: Academy[]) => void;
}

interface MatchResult {
  academy: Academy;
  score: number; // 0 to 100
  matchReasons: string[];
  recommendedBatch: string;
  estimatedTotalExpense: {
    tuition: number;
    hostelEstimate: number;
    total: number;
  };
  adviceTip: string;
}

export function AcademyMatchmaker({
  academies,
  onSelectDetails,
  onCompareAcademies,
}: AcademyMatchmakerProps) {
  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Answers
  const [targetTest, setTargetTest] = useState<string>('MDCAT');
  const [locationMode, setLocationMode] = useState<string>('punjab-campus');
  const [studentStatus, setStudentStatus] = useState<string>('fresh');
  const [budgetTier, setBudgetTier] = useState<string>('medium');
  const [corePriority, setCorePriority] = useState<string>('testing');

  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);

  const calculateMatches = () => {
    const scored: MatchResult[] = academies.map((academy) => {
      let score = 50; // base score
      const matchReasons: string[] = [];
      let recommendedBatch = 'Regular Session (10-12 Weeks)';
      let hostelCost = 0;

      // 1. Target Test Match
      if (academy.entryTestsCovered.includes(targetTest as any)) {
        score += 25;
        matchReasons.push(`Directly specializes in ${targetTest} prep syllabus`);
      } else {
        score -= 30;
      }

      // Specific specializations
      if (targetTest === 'AKU' && academy.id === 'aneeshussain') {
        score += 25;
        matchReasons.push('National market leader for Aga Khan Medical College with 65%+ student representation');
      }
      if (targetTest === 'NUST NET' && (academy.id === 'scholars' || academy.id === 'nearpeer' || academy.id === 'kips')) {
        score += 15;
        matchReasons.push('High-yield non-calculator math & CBT mock tests customized for NUST NET');
      }

      // 2. Location & Format
      if (locationMode === 'online-home') {
        if (academy.deliveryModes.includes('Online LMS') && (academy.id === 'nearpeer' || academy.id === 'topgrade')) {
          score += 25;
          matchReasons.push('100% online platform with on-demand video library, saving PKR 30k/month in hostel charges');
        } else if (academy.deliveryModes.includes('Online LMS')) {
          score += 10;
          matchReasons.push('Provides digital LMS option alongside physical campuses');
        } else {
          score -= 20;
        }
      } else if (locationMode === 'punjab-campus') {
        if (['kips', 'step', 'stars'].includes(academy.id)) {
          score += 20;
          matchReasons.push('Extensive campus footprint across Lahore, Multan, Faisalabad, and Punjab cities');
        }
        hostelCost = 35000; // estimated hostel for outstation
      } else if (locationMode === 'karachi-campus') {
        if (academy.id === 'aneeshussain') {
          score += 30;
          matchReasons.push('Main hub in Karachi (DHA, Gulshan, Clifton, North Nazimabad)');
        } else if (academy.headquarters.includes('Karachi')) {
          score += 15;
        } else {
          score -= 20;
        }
      } else if (locationMode === 'twin-cities') {
        if (['scholars', 'kips', 'step'].includes(academy.id)) {
          score += 20;
          matchReasons.push('Established branches across Islamabad (Blue Area/G-9) & Rawalpindi');
        }
      }

      // 3. Student Status (Fresh vs Repeater vs A-Level)
      if (studentStatus === 'repeater') {
        if (academy.id === 'topgrade' || academy.id === 'nearpeer') {
          score += 15;
          recommendedBatch = 'Super Test Session + Weak Area Video Modules';
          matchReasons.push('Ideal for repeaters: solve 30k+ MCQs with instant video explanations without wasting time on basic lectures');
        } else {
          recommendedBatch = 'Test Session Only / FLPs Batch';
          matchReasons.push('Enrolling in test session only recommended to avoid redundant daily lectures');
        }
      } else if (studentStatus === 'a-level') {
        if (academy.id === 'aneeshussain') {
          score += 20;
          matchReasons.push('Designed for Cambridge A-Level students transitioning to local PMDC/NUMS MCQs');
        }
      } else {
        recommendedBatch = 'Full Regular Session';
      }

      // 4. Budget Tier
      const tuitionFee = studentStatus === 'repeater' ? academy.fee.testSessionOnly : academy.fee.regularSession;
      if (budgetTier === 'low') {
        if (tuitionFee <= 25000) {
          score += 20;
          matchReasons.push('Economical pricing fits comfortably within your budget threshold');
        } else {
          score -= 15;
        }
      } else if (budgetTier === 'medium') {
        if (tuitionFee <= 52000) {
          score += 10;
        }
      }

      // 5. Core Priority
      if (corePriority === 'discipline' && ['kips', 'stars', 'grip'].includes(academy.id)) {
        score += 15;
        matchReasons.push('Strict on-ground discipline, daily unit tests, and compulsory attendance');
      }
      if (corePriority === 'lms-video' && (academy.id === 'step' || academy.id === 'topgrade')) {
        score += 20;
        matchReasons.push('Unmatched video solutions for every single practice question and test paper');
      }
      if (corePriority === 'hostel-savings' && (academy.id === 'nearpeer' || academy.id === 'topgrade')) {
        score += 25;
        matchReasons.push('Zero hostel living expenses — study from the comfort of home');
        hostelCost = 0;
      }

      // Normalized score clamp 40 to 98
      const finalScore = Math.min(98, Math.max(42, Math.round(score)));

      // Advice tip
      let adviceTip = 'Attend an orientation session or register early to secure your seat.';
      if (academy.id === 'step') {
        adviceTip = 'If you are from Punjab College, claim your flat 30% alumni discount at the admission desk.';
      } else if (academy.id === 'kips') {
        adviceTip = 'Obtain the official KIPS Prep Book series early as they sell out rapidly after board exams.';
      } else if (academy.id === 'nearpeer') {
        adviceTip = 'Use a desktop or tablet for FLPs to simulate the official computer-based exam format.';
      } else if (academy.id === 'aneeshussain') {
        adviceTip = 'Book the interview & MMI workshop batch in advance if aiming for Aga Khan Medical College.';
      }

      return {
        academy,
        score: finalScore,
        matchReasons,
        recommendedBatch,
        estimatedTotalExpense: {
          tuition: tuitionFee,
          hostelEstimate: hostelCost,
          total: tuitionFee + hostelCost,
        },
        adviceTip,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    setResults(scored);
    setHasCalculated(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setHasCalculated(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Wizard Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>Student Decision Advisor</span>
            <span aria-hidden="true">·</span>
            <span>Algorithmic Compatibility Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">
            Academy Matchmaker: Resolve Your Choice in 5 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Answer 5 targeted questions about your target test, budget, study habits, and location. Our system analyzes fee structures, syllabus nuances, and living costs to give you an objective, personalized verdict.
          </p>
        </div>

        {/* Progress indicator */}
        {!hasCalculated && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wizard Body */}
      <div className="p-6 sm:p-8">
        {!hasCalculated ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* STEP 1: Target Test */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 1: Which entry test are you primarily preparing for?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Different academies excel in medical versus engineering versus business tests.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'MDCAT', title: 'MDCAT / NUMS', desc: 'Pre-Medical (MBBS / BDS admissions nationwide)' },
                    { id: 'NUST NET', title: 'NUST NET', desc: 'Engineering, Computing (CS/SE), and Applied Sciences' },
                    { id: 'ECAT', title: 'ECAT (UET)', desc: 'Punjab engineering universities & UET Lahore' },
                    { id: 'FAST', title: 'FAST-NU', desc: 'Computer Science, AI, and Software Engineering' },
                    { id: 'AKU', title: 'AKU Medical College', desc: 'Aga Khan University MBBS with MMI interviews' },
                    { id: 'IBA/LUMS', title: 'IBA / LUMS / SAT', desc: 'Aptitude tests for business, economics & social sciences' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTargetTest(option.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        targetTest === option.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{option.title}</div>
                      <div className="text-xs text-slate-500 mt-1 leading-snug">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Location & Format */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 2: What is your preferred study location and learning format?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Consider daily commute, outstation hostel rent (PKR 30k+/month), and physical campus presence.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'punjab-campus',
                      title: 'On-Campus in Punjab (Lahore, Faisalabad, Multan, Gujranwala)',
                      desc: 'Physical daily classes in major Punjab educational hubs.',
                    },
                    {
                      id: 'twin-cities',
                      title: 'On-Campus in Islamabad / Rawalpindi',
                      desc: 'Twin Cities classes with strong focus on NUST NET and Federal Board exams.',
                    },
                    {
                      id: 'karachi-campus',
                      title: 'On-Campus in Karachi / Sindh',
                      desc: 'Best for AKU, NED, IBA, and Dow Medical University aspirants.',
                    },
                    {
                      id: 'online-home',
                      title: '100% Online from Home (Save Hostel & Travel Costs)',
                      desc: 'Learn on web/apps with on-demand video lectures, saving ~PKR 100k in hostel rent.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setLocationMode(opt.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        locationMode === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{opt.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Student Status */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 3: What is your current academic stage?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    First-timers require comprehensive lectures; repeaters usually only need testing drills.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'fresh',
                      title: 'Fresh FSc Part-2 Student (First Attempt)',
                      desc: 'Need complete topic lectures, fast mental math shortcuts, and daily tests.',
                    },
                    {
                      id: 'repeater',
                      title: 'Repeater / Improver (Second Attempt)',
                      desc: 'Already covered theory. Want intensive FLPs and diagnostic error analysis.',
                    },
                    {
                      id: 'a-level',
                      title: 'Cambridge A-Level Student',
                      desc: 'Need assistance bridging Cambridge concepts to local PMDC/NUMS textbook specifics.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStudentStatus(opt.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        studentStatus === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{opt.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Budget Range */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 4: What is your comfortable tuition fee budget?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fee packages range from PKR 11,000 for digital platforms to PKR 65,000 for premier physical centers.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'low',
                      title: 'Under PKR 25,000 (Economical / Digital)',
                      desc: 'Prioritizing maximum value, digital subscriptions, or test-session-only packages.',
                    },
                    {
                      id: 'medium',
                      title: 'PKR 25,000 – PKR 52,000 (Standard Academy Fee)',
                      desc: 'Willing to invest in established physical networks (STEP, Stars, Grip) with scholarships.',
                    },
                    {
                      id: 'high',
                      title: 'PKR 52,000+ (Premium Physical / Specialized Track)',
                      desc: 'Seeking elite brand names (KIPS Preparatory, Anees Hussain AKU track) without budget constraints.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBudgetTier(opt.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        budgetTier === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{opt.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Core Priority */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Step 5: What is your single most important priority?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    This determines which institution’s unique pedagogy matches your personality best.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'discipline',
                      title: 'Strict Physical Discipline & Massive Test Volume',
                      desc: 'Daily in-person attendance, strict OMR paper drills, and high peer pressure.',
                    },
                    {
                      id: 'lms-video',
                      title: 'Instant Video Discussion for Every Single MCQ',
                      desc: 'I want to watch a teacher solve questions I get wrong immediately on my phone.',
                    },
                    {
                      id: 'hostel-savings',
                      title: 'Save Maximum Money on Hostel, Mess & Relocation',
                      desc: 'I want high merit preparation from my own home without paying 100k+ in living costs.',
                    },
                    {
                      id: 'specialized',
                      title: 'AKU / NUST Specific Test Mastery',
                      desc: 'Specialized non-calculator math tricks and medical reasoning.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCorePriority(opt.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        corePriority === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">{opt.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  &larr; Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                >
                  Continue &rarr;
                </button>
              ) : (
                <button
                  onClick={calculateMatches}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <span>Generate Personalized Verdict</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Your Personalized Academy Recommendations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ranked by compatibility based on your chosen criteria ({targetTest}, {locationMode}, {studentStatus}).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const topTwo = results.slice(0, 2).map((r) => r.academy);
                    onCompareAcademies(topTwo);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-emerald-200"
                >
                  Compare Top 2 Side-by-Side
                </button>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            </div>

            {/* Top 3 Results Cards */}
            <div className="space-y-4">
              {results.slice(0, 3).map((result, idx) => (
                <div
                  key={result.academy.id}
                  className={`rounded-xl border p-5 sm:p-6 transition-all ${
                    idx === 0
                      ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Left: Info & Score */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          Rank #{idx + 1}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900">
                          {result.academy.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          <span>{result.score}% Compatibility</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{result.academy.headquarters}</span>
                        <span aria-hidden="true">·</span>
                        <span>Est. {result.academy.established}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-slate-700">
                          {result.academy.success.overallPassRate}% Pass Rate
                        </span>
                      </div>

                      {/* Matching rationale */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-semibold text-slate-700">
                          Why this matches your situation:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {result.matchReasons.map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Advice Tip */}
                      <div className="text-xs bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 text-slate-600">
                        <span className="font-semibold text-slate-800">Pro Tip: </span>
                        {result.adviceTip}
                      </div>
                    </div>

                    {/* Right: Financial projection & Action */}
                    <div className="md:w-64 bg-white border border-slate-200 rounded-lg p-4 space-y-3 shrink-0">
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                          Recommended Batch
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-0.5">
                          {result.recommendedBatch}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-2 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-500">
                          <span>Est. Tuition:</span>
                          <span className="font-mono font-medium text-slate-800 tabular-nums">
                            PKR {result.estimatedTotalExpense.tuition.toLocaleString()}
                          </span>
                        </div>
                        {result.estimatedTotalExpense.hostelEstimate > 0 && (
                          <div className="flex justify-between text-slate-500">
                            <span>Est. Hostel/Living:</span>
                            <span className="font-mono font-medium text-slate-800 tabular-nums">
                              PKR {result.estimatedTotalExpense.hostelEstimate.toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-slate-100 pt-1 font-semibold text-slate-900">
                          <span>Total Est.:</span>
                          <span className="font-mono text-emerald-800 tabular-nums">
                            PKR {result.estimatedTotalExpense.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectDetails(result.academy)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer text-center"
                      >
                        Inspect Details & Fees
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
