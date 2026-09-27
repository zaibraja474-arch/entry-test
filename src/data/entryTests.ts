import { EntryTestInfo } from '../types';

export const ENTRY_TESTS_INFO: EntryTestInfo[] = [
  {
    id: 'mdcat',
    name: 'MDCAT (PMDC / Provincial)',
    fullName: 'Medical and Dental College Admission Test',
    conductingBody: 'PMDC with Provincial Universities (UHS Punjab, DUHS Sindh, KMU KPK, SZABMU Federal, BUMHS Balochistan)',
    targetUniversities: ['King Edward Medical University', 'Allama Iqbal Medical College', 'Dow Medical College', 'Khyber Medical College', 'All Public & Private MBBS/BDS Colleges'],
    totalMarks: 200,
    durationMinutes: 210,
    subjectsWeightage: [
      { subject: 'Biology', percentage: 34 }, // 68 MCQs
      { subject: 'Chemistry', percentage: 27 }, // 54 MCQs
      { subject: 'Physics', percentage: 27 }, // 54 MCQs
      { subject: 'English', percentage: 9 }, // 18 MCQs
      { subject: 'Logical Reasoning', percentage: 3 }, // 6 MCQs
    ],
    eligibility: 'Minimum 60% in FSc Pre-Medical or equivalent A-Levels (Equivalence certificate required)',
    meritFormula: '50% MDCAT + 40% FSc (HSSC) + 10% Matric (SSC)',
    keyChallenges: [
      'Extremely high cut-off merit (often 91.5% to 93.8% aggregate in Punjab)',
      'Slight variations between provincial textbooks despite unified PMDC syllabus',
      'No calculator permitted; rapid mental math required in physics kinematics & chemistry stoichometry',
      'High psychological pressure with over 180,000 candidates competing for ~4,500 open merit seats',
    ],
    idealPrepTimeline: '10 to 14 weeks directly following FSc Part 2 examinations (May through August). Repeaters should start in February/March.',
  },
  {
    id: 'nust-net',
    name: 'NUST NET',
    fullName: 'National University of Sciences & Technology Entry Test',
    conductingBody: 'NUST Islamabad (Conducted in 4 series: NET-1, NET-2, NET-3, NET-4)',
    targetUniversities: ['NUST SEECS (Software/CS)', 'NUST SMME (Mechanical)', 'NUST SCME (Chemical)', 'NUST NBS (Business)', 'NUST ASAB (Biotech)'],
    totalMarks: 200,
    durationMinutes: 180,
    subjectsWeightage: [
      { subject: 'Mathematics (Advanced)', percentage: 40 }, // 80 MCQs
      { subject: 'Physics', percentage: 30 }, // 60 MCQs
      { subject: 'Chemistry / CS', percentage: 15 }, // 30 MCQs
      { subject: 'English', percentage: 10 }, // 20 MCQs
      { subject: 'Intelligence & Logic', percentage: 5 }, // 10 MCQs
    ],
    eligibility: 'Minimum 60% in FSc Pre-Engineering / ICS / Pre-Medical (with Additional Math) or equivalent',
    meritFormula: '75% NUST NET + 15% FSc + 10% Matric',
    keyChallenges: [
      'Huge 75% weightage on the entrance test itself (a good NET score can overcome moderate college grades)',
      'Advanced Mathematics requires non-calculator shortcuts for calculus, trigonometry, and matrices',
      'Computer-Based Testing (CBT) requires screen familiarity and rapid question jumping',
      'Multiple series allow you to test your score up to 4 times and keep the highest attempt',
    ],
    idealPrepTimeline: 'Year-round preparation starting from NET-1 (November/December) through NET-4 (June/July).',
  },
  {
    id: 'ecat',
    name: 'ECAT (UET)',
    fullName: 'Engineering College Admission Test (UET Lahore)',
    conductingBody: 'University of Engineering and Technology (UET) Lahore',
    targetUniversities: ['UET Lahore', 'UET Taxila', 'UET Faisalabad Campus', 'Peshawar UET', 'Affiliated Govt Engineering Colleges'],
    totalMarks: 400,
    durationMinutes: 100,
    subjectsWeightage: [
      { subject: 'Mathematics', percentage: 30 }, // 30 MCQs (4 marks each = 120 marks)
      { subject: 'Physics', percentage: 30 }, // 30 MCQs (120 marks)
      { subject: 'Chemistry / Computer', percentage: 30 }, // 30 MCQs (120 marks)
      { subject: 'English', percentage: 10 }, // 10 MCQs (40 marks)
    ],
    eligibility: 'Minimum 60% in FSc Pre-Engineering / ICS',
    meritFormula: '33% ECAT + 50% FSc + 17% Matric (or revised 50% ECAT + 50% FSc)',
    keyChallenges: [
      'Negative marking: +4 marks for correct, -1 mark deduction for every incorrect answer',
      'Strict time constraint: 100 MCQs in only 100 minutes (1 minute per question)',
      'Requires guessing discipline — leaving blank is better than a blind guess',
    ],
    idealPrepTimeline: '6 to 8 weeks intensive crash course right after college annual board exams.',
  },
  {
    id: 'aku',
    name: 'AKU Medical College Test',
    fullName: 'Aga Khan University Medical College Entrance Examination',
    conductingBody: 'Aga Khan University (AKU) Karachi',
    targetUniversities: ['Aga Khan University Medical College Karachi'],
    totalMarks: 100,
    durationMinutes: 150,
    subjectsWeightage: [
      { subject: 'Biology', percentage: 30 },
      { subject: 'Chemistry', percentage: 25 },
      { subject: 'Physics', percentage: 25 },
      { subject: 'Scientific Reasoning', percentage: 10 },
      { subject: 'Mathematical Reasoning', percentage: 10 },
    ],
    eligibility: 'Minimum 65% in HSSC Pre-Medical or equivalent Cambridge A-Levels',
    meritFormula: 'Two-stage process: Stage 1 Written Test cutoff -> Stage 2 Multiple Mini Interviews (MMI), Portfolio, and Academic record',
    keyChallenges: [
      'Conceptual questions testing deep analytical reasoning rather than rote memory',
      'Includes tough high-yield Multiple Mini Interviews (MMI) assessing empathy, ethics, and communication',
      'Significant competition among top Cambridge A-Level and Pakistani high-achievers',
    ],
    idealPrepTimeline: '12 to 16 weeks with dedicated focus on scientific problem solving and interview simulations.',
  },
  {
    id: 'fast-nu',
    name: 'FAST-NU Entry Test',
    fullName: 'National University of Computer and Emerging Sciences Entrance Test',
    conductingBody: 'FAST-NUCES (Islamabad, Lahore, Karachi, Peshawar, Faisalabad campuses)',
    targetUniversities: ['FAST Islamabad', 'FAST Lahore', 'FAST Karachi', 'FAST Peshawar'],
    totalMarks: 100,
    durationMinutes: 120,
    subjectsWeightage: [
      { subject: 'Advanced Math', percentage: 50 },
      { subject: 'Basic Math', percentage: 20 },
      { subject: 'English', percentage: 10 },
      { subject: 'Analytical Reasoning & IQ', percentage: 20 },
    ],
    eligibility: 'Minimum 60% in FSc Pre-Engineering / ICS / General Science / Pre-Medical with Additional Math',
    meritFormula: '50% FAST Test + 50% Intermediate (HSSC)',
    keyChallenges: [
      'Heavy negative marking in Advanced Math (-0.25 or -0.5 depending on section)',
      'Exceptional speed required in calculus, sequences, permutations, and algebra',
      'NUCES is widely acknowledged as the toughest CS programming school in Pakistan',
    ],
    idealPrepTimeline: '6 to 10 weeks of intensive problem solving focused on non-calculator advanced mathematics.',
  },
];

export interface DilemmaGuide {
  title: string;
  subtitle: string;
  summary: string;
  recommendations: {
    scenario: string;
    verdict: string;
    keyPoints: string[];
    suggestedAcademies: string[];
  }[];
}

export const STUDENT_DILEMMAS: DilemmaGuide[] = [
  {
    title: 'The Great Debate: KIPS vs STEP by PGC',
    subtitle: 'Which of the two giants is better suited for your entry test journey?',
    summary: 'Both KIPS and STEP dominate entry test prep in Punjab and Islamabad, but their core advantages cater to slightly different student profiles.',
    recommendations: [
      {
        scenario: 'If you studied in Punjab Group of Colleges (PGC)',
        verdict: 'Choose STEP by PGC',
        keyPoints: [
          'Huge fee concession (saves PKR 14,000 - 18,000 on regular session)',
          'Familiar campus environment and seamless continuity with teachers and classmates',
          'Unrivaled STEP mobile app with video solution for every single test MCQ',
        ],
        suggestedAcademies: ['STEP by PGC'],
      },
      {
        scenario: 'If you want the strictest physical discipline & widest question bank',
        verdict: 'Choose KIPS Preparatory',
        keyPoints: [
          'KIPS FUNG and MDCAT practice book packs are universally acknowledged as the most comprehensive',
          'Higher difficulty curve in Full Length Papers (FLPs) builds extreme exam tolerance',
          'Longer established reputation (1992) with national branch penetration',
        ],
        suggestedAcademies: ['KIPS Preparatory'],
      },
    ],
  },
  {
    title: 'Should You Join On-Campus Academy or Online (Nearpeer/TopGrade)?',
    subtitle: 'Cost, hostel living, discipline, and study efficiency analyzed.',
    summary: 'For students outside major hub cities (Lahore/Islamabad/Karachi), moving to a hostel adds huge living costs and health challenges.',
    recommendations: [
      {
        scenario: 'You live in an outstation town (e.g., Rahim Yar Khan, Swat, Mianwali, Mirpur)',
        verdict: 'Highly recommend Online (Nearpeer or TopGrade.pk)',
        keyPoints: [
          'Saves PKR 75,000 - 120,000 in hostel rent, mess food, and intercity travel',
          'Avoids hostel sickness, home-sickness, and exhaustion during peak summer months (June-August)',
          'Replay difficult lectures at 1.25x or 1.5x speed whenever you want',
        ],
        suggestedAcademies: ['Nearpeer EdTech', 'TopGrade.pk'],
      },
      {
        scenario: 'You struggle with screen fatigue or need strict external discipline',
        verdict: 'Choose On-Campus Academy',
        keyPoints: [
          'Physical attendance creates an urgent daily routine with zero procrastination',
          'Immediate competitive peer pressure inside an exam hall with 60 other students',
          'Face-to-face interaction with teachers after class for conceptual doubt clearance',
        ],
        suggestedAcademies: ['KIPS Preparatory', 'Stars Academy Lahore', 'Scholar’s Science College & Academy'],
      },
    ],
  },
  {
    title: 'Fresh Student vs Repeater / Improver Strategy',
    subtitle: 'Do repeaters need a full regular session, or should they focus solely on test sessions?',
    summary: 'Fresh students have only 2-3 months post-FSc exams, while repeaters have already covered the syllabus once and need targeted diagnostic drills.',
    recommendations: [
      {
        scenario: 'You are a Fresh FSc Part 2 Student (First Attempt)',
        verdict: 'Enroll in Full Regular Session',
        keyPoints: [
          'You need rapid syllabus transition from board-style subjective cramming to tricky objective MCQs',
          'Must learn fast calculator-free arithmetic and time management techniques',
          'Comprehensive lecture coverage helps cover any neglected college topics',
        ],
        suggestedAcademies: ['KIPS Preparatory', 'STEP by PGC', 'Stars Academy Lahore', 'Anees Hussain'],
      },
      {
        scenario: 'You are an Improver / Repeater (Second Attempt)',
        verdict: 'Enroll in Super Test Session / FLPs + Focused Online Weak Area Modules',
        keyPoints: [
          'Do NOT waste 4 hours daily sitting through basic introductory theory lectures you already know',
          'Focus 80% of your energy on taking daily timed 200-MCQ papers and analyzing your error log',
          'Use digital platforms (TopGrade or Nearpeer) to re-watch only the specific topics where you lose marks',
        ],
        suggestedAcademies: ['TopGrade.pk', 'Nearpeer EdTech', 'KIPS (Test Session Only)', 'STEP (Super Test Session)'],
      },
    ],
  },
];
