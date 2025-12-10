/**
 * Patient Detail Data
 * Extended mock data for patient detail views including medical records,
 * lab results, imaging, and consultations with AI summaries
 */

import type { PatientStatus } from './statusConfig';

// ============ BASE PATIENT TYPE ============

export interface PatientVitals {
  bp: string;
  hr: string;
  temp: string;
  o2: string;
  timestamp: Date; // When vitals were last recorded
}

export interface AIInsight {
  summary: string;
  recommendation: string;
  trend: 'improving' | 'stable' | 'declining';
  urgency: 'low' | 'medium' | 'high';
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  condition: string;
  status: PatientStatus;
  lastVisit: string;
  nextVisit: string;
  vitals: PatientVitals;
  aiInsight?: AIInsight;
}

// ============ DETAIL TYPES ============

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'Progress Note' | 'Discharge Summary' | 'Referral' | 'Procedure Note' | 'History & Physical';
  date: string;
  doctor: string;
  summary?: string;
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'pending';
  results: {
    name: string;
    value: string;
    unit: string;
    reference: string;
    flag?: 'high' | 'low';
  }[];
  aiInterpretation?: string;
}

export interface ImagingStudy {
  id: string;
  type: 'MRI' | 'CT' | 'X-Ray' | 'Ultrasound' | 'PET';
  title: string;
  date: string;
  findings?: string;
  aiAnalysis?: string;
}

export interface Consultation {
  id: string;
  title: string;
  date: string;
  duration: number; // minutes
  type: 'video' | 'in-person' | 'phone';
  aiSummary: string;
  keyPoints?: string[];
  followUp?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface PatientDetail {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  medications: Medication[];
  allergies: string[];
  conditions: string[];
  medicalRecords: MedicalRecord[];
  labResults: LabResult[];
  imaging: ImagingStudy[];
  consultations: Consultation[];
}

// ============ HELPER FUNCTIONS ============

// Create a timestamp relative to now (negative minutes = past)
function getRelativeTime(minutesAgo: number): Date {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
}

// Check if vitals are stale (older than 5 minutes)
export function areVitalsStale(timestamp: Date): boolean {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = diffMs / (1000 * 60);
  return diffMinutes > 5;
}

// Format timestamp for display (Romanian)
export function formatVitalsTimestamp(timestamp: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return 'Chiar acum';
  if (diffMinutes === 1) return 'acum 1 minut';
  if (diffMinutes < 60) return `acum ${diffMinutes} minute`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return 'acum 1 oră';
  if (diffHours < 24) return `acum ${diffHours} ore`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'acum 1 zi';
  return `acum ${diffDays} zile`;
}

// ============ PATIENT DATA ============

export const PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Ana Popescu',
    initials: 'AP',
    age: 45,
    condition: 'Hipertensiune',
    status: 'stable',
    lastVisit: '2024-12-05',
    nextVisit: '2024-12-20',
    vitals: { bp: '128/82', hr: '72', temp: '36.4', o2: '98%', timestamp: getRelativeTime(2) }, // 2 mins ago - current
  },
  {
    id: '2',
    name: 'Ion Ionescu',
    initials: 'II',
    age: 62,
    condition: 'Diabet Tip 2',
    status: 'attention',
    lastVisit: '2024-12-08',
    nextVisit: '2024-12-15',
    vitals: { bp: '135/88', hr: '78', temp: '36.9', o2: '97%', timestamp: getRelativeTime(45) }, // 45 mins ago - stale
    aiInsight: {
      summary: 'Nivelurile glicemiei arată o tendință ascendentă în ultimele 2 săptămâni',
      recommendation: 'Luați în considerare ajustarea dozei de metformin. Programați control în 1 săptămână.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '3',
    name: 'Elena Dumitrescu',
    initials: 'ED',
    age: 38,
    condition: 'Astm',
    status: 'stable',
    lastVisit: '2024-12-01',
    nextVisit: '2025-01-15',
    vitals: { bp: '118/76', hr: '68', temp: '36.4', o2: '99%', timestamp: getRelativeTime(120) }, // 2 hours ago - stale
  },
  {
    id: '4',
    name: 'Gheorghe Munteanu',
    initials: 'GM',
    age: 71,
    condition: 'Boală Cardiacă',
    status: 'critical',
    lastVisit: '2024-12-09',
    nextVisit: '2024-12-11',
    vitals: { bp: '145/95', hr: '88', temp: '37.3', o2: '94%', timestamp: getRelativeTime(1) }, // 1 min ago - current (critical patient monitored closely)
    aiInsight: {
      summary: 'Niveluri crescute de troponină detectate. Posibilă exacerbare ICC.',
      recommendation: 'Consult cardiologic imediat recomandat. Luați în considerare spitalizarea.',
      trend: 'declining',
      urgency: 'high',
    },
  },
  {
    id: '5',
    name: 'Maria Georgescu',
    initials: 'MG',
    age: 55,
    condition: 'Boală Cronică de Rinichi',
    status: 'attention',
    lastVisit: '2024-12-07',
    nextVisit: '2024-12-14',
    vitals: { bp: '142/90', hr: '76', temp: '36.9', o2: '96%', timestamp: getRelativeTime(15) }, // 15 mins ago - stale
    aiInsight: {
      summary: 'eGFR în scădere de la 48 la 42 în ultimele 3 luni',
      recommendation: 'Revizuiți medicamentele nefrotoxice. Luați în considerare trimiterea la nefrolog.',
      trend: 'declining',
      urgency: 'medium',
    },
  },
  {
    id: '6',
    name: 'Vasile Stoica',
    initials: 'VS',
    age: 68,
    condition: 'BPOC',
    status: 'stable',
    lastVisit: '2024-12-03',
    nextVisit: '2024-12-17',
    vitals: { bp: '130/84', hr: '74', temp: '36.9', o2: '95%', timestamp: getRelativeTime(180) }, // 3 hours ago - stale
  },
];

// ============ PATIENT DETAILS ============

export const PATIENT_DETAILS: Record<string, PatientDetail> = {
  '1': {
    contact: {
      phone: '0721 123 456',
      email: 'ana.popescu@email.ro',
      address: 'Str. Victoriei 123, București',
    },
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'O dată pe zi' },
      { name: 'Amlodipină', dosage: '5mg', frequency: 'O dată pe zi' },
      { name: 'Aspirină', dosage: '81mg', frequency: 'O dată pe zi' },
    ],
    allergies: ['Penicilină', 'Sulfonamide'],
    conditions: ['Hipertensiune', 'Hiperlipidemie'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Examen Fizic Anual',
        type: 'History & Physical',
        date: '5 Dec, 2024',
        doctor: 'Radu',
        summary: 'Pacienta raportează că se simte bine. Tensiunea arterială controlată cu regimul actual de medicație.',
      },
      {
        id: 'r2',
        title: 'Control Hipertensiune',
        type: 'Progress Note',
        date: '10 Nov, 2024',
        doctor: 'Radu',
        summary: 'S-a crescut doza de lisinopril de la 5mg la 10mg din cauza valorilor tensionale ușor crescute.',
      },
      {
        id: 'r3',
        title: 'Trimitere Cardiologie',
        type: 'Referral',
        date: '15 Oct, 2024',
        doctor: 'Popa',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Panel Metabolic Complet',
        date: '5 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Glucoză', value: '95', unit: 'mg/dL', reference: '70-100' },
          { name: 'Uree', value: '18', unit: 'mg/dL', reference: '7-20' },
          { name: 'Creatinină', value: '0.9', unit: 'mg/dL', reference: '0.7-1.3' },
          { name: 'Sodiu', value: '140', unit: 'mEq/L', reference: '136-145' },
        ],
      },
      {
        id: 'l2',
        testName: 'Profil Lipidic',
        date: '5 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Colesterol Total', value: '185', unit: 'mg/dL', reference: '<200' },
          { name: 'LDL', value: '110', unit: 'mg/dL', reference: '<100', flag: 'high' },
          { name: 'HDL', value: '55', unit: 'mg/dL', reference: '>40' },
          { name: 'Trigliceride', value: '120', unit: 'mg/dL', reference: '<150' },
        ],
        aiInterpretation: 'LDL ușor crescut. Luați în considerare modificări dietetice sau terapie cu statine dacă nu se îmbunătățește.',
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'X-Ray',
        title: 'Radiografie Toracică (PA și Lateral)',
        date: '15 Nov, 2024',
        findings: 'Câmpuri pulmonare clare bilateral. Dimensiunea inimii în limite normale. Fără boală cardiopulmonară acută.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Control Tensiune Arterială',
        date: '5 Dec, 2024',
        duration: 20,
        type: 'in-person',
        aiSummary: 'Pacienta se prezintă pentru monitorizarea de rutină a tensiunii arteriale. Valorile actuale arată îmbunătățire cu 128/82 mmHg. Raportează complianță bună la medicație fără efecte secundare. S-a discutat importanța continuării dietei hiposodice și exercițiilor regulate.',
        keyPoints: [
          'TA bine controlată la 128/82',
          'Niciun efect secundar raportat',
          'Sfătuită să continue regimul actual',
          'S-au subliniat modificările stilului de viață',
        ],
        followUp: '20 Dec, 2024',
      },
      {
        id: 'c2',
        title: 'Consultație Ajustare Medicație',
        date: '10 Nov, 2024',
        duration: 15,
        type: 'video',
        aiSummary: 'Control virtual pentru discutarea valorilor tensionale măsurate acasă. Pacienta a documentat valori crescute cu medie 138/88. S-a decis creșterea dozei de lisinopril de la 5mg la 10mg zilnic. Pacienta educată privind monitorizarea efectelor secundare.',
        keyPoints: [
          'TA acasă în medie 138/88',
          'Lisinopril crescut la 10mg zilnic',
          'Atenție la tuse sau amețeli',
        ],
        followUp: '5 Dec, 2024',
      },
    ],
  },
  '2': {
    contact: {
      phone: '0722 234 567',
      email: 'ion.ionescu@email.ro',
      address: 'Bd. Unirii 456, București',
    },
    medications: [
      { name: 'Metformin', dosage: '1000mg', frequency: 'De două ori pe zi' },
      { name: 'Glipizidă', dosage: '5mg', frequency: 'O dată pe zi' },
      { name: 'Atorvastatină', dosage: '20mg', frequency: 'La culcare' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'O dată pe zi' },
    ],
    allergies: ['Contrast iodat'],
    conditions: ['Diabet Tip 2', 'Hipertensiune', 'Obezitate'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Vizită Management Diabet',
        type: 'Progress Note',
        date: '8 Dec, 2024',
        doctor: 'Radu',
        summary: 'HbA1c crescută la 7.8%. S-au discutat modificări dietetice și opțiuni de ajustare a medicației.',
      },
      {
        id: 'r2',
        title: 'Screening Retinopatie Diabetică',
        type: 'Referral',
        date: '20 Nov, 2024',
        doctor: 'Petrescu',
      },
      {
        id: 'r3',
        title: 'Diagnostic Inițial Diabet',
        type: 'History & Physical',
        date: '15 Mar, 2020',
        doctor: 'Radu',
        summary: 'Diagnostic nou de Diabet Tip 2. Inițiat tratament cu metformin în monoterapie.',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Hemoglobină Glicozilată',
        date: '8 Dec, 2024',
        status: 'abnormal',
        results: [
          { name: 'HbA1c', value: '7.8', unit: '%', reference: '<7.0', flag: 'high' },
        ],
        aiInterpretation: 'HbA1c a crescut de la 7.2% la 7.8% în 3 luni. Sugerează deteriorarea controlului glicemic. Luați în considerare intensificarea terapiei cu agonist GLP-1 sau inhibitor SGLT-2.',
      },
      {
        id: 'l2',
        testName: 'Panel Metabolic Complet',
        date: '8 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Glucoză (à jeun)', value: '156', unit: 'mg/dL', reference: '70-100', flag: 'high' },
          { name: 'Creatinină', value: '1.1', unit: 'mg/dL', reference: '0.7-1.3' },
          { name: 'eGFR', value: '72', unit: 'mL/min', reference: '>60' },
          { name: 'Potasiu', value: '4.2', unit: 'mEq/L', reference: '3.5-5.0' },
        ],
      },
      {
        id: 'l3',
        testName: 'Profil Lipidic',
        date: '8 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Colesterol Total', value: '195', unit: 'mg/dL', reference: '<200' },
          { name: 'LDL', value: '105', unit: 'mg/dL', reference: '<70', flag: 'high' },
          { name: 'HDL', value: '42', unit: 'mg/dL', reference: '>40' },
          { name: 'Trigliceride', value: '180', unit: 'mg/dL', reference: '<150', flag: 'high' },
        ],
        aiInterpretation: 'LDL și trigliceride crescute la pacient diabetic cresc riscul cardiovascular. Luați în considerare intensificarea terapiei cu statine.',
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'Ultrasound',
        title: 'Ecografie Abdominală',
        date: '25 Oct, 2024',
        findings: 'Steatoză hepatică ușoară. Fără leziuni hepatice focale. Veziculă biliară fără calculi.',
        aiAnalysis: 'Boală hepatică grasă probabil legată de sindromul metabolic. Se recomandă modificări ale stilului de viață.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Evaluare Diabet',
        date: '8 Dec, 2024',
        duration: 30,
        type: 'in-person',
        aiSummary: 'Pacientul se prezintă pentru evaluarea trimestrială a diabetului. HbA1c a crescut de la 7.2% la 7.8% în ciuda aderenței bune raportate. Pacientul recunoaște abateri dietetice în perioada sărbătorilor. Greutatea a crescut cu 2.5 kg. S-a discutat adăugarea unui agonist GLP-1 (semaglutidă) pentru control glicemic mai bun și managementul greutății.',
        keyPoints: [
          'HbA1c s-a deteriorat la 7.8%',
          'Creștere în greutate de 2.5 kg',
          'S-a oferit consiliere dietetică',
          'Se ia în considerare inițierea semaglutidei',
          'Trimis la educator pentru diabet',
        ],
        followUp: '15 Dec, 2024',
      },
      {
        id: 'c2',
        title: 'Discuție Rezultate Analize',
        date: '1 Nov, 2024',
        duration: 15,
        type: 'phone',
        aiSummary: 'Consultație telefonică pentru discutarea rezultatelor recente de laborator. S-a explicat importanța unui control glicemic mai strict pentru prevenirea complicațiilor. Pacientul și-a exprimat disponibilitatea de a încerca medicamente noi dacă este necesar.',
        keyPoints: [
          'Analizele au fost revizuite și explicate',
          'Pacientul înțelege nevoia unui control mai bun',
          'Deschis la schimbări de medicație',
        ],
      },
    ],
  },
  '3': {
    contact: {
      phone: '0723 345 678',
      email: 'elena.dumitrescu@email.ro',
      address: 'Str. Primăverii 789, Cluj-Napoca',
    },
    medications: [
      { name: 'Salbutamol Inhalator', dosage: '90mcg', frequency: 'La nevoie' },
      { name: 'Fluticazonă Inhalator', dosage: '250mcg', frequency: 'De două ori pe zi' },
      { name: 'Montelukast', dosage: '10mg', frequency: 'O dată pe zi la culcare' },
    ],
    allergies: ['Acarieni', 'Polen', 'Pisici'],
    conditions: ['Astm', 'Rinită Alergică'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Control Astm',
        type: 'Progress Note',
        date: '1 Dec, 2024',
        doctor: 'Radu',
        summary: 'Astm bine controlat. Fără exacerbări recente. Flux expirator de vârf la valoarea personală optimă.',
      },
      {
        id: 'r2',
        title: 'Teste Funcționale Pulmonare',
        type: 'Procedure Note',
        date: '15 Sep, 2024',
        doctor: 'Constantinescu',
        summary: 'PFT arată obstrucție ușoară cu reversibilitate completă. FEV1 85% din prezis.',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Hemoleucogramă Completă',
        date: '1 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Leucocite', value: '7.2', unit: 'K/uL', reference: '4.5-11.0' },
          { name: 'Hemoglobină', value: '13.8', unit: 'g/dL', reference: '12.0-16.0' },
          { name: 'Eozinofile', value: '4', unit: '%', reference: '1-4' },
          { name: 'Trombocite', value: '245', unit: 'K/uL', reference: '150-400' },
        ],
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'X-Ray',
        title: 'Radiografie Toracică',
        date: '15 Sep, 2024',
        findings: 'Plămâni clari. Fără infiltrate sau revărsate. Siluetă cardiacă normală.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Evaluare Management Astm',
        date: '1 Dec, 2024',
        duration: 20,
        type: 'in-person',
        aiSummary: 'Evaluare anuală a astmului. Pacienta raportează control excelent cu regimul actual. Folosește inhalatorul de urgență doar o dată pe lună în medie. Fără vizite la urgență sau spitalizări. Alergiile sezoniere controlate cu antihistaminice.',
        keyPoints: [
          'Astm bine controlat',
          'Utilizare minimă a inhalatorului de urgență',
          'Fără vizite la urgență în ultimul an',
          'Continuă managementul actual',
        ],
        followUp: '15 Ian, 2025',
      },
    ],
  },
  '4': {
    contact: {
      phone: '0724 456 789',
      email: 'gheorghe.munteanu@email.ro',
      address: 'Str. Libertății 321, Timișoara',
    },
    medications: [
      { name: 'Metoprolol', dosage: '50mg', frequency: 'De două ori pe zi' },
      { name: 'Lisinopril', dosage: '20mg', frequency: 'O dată pe zi' },
      { name: 'Furosemid', dosage: '40mg', frequency: 'O dată pe zi' },
      { name: 'Spironolactonă', dosage: '25mg', frequency: 'O dată pe zi' },
      { name: 'Atorvastatină', dosage: '40mg', frequency: 'La culcare' },
      { name: 'Aspirină', dosage: '81mg', frequency: 'O dată pe zi' },
    ],
    allergies: ['Tuse la inhibitori ECA (lisinopril tolerat)'],
    conditions: ['Insuficiență Cardiacă Congestivă', 'Boală Coronariană', 'Fibrilație Atrială', 'Hipertensiune'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Evaluare Urgentă Insuficiență Cardiacă',
        type: 'Progress Note',
        date: '9 Dec, 2024',
        doctor: 'Radu',
        summary: 'Pacientul se prezintă cu dispnee în agravare și edeme ale membrelor inferioare. Troponină crescută, sugestivă pentru posibil SCA vs ischemie de cerere din exacerbarea ICC.',
      },
      {
        id: 'r2',
        title: 'Rezumat Externare Spital',
        type: 'Discharge Summary',
        date: '5 Nov, 2024',
        doctor: 'Popa',
        summary: 'Internat pentru exacerbare ICC. Diureză cu furosemid IV. FE îmbunătățită de la 25% la 30%.',
      },
      {
        id: 'r3',
        title: 'Cateterism Cardiac',
        type: 'Procedure Note',
        date: '20 Aug, 2024',
        doctor: 'Popa',
        summary: 'Boală coronariană trivasculară. Management medicamentos recomandat din cauza bolii difuze.',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Markeri Cardiaci',
        date: '9 Dec, 2024',
        status: 'abnormal',
        results: [
          { name: 'Troponină I', value: '0.15', unit: 'ng/mL', reference: '<0.04', flag: 'high' },
          { name: 'BNP', value: '890', unit: 'pg/mL', reference: '<100', flag: 'high' },
          { name: 'CK-MB', value: '8', unit: 'ng/mL', reference: '<5', flag: 'high' },
        ],
        aiInterpretation: 'Troponină crescută și BNP semnificativ crescut indică exacerbare acută a insuficienței cardiace cu posibil stres miocardic. Evaluare cardiologică urgentă recomandată.',
      },
      {
        id: 'l2',
        testName: 'Funcție Renală',
        date: '9 Dec, 2024',
        status: 'abnormal',
        results: [
          { name: 'Uree', value: '32', unit: 'mg/dL', reference: '7-20', flag: 'high' },
          { name: 'Creatinină', value: '1.6', unit: 'mg/dL', reference: '0.7-1.3', flag: 'high' },
          { name: 'eGFR', value: '45', unit: 'mL/min', reference: '>60', flag: 'low' },
          { name: 'Potasiu', value: '5.1', unit: 'mEq/L', reference: '3.5-5.0', flag: 'high' },
        ],
        aiInterpretation: 'Sindrom cardiorenal probabil prezent. Funcția renală în declin în contextul insuficienței cardiace. Monitorizați potasiul atent având în vedere utilizarea spironolactonei.',
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'Ultrasound',
        title: 'Ecocardiogramă',
        date: '9 Dec, 2024',
        findings: 'Disfuncție sistolică VS severă cu FE 25-30%. Regurgitare mitrală moderată. VS dilatat.',
        aiAnalysis: 'FE neschimbată față de studiul anterior. RM moderată poate contribui la simptome. Luați în considerare evaluarea pentru terapie de resincronizare cardiacă.',
      },
      {
        id: 'i2',
        type: 'X-Ray',
        title: 'Radiografie Toracică',
        date: '9 Dec, 2024',
        findings: 'Cardiomegalie. Congestie vasculară pulmonară. Revărsate pleurale bilaterale mici.',
        aiAnalysis: 'Constatări consistente cu insuficiență cardiacă decompensată. Se recomandă diureză agresivă.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Evaluare Cardiologică Urgentă',
        date: '9 Dec, 2024',
        duration: 45,
        type: 'in-person',
        aiSummary: 'Pacientul se prezintă cu istoric de 3 zile de dispnee în agravare, ortopnee și edeme ale membrelor inferioare. Greutate crescută cu 4 kg față de valoarea de bază. Examenul relevă TJV, raluri bilaterale și edeme depresibile 2+. Analizele arată troponină crescută și BNP marcant crescut. Ecocardiograma neschimbată. S-a inițiat tratament cu diuretice IV. Internare în spital recomandată pentru monitorizare și optimizare.',
        keyPoints: [
          'Exacerbare acută ICC',
          'Creștere în greutate 4 kg',
          'Troponină crescută - probabil ischemie de cerere',
          'BNP 890 - supraîncărcare volemică severă',
          'Internare în spital recomandată',
          'Diureză IV inițiată',
        ],
        followUp: '11 Dec, 2024 (control sau externare)',
      },
      {
        id: 'c2',
        title: 'Control Post-Spitalizare',
        date: '12 Nov, 2024',
        duration: 30,
        type: 'in-person',
        aiSummary: 'Control la o săptămână post-externare. Pacientul raportează respirație îmbunătățită și edeme reduse. Greutate scăzută cu 3 kg față de internare. S-a discutat importanța cântăririi zilnice, restricției de lichide și dietei hiposodice. Complianța la medicație revizuită.',
        keyPoints: [
          'Recuperare bună post-spitalizare',
          'Greutatea în scădere corespunzătoare',
          'S-au subliniat restricțiile dietetice',
          'Regimul de medicație revizuit',
        ],
        followUp: '9 Dec, 2024',
      },
    ],
  },
  '5': {
    contact: {
      phone: '0725 567 890',
      email: 'maria.georgescu@email.ro',
      address: 'Str. Florilor 654, Iași',
    },
    medications: [
      { name: 'Losartan', dosage: '100mg', frequency: 'O dată pe zi' },
      { name: 'Amlodipină', dosage: '10mg', frequency: 'O dată pe zi' },
      { name: 'Bicarbonat de Sodiu', dosage: '650mg', frequency: 'De trei ori pe zi' },
      { name: 'Epoetină Alfa', dosage: '10.000 unități', frequency: 'Injecție săptămânală' },
    ],
    allergies: ['AINS', 'Ibuprofen'],
    conditions: ['Boală Cronică de Rinichi Stadiul 3b', 'Hipertensiune', 'Anemie din BCR'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Control Nefrologie',
        type: 'Progress Note',
        date: '7 Dec, 2024',
        doctor: 'Radu',
        summary: 'S-a notat progresia BCR. eGFR a scăzut de la 48 la 42 în 3 luni. S-a discutat posibila nevoie de trimitere la nefrolog.',
      },
      {
        id: 'r2',
        title: 'Vizită Educație BCR',
        type: 'Progress Note',
        date: '20 Oct, 2024',
        doctor: 'Stanescu',
        summary: 'Educație completă despre BCR incluzând modificări dietetice, siguranța medicației și cerințe de monitorizare.',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Panel Renal',
        date: '7 Dec, 2024',
        status: 'abnormal',
        results: [
          { name: 'Creatinină', value: '1.8', unit: 'mg/dL', reference: '0.7-1.3', flag: 'high' },
          { name: 'eGFR', value: '42', unit: 'mL/min', reference: '>60', flag: 'low' },
          { name: 'Uree', value: '28', unit: 'mg/dL', reference: '7-20', flag: 'high' },
          { name: 'Potasiu', value: '4.8', unit: 'mEq/L', reference: '3.5-5.0' },
        ],
        aiInterpretation: 'BCR progresivă cu eGFR în scădere de la 48 la 42 în 3 luni. Această rată de declin depășește progresia tipică. Revizuiți pentru cauze reversibile incluzând medicamentele și statusul volemic.',
      },
      {
        id: 'l2',
        testName: 'Panel Anemie',
        date: '7 Dec, 2024',
        status: 'abnormal',
        results: [
          { name: 'Hemoglobină', value: '10.2', unit: 'g/dL', reference: '12.0-16.0', flag: 'low' },
          { name: 'Fier', value: '55', unit: 'mcg/dL', reference: '60-170', flag: 'low' },
          { name: 'Feritină', value: '85', unit: 'ng/mL', reference: '20-200' },
          { name: 'TIBC', value: '380', unit: 'mcg/dL', reference: '250-370', flag: 'high' },
        ],
        aiInterpretation: 'Anemie din BCR cu componentă de deficit de fier. Luați în considerare suplimentarea cu fier IV în plus față de terapia ESA.',
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'Ultrasound',
        title: 'Ecografie Renală',
        date: '10 Sep, 2024',
        findings: 'Ambii rinichi mici (9cm) cu ecogenitate crescută consistentă cu boala cronică de rinichi. Fără hidronefroză sau mase.',
        aiAnalysis: 'Constatările ecografice consistente cu BCR. Nu s-a identificat uropatie obstructivă.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Evaluare Management BCR',
        date: '7 Dec, 2024',
        duration: 30,
        type: 'in-person',
        aiSummary: 'Pacienta se prezintă pentru control BCR. Analizele arată scăderea eGFR de la 48 la 42 în ultimele 3 luni. Tensiunea arterială îmbunătățită la 142/90 dar încă peste țintă. S-a discutat managementul agresiv al TA pentru încetinirea progresiei BCR. Anemia în agravare - se ajustează dozarea EPO și se adaugă fier IV. Trimitere la nefrologie recomandată.',
        keyPoints: [
          'eGFR a scăzut la 42 (de la 48)',
          'TA necesită control mai bun',
          'Anemie necesitând fier IV',
          'Trimitere nefrologie efectuată',
          'Continuă dieta renală',
        ],
        followUp: '14 Dec, 2024',
      },
      {
        id: 'c2',
        title: 'Discuție Tratament Anemie',
        date: '5 Nov, 2024',
        duration: 20,
        type: 'video',
        aiSummary: 'Vizită telemedicină pentru discutarea inițierii injecțiilor EPO pentru anemia din BCR. Pacienta educată privind tehnica de auto-injectare și cerințele de monitorizare. S-a discutat hemoglobina țintă.',
        keyPoints: [
          'Terapia EPO inițiată',
          'Educație auto-injectare oferită',
          'Hgb țintă 10-11 g/dL',
          'Analize lunare necesare',
        ],
      },
    ],
  },
  '6': {
    contact: {
      phone: '0726 678 901',
      email: 'vasile.stoica@email.ro',
      address: 'Bd. Decebal 987, Constanța',
    },
    medications: [
      { name: 'Tiotropiu', dosage: '18mcg', frequency: 'Inhalator o dată pe zi' },
      { name: 'Fluticazonă/Salmeterol', dosage: '250/50mcg', frequency: 'Inhalator de două ori pe zi' },
      { name: 'Salbutamol', dosage: '90mcg', frequency: 'La nevoie' },
      { name: 'Azitromicină', dosage: '250mg', frequency: 'De trei ori pe săptămână (profilactic)' },
    ],
    allergies: ['Codeină'],
    conditions: ['BPOC - GOLD Stadiul 2', 'Fost fumător', 'Osteoporoză'],
    medicalRecords: [
      {
        id: 'r1',
        title: 'Control Trimestrial BPOC',
        type: 'Progress Note',
        date: '3 Dec, 2024',
        doctor: 'Radu',
        summary: 'BPOC stabil. Fără exacerbări de la începerea profilaxiei cu azitromicină. Reabilitare pulmonară în curs.',
      },
      {
        id: 'r2',
        title: 'Rezultate Teste Funcționale Pulmonare',
        type: 'Procedure Note',
        date: '1 Oct, 2024',
        doctor: 'Constantinescu',
        summary: 'FEV1 62% din prezis (stabil față de anterior). Obstrucție moderată fără răspuns semnificativ la bronhodilatator.',
      },
    ],
    labResults: [
      {
        id: 'l1',
        testName: 'Panel Metabolic Bazal',
        date: '3 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Sodiu', value: '141', unit: 'mEq/L', reference: '136-145' },
          { name: 'Potasiu', value: '4.0', unit: 'mEq/L', reference: '3.5-5.0' },
          { name: 'CO2', value: '28', unit: 'mEq/L', reference: '22-29' },
          { name: 'Glucoză', value: '92', unit: 'mg/dL', reference: '70-100' },
        ],
      },
      {
        id: 'l2',
        testName: 'Hemoleucogramă Completă',
        date: '3 Dec, 2024',
        status: 'normal',
        results: [
          { name: 'Leucocite', value: '6.8', unit: 'K/uL', reference: '4.5-11.0' },
          { name: 'Hemoglobină', value: '15.2', unit: 'g/dL', reference: '14.0-18.0' },
          { name: 'Hematocrit', value: '45', unit: '%', reference: '40-54' },
          { name: 'Trombocite', value: '210', unit: 'K/uL', reference: '150-400' },
        ],
      },
    ],
    imaging: [
      {
        id: 'i1',
        type: 'CT',
        title: 'CT Torace (Screening doză mică)',
        date: '15 Nov, 2024',
        findings: 'Modificări emfizematoase, predominant în lobii superiori. Fără noduli pulmonari sau mase. Fără adenopatie.',
        aiAnalysis: 'Emfizem consistent cu BPOC. Fără constatări îngrijorătoare pentru malignitate. Continuați screening-ul anual.',
      },
      {
        id: 'i2',
        type: 'X-Ray',
        title: 'Radiografie Toracică',
        date: '3 Dec, 2024',
        findings: 'Plămâni hiperinflatați. Fără infiltrat acut. Fără revărsat pleural.',
      },
    ],
    consultations: [
      {
        id: 'c1',
        title: 'Evaluare Management BPOC',
        date: '3 Dec, 2024',
        duration: 25,
        type: 'in-person',
        aiSummary: 'Control trimestrial BPOC. Pacientul raportează toleranță la efort stabilă și fără exacerbări de la începerea profilaxiei cu azitromicină acum 6 luni. Continuă reabilitarea pulmonară cu angajament bun. S-a discutat importanța vaccinărilor pentru gripă și pneumonie - s-a actualizat vaccinul pneumococic astăzi.',
        keyPoints: [
          'BPOC stabil, fără exacerbări',
          'Profilaxia cu azitromicină funcționează bine',
          'Activ în reabilitare pulmonară',
          'Vaccinări actualizate',
          'Continuă regimul actual',
        ],
        followUp: '17 Dec, 2024',
      },
      {
        id: 'c2',
        title: 'Control Renunțare la Fumat',
        date: '20 Sep, 2024',
        duration: 20,
        type: 'video',
        aiSummary: 'Control privind progresul renunțării la fumat. Pacientul raportează 2 ani fără tutun. S-au discutat strategii pentru menținerea abstinenței și gestionarea factorilor declanșatori de stres.',
        keyPoints: [
          '2 ani fără fumat',
          'Folosește strategii sănătoase de coping',
          'Încurajat să continue grupul de suport',
        ],
      },
    ],
  },
};

// Helper function to get patient by ID
export function getPatientById(id: string): Patient | undefined {
  return PATIENTS.find(p => p.id === id);
}

// Get patients for preview (prioritize critical/attention)
export function getPreviewPatients(limit = 4): Patient[] {
  const sorted = [...PATIENTS].sort((a, b) => {
    const priority = { critical: 0, attention: 1, stable: 2 };
    return priority[a.status] - priority[b.status];
  });
  return sorted.slice(0, limit);
}
