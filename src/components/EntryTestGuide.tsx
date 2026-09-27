import { useState } from 'react';
import { ENTRY_TESTS_INFO, STUDENT_DILEMMAS } from '../data/entryTests';

export function EntryTestGuide() {
  const [selectedTestId, setSelectedTestId] = useState<string>('mdcat');
  const [openDilemmaIndex, setOpenDilemmaIndex] = useState<number | null>(0);

  const activeTest = ENTRY_TESTS_INFO.find((t) => t.id === selectedTestId) || ENTRY_TESTS_INFO[0];

  return (
    <div className="space-y-10">
      {/* Header Statement */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span>Syllabus Breakdown & Dilemma Resolution</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Student Handbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
            Pakistan Entry Test Guides & Student Dilemmas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Understanding test patterns, aggregate calculation formulas, and choosing the right study methodology is half the battle. Explore official test breakdowns and read expert guidance on real student choices.
          </p>
        </div>
      </div>

      {/* SECTION 1: CRITICAL STUDENT DILEMMAS RESOLVED */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900">
            Resolving the Top 3 Student Dilemmas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective guidance answering the most contentious decisions faced by Pakistani college graduates.
          </p>
        </div>

        <div className="space-y-3">
          {STUDENT_DILEMMAS.map((dilemma, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenDilemmaIndex(openDilemmaIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900">{dilemma.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{dilemma.subtitle}</p>
                </div>
                <span className="text-sm font-bold text-slate-400 shrink-0">
                  {openDilemmaIndex === idx ? '▲' : '▼'}
                </span>
              </button>

              {openDilemmaIndex === idx && (
                <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-700 space-y-4">
                  <p className="text-slate-600 leading-relaxed pt-3">
                    {dilemma.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {dilemma.recommendations.map((rec, rIdx) => (
                      <div
                        key={rIdx}
                        className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-2.5"
                      >
                        <div className="font-bold text-slate-900 text-xs">
                          {rec.scenario}
                        </div>
                        <div className="font-semibold text-emerald-800 text-xs bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                          Verdict: {rec.verdict}
                        </div>
                        <ul className="space-y-1.5 text-slate-600 pt-1">
                          {rec.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700 font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                          <strong>Recommended: </strong>{rec.suggestedAcademies.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ENTRY TEST SPECIFICATIONS & FORMULAS */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900">
            Official Entry Test Structures & Merit Formulas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an entrance test below to view total marks, duration, subject weightages, and key scoring traps.
          </p>
        </div>

        {/* Test Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {ENTRY_TESTS_INFO.map((test) => (
            <button
              key={test.id}
              onClick={() => setSelectedTestId(test.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedTestId === test.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {test.name}
            </button>
          ))}
        </div>

        {/* Selected Test Detail Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
              {activeTest.fullName}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {activeTest.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Body: {activeTest.conductingBody}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="text-slate-400">Total Marks</div>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {activeTest.totalMarks} Marks
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="text-slate-400">Time Allowed</div>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {activeTest.durationMinutes} Minutes
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 sm:col-span-2">
              <div className="text-slate-400">Merit Weightage Formula</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {activeTest.meritFormula}
              </div>
            </div>
          </div>

          {/* Subject Breakdown & Progress Bars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Subject Distribution & MCQ Breakdown
            </h4>
            <div className="space-y-2">
              {activeTest.subjectsWeightage.map((sub) => (
                <div key={sub.subject} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{sub.subject}</span>
                    <span className="font-mono text-slate-500 tabular-nums">{sub.percentage}% of test</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Universities */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Primary Target Universities & Institutions
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {activeTest.targetUniversities.map((uni) => (
                <span
                  key={uni}
                  className="bg-slate-100 text-slate-800 px-3 py-1 rounded-md font-medium"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>

          {/* Key Traps and Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Key Test Traps & Challenges
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {activeTest.keyChallenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold shrink-0">!</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Ideal Preparation Timeline
              </div>
              <p className="text-slate-600 leading-relaxed">
                {activeTest.idealPrepTimeline}
              </p>
              <div className="pt-2 text-slate-500">
                <strong>Eligibility: </strong>{activeTest.eligibility}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
