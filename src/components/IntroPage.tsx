import React, { useEffect, useRef, useState } from 'react';
import { Music, SkipForward } from 'lucide-react';

interface IntroPageProps {
  onContinue: () => void;
  userName: string;
  onRestart: () => void; // Ajouter cette ligne
}

export function IntroPage({ onContinue, userName, onRestart }: IntroPageProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome, {userName}!
        </h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Theme des questions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sherlock Holmes mysteries</li>
              <li>DNA puzzles</li>
              <li>Christmas shows</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Rules:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Chaque question a un code unique à déchiffrer</li>
              <li>Écoutez attentivement les indices audio</li>
              <li>Examinez les images pour trouver des indices cachés</li>
              <li>Entrez le code correct pour continuer</li>
            </ul>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <button
              onClick={toggleAudio}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <Music className="w-5 h-5" />
              <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>
            <button
              onClick={onContinue}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <span>Skip</span>
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Start Quiz
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Restart Quiz
          </button>
        </div>

        <audio ref={audioRef} autoPlay>
          <source src="audio/Intro.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}