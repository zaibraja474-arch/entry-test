import { useState } from 'react';
import { ARMED_FORCES_TESTS } from '../data/armedForces';
import { ArmedForcesTestInfo } from '../typesDegrees';

export function ArmedForcesGuide() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [activeCourseId, setActiveCourseId] = useState<string>(ARMED_FORCES_TESTS[0].id);

  const branches = [
    { id: 'all', label: 'All Defense Forces (Army, PAF, Navy, AMC)' },
    { id: 'Pakistan Army', label: 'Pakistan Army (PMA / TCC / AMC)' },
    { id: 'Pakistan Air Force (PAF)', label: 'PAF (GD Pilot & Engineering)' },
    { id: 'Pakistan Navy', label: 'Pakistan Navy (PN Cadet)' },
  ];

  const filteredCourses = ARMED_FORCES_TESTS.filter(
    (c) => selectedBranch === 'all' || c.branch === selectedBranch
  );

  const activeCourse =
    ARMED_FORCES_TESTS.find((c) => c.id === activeCourseId) ||
    filteredCourses[0] ||
    ARMED_FORCES_TESTS[0];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span>Armed Forces Commission & ISSB Selection Portal</span>
            <span aria-hidden="true">·</span>
            <span>Join Pak Army, PAF & Pak Navy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pakistan Armed Forces Tests & Commission Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Detailed selection roadmap for <strong>PMA Long Course, PAF GD Pilot, Technical Cadet Course (TCC), Pakistan Navy Cadet, and Army Medical College (AMC)</strong>. Includes physical standards, computer test patterns, and the 4-day ISSB board breakdown.
          </p>
        </div>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {branches.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              setSelectedBranch(b.id);
              const firstInBranch = ARMED_FORCES_TESTS.find(
                (c) => b.id === 'all' || c.branch === b.id
              );
              if (firstInBranch) setActiveCourseId(firstInBranch.id);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedBranch === b.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Main Course Switcher & Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Course Selection List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Commission Pathways ({filteredCourses.length})
          </div>

          <div className="space-y-2">
            {filteredCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveCourseId(course.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activeCourse.id === course.id
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>{course.branch}</span>
                  <span className="font-mono text-emerald-800">Direct Commission</span>
                </div>
                <div className="font-bold text-slate-900 text-sm mt-1">
                  {course.courseName}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {course.shortDesc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Course Detailed Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span>{activeCourse.branch}</span>
              <span aria-hidden="true">·</span>
              <span>Commissioning Pathway</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {activeCourse.courseName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {activeCourse.shortDesc}
            </p>
          </div>

          {/* Eligibility Matrix */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Official Eligibility & Physical Standards
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Gender & Status:</span>
                <span className="font-semibold text-slate-800">{activeCourse.eligibility.gender}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Age Limit:</span>
                <span className="font-semibold text-slate-800">{activeCourse.eligibility.ageLimit}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Minimum Height:</span>
                <span className="font-semibold text-slate-800">{activeCourse.eligibility.height}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-100 sm:col-span-3">
                <span className="text-slate-400 block text-[11px]">Academic Qualifications:</span>
                <span className="font-semibold text-slate-800">{activeCourse.eligibility.qualification}</span>
              </div>
            </div>
          </div>

          {/* 5 Selection Stages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Complete 5-Stage Selection Pipeline
            </h4>
            <div className="space-y-2">
              {activeCourse.selectionStages.map((stg, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-white space-y-1 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[11px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{stg.stage}</span>
                  </div>
                  <p className="text-slate-600 pl-7 leading-relaxed">{stg.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Written & Physical Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Written Test Pattern */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Initial Written E-Test Pattern
              </h4>
              <div className="space-y-2 text-xs">
                {activeCourse.writtenTestPattern.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="font-bold text-slate-800">{p.subject}</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">{p.details}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Standards */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Physical Fitness Test (PFT) Benchmarks
              </h4>
              <div className="space-y-2 text-xs">
                {activeCourse.physicalTestStandards.map((pt, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">{pt.test}</span>
                    <span className="font-mono text-emerald-800 font-bold text-[11px]">{pt.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ISSB (Inter Services Selection Board) In-Depth */}
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5 space-y-4">
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                ISSB (Inter Services Selection Board) 4-Day Overview
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                Conducted at ISSB Centers: <strong>Kohat, Gujranwala, Malir (Karachi), and Quetta</strong>. Tests candidates on 14 Officer Like Qualities (OLQs).
              </p>
            </div>

            <div className="space-y-2">
              {activeCourse.issbOverview.dayWiseBreakdown.map((day, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">{day.split(':')[0]}: </strong>
                  <span>{day.split(':')[1]}</span>
                </div>
              ))}
            </div>

            {/* Psychological & GTO components */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Psychological Batteries:
                </span>
                <div className="text-slate-600 leading-relaxed">
                  {activeCourse.issbOverview.psychologicalTests.join(' · ')}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  GTO Ground Obstacles:
                </span>
                <div className="text-slate-600 leading-relaxed">
                  {activeCourse.issbOverview.gtosTasks.join(' · ')}
                </div>
              </div>
            </div>

            {/* Interview Tips */}
            <div className="bg-white p-3.5 rounded-lg border border-emerald-100 space-y-1.5 text-xs">
              <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wider">
                Deputy President & Psychologist Interview Golden Rules:
              </span>
              <ul className="space-y-1 text-slate-600">
                {activeCourse.issbOverview.interviewTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits & Training Privileges */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cadet Privileges & Lifetime Officer Benefits
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {activeCourse.benefitsDuringTraining.map((ben, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="text-emerald-700 font-bold">🎖️</span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
