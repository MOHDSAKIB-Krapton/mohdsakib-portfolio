"use client";

import { useState } from "react";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { skillsMap, categories, getAllSkillIcons } from "./skillsData";
import { Skill, TerminalHistoryItem } from "./types";
import { processCommand } from "./terminal-commands";
import { Terminal } from "../terminal-history";
import SkillIconShow from "../skill-showcase";
import InfoTag from "@/components/common/infoTag";
import Container from "@/components/common/container/page";

export default function SkillsSection() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bstVisualization, setBstVisualization] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<number | null>(null);

  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>(
    [
      { type: "input", text: "skills --list-categories" },
      {
        type: "output",
        text: `Available skill categories: ${categories.join(", ")}`,
      },
    ]
  );

  const allSkillIcons = getAllSkillIcons();

  const handleTerminalCommand = (command: string) => {
    if (command.startsWith("skills --show ")) {
      const category = command.replace("skills --show ", "").trim();
      if (skillsMap[category]) {
        setSelectedCategory(category);
        setBstVisualization(false);
      }
    } else if (command.startsWith("skills --search ")) {
      const levelStr = command.replace("skills --search ", "").trim();
      const level = parseInt(levelStr);
      if (!isNaN(level) && level >= 0 && level <= 100) {
        setSearchValue(level);
      }
    }

    // Process command and update terminal history
    const newHistory = processCommand(
      command,
      terminalHistory,
      selectedCategory,
      setBstVisualization
    );
    setTerminalHistory(newHistory);
  };

  const selectedIcons: string[] = selectedCategory
    ? skillsMap[selectedCategory].map((skill) => skill.icon)
    : [];

  return (
    <Container>
      <section id="skills" className="">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2 text-white">
              Technical Skills
            </h2>
            <div className="w-24 h-1 mx-auto bg-blue-500 rounded"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Explore my technical skillset through interactive computer science
              visualizations. Use the terminal below to query skills and learn
              about data structures and algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="backdrop-blur-sm bg-black/20 rounded-lg  overflow-hidden">
                <div className="">
                  <Terminal
                    history={terminalHistory}
                    prompt="mohdsakib@portfolio:~$"
                    onSubmit={handleTerminalCommand}
                    className="h-96 text-sm rounded-b-none"
                  />
                </div>

                <InfoTag
                  title="Computer Science Concepts"
                  description="This skills explorer implements multiple CS concepts: • Hash
                  Maps: O(1) lookup time for skill categories • Binary Search
                  Trees: O(log n) search for skills by level • Quicksort: O(n
                  log n) sorting algorithm for skill levels • Command Pattern:
                  Encapsulates terminal commands as objects"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col">
              <div className="flex-1 backdrop-blur-sm bg-black/20 rounded-lg  p-6 h-full">
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
                      : "Show Cloud Visualization"}
                  </button>
                </div>

                <div className="h-96 flex flex-col flex-1">
                  {bstVisualization ? (
                    <SkillIconShow slugs={selectedIcons} />
                  ) : (
                    <IconCloud
                      icons={
                        selectedCategory
                          ? skillsMap[selectedCategory].map((s) => s.icon)
                          : allSkillIcons
                      }
                    />
                  )}
                </div>

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
                            <span className="text-gray-400">
                              {skill.level}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 backdrop-blur-sm bg-black/20 rounded-lg  p-6">
            <h3 className="text-xl font-bold mb-4 text-white">
              Computer Science Concepts in This Section
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoTag
                  title="Hash Maps"
                  description="Hash maps provide O(1) constant time lookup for skills
                  categories. Skills are organized by category for immediate
                  access without having to search through the entire collection,
                  making the UI responsive even with a large number of skills."
                />

                <InfoTag
                  title="Binary Search Trees"
                  description="The BST visualization demonstrates how skills are stored in a
                  balanced binary search tree, enabling O(log n) search
                  complexity when looking for skills by proficiency level. Try
                  searching for skills with the 'skills --search [level]'
                  command."
                />
              </div>

              <div className="space-y-4">
                <InfoTag
                  title="Sorting Algorithms"
                  description="When displaying skills, a quicksort algorithm sorts them by
                  proficiency level in O(n log n) time. This efficient algorithm
                  ensures skills are always displayed in the proper order from
                  highest to lowest proficiency."
                />
                <InfoTag
                  title="Command Pattern"
                  description="The terminal interface implements the Command design pattern,
                  where each command is encapsulated as an object. This creates
                  a clean separation between the command issuer (the terminal)
                  and the command processor, allowing for easy extension with
                  new commands."
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 max-w-[80%] mx-auto">
                These computer science concepts demonstrate not just what I
                know, but how I think about software architecture and algorithm
                implementation. Try the terminal commands to see these concepts
                in action!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
