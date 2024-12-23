import React, { useState, useEffect } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { IntroPage } from './components/IntroPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { questions } from './data/questions';
import type { QuizState } from './types';

function App() {
  const [state, setState] = useState<QuizState>(() => {
    const saved = localStorage.getItem('quizState');
    return saved ? JSON.parse(saved) : {
      currentStep: 'welcome',
      userName: '',
      currentQuestionIndex: 0,
      answers: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);

  const handleNameSubmit = (name: string) => {
    setState(prev => ({
      ...prev,
      userName: name,
      currentStep: 'intro'
    }));
  };

  const handleIntroComplete = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'quiz'
    }));
  };

  const handleAnswer = (answer: string) => {
    setState(prev => {
      const newAnswers = [...prev.answers, answer];
      const nextIndex = prev.currentQuestionIndex + 1;
      
      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: nextIndex,
        currentStep: nextIndex >= questions.length ? 'results' : 'quiz'
      };
    });
  };

  const handleRestart = () => {
    setState({
      currentStep: 'intro',
      userName: state.userName,
      currentQuestionIndex: 0,
      answers: [],
    });
  };

  return (
    <div className="min-h-screen">
      {state.currentStep === 'welcome' && (
        <WelcomePage onSubmit={handleNameSubmit} />
      )}
      {state.currentStep === 'intro' && (
        <IntroPage onContinue={handleIntroComplete} userName={state.userName} onRestart={handleRestart} />
      )}
      {state.currentStep === 'quiz' && (
        <QuizPage
          currentQuestionIndex={state.currentQuestionIndex}
          onAnswer={handleAnswer}
          onRestart={handleRestart}
        />
      )}
      {state.currentStep === 'results' && (
        <ResultsPage userName={state.userName} />
      )}
    </div>
  );
}

export default App;