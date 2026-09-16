import React, { useState } from "react";
import { Subject, Chapter } from "./types";
import { ChapterList } from "./ChapterList";
import { ChapterResources } from "./ChapterResources";

const subjects: { id: Subject; name: string; icon: string; count: number }[] = [
  { id: "Physics", name: "Physics", icon: "⚡", count: 4 },
  { id: "Chemistry", name: "Chemistry", icon: "🧪", count: 2 },
  { id: "Mathematics", name: "Mathematics", icon: "📐", count: 2 },
  { id: "Biology", name: "Biology", icon: "🧬", count: 2 },
];

export const SubjectDetails: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Step 3: Show Chapter details (All / Notes / Test / DPP)
  if (selectedSubject && selectedChapter) {
    return (
      <ChapterResources
        subject={selectedSubject}
        chapter={selectedChapter}
        onBack={() => setSelectedChapter(null)}
      />
    );
  }

  // Step 2: Show list of chapters for chosen subject
  if (selectedSubject) {
    return (
      <ChapterList
        subject={selectedSubject}
        onSelectChapter={(chap) => setSelectedChapter(chap)}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  // Step 1: Pick Subject
  return (
    <div className="p-4 sm:p-6">
      <header className="mb-8 rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-400">
          Practice by subject
        </p>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Chapter Tests 📚
        </h1>
        <p className="text-base text-slate-400 sm:text-lg">
          Select a subject to browse chapters and resources.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {subjects.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedSubject(item.id)}
            className="group flex min-h-56 flex-col items-start justify-between rounded-3xl border border-slate-700 bg-slate-800 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-purple-950/30"
          >
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
            <span>
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
              <p className="mt-2 text-sm text-slate-400">
                {item.count} chapters available
              </p>
            </span>
            <span className="mt-5 text-sm font-semibold text-purple-400 group-hover:text-purple-300">
              Browse chapters →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
