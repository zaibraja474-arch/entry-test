import { CareerQuizQuestion } from '../typesDegrees';

export const CAREER_QUIZ_QUESTIONS: CareerQuizQuestion[] = [
  {
    id: 1,
    question: 'What kind of core activities energize you the most?',
    subtitle: 'Choose the work environment where you can see yourself thriving for the next 10 years.',
    options: [
      {
        label: 'Aviation, Flight Dynamics & Aerospace',
        description: 'Aircraft cockpits, airport logistics, aerodynamics, drones, or commercial flight operations.',
        points: { 'bs-aviation-management': 4, 'bs-aerospace-engineering': 4, 'commission-paf-gdp': 4, 'bs-avionics-engineering': 3 },
      },
      {
        label: 'Cyber Defense, Ethical Hacking & Artificial Intelligence',
        description: 'Hunting vulnerabilities, defending networks, programming deep neural networks, and building secure software.',
        points: { 'bs-cybersecurity': 5, 'bs-artificial-intelligence': 5, 'bs-software-engineering': 4, 'bs-data-science': 3 },
      },
      {
        label: 'Military Command, National Defense & Field Leadership',
        description: 'Uniformed service, physical rigor, tactical operations, commanding troops, and serving the nation.',
        points: { 'commission-pak-army-pma': 5, 'commission-paf-gdp': 4, 'commission-pak-navy': 4, 'army-tcc': 4 },
      },
      {
        label: 'Saving Lives, Clinical Medicine & Hospital Care',
        description: 'Diagnosing diseases, patient interaction, surgeries, healthcare genetics, and pharmaceuticals.',
        points: { 'degree-mbbs': 5, 'army-amc-numscourse': 5, 'degree-doctor-of-pharmacy': 3, 'degree-doctor-of-physiotherapy': 3 },
      },
      {
        label: 'High-Stakes Business, FinTech & Strategic Corporate Leadership',
        description: 'Investment modeling, quantitative stock algorithms, building tech startups, or corporate brand strategy.',
        points: { 'degree-bs-fintech': 5, 'degree-bba-iba-lums': 5, 'bs-data-science': 3 },
      },
    ],
  },
  {
    id: 2,
    question: 'What is your current or expected intermediate academic background?',
    subtitle: 'This ensures all degree recommendations match official university and armed forces eligibility criteria.',
    options: [
      {
        label: 'FSc Pre-Engineering / Cambridge A-Levels (Physics & Math)',
        description: 'Eligible for all Engineering (Aerospace, Mechanical, Electrical), Cybersecurity, Army Technical Cadet, and Aviation.',
        points: { 'bs-aerospace-engineering': 3, 'bs-cybersecurity': 3, 'army-tcc': 3, 'degree-mechanical-engineering': 3, 'bs-avionics-engineering': 3 },
      },
      {
        label: 'FSc Pre-Medical / Cambridge A-Levels (Biology, Chemistry, Physics)',
        description: 'Eligible for MBBS, BDS, Army Medical College, Pharm.D, DPT, Biotech, and Computing (with additional Math).',
        points: { 'degree-mbbs': 4, 'army-amc-numscourse': 4, 'degree-doctor-of-pharmacy': 3, 'degree-bs-biotechnology': 3, 'commission-pak-army-pma': 2 },
      },
      {
        label: 'ICS (Physics / Computer Science / Statistics / Math)',
        description: 'Eligible for Cybersecurity, Artificial Intelligence, Software Engineering, FinTech, Data Science, and PAF/Army commission.',
        points: { 'bs-cybersecurity': 4, 'bs-artificial-intelligence': 4, 'bs-software-engineering': 4, 'commission-pak-army-pma': 2 },
      },
      {
        label: 'FA / I.Com / General Science / Business A-Levels',
        description: 'Eligible for Aviation Management, PMA Long Course, LL.B 5-Years, BBA, and Financial Technology.',
        points: { 'bs-aviation-management': 4, 'degree-bba-iba-lums': 4, 'commission-pak-army-pma': 3, 'degree-llb-5years': 4 },
      },
    ],
  },
  {
    id: 3,
    question: 'What type of daily work environment appeals to you most?',
    subtitle: 'Your day-to-day comfort and mental focus dictate your long-term success.',
    options: [
      {
        label: 'Dynamic Field & Outdoor Command Environment',
        description: 'Moving between military cantonments, outdoor training grounds, high altitude posts, or naval ships.',
        points: { 'commission-pak-army-pma': 5, 'commission-paf-gdp': 4, 'commission-pak-navy': 5 },
      },
      {
        label: 'Airports, Cockpits, Hangars & Aerospace Testing Labs',
        description: 'Flight decks, wind tunnels, aircraft maintenance hangars, control towers, or space telemetry centers.',
        points: { 'bs-aerospace-engineering': 5, 'bs-aviation-management': 4, 'bs-aircraft-maintenance-technology': 5, 'commission-paf-gdp': 4 },
      },
      {
        label: 'Modern Tech Labs, Command Centers & Dual-Monitor Workstations',
        description: 'Cybersecurity SOC rooms, cloud data servers, code editors, AI model training clusters, remote contracts.',
        points: { 'bs-cybersecurity': 5, 'bs-artificial-intelligence': 5, 'bs-software-engineering': 4, 'bs-data-science': 4 },
      },
      {
        label: 'Hospitals, Intensive Care Units (ICUs) & Medical Clinics',
        description: 'Operating rooms, clinical outpatient departments (OPDs), diagnostic labs, direct human bedside care.',
        points: { 'degree-mbbs': 5, 'army-amc-numscourse': 5, 'degree-doctor-of-pharmacy': 3, 'degree-doctor-of-physiotherapy': 3 },
      },
      {
        label: 'Corporate Boardrooms, Stock Markets & Legal Chambers',
        description: 'Corporate headquarters, investment trading floors, negotiation tables, or courtroom tribunals.',
        points: { 'degree-bba-iba-lums': 5, 'degree-bs-fintech': 4, 'degree-llb-5years': 5 },
      },
    ],
  },
  {
    id: 4,
    question: 'How do you handle intense pressure, obstacles, and stress?',
    subtitle: 'Different fields test mental stamina in entirely different ways.',
    options: [
      {
        label: 'I love physical discipline, high adrenaline, and obstacle challenges',
        description: 'I am ready for the 4-day ISSB test, obstacle courses, running, and split-second emergency decisions.',
        points: { 'commission-pak-army-pma': 5, 'commission-paf-gdp': 5, 'commission-pak-navy': 4 },
      },
      {
        label: 'I excel at logical problem solving, code debugging & mathematical puzzles',
        description: 'I can spend 6 hours hunting down a security exploit, analyzing algorithms, or calculating structural stresses.',
        points: { 'bs-cybersecurity': 5, 'bs-artificial-intelligence': 4, 'bs-aerospace-engineering': 4, 'army-tcc': 4 },
      },
      {
        label: 'I have immense emotional patience and dedication to human suffering',
        description: 'I can endure 36-hour hospital emergency rotations, intense memorization of medical texts, and clinical empathy.',
        points: { 'degree-mbbs': 5, 'army-amc-numscourse': 5, 'degree-doctor-of-physiotherapy': 4 },
      },
      {
        label: 'I am a persuasive communicator, negotiator, and calculated risk-taker',
        description: 'I love pitching ideas, leading team discussions, cross-examining facts, and commercial enterprise strategy.',
        points: { 'degree-bba-iba-lums': 5, 'degree-llb-5years': 5, 'bs-aviation-management': 4 },
      },
    ],
  },
  {
    id: 5,
    question: 'What is your perspective on financial investment and tuition sponsorship?',
    subtitle: 'This helps balance high-cost private universities against government and military fully-funded options.',
    options: [
      {
        label: 'I want 100% Free Education + Monthly Salary (Armed Forces / Government)',
        description: 'PMA Kakul, PAF Risalpur, Army Technical Cadet Course, or Army Medical College (AMC) which pay monthly stipends.',
        points: { 'commission-pak-army-pma': 5, 'army-tcc': 5, 'commission-paf-gdp': 5, 'army-amc-numscourse': 5, 'commission-pak-navy': 5 },
      },
      {
        label: 'Moderate Public University Tuition (UET, FAST, NUST, Air University)',
        description: 'Standard tuition fee (PKR 90,000 - 180,000 per semester) with high merit return and high employment rates.',
        points: { 'bs-cybersecurity': 4, 'bs-aerospace-engineering': 4, 'degree-mbbs': 4, 'bs-software-engineering': 4, 'bs-aviation-management': 4 },
      },
      {
        label: 'Premium Investment in Elite Global Brand (LUMS, IBA, AKU, GIKI)',
        description: 'Ready to invest in premier private/semi-autonomous universities known for global placements and Fortune 500 alumni.',
        points: { 'degree-bba-iba-lums': 5, 'degree-bs-fintech': 4, 'degree-mbbs': 4, 'bs-artificial-intelligence': 4 },
      },
    ],
  },
  {
    id: 6,
    question: 'What is your preferred career exit timeline and earning speed?',
    subtitle: 'Do you want immediate employment after 2-4 years or are you prepared for long post-graduate training?',
    options: [
      {
        label: 'Immediate Military Officer Commissioning & Housing at Age 20-22',
        description: 'Commission as Second Lieutenant / Pilot Officer right after 2-3 years cadet training with guaranteed lifetime security.',
        points: { 'commission-pak-army-pma': 5, 'commission-paf-gdp': 5, 'commission-pak-navy': 5 },
      },
      {
        label: 'Rapid High-Income Tech Freelancing & Remote USD Contracts in 2-4 Years',
        description: 'Cybersecurity bug bounties, remote US/European software contracts, AI model building, starting from semester 4-6.',
        points: { 'bs-cybersecurity': 5, 'bs-artificial-intelligence': 5, 'bs-software-engineering': 5, 'bs-data-science': 4 },
      },
      {
        label: 'Fast-Track Corporate Commercial Aviation & Airline Management',
        description: 'Immediate entry into airline operations, ground management, civil aviation, or flight dispatch.',
        points: { 'bs-aviation-management': 5, 'bs-aircraft-maintenance-technology': 5, 'bs-aerospace-engineering': 4 },
      },
      {
        label: 'Long-term High-Prestige Medical / Legal Authority (6-10 Years)',
        description: 'I am ready for 5 years degree + house job/apprenticeship + postgraduate specialization (FCPS/LLM).',
        points: { 'degree-mbbs': 5, 'degree-llb-5years': 5, 'army-amc-numscourse': 5 },
      },
    ],
  },
];
