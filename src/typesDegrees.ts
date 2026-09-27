export interface DegreeInfo {
  id: string;
  name: string;
  category: 'Aviation & Aerospace' | 'Computing & Cybersecurity' | 'Armed Forces & Defense' | 'Medical & Allied Health' | 'Engineering & Tech' | 'Business, Finance & AI' | 'Law & Public Policy';
  durationYears: string;
  eligibility: string;
  entryTestsRequired: string[];
  topInstitutionsPakistan: string[];
  careerProspects: string[];
  avgStartingSalaryPKR: string;
  globalDemand: 'High' | 'Very High' | 'Exceptional' | 'Growing';
  overview: string;
  keySkillsRequired: string[];
  recommendedAcademyTrack: string;
}

export interface CareerQuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    points: Record<string, number>; // maps category or degree ids to points
  }[];
}

export interface ArmedForcesTestInfo {
  id: string;
  branch: 'Pakistan Army' | 'Pakistan Air Force (PAF)' | 'Pakistan Navy' | 'Inter Services Selection Board (ISSB)';
  courseName: string;
  shortDesc: string;
  eligibility: {
    gender: string;
    maritalStatus: string;
    ageLimit: string;
    height: string;
    qualification: string;
  };
  selectionStages: {
    stage: string;
    description: string;
  }[];
  writtenTestPattern: {
    subject: string;
    details: string;
  }[];
  physicalTestStandards: {
    test: string;
    requirement: string;
  }[];
  issbOverview: {
    duration: string;
    dayWiseBreakdown: string[];
    psychologicalTests: string[];
    gtosTasks: string[];
    interviewTips: string[];
  };
  benefitsDuringTraining: string[];
  preparatoryAcademyOptions: string[];
}
