import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface WelcomePageProps {
  onSubmit: (name: string) => void;
}

export function WelcomePage({ onSubmit }: WelcomePageProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Stp saisi ton prénom (minimum 2 caractères)');
      return;
    }
    onSubmit(name);
  };

  return (


    <div className="min-h-screen bg-with-overlay flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-float"></div>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Gift className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Joyeux Noël ! <br></br>Découvre ton cadeau 🎄🎅🎁
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Ton prénom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Saisi ton prénom"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Commencer le quiz
          </button>
        </form>
      </div>
    </div>
  );
}