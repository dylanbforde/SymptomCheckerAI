import React from 'react';
import { AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { conditions, symptoms, getRelatedConditions, getConditionsBySymptom } from '../data/medical-data';

interface ResultsProps {
  symptoms: string[];
}

export function Results({ symptoms: userSymptoms }: ResultsProps) {
  const getMatchingConditions = () => {
    if (userSymptoms.length === 0) return [];

    // Get symptom IDs from names
    const symptomIds = Object.values(symptoms)
      .filter(s => userSymptoms.includes(s.name))
      .map(s => s.id);

    // Get all potential conditions for the symptoms
    const potentialConditions = new Set(
      symptomIds.flatMap(id => getConditionsBySymptom(id))
    );

    return Array.from(potentialConditions)
      .map(condition => {
        const allConditionSymptoms = [
          ...condition.symptoms.primary,
          ...condition.symptoms.secondary
        ];

        const matchingSymptomIds = symptomIds.filter(id => 
          allConditionSymptoms.includes(id)
        );

        const matchScore = calculateMatchScore(
          matchingSymptomIds,
          condition.symptoms.primary,
          condition.symptoms.secondary,
          symptomIds
        );

        return {
          ...condition,
          matchScore,
          matchingSymptoms: matchingSymptomIds.map(id => symptoms[id].name)
        };
      })
      .filter(result => result.matchScore > 0.2)
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const calculateMatchScore = (
    matchingSymptoms: string[],
    primarySymptoms: string[],
    secondarySymptoms: string[],
    userSymptoms: string[]
  ) => {
    if (matchingSymptoms.length === 0) return 0;

    // Calculate weighted precision
    const primaryMatches = matchingSymptoms.filter(id => primarySymptoms.includes(id)).length;
    const secondaryMatches = matchingSymptoms.filter(id => secondarySymptoms.includes(id)).length;
    
    const precision = (primaryMatches * 1.5 + secondaryMatches) / 
      (primarySymptoms.length * 1.5 + secondarySymptoms.length);
    
    const recall = matchingSymptoms.length / userSymptoms.length;

    // F1 score with higher weight on precision
    const beta = 0.5;
    const beta2 = beta * beta;
    return ((1 + beta2) * (precision * recall)) / (beta2 * precision + recall);
  };

  const results = getMatchingConditions();

  if (userSymptoms.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        <Info className="mx-auto h-12 w-12 mb-4" />
        <p>Enter your symptoms to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-700">
            This is an educational tool and should not be used as a substitute for professional medical advice.
            Always consult with a healthcare provider for medical concerns.
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((condition) => (
            <div
              key={condition.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{condition.name}</h3>
              <p className="text-gray-600 mb-4">{condition.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Matching Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {condition.matchingSymptoms.map(symptom => (
                    <span
                      key={symptom}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {condition.onsetPattern && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Typical Pattern:</h4>
                  <p className="text-gray-700">{condition.onsetPattern.description}</p>
                  <p className="text-gray-700 mt-1">Duration: {condition.onsetPattern.typicalDuration}</p>
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">When to Seek Care:</h4>
                <p className="text-blue-700">{condition.seekCare}</p>
              </div>

              {getRelatedConditions(condition.id).length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Related Conditions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {getRelatedConditions(condition.id).map(related => (
                      <div key={related.id} className="flex items-center text-sm text-gray-600">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        {related.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-8">
          <p>No matching conditions found for the given symptoms.</p>
          <p className="mt-2">Try adding more symptoms or consult with a healthcare provider.</p>
        </div>
      )}
    </div>
  );
}