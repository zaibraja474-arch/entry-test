import { useState, useMemo } from 'react';
import { Academy } from '../types';

interface FeeScholarshipCalculatorProps {
  academies: Academy[];
  onSelectDetails: (academy: Academy) => void;
  onAddToCompare: (academy: Academy) => void;
}

export function FeeScholarshipCalculator({
  academies,
  onSelectDetails,
  onAddToCompare,
}: FeeScholarshipCalculatorProps) {
  const [marksPercentage, setMarksPercentage] = useState<number>(88);
  const [sessionType, setSessionType] = useState<'regular' | 'crash' | 'testOnly'>('regular');
  const [specialCategory, setSpecialCategory] = useState<
    'none' | 'position' | 'pgc-alumni' | 'kips-alumni' | 'sibling' | 'need-based'
  >('none');

  // Compute calculated fee for each academy
  const calculatedTable = useMemo(() => {
    return academies.map((academy) => {
      let baseFee = academy.fee.regularSession;
      if (sessionType === 'crash') baseFee = academy.fee.crashProgram;
      if (sessionType === 'testOnly') baseFee = academy.fee.testSessionOnly;

      let discountPercent = 0;
      let discountReason = 'Standard Fee';

      // 1. Position Holder Check
      if (specialCategory === 'position') {
        discountPercent = 100;
        discountReason = '100% Position Holder Full Waiver';
      }
      // 2. Specific Alumni Check
      else if (specialCategory === 'pgc-alumni') {
        if (academy.id === 'step') {
          discountPercent = 30;
          discountReason = '30% PGC Student Privilege Discount';
        } else if (marksPercentage >= 90) {
          discountPercent = 35;
          discountReason = 'Merit Discount for 90%+';
        }
      } else if (specialCategory === 'kips-alumni') {
        if (academy.id === 'kips') {
          discountPercent = 25;
          discountReason = '25% KIPS Network Alumni Discount';
        } else if (marksPercentage >= 90) {
          discountPercent = 35;
          discountReason = 'Merit Discount for 90%+';
        }
      }
      // 3. Sibling Check
      else if (specialCategory === 'sibling') {
        discountPercent = academy.id === 'kips' || academy.id === 'nearpeer' ? 20 : 15;
        discountReason = `${discountPercent}% Kinship Sibling Concession`;
      }
      // 4. Need Based Check
      else if (specialCategory === 'need-based') {
        if (academy.id === 'nearpeer') {
          discountPercent = 50;
          discountReason = 'Pehla Qadam Financial Aid Quota';
        } else {
          discountPercent = 30;
          discountReason = 'Deserving Student Aid Quota (On Approval)';
        }
      }
      // 5. Standard Marks-based Concession
      else {
        if (marksPercentage >= 95) {
          discountPercent = academy.id === 'stars' || academy.id === 'kips' ? 50 : 40;
          discountReason = `${discountPercent}% High Merit Concession (95%+)`;
        } else if (marksPercentage >= 90) {
          discountPercent = academy.id === 'kips' || academy.id === 'stars' ? 50 : 35;
          discountReason = `${discountPercent}% Merit Concession (90%+)`;
        } else if (marksPercentage >= 85) {
          discountPercent = 20;
          discountReason = '20% Merit Concession (85%+)';
        } else if (marksPercentage >= 80) {
          discountPercent = 10;
          discountReason = '10% Early Bird / Merit Concession (80%+)';
        }
      }

      const discountAmount = Math.round((baseFee * discountPercent) / 100);
      const netPayable = Math.max(0, baseFee - discountAmount);
      const installmentPerMonth = academy.fee.installmentsAllowed
        ? Math.round(netPayable / 2)
        : netPayable;

      return {
        academy,
        baseFee,
        discountPercent,
        discountReason,
        discountAmount,
        netPayable,
        installmentPerMonth,
      };
    }).sort((a, b) => a.netPayable - b.netPayable);
  }, [academies, marksPercentage, sessionType, specialCategory]);

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span>Financial Aid & Fee Estimator</span>
            <span aria-hidden="true">·</span>
            <span>Real-time Net Tuition Breakdown</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
            Fee & Scholarship Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Enter your Matric / FSc Part-1 score and select any applicable category (PGC/KIPS alumni, siblings, or position holders). Compare standard tuition vs net discounted fees and monthly installment splits across all institutions.
          </p>
        </div>

        {/* Interactive Controls Grid */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Marks Percentage Slider & Number */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="marks-slider" className="font-semibold text-slate-700">Your FSc / Matric Marks %</label>
              <span className="font-mono font-bold text-emerald-800 text-sm tabular-nums">
                {marksPercentage}%
              </span>
            </div>
            <input
              id="marks-slider"
              type="range"
              min={60}
              max={100}
              value={marksPercentage}
              onChange={(e) => setMarksPercentage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>60% (Pass)</span>
              <span>85% (1st Div)</span>
              <span>95%+ (Topper)</span>
            </div>
          </div>

          {/* 2. Session Type Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Course / Batch Type</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSessionType('regular')}
                className={`py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer text-center ${
                  sessionType === 'regular'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setSessionType('crash')}
                className={`py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer text-center ${
                  sessionType === 'crash'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Crash
              </button>
              <button
                onClick={() => setSessionType('testOnly')}
                className={`py-1.5 px-2 rounded-md font-medium transition-colors cursor-pointer text-center ${
                  sessionType === 'testOnly'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Test Only
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              {sessionType === 'regular' && 'Full 10-14 weeks complete syllabus & tests'}
              {sessionType === 'crash' && 'Rapid 4-5 weeks intensive revision batch'}
              {sessionType === 'testOnly' && 'FLPs & unit test sessions for repeaters'}
            </div>
          </div>

          {/* 3. Special Concession Category */}
          <div className="space-y-2">
            <label htmlFor="special-concession-category" className="block text-xs font-semibold text-slate-700">Special Concession Category</label>
            <select
              id="special-concession-category"
              value={specialCategory}
              onChange={(e) => setSpecialCategory(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="none">Standard Applicant (Based on Marks Only)</option>
              <option value="position">Board 1st / 2nd / 3rd Position Holder (100% Free)</option>
              <option value="pgc-alumni">Punjab Group of Colleges (PGC) Student / Alumni</option>
              <option value="kips-alumni">KIPS College / School Alumni</option>
              <option value="sibling">Sibling Enrolled (Kinship Discount)</option>
              <option value="need-based">Need-Based / Orphan / Shuhada Ward</option>
            </select>
            <div className="text-[11px] text-slate-500">
              Select verified background for customized waivers.
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Estimated Net Payable Tuition across All 8 Institutions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked from lowest net payable fee to highest.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            {calculatedTable.length} Institutions Evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/60 font-semibold text-slate-600">
                <th className="p-3.5 sm:px-4">Institution</th>
                <th className="p-3.5 sm:px-4">Base Fee</th>
                <th className="p-3.5 sm:px-4">Scholarship / Waiver</th>
                <th className="p-3.5 sm:px-4">Savings</th>
                <th className="p-3.5 sm:px-4">Net Payable Fee</th>
                <th className="p-3.5 sm:px-4">Installment Split</th>
                <th className="p-3.5 sm:px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {calculatedTable.map((item) => (
                <tr key={item.academy.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Academy Info */}
                  <td className="p-3.5 sm:px-4">
                    <div className="font-bold text-slate-900 text-sm">{item.academy.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.academy.headquarters} · {item.academy.deliveryModes.join(', ')}
                    </div>
                  </td>

                  {/* Base Fee */}
                  <td className="p-3.5 sm:px-4 font-mono text-slate-500 tabular-nums">
                    PKR {item.baseFee.toLocaleString()}
                  </td>

                  {/* Scholarship */}
                  <td className="p-3.5 sm:px-4">
                    {item.discountPercent > 0 ? (
                      <div>
                        <span className="font-mono font-bold text-emerald-800 tabular-nums">
                          {item.discountPercent}% Off
                        </span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.discountReason}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400">No concession applied</span>
                    )}
                  </td>

                  {/* Savings in PKR */}
                  <td className="p-3.5 sm:px-4 font-mono font-semibold text-emerald-800 tabular-nums">
                    {item.discountAmount > 0
                      ? `- PKR ${item.discountAmount.toLocaleString()}`
                      : 'PKR 0'}
                  </td>

                  {/* Net Payable Fee */}
                  <td className="p-3.5 sm:px-4">
                    <div className="font-mono text-sm font-extrabold text-slate-900 tabular-nums">
                      PKR {item.netPayable.toLocaleString()}
                    </div>
                    {item.netPayable === 0 && (
                      <span className="text-[11px] font-bold text-emerald-800 uppercase">
                        100% Free Tuition
                      </span>
                    )}
                  </td>

                  {/* Installment Split */}
                  <td className="p-3.5 sm:px-4 text-slate-600">
                    {item.academy.fee.installmentsAllowed && item.netPayable > 0 ? (
                      <div>
                        <span className="font-mono tabular-nums font-medium text-slate-800">
                          2x PKR {item.installmentPerMonth.toLocaleString()}
                        </span>
                        <div className="text-[11px] text-slate-400">Installments permitted</div>
                      </div>
                    ) : (
                      <span className="text-slate-400">Single payment</span>
                    )}
                  </td>

                  {/* Action buttons */}
                  <td className="p-3.5 sm:px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onAddToCompare(item.academy)}
                        className="px-2.5 py-1 text-xs text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded border border-slate-200 transition-colors cursor-pointer"
                        title="Add to comparison"
                      >
                        + Compare
                      </button>
                      <button
                        onClick={() => onSelectDetails(item.academy)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
