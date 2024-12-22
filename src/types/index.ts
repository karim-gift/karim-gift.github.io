export interface Question {
  idPage: number;
  text: string;
  imageUrl: string;
  mp3Url: string;
  answer: string;
}

export interface Show {
  title: string;
  synopsis: string;
  youtube: string;
  image: string;
}

export interface QuizState {
  currentStep: 'welcome' | 'intro' | 'quiz' | 'results';
  userName: string;
  currentQuestionIndex: number;
  answers: string[];
}