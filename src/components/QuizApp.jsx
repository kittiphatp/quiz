import React, { useState } from 'react';

const quizQuestions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is 7 × 8?",
    choices: ["54", "56", "62", "64"],
    correctAnswer: "56"
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Gold", "Silver", "Oxygen", "Osmium"],
    correctAnswer: "Oxygen"
  },
  {
    question: "In which year did World War II end?",
    choices: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945"
  },
  {
    question: "What is the largest organ in the human body?",
    choices: ["Heart", "Brain", "Liver", "Skin"],
    correctAnswer: "Skin"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the smallest country in the world?",
    choices: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City"
  }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizQuestions.length).fill(null));
    setQuizCompleted(false);
    setScore(0);
  };

  if (quizCompleted) {
    const percentageScore = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 relative overflow-hidden">
          {/* Decorative gradient background */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            
            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <p className="text-lg text-gray-600 mb-2">Your Score</p>
              <p className={`text-5xl font-extrabold ${percentageScore >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                {percentageScore}%
              </p>
              <p className="mt-3 text-gray-500">
                {score} out of {quizQuestions.length} questions correct
              </p>
            </div>
            
            <button 
              onClick={restartQuiz} 
              className="w-full py-3 bg-indigo-600 text-white rounded-xl 
                         hover:bg-indigo-700 transition-colors duration-300 
                         font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 relative overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Quiz Challenge</h2>
          <p className="text-center text-gray-500 mb-6">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
          
          <div className="bg-gray-100 rounded-xl p-6 mb-6">
            <p className="text-xl font-semibold text-gray-700 text-center">
              {quizQuestions[currentQuestion].question}
            </p>
          </div>
          
          <div className="space-y-4">
            {quizQuestions[currentQuestion].choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleAnswerSelect(choice)}
                className={`w-full py-3 rounded-xl text-lg font-medium transition-all duration-300 
                  ${selectedAnswers[currentQuestion] === choice 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-indigo-300'}`}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between space-x-4">
          <button 
            onClick={handlePreviousQuestion} 
            disabled={currentQuestion === 0}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl 
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-gray-200 transition-colors duration-300 
              font-semibold"
          >
            Previous
          </button>
          {currentQuestion === quizQuestions.length - 1 ? (
            <button 
              onClick={submitQuiz} 
              disabled={selectedAnswers[currentQuestion] === null}
              className="flex-1 py-3 bg-green-500 text-white rounded-xl 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-green-600 transition-colors duration-300 
                font-semibold"
            >
              Submit Quiz
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === null}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-indigo-700 transition-colors duration-300 
                font-semibold"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;