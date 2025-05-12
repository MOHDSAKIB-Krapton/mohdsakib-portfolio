// algorithms.ts
import { Skill, BSTNode } from "./types";

/**
 * Creates a balanced Binary Search Tree from skills sorted by level
 * @param skills Array of skills to create BST from
 * @returns Root node of the BST
 */
export const createBalancedBST = (skills: Skill[]): BSTNode | null => {
  // Sort skills by level to create a balanced BST
  const sortedSkills = [...skills].sort((a, b) => a.level - b.level);
  return buildBST(sortedSkills, 0, sortedSkills.length - 1);
};

/**
 * Helper function to recursively build a BST
 */
const buildBST = (
  skills: Skill[],
  start: number,
  end: number
): BSTNode | null => {
  if (start > end) return null;

  // Find middle element as root
  const mid = Math.floor((start + end) / 2);
  const node: BSTNode = {
    value: skills[mid],
    left: buildBST(skills, start, mid - 1),
    right: buildBST(skills, mid + 1, end),
  };

  return node;
};

/**
 * Binary search for a skill by proficiency level
 * Returns closest match and search steps
 */
export const binarySearchSkill = (
  skills: Skill[],
  level: number
): { closestSkill: Skill | null; found: boolean; steps: number } => {
  const sortedSkills = [...skills].sort((a, b) => a.level - b.level);

  let left = 0;
  let right = sortedSkills.length - 1;
  let found = false;
  let steps = 0;
  let closestSkill: Skill | null = null;
  let minDiff = 101; // More than the maximum possible difference

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    const midSkill = sortedSkills[mid];

    // Find closest skill even if exact match not found
    const diff = Math.abs(midSkill.level - level);
    if (diff < minDiff) {
      minDiff = diff;
      closestSkill = midSkill;
    }

    if (midSkill.level === level) {
      found = true;
      break;
    } else if (midSkill.level < level) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return { closestSkill, found, steps };
};

/**
 * Implementation of Quicksort algorithm for educational purposes
 * Returns sorted skills and steps of the algorithm
 */
export const quicksortWithSteps = (
  skills: Skill[]
): { sortedSkills: Skill[]; steps: Skill[][] } => {
  const skillsCopy = [...skills];
  const steps: Skill[][] = [];

  const quickSort = (arr: Skill[], low: number, high: number): Skill[] => {
    if (low < high) {
      // Record the state
      steps.push([...arr]);

      // Partition the array
      const pivot = arr[high].level;
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j].level <= pivot) {
          i++;
          // Swap
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      // Swap the pivot element
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

      const partitionIndex = i + 1;

      // Recursively sort elements before and after partition
      quickSort(arr, low, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, high);
    }
    return arr;
  };

  const sortedSkills = quickSort(skillsCopy, 0, skillsCopy.length - 1);
  return { sortedSkills, steps };
};
