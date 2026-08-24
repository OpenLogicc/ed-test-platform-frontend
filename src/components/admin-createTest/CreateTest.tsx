import React, { useState, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";

interface AnswerKeyItem {
  questionNo: number;
  type: string;
  answer: string;
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
  pdf: File | null;
  answerKey: AnswerKeyItem[];
}

export const CreateTest: FC = () => {
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

    pdf: null,
    answerKey: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    });
  };

  const generateAnswerKey = () => {
    const questions: AnswerKeyItem[] = [];

    for (let i = 1; i <= Number(testData.noOfQuestions); i++) {
      questions.push({
        questionNo: i,
        type: "single",
        answer: "",
      });
    }

    setTestData((prev) => ({
      ...prev,
      answerKey: questions,
    }));

    setStep(3);
  };

  const updateQuestionType = (index: number, value: string) => {
    const updated = [...testData.answerKey];
    updated[index].type = value;
    updated[index].answer = "";

    setTestData({
      ...testData,
      answerKey: updated,
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const updated = [...testData.answerKey];
    updated[index].answer = value;

    setTestData({
      ...testData,
      answerKey: updated,
    });
  };

  const submitTest = () => {
    // console.log(testData);
    alert("Test Created Successfully!");
    navigate("/admin"); // Redirect back to admin dashboard after submission
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
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
        <p className="text-slate-400 mb-8">Step {step} of 3</p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="testName"
                placeholder="Test Name"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="topic"
                placeholder="Topic"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="subTopic"
                placeholder="Sub Topic"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="number"
                name="duration"
                placeholder="Duration (Minutes)"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <select
                name="difficulty"
                defaultValue="Medium"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <input
                type="number"
                name="noOfQuestions"
                placeholder="Number of Questions"
                className="bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />

              <input
                type="number"
                name="totalMarks"
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

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-5">Upload Question PDF</h2>

            <input
              type="file"
              accept=".pdf"
              className="bg-slate-800 p-4 rounded-xl w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-500 file:text-white file:font-semibold hover:file:bg-purple-600"
              onChange={(e) =>
                setTestData({
                  ...testData,
                  pdf: e.target.files?.[0] || null,
                })
              }
            />

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-slate-700 hover:bg-slate-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Back
              </button>

              <button
                onClick={generateAnswerKey}
                className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Answer Key Setup</h2>

            <div className="max-h-[600px] overflow-y-auto pr-2">
              {testData.answerKey.map((question, index) => (
                <div key={index} className="bg-slate-800 p-5 rounded-2xl mb-4">
                  <h3 className="font-semibold mb-3">
                    Question {question.questionNo}
                  </h3>

                  <select
                    value={question.type}
                    onChange={(e) => updateQuestionType(index, e.target.value)}
                    className="bg-slate-700 p-3 rounded-xl w-full mb-3 outline-none"
                  >
                    <option value="single">Single Correct</option>
                    <option value="multiple">Multiple Correct</option>
                    <option value="numerical">Numerical</option>
                    <option value="decimal">Decimal</option>
                  </select>

                  <input
                    type="text"
                    value={question.answer}
                    placeholder={
                      question.type === "single"
                        ? "Example: A"
                        : question.type === "multiple"
                          ? "Example: A,C,D"
                          : "Enter Answer"
                    }
                    onChange={(e) => updateAnswer(index, e.target.value)}
                    className="bg-slate-700 p-3 rounded-xl w-full outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-slate-700 hover:bg-slate-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Back
              </button>

              <button
                onClick={submitTest}
                className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Create Test
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};