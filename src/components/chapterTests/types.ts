// types.ts
export type Subject = "Physics" | "Chemistry" | "Mathematics" | "Biology";
export type TabType = "Notes" | "DPP" | "Test";

export interface ResourceItem {
  id: string;
  title: string;
  type: "Notes" | "Test" | "DPP";
  details: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  items: ResourceItem[];
}
