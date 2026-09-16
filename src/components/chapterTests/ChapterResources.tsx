import React, { useState } from "react";
import { Subject, Chapter, TabType } from "./types";

interface ChapterResourcesProps {
  subject: Subject;
  chapter: Chapter;
  onBack: () => void;
}

const tabs: TabType[] = ["Notes", "DPP", "Test"];

export const ChapterResources: React.FC<ChapterResourcesProps> = ({
  subject,
  chapter,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("Notes");

  const filteredItems = chapter.items.filter((item) => item.type === activeTab);

  return (
    <div className="p-4 sm:p-6">
      {/* Top Header & Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">
        <button
          onClick={onBack}
          className="rounded-2xl border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-500 hover:text-white"
        >
          ← Back to Chapters
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            {subject} chapter
          </p>
          <h1 className="text-3xl font-bold text-white">{chapter.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{chapter.description}</p>
        </div>
      </div>

      {/* Switcher Bar: Notes, DPP, Test */}
      <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-800 p-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-950/30"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Filtered Item Cards */}
      <div className="grid gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-slate-700 bg-slate-800 p-5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      item.type === "Test"
                        ? "bg-red-500/15 text-red-300"
                        : item.type === "Notes"
                          ? "bg-green-500/15 text-green-300"
                          : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{item.details}</p>
              </div>

              <button className="w-full rounded-2xl bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600 sm:w-auto">
                {item.type === "Test" ? "Start Test" : "Open"}
              </button>
            </div>
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-700 py-12 text-center text-slate-400">
            No items under "{activeTab}" for this chapter.
          </p>
        )}
      </div>
    </div>
  );
};
