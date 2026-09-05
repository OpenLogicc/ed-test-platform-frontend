import React, { useState, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";

interface OptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionItem {
  id: string;
  description: string;
  difficulty: string;
  subject: string;
  tags: string;
  questionType: string;
  options: OptionItem[];
}

interface TestDataType {
  testName: string;
  subject: string;
  topic: string;
  subTopic: string;
  duration: string;
  difficulty: string;
  noOfQuestions: string;
  totalMarks: string;
  markingScheme: {
    correct: number;
    wrong: number;
    unattempted: number;
  };
  questions: QuestionItem[];
}

export const NewTest: FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [testData, setTestData] = useState<TestDataType>({
    testName: "",
    subject: "",
    topic: "",
    subTopic: "",
    duration: "",
    difficulty: "Medium",
    noOfQuestions: "",
    totalMarks: "",

    markingScheme: {
      correct: 4,
      wrong: -1,
      unattempted: 0,
    },

    questions: [
      {
        id: crypto.randomUUID(),
        description: "",
        difficulty: "EASY",
        subject: "PHYSICS",
        tags: "",
        questionType: "SCQ",
        options: [
          { id: crypto.randomUUID(), text: "", isCorrect: false },
          { id: crypto.randomUUID(), text: "", isCorrect: false },
        ],
      },
    ],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    });
  };

  // Question handlers for Step 2
  const addQuestion = () => {
    const newQuestion: QuestionItem = {
      id: crypto.randomUUID(),
      description: "",
      difficulty: "EASY",
      subject: testData.subject ? testData.subject.toUpperCase() : "PHYSICS",
      tags: "",
      questionType: "SCQ",
      options: [
        { id: crypto.randomUUID(), text: "", isCorrect: false },
        { id: crypto.randomUUID(), text: "", isCorrect: false },
      ],
    };
    setTestData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const removeQuestion = (qIndex: number) => {
    if (testData.questions.length === 1) return;
    setTestData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== qIndex),
    }));
  };

  const updateQuestionField = (
    qIndex: number,
    field: keyof QuestionItem,
    value: string,
  ) => {
    setTestData((prev) => {
      const updated = [...prev.questions];
      updated[qIndex] = {
        ...updated[qIndex],
        [field]: value,
      };
      return { ...prev, questions: updated };
    });
  };

  // Option handlers for Step 2
  const addOption = (qIndex: number) => {
    setTestData((prev) => {
      const updated = [...prev.questions];
      updated[qIndex].options.push({
        id: crypto.randomUUID(),
        text: "",
        isCorrect: false,
      });
      return { ...prev, questions: updated };
    });
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    setTestData((prev) => {
      const updated = [...prev.questions];
      updated[qIndex].options = updated[qIndex].options.filter(
        (_, idx) => idx !== optIndex,
      );
      return { ...prev, questions: updated };
    });
  };

  const updateOptionText = (qIndex: number, optIndex: number, text: string) => {
    setTestData((prev) => {
      const updated = [...prev.questions];
      updated[qIndex].options[optIndex].text = text;
      return { ...prev, questions: updated };
    });
  };

  const updateOptionCorrectness = (
    qIndex: number,
    optIndex: number,
    isCorrect: boolean,
  ) => {
    setTestData((prev) => {
      const updated = [...prev.questions];
      if (updated[qIndex].questionType === "SCQ" && isCorrect) {
        updated[qIndex].options = updated[qIndex].options.map((opt, idx) => ({
          ...opt,
          isCorrect: idx === optIndex,
        }));
      } else {
        updated[qIndex].options[optIndex].isCorrect = isCorrect;
      }
      return { ...prev, questions: updated };
    });
  };

  const submitTest = () => {
    console.log("Final test payload:", testData);
    alert("Test Created Successfully!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 border border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/admin")}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition w-10 h-10 flex items-center justify-center font-bold"
          title="Close"
        >
          ✕
        </button>

        <h1 className="text-4xl font-bold mb-2">Create New Test</h1>
        <p className="text-slate-400 mb-8">Step {step} of 2</p>

        {/* STEP 1: Test Details & Marking Scheme */}
        {step === 1 && (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="testName"
                value={testData.testName}
                placeholder="Test Name"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                value={testData.subject}
                placeholder="Subject"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="topic"
                value={testData.topic}
                placeholder="Topic"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="subTopic"
                value={testData.subTopic}
                placeholder="Sub Topic"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="number"
                name="duration"
                value={testData.duration}
                placeholder="Duration (Minutes)"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <select
                name="difficulty"
                value={testData.difficulty}
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <input
                type="number"
                name="noOfQuestions"
                value={testData.noOfQuestions}
                placeholder="Number of Questions"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="number"
                name="totalMarks"
                value={testData.totalMarks}
                placeholder="Total Marks"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Marking Scheme</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Correct Marks"
                  value={testData.markingScheme.correct}
                  className="bg-slate-800 p-3 rounded-xl outline-none"
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      markingScheme: {
                        ...testData.markingScheme,
                        correct: Number(e.target.value),
                      },
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Wrong Marks"
                  value={testData.markingScheme.wrong}
                  className="bg-slate-800 p-3 rounded-xl outline-none"
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      markingScheme: {
                        ...testData.markingScheme,
                        wrong: Number(e.target.value),
                      },
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Unattempted"
                  value={testData.markingScheme.unattempted}
                  className="bg-slate-800 p-3 rounded-xl outline-none"
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      markingScheme: {
                        ...testData.markingScheme,
                        unattempted: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-8 bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-xl font-semibold"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2: Question & Options Builder */}
        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Question Setup</h2>

            <div className="space-y-6">
              {testData.questions.map((q, qIndex) => (
                <div
                  key={q.id}
                  className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-6 md:p-8 space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white">
                    Question {qIndex + 1}
                  </h3>

                  {/* Question Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Question Description
                    </label>
                    <textarea
                      rows={4}
                      value={q.description}
                      onChange={(e) =>
                        updateQuestionField(
                          qIndex,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Enter the question"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>

                  {/* Difficulty & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        Difficulty
                      </label>
                      <select
                        value={q.difficulty}
                        onChange={(e) =>
                          updateQuestionField(
                            qIndex,
                            "difficulty",
                            e.target.value,
                          )
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        Subject
                      </label>
                      <select
                        value={q.subject}
                        onChange={(e) =>
                          updateQuestionField(qIndex, "subject", e.target.value)
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      >
                        <option value="PHYSICS">PHYSICS</option>
                        <option value="CHEMISTRY">CHEMISTRY</option>
                        <option value="MATHEMATICS">MATHEMATICS</option>
                        <option value="BIOLOGY">BIOLOGY</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={q.tags}
                      onChange={(e) =>
                        updateQuestionField(qIndex, "tags", e.target.value)
                      }
                      placeholder="mechanics, newton-laws, force"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>

                  {/* Question Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Question Type
                    </label>
                    <input
                      type="text"
                      value={q.questionType}
                      onChange={(e) =>
                        updateQuestionField(
                          qIndex,
                          "questionType",
                          e.target.value,
                        )
                      }
                      placeholder="SCQ"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-lg font-semibold text-white">
                      Options
                    </h4>

                    <div className="space-y-3">
                      {q.options.map((opt, optIndex) => (
                        <div
                          key={opt.id}
                          className="flex flex-col md:flex-row items-start md:items-end gap-3"
                        >
                          <div className="flex-1 w-full space-y-1">
                            <label className="block text-xs font-medium text-slate-400">
                              Option
                            </label>
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) =>
                                updateOptionText(
                                  qIndex,
                                  optIndex,
                                  e.target.value,
                                )
                              }
                              placeholder="Enter option text"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                          </div>

                          <div className="w-full md:w-32 space-y-1">
                            <label className="block text-xs font-medium text-slate-400">
                              Correct?
                            </label>
                            <select
                              value={opt.isCorrect ? "YES" : "NO"}
                              onChange={(e) =>
                                updateOptionCorrectness(
                                  qIndex,
                                  optIndex,
                                  e.target.value === "YES",
                                )
                              }
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            >
                              <option value="NO">NO</option>
                              <option value="YES">YES</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, optIndex)}
                            className="bg-red-900/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 font-medium px-4 py-3 rounded-xl text-sm transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => addOption(qIndex)}
                        className="bg-slate-700 hover:bg-slate-600 text-purple-300 font-medium px-4 py-2.5 rounded-xl text-sm transition"
                      >
                        + Add Option
                      </button>

                      {testData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-900/80 font-medium px-4 py-2.5 rounded-xl text-sm transition"
                        >
                          Remove Question
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2 Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 transition px-6 py-3 rounded-xl font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-purple-950/70 hover:bg-purple-900/80 text-purple-300 border border-purple-800/60 px-5 py-3 rounded-xl text-sm font-semibold transition"
                >
                  + Add Question
                </button>
              </div>

              <button
                type="button"
                onClick={submitTest}
                className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-xl font-semibold text-white"
              >
                Create Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
