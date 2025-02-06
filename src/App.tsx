import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { SymptomInput } from './components/SymptomInput';
import { Results } from './components/Results';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">AI Symptom Checker</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Check Your Symptoms
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Enter your symptoms below to get possible conditions and recommendations
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <SymptomInput
              selectedSymptoms={selectedSymptoms}
              onSymptomsChange={setSelectedSymptoms}
            />
            
            <Results symptoms={selectedSymptoms} />
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Disclaimer: This tool is for educational purposes only and should not be used as a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;