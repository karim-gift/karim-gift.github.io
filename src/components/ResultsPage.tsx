import React, { useState } from 'react';
import { shows } from '../data/shows';
import { Play } from 'lucide-react';

interface ResultsPageProps {
  userName: string;
}

export function ResultsPage({ userName }: ResultsPageProps) {
  const [selectedShow, setSelectedShow] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-green-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Joyeux Noël, {userName}! Tu peux aller voir un spectacle de ton choix
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <div
              key={show.title}
              className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 ${
                selectedShow === show.title ? 'ring-4 ring-green-500' : ''
              }`}
            >
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{show.title}</h2>
                <p className="text-gray-600 mb-4">{show.synopsis}</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedShow(show.title)}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Select This Show</span>
                  </button>
                  
                  {selectedShow === show.title && (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${show.youtube.split('v=')[1]}`}
                        title={`${show.title} trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full rounded-md"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}