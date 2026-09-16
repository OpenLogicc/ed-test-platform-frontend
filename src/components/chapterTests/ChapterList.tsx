import React from "react";
import { Subject, Chapter } from "./types";

// Mock data structured by subject -> chapters -> items
export const subjectChaptersData: Record<Subject, Chapter[]> = {
  Physics: [
    {
      id: "phy-ch1",
      title: "Kinematics 1D & 2D",
      description: "Motion in a straight line, projectile motion & vectors",
      items: [
        {
          id: "1",
          title: "Complete Formula Sheet",
          type: "Notes",
          details: "PDF • 12 Pages",
        },
        {
          id: "2",
          title: "Kinematics Speed Test",
          type: "Test",
          details: "25 Questions • 45 Mins",
        },
        {
          id: "3",
          title: "DPP 01: Projectile Motion",
          type: "DPP",
          details: "15 Practice Questions",
        },
      ],
    },
    {
      id: "phy-ch2",
      title: "Laws of Motion",
      description: "Newton’s laws, friction, and circular dynamics",
      items: [
        {
          id: "4",
          title: "FBD & Friction Notes",
          type: "Notes",
          details: "PDF • 8 Pages",
        },
        {
          id: "5",
          title: "NLM Chapter Quiz",
          type: "Test",
          details: "30 Questions • 60 Mins",
        },
      ],
    },
    {
      id: "phy-ch3",
      title: "Work, Power & Energy",
      description: "Work-energy theorem, potential energy, and collisions",
      items: [
        {
          id: "6",
          title: "DPP 01: Work Energy Theorem",
          type: "DPP",
          details: "10 Practice Questions",
        },
      ],
    },
  ],
  Chemistry: [
    {
      id: "chem-ch1",
      title: "Structure of Atom",
      description: "Bohr model, quantum numbers, and electron configuration",
      items: [
        {
          id: "7",
          title: "Quantum Numbers Revision",
          type: "Notes",
          details: "PDF • 5 Pages",
        },
        {
          id: "8",
          title: "Atomic Theory Mock Test",
          type: "Test",
          details: "20 Questions • 30 Mins",
        },
      ],
    },
  ],
  Mathematics: [
    {
      id: "math-ch1",
      title: "Limits & Derivatives",
      description: "Standard limits, continuity, and basic differentiation",
      items: [
        {
          id: "9",
          title: "Limits Formula Sheet",
          type: "Notes",
          details: "PDF • 4 Pages",
        },
        {
          id: "10",
          title: "Calculus DPP 01",
          type: "DPP",
          details: "15 Practice Questions",
        },
      ],
    },
  ],
  Biology: [
    {
      id: "bio-ch1",
      title: "Cell: The Unit of Life",
      description: "Prokaryotes, eukaryotes, and cellular organelles",
      items: [
        {
          id: "11",
          title: "Cell Organelle Diagrams",
          type: "Notes",
          details: "PDF • 10 Pages",
        },
        {
          id: "12",
          title: "Cell Biology Quick Test",
          type: "Test",
          details: "30 Questions • 30 Mins",
        },
      ],
    },
  ],
};

interface ChapterListProps {
  subject: Subject;
  onSelectChapter: (chapter: Chapter) => void;
  onBack: () => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  subject,
  onSelectChapter,
  onBack,
}) => {
  const chapters = subjectChaptersData[subject] || [];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">
        <button
          onClick={onBack}
          className="rounded-2xl border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-500 hover:text-white"
        >
          ← Back to Subjects
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            Subject library
          </p>
          <h1 className="text-3xl font-bold text-white">{subject} Chapters</h1>
        </div>
      </div>

      <div className="grid gap-4">
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className="flex cursor-pointer items-center justify-between gap-5 rounded-3xl border border-slate-700 bg-slate-800 p-5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500 hover:shadow-purple-950/20"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/15 text-sm font-bold text-purple-300">
                    {index + 1}
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    {chapter.title}
                  </h2>
                </div>
                <p className="mt-1 pl-11 text-sm text-slate-400">
                  {chapter.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {chapter.items.length} Resources
                </span>
                <span className="text-purple-400">→</span>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-700 py-12 text-center text-slate-400">
            No chapters available yet.
          </p>
        )}
      </div>
    </div>
  );
};
