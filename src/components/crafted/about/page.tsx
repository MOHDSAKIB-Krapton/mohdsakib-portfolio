"use client";

import Container from "@/components/common/container/page";
import { useState } from "react";
import InfoTag from "@/components/common/infoTag";
import { aboutParagraphs, skills } from "@/constants/data";

export default function AboutSection() {
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);

  const generateHash = (text: string) => {
    let hash = "";
    const characters = "0123456789abcdef";

    for (let i = 0; i < 192; i++) {
      const charCode = text.charCodeAt(i % text.length);
      const index = (charCode + i) % 16;
      hash += characters[index];
    }

    return hash;
  };

  const encryptedParagraphs = aboutParagraphs.map((p) => generateHash(p));

  return (
    <Container>
      <section id="about" className=" relative">
        <div className="absolute  top-0 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0  w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2 text-white">About Me</h2>
            <div className="w-24 h-[2px] mx-auto bg-blue-500 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-5">
              <InfoTag
                title="Hash Functions &amp; Encryption"
                description="Hover over the paragraphs above to see a demonstration of
                    text hashing. In cryptography, hash functions like SHA-256
                    convert data of any size into fixed-length strings, creating
                    a unique 'fingerprint' of the information. This is essential
                    for data integrity verification and password storage."
                isHovered={hoveredParagraph !== null}
              />

              {aboutParagraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className="p-4 backdrop-blur-sm bg-black/20 rounded-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredParagraph(index)}
                  onMouseLeave={() => setHoveredParagraph(null)}
                >
                  <p
                    className={`font-mono text-sm transition-all duration-300 ${
                      hoveredParagraph != index
                        ? "text-green-400"
                        : "text-gray-300"
                    }`}
                  >
                    {hoveredParagraph != index ? (
                      <>
                        <span className="text-red-500 text-xs block mb-1 animate-pulse">
                          // SHA-256 Hash (hover to decrypt)
                        </span>
                        <span className="break-all tracking-tight opacity-50">
                          {encryptedParagraphs[index]}
                        </span>
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center">
                <span className="mr-2">Core Expertise</span>
                <span className="text-sm bg-blue-900/30 px-2 py-1 rounded text-blue-300">
                  {skills.length}/{skills.length}
                </span>
              </h3>

              <div className="relative backdrop-blur-sm bg-black/20 p-6 rounded-lg space-y-5">
                <InfoTag
                  title="Linked List Visualization"
                  description="The skills above are displayed as a linked list data
                    structure. In computer science, linked lists consist of
                    nodes where each node contains data and a reference (or
                    'pointer') to the next node in the sequence. This structure
                    allows for efficient insertion and deletion operations."
                />

                <ul className="space-y-6">
                  {skills.map((skill, index) => (
                    <li key={index} className="relative">
                      <div className="flex items-start">
                        <div className="mr-3 font-mono text-xs text-blue-400 pt-1 opacity-70">
                          {index.toString(2).padStart(3, "0")}
                        </div>

                        <div className="flex-1 flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <h4
                              id={`skill-${index}`}
                              className="text-lg font-medium text-white group-hover:text-blue-300 transition"
                            >
                              {skill.name}
                            </h4>
                            <span className="text-blue-400 font-mono">
                              {skill.proficiency}%
                            </span>
                          </div>

                          <div
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={skill.proficiency}
                            className="w-full bg-gray-800 rounded-full h-[6px] overflow-hidden"
                          >
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all ease-in-out duration-1000 delay-100`}
                              style={{
                                width: `${skill.proficiency}%`,
                              }}
                            />
                          </div>

                          <p className="text-xs text-gray-400">
                            {skill.description}
                          </p>
                        </div>
                      </div>

                      {index < skills.length - 1 && (
                        <div className="absolute left-[7px] top-[30px] h-[calc(100%-10px)] w-px bg-gray-700 opacity-50">
                          <div className="absolute top-1/2 -left-1 w-3 h-px bg-gray-700"></div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
