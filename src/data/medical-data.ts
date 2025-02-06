// Types for the enhanced medical database
interface Symptom {
  id: string;
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  commonlyAssociatedWith: string[]; // Array of condition IDs
}

interface RiskFactor {
  id: string;
  name: string;
  description: string;
  type: 'demographic' | 'lifestyle' | 'medical' | 'environmental';
}

interface OnsetPattern {
  type: 'sudden' | 'gradual' | 'recurring';
  description: string;
  typicalDuration: string;
  progressionPattern: string;
}

interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: {
    primary: string[];   // Symptom IDs
    secondary: string[]; // Symptom IDs
  };
  riskFactors: string[]; // RiskFactor IDs
  onsetPattern: OnsetPattern;
  relatedConditions: string[]; // Condition IDs
  commonIn: string[];
  severity: 'mild' | 'moderate' | 'severe';
  seekCare: string;
  source: string;
}

// Comprehensive symptom database
export const symptoms: Record<string, Symptom> = {
  'sym_fever': {
    id: 'sym_fever',
    name: 'fever',
    description: 'Elevated body temperature above normal range',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_flu', 'cond_covid', 'cond_pneumonia', 'cond_meningitis']
  },
  'sym_cough': {
    id: 'sym_cough',
    name: 'cough',
    description: 'Sudden expulsion of air from the lungs',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_cold', 'cond_covid', 'cond_bronchitis', 'cond_pneumonia']
  },
  'sym_fatigue': {
    id: 'sym_fatigue',
    name: 'fatigue',
    description: 'Extreme tiredness or lack of energy',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_flu', 'cond_covid', 'cond_mono', 'cond_anemia']
  },
  'sym_headache': {
    id: 'sym_headache',
    name: 'headache',
    description: 'Pain or discomfort in the head region',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_migraine', 'cond_tension_headache', 'cond_sinusitis']
  },
  'sym_sore_throat': {
    id: 'sym_sore_throat',
    name: 'sore throat',
    description: 'Pain or irritation in the throat',
    severity: 'mild',
    commonlyAssociatedWith: ['cond_cold', 'cond_strep', 'cond_mono']
  },
  'sym_runny_nose': {
    id: 'sym_runny_nose',
    name: 'runny nose',
    description: 'Excess nasal discharge',
    severity: 'mild',
    commonlyAssociatedWith: ['cond_cold', 'cond_allergies', 'cond_sinusitis']
  },
  'sym_congestion': {
    id: 'sym_congestion',
    name: 'nasal congestion',
    description: 'Blocked or stuffy nose',
    severity: 'mild',
    commonlyAssociatedWith: ['cond_cold', 'cond_allergies', 'cond_sinusitis']
  },
  'sym_body_aches': {
    id: 'sym_body_aches',
    name: 'body aches',
    description: 'Generalized muscle and joint pain',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_flu', 'cond_covid', 'cond_fibromyalgia']
  },
  'sym_nausea': {
    id: 'sym_nausea',
    name: 'nausea',
    description: 'Feeling of sickness with an inclination to vomit',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_gastro', 'cond_migraine', 'cond_food_poisoning']
  },
  'sym_dizziness': {
    id: 'sym_dizziness',
    name: 'dizziness',
    description: 'Feeling lightheaded or unsteady',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_vertigo', 'cond_low_blood_pressure', 'cond_anemia']
  },
  'sym_shortness_breath': {
    id: 'sym_shortness_breath',
    name: 'shortness of breath',
    description: 'Difficulty breathing or dyspnea',
    severity: 'severe',
    commonlyAssociatedWith: ['cond_covid', 'cond_asthma', 'cond_pneumonia']
  },
  'sym_chest_pain': {
    id: 'sym_chest_pain',
    name: 'chest pain',
    description: 'Discomfort or pain in the chest area',
    severity: 'severe',
    commonlyAssociatedWith: ['cond_angina', 'cond_heart_attack', 'cond_pneumonia']
  },
  'sym_loss_taste': {
    id: 'sym_loss_taste',
    name: 'loss of taste',
    description: 'Reduced or absent sense of taste',
    severity: 'moderate',
    commonlyAssociatedWith: ['cond_covid', 'cond_cold']
  }
};

// Risk factors database
export const riskFactors: Record<string, RiskFactor> = {
  'risk_age_elderly': {
    id: 'risk_age_elderly',
    name: 'Advanced Age',
    description: 'Individuals over 65 years old',
    type: 'demographic'
  },
  'risk_smoking': {
    id: 'risk_smoking',
    name: 'Smoking',
    description: 'Current or former tobacco use',
    type: 'lifestyle'
  },
  'risk_obesity': {
    id: 'risk_obesity',
    name: 'Obesity',
    description: 'Body Mass Index (BMI) of 30 or higher',
    type: 'medical'
  },
  'risk_diabetes': {
    id: 'risk_diabetes',
    name: 'Diabetes',
    description: 'Type 1 or Type 2 diabetes',
    type: 'medical'
  },
  'risk_heart_disease': {
    id: 'risk_heart_disease',
    name: 'Heart Disease',
    description: 'Existing cardiovascular conditions',
    type: 'medical'
  },
  'risk_immunocompromised': {
    id: 'risk_immunocompromised',
    name: 'Weakened Immune System',
    description: 'Compromised immune system due to disease or treatment',
    type: 'medical'
  }
};

// Main conditions database
export const conditions: Record<string, Condition> = {
  'cond_cold': {
    id: 'cond_cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract',
    symptoms: {
      primary: ['sym_runny_nose', 'sym_sore_throat', 'sym_cough'],
      secondary: ['sym_congestion', 'sym_fatigue', 'sym_headache']
    },
    riskFactors: ['risk_immunocompromised'],
    onsetPattern: {
      type: 'gradual',
      description: 'Symptoms typically develop over 1-3 days',
      typicalDuration: '7-10 days',
      progressionPattern: 'Gradual improvement after peak symptoms'
    },
    relatedConditions: ['cond_flu', 'cond_sinusitis'],
    commonIn: ['all age groups', 'winter season'],
    severity: 'mild',
    seekCare: 'If symptoms persist beyond 10 days or become severe',
    source: 'CDC Common Cold Guidelines 2024'
  },
  'cond_covid': {
    id: 'cond_covid',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus',
    symptoms: {
      primary: ['sym_fever', 'sym_cough', 'sym_fatigue', 'sym_loss_taste'],
      secondary: ['sym_body_aches', 'sym_shortness_breath', 'sym_headache']
    },
    riskFactors: ['risk_age_elderly', 'risk_obesity', 'risk_diabetes'],
    onsetPattern: {
      type: 'gradual',
      description: 'Symptoms typically appear 2-14 days after exposure',
      typicalDuration: '10-14 days for mild cases',
      progressionPattern: 'Variable progression, can worsen rapidly in severe cases'
    },
    relatedConditions: ['cond_flu', 'cond_pneumonia'],
    commonIn: ['all age groups'],
    severity: 'moderate',
    seekCare: 'Immediately if experiencing difficulty breathing, persistent chest pain, or severe symptoms',
    source: 'WHO COVID-19 Clinical Guidelines 2024'
  },
  'cond_flu': {
    id: 'cond_flu',
    name: 'Influenza',
    description: 'A viral infection that attacks the respiratory system',
    symptoms: {
      primary: ['sym_fever', 'sym_body_aches', 'sym_fatigue'],
      secondary: ['sym_cough', 'sym_headache', 'sym_sore_throat']
    },
    riskFactors: ['risk_age_elderly', 'risk_immunocompromised'],
    onsetPattern: {
      type: 'sudden',
      description: 'Symptoms typically appear suddenly within 1-4 days after exposure',
      typicalDuration: '5-7 days',
      progressionPattern: 'Rapid onset followed by gradual improvement'
    },
    relatedConditions: ['cond_cold', 'cond_pneumonia'],
    commonIn: ['all age groups', 'winter season'],
    severity: 'moderate',
    seekCare: 'If experiencing severe symptoms, particularly in high-risk individuals',
    source: 'CDC Influenza Guidelines 2024'
  },
  'cond_pneumonia': {
    id: 'cond_pneumonia',
    name: 'Pneumonia',
    description: 'Infection that inflames air sacs in the lungs',
    symptoms: {
      primary: ['sym_cough', 'sym_fever', 'sym_shortness_breath'],
      secondary: ['sym_chest_pain', 'sym_fatigue', 'sym_body_aches']
    },
    riskFactors: ['risk_age_elderly', 'risk_smoking', 'risk_immunocompromised'],
    onsetPattern: {
      type: 'gradual',
      description: 'Symptoms develop over several days',
      typicalDuration: '1-3 weeks',
      progressionPattern: 'Can worsen rapidly if untreated'
    },
    relatedConditions: ['cond_bronchitis', 'cond_covid'],
    commonIn: ['elderly', 'smokers', 'immunocompromised individuals'],
    severity: 'severe',
    seekCare: 'Immediately if experiencing difficulty breathing or chest pain',
    source: 'American Lung Association Guidelines 2024'
  },
  'cond_migraine': {
    id: 'cond_migraine',
    name: 'Migraine',
    description: 'Severe recurring headache, often with additional symptoms',
    symptoms: {
      primary: ['sym_headache', 'sym_nausea'],
      secondary: ['sym_dizziness', 'sym_fatigue']
    },
    riskFactors: [],
    onsetPattern: {
      type: 'recurring',
      description: 'Can develop with or without warning signs',
      typicalDuration: '4-72 hours',
      progressionPattern: 'Varies by individual, may have distinct phases'
    },
    relatedConditions: ['cond_tension_headache'],
    commonIn: ['adults', 'women'],
    severity: 'moderate',
    seekCare: 'If migraines are severe, frequent, or significantly impact daily life',
    source: 'American Migraine Foundation Guidelines 2024'
  },
  'cond_sinusitis': {
    id: 'cond_sinusitis',
    name: 'Sinusitis',
    description: 'Inflammation of the sinuses',
    symptoms: {
      primary: ['sym_congestion', 'sym_headache', 'sym_runny_nose'],
      secondary: ['sym_fatigue', 'sym_cough']
    },
    riskFactors: ['risk_smoking'],
    onsetPattern: {
      type: 'gradual',
      description: 'Develops over several days',
      typicalDuration: '10-14 days',
      progressionPattern: 'Gradual improvement with treatment'
    },
    relatedConditions: ['cond_cold', 'cond_allergies'],
    commonIn: ['adults', 'allergy sufferers'],
    severity: 'mild',
    seekCare: 'If symptoms persist beyond 10 days or worsen after initial improvement',
    source: 'American Academy of Otolaryngology Guidelines 2024'
  }
};

// Helper function to get all symptoms for a condition
export function getConditionSymptoms(conditionId: string): string[] {
  const condition = conditions[conditionId];
  return condition ? [...condition.symptoms.primary, ...condition.symptoms.secondary] : [];
}

// Helper function to get related conditions
export function getRelatedConditions(conditionId: string): Condition[] {
  const condition = conditions[conditionId];
  return condition 
    ? condition.relatedConditions.map(id => conditions[id]).filter(Boolean)
    : [];
}

// Helper function to get conditions by symptom
export function getConditionsBySymptom(symptomId: string): Condition[] {
  return Object.values(conditions).filter(condition => 
    condition.symptoms.primary.includes(symptomId) || 
    condition.symptoms.secondary.includes(symptomId)
  );
}

// Generate symptom list for UI
export const symptomsList = Object.values(symptoms).map(s => s.name).sort();