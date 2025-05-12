import { ReactNode } from "react";

export interface Project {
  name: string;
  description: string;
  Icon: React.ElementType;
  href: string;
  cta: string;
  className: string;
  background: ReactNode;
  terminalOutput: {
    type: "typing" | "animated";
    content: string;
    delay?: number;
    color?: string; // optional color class like "text-green-500"
  }[];
}

export type Skill = {
  name: string;
  proficiency: number;
  color: string;
  icon: string;
  description: string;
};
