import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import sampleTestPDF from "../../assets/sample.pdf";

// single ans, multiple choice, integer, decimal (range),
const questions = [
  {
    id: 1,
    type: "single",
    answer: "B",
  },
  {
    id: 2,
    type: "multiple",
    answer: ["A", "C"],
  },
  {
    id: 3,
    type: "numerical",
    answer: "25",
  },
  {
    id: 4,
    type: "decimal",
    answer: "3.14",
  },
  {
    id: 5,
    type: "single",
    answer: "D",
  },
];
export const TestPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const test = (location.state as any)?.test;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>(
    {},
  );
  const selectedAnswersRef = useRef<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState<number>(() =>
    parseDurationToSeconds(test?.duration),
  );
  const intervalRef = useRef<number | null>(null);

  const handleOptionChange = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev, [questionId]: option };
      selectedAnswersRef.current = next;
      return next;
    });
  };

  const handleSubmit = () => {
    let marks = 0;
    const answers = selectedAnswersRef.current;

    questions.forEach((q) => {
      // SINGLE CORRECT
      if (q.type === "single") {
        if (answers[q.id] === q.answer) {
          marks++;
        }
      }

      // MULTIPLE CORRECT
      else if (q.type === "multiple") {
        const selected = answers[q.id] || [];
        const correct = q.answer;

        const isCorrect =
          selected.length === correct.length &&
          selected.every((ans: string) => correct.includes(ans));

        if (isCorrect) {
          marks++;
        }
      }

      // NUMERICAL & DECIMAL
      else {
        if (String(answers[q.id]).trim() === String(q.answer).trim()) {
          marks++;
        }
      }
    });

    setScore(marks);
    setSubmitted(true);
  };

  useEffect(() => {
    const total = parseDurationToSeconds(test?.duration);
    setRemaining(total);

    if (submitted) return;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          // time up: submit once and clear interval
          if (!submitted) handleSubmit();
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, submitted]);

  function parseDurationToSeconds(duration?: string): number {
    if (!duration) return 60 * 60; // default 1 hour
    const s = duration.toLowerCase();
    const numMatch = s.match(/[\d.]+/);
    const num = numMatch ? parseFloat(numMatch[0]) : NaN;
    if (isNaN(num)) return 60 * 60;
    if (s.includes("hour")) return Math.round(num * 3600);
    if (s.includes("min")) return Math.round(num * 60);
    // fallback: treat as minutes
    return Math.round(num * 60);
  }

  function formatTime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {test?.title ? `${test.title}` : `Test #${id}`}
          </h1>
          {test && (
            <p className="text-slate-400">
              {test.subject} • {test.duration} • {test.questions} questions
            </p>
          )}
        </div>

        <div className="text-right px-4 py-2 rounded-2xl ml-auto">
          <div className="text-sm text-slate-400">Time Left</div>
          <div className="text-2xl font-bold">{formatTime(remaining)}</div>
          {remaining <= 60 && (
            <div className="text-rose-400 font-semibold mt-1">
              Hurry up! Less than 1 minute left.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* PDF Section */}
        <div className="bg-slate-800 rounded-3xl p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Question PDF</h2>

          <iframe
            src={sampleTestPDF}
            title="Test PDF"
            className="w-full h-[950px] rounded-2xl"
          />
        </div>

        {/* Questions Section */}
        <div className="bg-slate-800 rounded-3xl p-6 lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Answer Questions</h2>

          {questions.map((q) => (
            <div key={q.id} className="mb-5 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-6 flex-wrap">
                {/* Question Number */}
                <span className="font-bold text-lg w-8">{q.id}.</span>

                {/* SINGLE CORRECT */}
                {q.type === "single" &&
                  ["A", "B", "C", "D"].map((label) => (
                    <label
                      key={label}
                      className={`px-4 py-2 rounded-xl cursor-pointer border
                        ${
                          selectedAnswers[q.id] === label
                            ? "bg-purple-500 border-purple-500"
                            : "bg-slate-700 border-slate-600"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={label}
                        checked={selectedAnswers[q.id] === label}
                        onChange={() => handleOptionChange(q.id, label)}
                        className="hidden"
                        disabled={submitted}
                      />

                      {label}
                    </label>
                  ))}

                {/* MULTIPLE CORRECT */}
                {q.type === "multiple" &&
                  ["A", "B", "C", "D"].map((label) => (
                    <label
                      key={label}
                      className={`px-4 py-2 rounded-xl cursor-pointer border
                        ${
                          selectedAnswers[q.id]?.includes(label)
                            ? "bg-green-500 border-green-500"
                            : "bg-slate-700 border-slate-600"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedAnswers[q.id]?.includes(label) || false
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;

                          setSelectedAnswers((prevAnswers) => {
                            const prev = prevAnswers[q.id] || [];
                            const next = {
                              ...prevAnswers,
                              [q.id]: checked
                                ? [...prev, label]
                                : prev.filter((x: string) => x !== label),
                            };
                            selectedAnswersRef.current = next;
                            return next;
                          });
                        }}
                        className="hidden"
                        disabled={submitted}
                      />

                      {label}
                    </label>
                  ))}

                {/* NUMERICAL INTEGER */}
                {q.type === "numerical" && (
                  <input
                    type="number"
                    step="1"
                    placeholder="Enter integer answer"
                    value={selectedAnswers[q.id] || ""}
                    onChange={(e) => handleOptionChange(q.id, e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 outline-none"
                    disabled={submitted}
                  />
                )}

                {/* DECIMAL INPUT */}
                {q.type === "decimal" && (
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter decimal answer"
                    value={selectedAnswers[q.id] || ""}
                    onChange={(e) => handleOptionChange(q.id, e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 outline-none"
                    disabled={submitted}
                  />
                )}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-2xl font-semibold mt-6"
            >
              Submit Test
            </button>
          ) : (
            <div className="bg-slate-700 p-5 rounded-2xl text-center mt-6">
              <h2 className="text-3xl font-bold text-green-400">
                Your Score: {score}/{questions.length}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
