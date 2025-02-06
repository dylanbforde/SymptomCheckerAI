import React, { useState } from 'react';
import { X } from 'lucide-react';
import { symptomsList } from '../data/medical-data';

interface SymptomInputProps {
  selectedSymptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
}

export function SymptomInput({ selectedSymptoms, onSymptomsChange }: SymptomInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    if (value.length > 0) {
      const filtered = symptomsList.filter(
        symptom => 
          symptom.toLowerCase().includes(value) && 
          !selectedSymptoms.includes(symptom)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      onSymptomsChange([...selectedSymptoms, symptom]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const removeSymptom = (symptom: string) => {
    onSymptomsChange(selectedSymptoms.filter(s => s !== symptom));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your symptoms..."
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSymptom(suggestion)}
                className="w-full p-3 text-left hover:bg-gray-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedSymptoms.map((symptom) => (
          <span
            key={symptom}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {symptom}
            <button
              onClick={() => removeSymptom(symptom)}
              className="ml-2 hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}