export interface FeeStructure {
  regularSession: number;
  crashProgram: number;
  testSessionOnly: number;
  onlinePackage: number;
  booksAndMaterial: string;
  installmentsAllowed: boolean;
  installmentDetails: string;
}

export interface CourseDurations {
  regularWeeks: number;
  crashWeeks: number;
  testSessionWeeks: number;
  dailyHours: string;
  schedulePattern: string;
  testFrequency: string;
}

export interface SuccessStats {
  overallPassRate: number; // percentage
  topPositionsCount: number; // national/provincial positions in last 3 years
  medicalSelectionsAnnual: number; // approx MBBS/BDS placements
  engineeringSelectionsAnnual: number; // approx Engineering placements
  avgScoreImprovement: number; // percentage gain
  highlightRecord: string;
}

export interface ScholarshipPolicy {
  positionHoldersWaiver: string;
  marks90PlusWaiver: string;
  marks85PlusWaiver: string;
  kinshipDiscount: string;
  alumniDiscount: string;
  needBasedAvailable: boolean;
  details: string;
}

export interface BranchInfo {
  city: string;
  campusesCount: number;
  prominentLocations: string[];
  hostelAssistance: boolean;
  femaleOnlyBranches: boolean;
}

export interface Academy {
  id: string;
  name: string;
  tagline: string;
  established: number;
  headquarters: string;
  image: string;
  badgeText?: string;
  rating: number;
  reviewsCount: number;
  entryTestsCovered: ('MDCAT' | 'NUMS' | 'ECAT' | 'NUST NET' | 'FAST' | 'GIKI' | 'PIEAS' | 'AKU' | 'IBA/LUMS' | 'LAT')[];
  deliveryModes: ('On-Campus' | 'Online LMS' | 'Hybrid')[];
  fee: FeeStructure;
  durations: CourseDurations;
  success: SuccessStats;
  scholarships: ScholarshipPolicy;
  branches: BranchInfo[];
  keyFeatures: string[];
  strengths: string[];
  limitations: string[];
  bestSuitedFor: string;
  lmsFeatures: string[];
  contactWebsite: string;
  contactHelpline: string;
}

export interface EntryTestInfo {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  targetUniversities: string[];
  totalMarks: number;
  durationMinutes: number;
  subjectsWeightage: { subject: string; percentage: number }[];
  eligibility: string;
  meritFormula: string;
  keyChallenges: string[];
  idealPrepTimeline: string;
}
