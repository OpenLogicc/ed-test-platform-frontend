import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface TestData {
  id: number;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  difficulty: string;
}

interface QuestionItem {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

const MyTests = () => {
  const location = useLocation();
  const test = (location.state as { test?: TestData } | undefined)?.test;
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);

  useEffect(() => {
    const fetchQuestionsFromApi = async () => {
      const apiResponse = {
        questions: [
          {
            id: 1,
            question: "Which of the following is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
            answer: 1,
          },
          {
            id: 2,
            question: "What is the chemical formula of water?",
            options: ["CO2", "O2", "H2O", "NaCl"],
            answer: 2,
          },
          {
            id: 3,
            question: "Which gas do plants absorb during photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: 2,
          },
          {
            id: 4,
            question: "What is the SI unit of force?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            answer: 2,
          },
          {
            id: 5,
            question:
              "Which organ is responsible for pumping blood throughout the body?",
            options: ["Lungs", "Brain", "Heart", "Kidney"],
            answer: 2,
          },
          {
            id: 6,
            question:
              "What is the value of acceleration due to gravity on Earth?",
            options: ["9.8 m/s²", "5.6 m/s²", "12.5 m/s²", "15 m/s²"],
            answer: 0,
          },
          {
            id: 7,
            question: "Which part of the plant performs photosynthesis?",
            options: ["Root", "Stem", "Leaf", "Flower"],
            answer: 2,
          },
          {
            id: 8,
            question: "Which particle has a negative charge?",
            options: ["Proton", "Neutron", "Electron", "Nucleus"],
            answer: 2,
          },
          {
            id: 9,
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Liver", "Skin", "Brain"],
            answer: 2,
          },
          {
            id: 10,
            question: "Which blood cells help fight infections?",
            options: [
              "Red Blood Cells",
              "White Blood Cells",
              "Platelets",
              "Plasma",
            ],
            answer: 1,
          },
        ],
      };

      setQuestions(apiResponse.questions);
      setLoading(false);
    };

    fetchQuestionsFromApi();
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  // Select answer
  const handleAnswer = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  // Next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Jump to question
  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  // Mark / Unmark question
  const toggleMarkForReview = () => {
    setMarkedQuestions((prev) => {
      if (prev.includes(currentQuestion)) {
        return prev.filter((item) => item !== currentQuestion);
      }

      return [...prev, currentQuestion];
    });
  };

  // Submit test
  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;

    const confirmSubmit = window.confirm(
      `You have answered ${answeredCount} out of ${questions.length} questions. Do you want to submit the test?`,
    );

    if (confirmSubmit) {
      console.log("Answers:", answers);
      alert("Test submitted successfully!");
    }
  };

  const question = questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {test?.title || "My Test"}
            </h1>

            <p className="text-sm text-gray-500">
              {test
                ? `${test.subject} • ${test.duration} • ${test.questions} questions`
                : "Select a test to begin"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Progress */}
            <div className="hidden md:block">
              <p className="text-xs text-gray-500 mb-1">Progress</p>

              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Timer */}
            <div
              className={`px-4 py-2 rounded-lg font-semibold ${
                timeLeft < 300
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-72 min-h-[calc(100vh-73px)] bg-white border-r border-gray-200 p-5">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900">Questions</h2>

            <p className="text-sm text-gray-500 mt-1">
              {answeredCount} of {test?.questions ?? questions.length} answered
            </p>

            {/* Question Numbers */}
            <div className="grid grid-cols-5 gap-3 mt-6">
              {questions.map((q, index) => {
                const isCurrent = currentQuestion === index;

                const isAnswered = answers[index] !== undefined;

                const isMarked = markedQuestions.includes(index);

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      relative h-10 w-10 rounded-lg
                      font-medium text-sm
                      transition-all
                      border
                      
                      ${
                        isCurrent
                          ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200"
                          : isAnswered
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    {index + 1}

                    {/* Mark indicator */}
                    {isMarked && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-4 h-4 bg-blue-600 rounded" />
                Current
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
                Answered
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-4 h-4 bg-white border border-gray-300 rounded" />
                Not Answered
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-4 h-4 bg-yellow-400 rounded-full" />
                Marked
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full mt-10 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Submit Test
            </button>
          </div>
        </aside>

        {/* Question Section */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            {/* Question Counter */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm font-medium text-blue-600">
                  Question {currentQuestion + 1}
                </span>

                <span className="text-sm text-gray-400">
                  {" "}
                  of {questions.length}
                </span>
              </div>

              <button
                onClick={toggleMarkForReview}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium border
                  ${
                    markedQuestions.includes(currentQuestion)
                      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {markedQuestions.includes(currentQuestion)
                  ? "★ Marked"
                  : "☆ Mark for Review"}
              </button>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
                {question.question}
              </h2>

              {/* Options */}
              <div className="mt-8 space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`
                        w-full flex items-center gap-4
                        p-4 rounded-xl border-2
                        text-left transition-all
                        ${
                          isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      {/* Option Letter */}
                      <span
                        className={`
                          flex items-center justify-center
                          w-10 h-10 rounded-full
                          font-semibold
                          ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      {/* Option Text */}
                      <span
                        className={`
                          text-base
                          ${
                            isSelected
                              ? "text-blue-700 font-medium"
                              : "text-gray-700"
                          }
                        `}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`
                  px-6 py-3 rounded-lg font-medium
                  ${
                    currentQuestion === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                ← Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Next →
                </button>
              )}
            </div>

            {/* Mobile Question Navigation */}
            <div className="md:hidden mt-8 bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>

              <div className="grid grid-cols-8 gap-2">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      h-9 rounded-lg text-sm font-medium
                      ${
                        currentQuestion === index
                          ? "bg-blue-600 text-white"
                          : answers[index]
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyTests;
