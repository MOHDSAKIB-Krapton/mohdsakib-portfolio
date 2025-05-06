"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "@/components/magicui/terminal";
import { IconCloud } from "@/components/magicui/icon-cloud";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: string; text: string }>
  >([
    { type: "input", text: "skills --list-categories" },
    {
      type: "output",
      text: "Available skill categories: frontend, backend, database, tools, languages",
    },
  ]);

  // Binary search tree representation of skill proficiency (for educational purposes)
  const [bstVisualization, setBstVisualization] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<number | null>(null);

  // Define skills by category (representing a hash map data structure)
  const skillsMap = {
    frontend: [
      { name: "React", icon: "react", level: 90 },
      { name: "Next.js", icon: "nextdotjs", level: 85 },
      { name: "TypeScript", icon: "typescript", level: 88 },
      { name: "Tailwind CSS", icon: "tailwindcss", level: 92 },
      { name: "JavaScript", icon: "javascript", level: 95 },
      { name: "HTML5", icon: "html5", level: 98 },
      { name: "CSS3", icon: "css3", level: 90 },
      { name: "Redux", icon: "redux", level: 82 },
      { name: "Vue.js", icon: "vuedotjs", level: 75 },
      { name: "Sass", icon: "sass", level: 85 },
    ],
    backend: [
      { name: "Node.js", icon: "nodedotjs", level: 88 },
      { name: "Express", icon: "express", level: 85 },
      { name: "Python", icon: "python", level: 80 },
      { name: "Django", icon: "django", level: 75 },
      { name: "GraphQL", icon: "graphql", level: 78 },
      { name: "REST API", icon: "openapi", level: 90 },
      { name: "NestJS", icon: "nestjs", level: 70 },
      { name: "Spring Boot", icon: "spring", level: 65 },
    ],
    database: [
      { name: "MongoDB", icon: "mongodb", level: 85 },
      { name: "PostgreSQL", icon: "postgresql", level: 82 },
      { name: "MySQL", icon: "mysql", level: 80 },
      { name: "Redis", icon: "redis", level: 75 },
      { name: "Firebase", icon: "firebase", level: 88 },
      { name: "Supabase", icon: "supabase", level: 78 },
    ],
    tools: [
      { name: "Git", icon: "git", level: 95 },
      { name: "Docker", icon: "docker", level: 80 },
      { name: "AWS", icon: "amazonaws", level: 78 },
      { name: "Jenkins", icon: "jenkins", level: 70 },
      { name: "GitHub", icon: "github", level: 92 },
      { name: "VSCode", icon: "visualstudiocode", level: 95 },
      { name: "Figma", icon: "figma", level: 75 },
    ],
    languages: [
      { name: "JavaScript", icon: "javascript", level: 95 },
      { name: "TypeScript", icon: "typescript", level: 88 },
      { name: "Python", icon: "python", level: 80 },
      { name: "Java", icon: "java", level: 70 },
      { name: "C++", icon: "cplusplus", level: 65 },
      { name: "Rust", icon: "rust", level: 60 },
    ],
  };

  // Create a BST from selected category skills for visualization
  // This is for educational purposes to show BST data structure
  const createBST = () => {
    if (!selectedCategory) return null;

    // Sort skills by level to create a balanced BST
    const sortedSkills = [...skillsMap[selectedCategory]].sort(
      (a, b) => a.level - b.level
    );

    // Helper function to create BST recursively
    const buildBST = (skills, start, end) => {
      if (start > end) return null;

      // Find middle element as root
      const mid = Math.floor((start + end) / 2);
      const node = {
        value: skills[mid],
        left: buildBST(skills, start, mid - 1),
        right: buildBST(skills, mid + 1, end),
      };

      return node;
    };

    return buildBST(sortedSkills, 0, sortedSkills.length - 1);
  };

  // List of all skill categories
  const categories = Object.keys(skillsMap);

  // Handle skill category selection via terminal command
  const handleTerminalCommand = (command: string) => {
    // Process the command - demonstrating command pattern in CS
    const newHistory = [...terminalHistory, { type: "input", text: command }];

    if (command.startsWith("skills --show")) {
      const category = command.replace("skills --show ", "").trim();
      if (skillsMap[category]) {
        setSelectedCategory(category);
        setBstVisualization(false); // Reset BST visualization when changing category

        // O(n) operation - listing all skills in category (demonstrating time complexity)
        const skillsList = skillsMap[category]
          .map((skill) => `${skill.name} (${skill.level}%)`)
          .join(", ");

        newHistory.push({
          type: "output",
          text: `Displaying ${category} skills: ${skillsList}`,
        });
      } else {
        newHistory.push({
          type: "output",
          text: `Error: Category '${category}' not found. Available categories: ${categories.join(
            ", "
          )}`,
        });
      }
    } else if (command === "skills --list-categories") {
      newHistory.push({
        type: "output",
        text: `Available skill categories: ${categories.join(", ")}`,
      });
    } else if (command === "skills --help") {
      newHistory.push({
        type: "output",
        text:
          "Available commands:\n" +
          "  skills --list-categories   List all skill categories\n" +
          "  skills --show <category>   Display skills for specified category\n" +
          "  skills --bst-view          Visualize skills as a Binary Search Tree\n" +
          "  skills --search <level>    Search for skills at specified proficiency level\n" +
          "  skills --sort              Sort skills by proficiency (demonstrates quicksort)\n" +
          "  clear                      Clear terminal history\n" +
          "  skills --help              Show this help message",
      });
    } else if (command === "skills --bst-view") {
      if (selectedCategory) {
        setBstVisualization(true);
        newHistory.push({
          type: "output",
          text: `Visualizing ${selectedCategory} skills as a Binary Search Tree (BST). Skills are organized by proficiency level.`,
        });
      } else {
        newHistory.push({
          type: "output",
          text: `Error: Please select a category first using 'skills --show <category>'`,
        });
      }
    } else if (command.startsWith("skills --search")) {
      const levelStr = command.replace("skills --search ", "").trim();
      const level = parseInt(levelStr);

      if (isNaN(level) || level < 0 || level > 100) {
        newHistory.push({
          type: "output",
          text: `Error: Please provide a valid proficiency level between 0-100.`,
        });
      } else if (!selectedCategory) {
        newHistory.push({
          type: "output",
          text: `Error: Please select a category first using 'skills --show <category>'`,
        });
      } else {
        setSearchValue(level);
        // Binary search implementation for educational purposes
        const sortedSkills = [...skillsMap[selectedCategory]].sort(
          (a, b) => a.level - b.level
        );

        // Binary search algorithm
        let left = 0;
        let right = sortedSkills.length - 1;
        let found = false;
        let steps = 0;
        let closestSkill = null;
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

        if (found) {
          newHistory.push({
            type: "output",
            text: `Found exact match! Skill with proficiency level ${level}% found in ${steps} steps using binary search.`,
          });
        } else if (closestSkill) {
          newHistory.push({
            type: "output",
            text: `No exact match found. Closest skill: ${closestSkill.name} (${closestSkill.level}%) found in ${steps} steps using binary search.`,
          });
        }
      }
    } else if (command === "skills --sort") {
      if (!selectedCategory) {
        newHistory.push({
          type: "output",
          text: `Error: Please select a category first using 'skills --show <category>'`,
        });
      } else {
        // Demonstration of quicksort algorithm for educational purposes
        const skills = [...skillsMap[selectedCategory]];

        // Quicksort implementation (for visualization/education)
        const quicksortSteps = [];

        const quickSort = (arr, low, high) => {
          if (low < high) {
            // Record the state
            quicksortSteps.push([...arr]);

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

        const sortedSkills = quickSort(skills, 0, skills.length - 1);

        // Output the sorted result
        const sortedList = sortedSkills
          .map((skill) => `${skill.name} (${skill.level}%)`)
          .join(", ");

        newHistory.push({
          type: "output",
          text: `Skills sorted by proficiency using Quicksort algorithm (O(n log n) time complexity):\n${sortedList}`,
        });
      }
    } else if (command === "clear") {
      setTerminalHistory([]);
      return;
    } else {
      newHistory.push({
        type: "output",
        text: `Command not recognized. Type 'skills --help' for available commands.`,
      });
    }

    setTerminalHistory(newHistory);
  };

  // Get all skills icons for the cloud visualization
  const allSkillIcons = Object.values(skillsMap)
    .flat()
    .map((skill) => skill.icon);

  // BST Visualization Component
  const BSTVisualization = ({ bst }) => {
    if (!bst)
      return (
        <div className="text-center text-gray-400">
          Select a category to visualize BST
        </div>
      );

    const renderNode = (node, x, y, level) => {
      if (!node) return null;

      const nodeSize = 40;
      const horizontalSpacing = 120 / level;

      return (
        <>
          {/* Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: level * 0.2 }}
            className={`absolute rounded-full flex items-center justify-center w-${nodeSize} h-${nodeSize}`}
            style={{
              left: `${x}%`,
              top: `${y}px`,
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              transform: "translate(-50%, -50%)",
              backgroundColor:
                searchValue && Math.abs(node.value.level - searchValue) < 5
                  ? "#3b82f6"
                  : "#1e293b",
              border: "2px solid",
              borderColor:
                searchValue && Math.abs(node.value.level - searchValue) < 5
                  ? "#60a5fa"
                  : "#475569",
              zIndex: 10,
            }}
          >
            <span className="text-xs font-bold">{node.value.level}</span>
          </motion.div>

          {/* Value tooltip */}
          <div
            className="absolute text-xs bg-gray-800 px-2 py-1 rounded opacity-80"
            style={{
              left: `${x}%`,
              top: `${y + nodeSize / 2 + 5}px`,
              transform: "translate(-50%, 0)",
              zIndex: 5,
            }}
          >
            {node.value.name}
          </div>

          {/* Lines to children */}
          {node.left && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: level * 0.2 + 0.1 }}
                className="absolute bg-gray-600"
                style={{
                  left: `${x - horizontalSpacing / 2}%`,
                  top: `${y}px`,
                  width: `${horizontalSpacing}%`,
                  height: "1px",
                  transform: "translate(-100%, 0)",
                }}
              />
              {renderNode(node.left, x - horizontalSpacing, y + 60, level + 1)}
            </>
          )}

          {node.right && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: level * 0.2 + 0.1 }}
                className="absolute bg-gray-600"
                style={{
                  left: `${x}%`,
                  top: `${y}px`,
                  width: `${horizontalSpacing}%`,
                  height: "1px",
                }}
              />
              {renderNode(node.right, x + horizontalSpacing, y + 60, level + 1)}
            </>
          )}
        </>
      );
    };

    return (
      <div className="relative h-full w-full">
        <div className="absolute top-4 left-0 right-0 text-center text-sm text-blue-400">
          Binary Search Tree by Skill Proficiency Level
        </div>

        <div className="relative h-full w-full">
          {renderNode(bst, 50, 60, 1)}
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
          BST allows O(log n) search complexity for finding skills by
          proficiency level
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">Technical Skills</h2>
          <div className="w-24 h-1 mx-auto bg-blue-500 rounded"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Explore my technical skillset through interactive computer science
            visualizations. Use the terminal below to query skills and learn
            about data structures and algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Terminal for skill exploration */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">
                  skills-terminal
                </div>
              </div>

              <div className="p-4">
                {/* <Terminal
                  history={terminalHistory}
                  prompt="user@portfolio:~$"
                  onSubmit={handleTerminalCommand}
                  className="h-96 text-sm"
                              
                              >
                                  
                </Terminal> */}
              </div>

              {/* Educational note about data structures and algorithms */}
              <div className="p-4 bg-blue-900/20 border-t border-blue-800/50">
                <h4 className="text-blue-400 font-medium text-sm mb-1">
                  Computer Science Concepts
                </h4>
                <p className="text-xs text-gray-400">
                  This skills explorer implements multiple CS concepts: • Hash
                  Maps: O(1) lookup time for skill categories • Binary Search
                  Trees: O(log n) search for skills by level • Quicksort: O(n
                  log n) sorting algorithm for skill levels • Command Pattern:
                  Encapsulates terminal commands as objects
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Icon cloud visualization or BST visualization */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 p-6 h-full">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setBstVisualization(!bstVisualization)}
                  disabled={!selectedCategory}
                  className={`text-xs px-3 py-1 rounded ${
                    !selectedCategory
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                  }`}
                >
                  {bstVisualization
                    ? "Show Icon Cloud"
                    : "Show BST Visualization"}
                </button>
              </div>

              <div className="h-96">
                {bstVisualization ? (
                  <BSTVisualization bst={createBST()} />
                ) : (
                  <IconCloud
                    icons={
                      selectedCategory
                        ? skillsMap[selectedCategory].map((s) => s.icon)
                        : allSkillIcons
                    }
                    // bgColor="transparent"
                    //   images={}
                    // config={{
                    //   depth: 1.5,
                    //   imageScale: 1.5,
                    //   activeCursor: "pointer",
                    //   bgColor: "transparent",
                    //   bgOutlineThickness: 0,
                    //   bgRadius: 0,
                    //   clickToFront: 500,
                    //   decel: 0.95,
                    //   depth: 0.5,
                    //   dragControl: true,
                    //   dragThreshold: 4,
                    //   fadeIn: 500,
                    //   freezeActive: false,
                    //   freezeDecel: false,
                    //   maxSpeed: 0.05,
                    //   minBrightness: 0.1,
                    //   minContrast: 0.2,
                    //   minSpeed: 0.01,
                    //   noMouse: false,
                    //   outlineColour: "#0000",
                    //   outlineDash: 0,
                    //   outlineThickness: 0,
                    //   pingAnimationTime: 3000,
                    //   pinchZoom: true,
                    //   pulsateTime: 3000,
                    //   radiusX: 1,
                    //   radiusY: 1,
                    //   radiusZ: 1,
                    //   repeat: 0,
                    //   reverse: true,
                    //   shadow: "#000",
                    //   shadowBlur: 0,
                    //   shadowOffset: [0, 0],
                    //   shuffleTags: true,
                    //   splitWidth: 0,
                    //   stretchX: 1,
                    //   stretchY: 1,
                    //   textColour: "#fff",
                    //   textFont: "Roboto, sans-serif",
                    //   textHeight: 15,
                    //   textVAlign: "center",
                    //   tooltipClass: "tctooltip",
                    //   tooltipDelay: 0,
                    //   txtOpt: true,
                    //   txtScale: 2,
                    //   weight: true,
                    //   weightFrom: "data-weight",
                    //   weightSize: 1,
                    //   wheelZoom: true
                    // }}
                  />
                )}
              </div>

              {/* Skill proficiency legend (only visible when a category is selected) */}
              {selectedCategory && !bstVisualization && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm text-gray-300 mb-2">
                    Proficiency Levels:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsMap[selectedCategory]
                      .sort((a, b) => b.level - a.level)
                      .map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-md text-xs"
                        >
                          <span>{skill.name}</span>
                          <div className="w-16 bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Computer Science Educational Section */}
        <div className="mt-16 bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4">
            Computer Science Concepts in This Section
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 font-medium">Hash Maps</h4>
                <p className="text-sm text-gray-400">
                  Skills are organized in a hash map data structure where
                  categories serve as keys for O(1) constant time lookups. This
                  enables instant access to any skill category regardless of how
                  many categories exist.
                </p>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium">
                  Binary Search Trees (BST)
                </h4>
                <p className="text-sm text-gray-400">
                  Skills are visualized as a balanced BST ordered by proficiency
                  level. This enables O(log n) search efficiency when looking
                  for skills at specific proficiency levels.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 font-medium">
                  Sorting Algorithms
                </h4>
                <p className="text-sm text-gray-400">
                  The terminal implements quicksort (O(n log n)) to efficiently
                  sort skills by proficiency level. This demonstrates
                  divide-and-conquer algorithms common in computer science.
                </p>
              </div>

              <div>
                <h4 className="text-blue-400 font-medium">Command Pattern</h4>
                <p className="text-sm text-gray-400">
                  The terminal uses the Command design pattern, encapsulating
                  each command as a separate operation. This allows for easy
                  extension of command functionality while maintaining clean
                  separation of concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
