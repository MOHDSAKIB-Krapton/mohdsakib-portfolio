// TerminalCommands.ts
import { CommandHandler, TerminalHistoryItem } from "./types";
import { skillsMap, categories } from "./skillsData";
import { binarySearchSkill, quicksortWithSteps } from "./algorithm";

// Helper function to add output to terminal history
const addOutput = (
  history: TerminalHistoryItem[],
  text: string
): TerminalHistoryItem[] => {
  return [...history, { type: "output", text }];
};

// Command: List all skill categories
export const listCategories: CommandHandler = (command, history) => {
  return addOutput(
    history,
    `Available skill categories: ${categories.join(", ")}`
  );
};

// Command: Show skills for a specific category
export const showCategory: CommandHandler = (command, history) => {
  const category = command.replace("skills --show ", "").trim();

  if (skillsMap[category]) {
    // O(n) operation - listing all skills in category (demonstrating time complexity)
    const skillsList = skillsMap[category]
      .map((skill) => `${skill.name} (${skill.level}%)`)
      .join(", ");

    return addOutput(history, `Displaying ${category} skills: ${skillsList}`);
  } else {
    return addOutput(
      history,
      `Error: Category '${category}' not found. Available categories: ${categories.join(
        ", "
      )}`
    );
  }
};

// Command: Show help menu
export const showHelp: CommandHandler = (command, history) => {
  return addOutput(
    history,
    "Available commands:\n" +
      "  skills --list-categories   List all skill categories\n" +
      "  skills --show <category>   Display skills for specified category\n" +
      "  skills --bst-view          Visualize skills as a Binary Search Tree\n" +
      "  skills --search <level>    Search for skills at specified proficiency level\n" +
      "  skills --sort              Sort skills by proficiency (demonstrates quicksort)\n" +
      "  clear                      Clear terminal history\n" +
      "  skills --help              Show this help message"
  );
};

// Command: View skills as Binary Search Tree
export const viewBST: CommandHandler = (command, history) => {
  // This command needs to know the selected category from the parent component
  // It will return a message indicating success or failure
  // The actual BST visualization is handled by the component
  return addOutput(
    history,
    `Visualizing skills as a Binary Search Tree (BST). Skills are organized by proficiency level.`
  );
};

// Command: Search for skills at specified proficiency level
export const searchSkills: CommandHandler = (
  command,
  history,
  selectedCategory?: string
) => {
  const levelStr = command.replace("skills --search ", "").trim();
  const level = parseInt(levelStr);

  if (isNaN(level) || level < 0 || level > 100) {
    return addOutput(
      history,
      `Error: Please provide a valid proficiency level between 0-100.`
    );
  } else if (!selectedCategory) {
    return addOutput(
      history,
      `Error: Please select a category first using 'skills --show <category>'`
    );
  }

  // Binary search implementation for educational purposes
  const { closestSkill, found, steps } = binarySearchSkill(
    skillsMap[selectedCategory],
    level
  );

  if (found && closestSkill) {
    return addOutput(
      history,
      `Found exact match! Skill with proficiency level ${level}% found in ${steps} steps using binary search.`
    );
  } else if (closestSkill) {
    return addOutput(
      history,
      `No exact match found. Closest skill: ${closestSkill.name} (${closestSkill.level}%) found in ${steps} steps using binary search.`
    );
  }

  return history;
};

// Command: Sort skills by proficiency using Quicksort
export const sortSkills: CommandHandler = (
  command,
  history,
  selectedCategory?: string
) => {
  if (!selectedCategory) {
    return addOutput(
      history,
      `Error: Please select a category first using 'skills --show <category>'`
    );
  }

  // Demonstration of quicksort algorithm for educational purposes
  const { sortedSkills } = quicksortWithSteps(skillsMap[selectedCategory]);

  // Output the sorted result
  const sortedList = sortedSkills
    .map((skill) => `${skill.name} (${skill.level}%)`)
    .join(", ");

  return addOutput(
    history,
    `Skills sorted by proficiency using Quicksort algorithm (O(n log n) time complexity):\n${sortedList}`
  );
};

// Process command and route to appropriate handler
export const processCommand = (
  command: string,
  history: TerminalHistoryItem[],
  selectedCategory: string | null,
  setBstVisualization: (show: boolean) => void
): TerminalHistoryItem[] => {
  // Add the command to history first
  let newHistory: TerminalHistoryItem[] = [
    ...history,
    { type: "input", text: command },
  ];

  // Process clear command separately as it doesn't add output
  if (command === "clear") {
    return [];
  }

  // Route command to appropriate handler
  if (command === "skills --list-categories") {
    return listCategories(command, newHistory);
  } else if (command.startsWith("skills --show ")) {
    return showCategory(command, newHistory);
  } else if (command === "skills --help") {
    return showHelp(command, newHistory);
  } else if (command === "skills --bst-view") {
    if (selectedCategory) {
      setBstVisualization(true);
      return viewBST(command, newHistory);
    } else {
      return addOutput(
        newHistory,
        `Error: Please select a category first using 'skills --show <category>'`
      );
    }
  } else if (command.startsWith("skills --search ")) {
    return searchSkills(command, newHistory, selectedCategory || undefined);
  } else if (command === "skills --sort") {
    return sortSkills(command, newHistory, selectedCategory || undefined);
  } else {
    return addOutput(
      newHistory,
      `Command not recognized. Type 'skills --help' for available commands.`
    );
  }
};
