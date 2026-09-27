import { useState } from 'react';
import { Academy } from '../types';

interface AcademyModalProps {
  academy: Academy | null;
  onClose: () => void;
  onToggleCompare: (academy: Academy) => void;
  isCompared: boolean;
}

export function AcademyModal({
  academy,
  onClose,
  onToggleCompare,
  isCompared,
}: AcademyModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'durations' | 'success' | 'branches'>('overview');

  if (!academy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner with Image Scrim */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={academy.image}
            alt={academy.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold z-10"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Banner Text info */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>Established {academy.established}</span>
              <span aria-hidden="true">·</span>
              <span>{academy.headquarters}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-amber-300">★ {academy.rating.toFixed(1)} ({academy.reviewsCount.toLocaleString()} verified student reviews)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {academy.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
              {academy.tagline}
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center gap-2 overflow-x-auto text-xs font-semibold shrink-0">
          {[
            { id: 'overview', label: 'Overview & Pedagogy' },
            { id: 'fees', label: 'Fees & Scholarships' },
            { id: 'durations', label: 'Durations & Batches' },
            { id: 'success', label: 'Success Statistics' },
            { id: 'branches', label: 'Campuses & Hostels' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-800 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Academic Profile & Approach
                </h3>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {academy.bestSuitedFor}
                </p>
              </div>

              {/* Tests and Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Entry Tests Prepared
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {academy.entryTestsCovered.map((t) => (
                      <span key={t} className="font-semibold text-emerald-800 text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Learning Delivery Modes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {academy.deliveryModes.map((m) => (
                      <span key={m} className="font-semibold text-slate-800 text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Signature Features & Infrastructure
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {academy.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                      <span className="text-emerald-700 font-bold text-sm shrink-0">✓</span>
                      <span className="text-xs text-slate-700 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Core Strengths
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {academy.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Known Considerations
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {academy.limitations.map((l, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">·</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEES & SCHOLARSHIPS */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Tuition Fee Structure (2025-2026 Academic Session)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  All fee amounts are verified and listed in Pakistani Rupees (PKR).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-slate-500 text-xs font-medium">Regular Session</div>
                    <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-1">
                      PKR {academy.fee.regularSession.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">10-14 weeks complete syllabus</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-slate-500 text-xs font-medium">Crash Program</div>
                    <div className="text-lg font-bold font-mono text-slate-800 tabular-nums mt-1">
                      PKR {academy.fee.crashProgram.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">4-5 weeks rapid revision</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-slate-500 text-xs font-medium">Test Session Only</div>
                    <div className="text-lg font-bold font-mono text-slate-800 tabular-nums mt-1">
                      PKR {academy.fee.testSessionOnly.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Daily FLPs & discussions</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-slate-500 text-xs font-medium">Online LMS Package</div>
                    <div className="text-lg font-bold font-mono text-slate-800 tabular-nums mt-1">
                      PKR {academy.fee.onlinePackage.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Self-paced digital access</div>
                  </div>
                </div>
              </div>

              {/* Books & Installment Policy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Books & Study Materials
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    {academy.fee.booksAndMaterial}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Installment Payment Terms
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-emerald-800">
                      {academy.fee.installmentsAllowed ? 'Installments Available: ' : 'Single Upfront Payment: '}
                    </span>
                    {academy.fee.installmentDetails}
                  </div>
                </div>
              </div>

              {/* Scholarship Rules */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Scholarships, Fee Concessions & Welfare Quota
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-100">
                    <div className="font-semibold text-emerald-900">Position Holders Waiver</div>
                    <div className="text-slate-600 mt-0.5">{academy.scholarships.positionHoldersWaiver}</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-900">90%+ Marks Discount</div>
                    <div className="text-slate-600 mt-0.5">{academy.scholarships.marks90PlusWaiver}</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-900">Kinship (Sibling) Concession</div>
                    <div className="text-slate-600 mt-0.5">{academy.scholarships.kinshipDiscount}</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-900">Alumni Privileges</div>
                    <div className="text-slate-600 mt-0.5">{academy.scholarships.alumniDiscount}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  <strong>Need-Based Policy: </strong>{academy.scholarships.details}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DURATIONS & BATCHES */}
          {activeTab === 'durations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="text-xs text-slate-400 font-medium">Regular Batch Duration</div>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    {academy.durations.regularWeeks} Weeks
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Immediately post-FSc exams</div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="text-xs text-slate-400 font-medium">Crash Batch Duration</div>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    {academy.durations.crashWeeks} Weeks
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Intensive high-yield review</div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="text-xs text-slate-400 font-medium">Daily Classroom Hours</div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {academy.durations.dailyHours}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Lectures + tests + discussions</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Daily Schedule & Timings
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {academy.durations.schedulePattern}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Testing Rigor & FLP Schedule
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {academy.durations.testFrequency}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    LMS & Tech Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {academy.lmsFeatures.map((lms, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-emerald-700 font-bold">⚡</span>
                        <span>{lms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUCCESS STATISTICS */}
          {activeTab === 'success' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/40 text-center">
                  <div className="text-xs text-emerald-900 font-medium">Overall Pass Rate</div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-800 tabular-nums mt-1">
                    {academy.success.overallPassRate}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Qualifying score</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                  <div className="text-xs text-slate-500 font-medium">Top Positions</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums mt-1">
                    {academy.success.topPositionsCount}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">National & Provincial</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                  <div className="text-xs text-slate-500 font-medium">Medical Selections</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums mt-1">
                    {academy.success.medicalSelectionsAnnual > 0
                      ? `${academy.success.medicalSelectionsAnnual.toLocaleString()}+`
                      : 'N/A'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">MBBS & BDS admissions</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
                  <div className="text-xs text-slate-500 font-medium">Engineering/CS</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums mt-1">
                    {academy.success.engineeringSelectionsAnnual > 0
                      ? `${academy.success.engineeringSelectionsAnnual.toLocaleString()}+`
                      : 'N/A'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">NUST, UET, FAST, GIK</div>
                </div>
              </div>

              {/* Notable Highlight Banner */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Verified Notable Records
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {academy.success.highlightRecord}
                </p>
                <div className="pt-2 text-xs text-slate-500">
                  Average student score improvement across the 12-week diagnostic cycle:{' '}
                  <strong className="text-emerald-800 font-mono">+{academy.success.avgScoreImprovement}%</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CAMPUSES & HOSTELS */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                City networks, verified branch locations, female-only campuses, and outstation hostel arrangements:
              </div>

              <div className="space-y-3">
                {academy.branches.map((b, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-sm">
                        {b.city} ({b.campusesCount} {b.campusesCount === 1 ? 'Campus' : 'Campuses'})
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        {b.femaleOnlyBranches && (
                          <span className="text-emerald-800 font-medium">✓ Separate Girls Wing</span>
                        )}
                        {b.hostelAssistance && (
                          <span className="text-slate-600 font-medium">✓ Hostel Assistance</span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      <strong>Key Locations: </strong>{b.prominentLocations.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">Helpline:</span>
            <span className="font-mono font-bold text-slate-800">{academy.contactHelpline}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <a
              href={academy.contactWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 font-medium hover:underline"
            >
              Official Website &rarr;
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(academy)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                isCompared
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isCompared ? '✓ Added in Comparison' : '+ Add to Comparison'}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
