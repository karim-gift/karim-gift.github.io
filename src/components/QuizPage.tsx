import React, { useState, useEffect, useRef } from 'react';
import { questions } from '../data/questions';
import { Volume2, VolumeX } from 'lucide-react';

interface QuizPageProps {
  currentQuestionIndex: number;
  onAnswer: (answer: string) => void;
}

export function QuizPage({ currentQuestionIndex, onAnswer }: QuizPageProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const question = questions[currentQuestionIndex];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toUpperCase() === question.answer) {
      onAnswer(answer);
    } else {
      setError('Incorrect code. Try again!');
    }
  };

  useEffect(() => {
    setAnswer('');
    setError('');
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="relative mb-6">
          <img
            src={question.imageUrl}
            alt="Question illustration"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={toggleAudio}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
          >
            {isPlaying ? (
              <Volume2 className="w-6 h-6 text-green-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-red-600" />
            )}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>

        <p className="text-gray-600 mb-6">{question.text}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
              Enter the Code
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your answer"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Submit Answer
          </button>
        </form>

        <audio ref={audioRef} autoPlay loop>
          <source src={question.mp3Url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}