import { useState } from 'react';
import { CAREER_QUIZ_QUESTIONS } from '../data/careerQuiz';
import { DEGREES_CATALOG } from '../data/degrees';
import { DegreeInfo } from '../typesDegrees';

interface DegreeSuggesterQuizProps {
  onSelectDegree: (degree: DegreeInfo) => void;
  onExploreDirectory: () => void;
}

interface DegreeMatchResult {
  degree: DegreeInfo;
  matchScore: number; // percentage
  matchRationale: string;
}

export function DegreeSuggesterQuiz({
  onSelectDegree,
  onExploreDirectory,
}: DegreeSuggesterQuizProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [topMatches, setTopMatches] = useState<DegreeMatchResult[]>([]);

  const currentQuestion = CAREER_QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStepIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentStepIndex < CAREER_QUIZ_QUESTIONS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      calculateSuggestions();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const calculateSuggestions = () => {
    // Score tally per degree
    const scoresMap: Record<string, number> = {};
    DEGREES_CATALOG.forEach((d) => {
      scoresMap[d.id] = 10; // baseline
    });

    selectedAnswers.forEach((ansIndex, qIndex) => {
      if (ansIndex !== undefined) {
        const option = CAREER_QUIZ_QUESTIONS[qIndex].options[ansIndex];
        if (option && option.points) {
          Object.entries(option.points).forEach(([degId, pts]) => {
            if (scoresMap[degId] !== undefined) {
              scoresMap[degId] += pts * 6;
            }
          });
        }
      }
    });

    // Transform and sort
    const matched: DegreeMatchResult[] = DEGREES_CATALOG.map((deg) => {
      const rawScore = scoresMap[deg.id] || 15;
      const normalizedScore = Math.min(98, Math.max(45, Math.round((rawScore / 80) * 100)));

      let matchRationale = `High alignment with your preferences in ${deg.category} and starting career package (${deg.avgStartingSalaryPKR}).`;
      if (deg.category === 'Aviation & Aerospace') {
        matchRationale = 'Matches your high interest in flight dynamics, airport operations, aerodynamics, and commercial aviation.';
      } else if (deg.category === 'Computing & Cybersecurity') {
        matchRationale = 'Superb fit for your analytical problem solving, high global demand, remote software contracts, and security intelligence.';
      } else if (deg.category === 'Armed Forces & Defense') {
        matchRationale = 'Perfect match for leadership, physical discipline, 100% free officer cadet training, and serving as a Commissioned Officer.';
      } else if (deg.category === 'Medical & Allied Health') {
        matchRationale = 'Direct match for your commitment to healthcare, high-stakes medical treatment, and clinical hospital service.';
      }

      return {
        degree: deg,
        matchScore: normalizedScore,
        matchRationale,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setTopMatches(matched.slice(0, 4));
    setIsCalculated(true);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers([]);
    setIsCalculated(false);
    setTopMatches([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Quiz Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>AI Career & Degree Engine</span>
            <span aria-hidden="true">·</span>
            <span>6-Question Diagnostic</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Find Your Ideal Degree & Career Path
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unsure between <strong>Aviation, Cybersecurity, Armed Forces Commission (PMA/PAF/Navy), Medicine, or Engineering</strong>? Answer 6 comprehensive questions to receive tailored degree matches with verified Pakistan university pathways and salary projections.
          </p>
        </div>

        {/* Progress bar */}
        {!isCalculated && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Question {currentStepIndex + 1} of {CAREER_QUIZ_QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {CAREER_QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    idx <= currentStepIndex ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quiz Body */}
      <div className="p-6 sm:p-8">
        {!isCalculated ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentStepIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm">
                        {opt.label}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white text-[10px]'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stepper Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  &larr; Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentStepIndex] === undefined}
                className={`px-6 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs ${
                  selectedAnswers[currentStepIndex] !== undefined
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentStepIndex === CAREER_QUIZ_QUESTIONS.length - 1
                  ? 'Calculate My Degree Matches →'
                  : 'Continue →'}
              </button>
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Your Top Suggested Degree Pathways
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algorithmic matches calculated from your academic strengths, career pace, and daily work preferences.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestart}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={onExploreDirectory}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  View All 17+ Degrees
                </button>
              </div>
            </div>

            {/* Matched Degrees Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topMatches.map((match, idx) => (
                <div
                  key={match.degree.id}
                  className={`rounded-xl border p-5 space-y-3 flex flex-col justify-between transition-all ${
                    idx === 0
                      ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header: Rank + Score */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 font-bold">
                        Top Recommendation #{idx + 1}
                      </span>
                      <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full font-mono">
                        {match.matchScore}% Match
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {match.degree.name}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                        {match.degree.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{match.degree.durationYears}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {match.matchRationale}
                    </p>

                    {/* Salary and Entry Test box */}
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Avg Starting Package:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {match.degree.avgStartingSalaryPKR}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-500">Required Entrance Test:</span>
                        <span className="font-semibold text-emerald-800 truncate max-w-[180px]">
                          {match.degree.entryTestsRequired[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDegree(match.degree)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    View Degree Syllabus & Universities &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
