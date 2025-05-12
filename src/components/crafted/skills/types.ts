export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface SkillsMap {
  [category: string]: Skill[];
}

export interface TerminalHistoryItem {
  type: "input" | "output";
  text: string;
}

export interface BSTNode {
  value: Skill;
  left: BSTNode | null;
  right: BSTNode | null;
}

export type CommandHandler = (
  command: string,
  history: TerminalHistoryItem[],
  selectedCategory?: string
) => TerminalHistoryItem[];
