"use client";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { MorphingText } from "@/components/magicui/morphing-text";
import { useState } from "react";

export default function AboutSection() {
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);

  // Original paragraphs
  const paragraphs = [
    "I'm a passionate developer with expertise in full-stack web development, focusing on React, Next.js, and modern JavaScript frameworks. My approach combines clean code with intuitive user experiences.",
    "With a strong foundation in computer science principles, I build scalable and maintainable applications that solve real-world problems while adhering to best practices and design patterns.",
    "Beyond development, I'm dedicated to sharing knowledge and contributing to the community through open-source projects, technical articles, and mentoring aspiring developers.",
  ];

  // Function to generate a SHA-256 like hash (simplified for demo purposes)
  const generateHash = (text: string) => {
    // This is a simplified hash function for demonstration
    // In reality, we'd use a proper crypto library
    let hash = "";
    const characters = "0123456789abcdef";

    // Create a deterministic but random-looking 64-character hex string
    for (let i = 0; i < 64; i++) {
      // Use text content to influence the hash generation
      const charCode = text.charCodeAt(i % text.length);
      const index = (charCode + i) % 16;
      hash += characters[index];
    }

    return hash;
  };

  // Generate encrypted versions of paragraphs
  const encryptedParagraphs = paragraphs.map((p) => generateHash(p));

  // Skills that demonstrate CS knowledge
  const skills = [
    "Algorithms & Data Structures",
    "System Architecture",
    "Database Design",
    "API Development",
    "Web Performance Optimization",
  ];

  return (
    <section id="about" className="py-24 bg-black relative">
      {/* Background effect */}
      {/* <AnimatedBeam 
        className="absolute inset-0 opacity-20" 
        // size={400}
        // quantity={8}
        duration={30000}
      /> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-24 h-1 mx-auto bg-blue-500 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left column - Bio with encryption demo */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">
              <MorphingText
                texts={["Who I Am", "My Background", "My Journey"]}
                className="text-2xl font-semibold"
              />
            </h3>

            <div className="space-y-6">
              {/* Paragraphs with encryption/decryption effect */}
              {paragraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 rounded-lg border border-gray-800 transition-all duration-300"
                  onMouseEnter={() => setHoveredParagraph(index)}
                  onMouseLeave={() => setHoveredParagraph(null)}
                >
                  <p className="text-gray-300 font-mono transition-all duration-300">
                    {hoveredParagraph === index ? (
                      <>
                        <span className="text-red-500 text-xs block mb-2">
                          // Text encrypted with SHA-256 (hover to decrypt)
                        </span>
                        <span className="text-green-400 break-all">
                          {encryptedParagraphs[index]}
                        </span>
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                </div>
              ))}

              {/* Educational note about encryption */}
              <div
                className={`mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg transition-all duration-300 ${
                  hoveredParagraph !== null ? "opacity-100" : "opacity-70"
                }`}
              >
                <h4 className="text-blue-400 font-medium mb-2">
                  Hash Functions &amp; Encryption
                </h4>
                <p className="text-sm text-gray-400">
                  Hover over the paragraphs above to see a demonstration of text
                  hashing. In cryptography, hash functions like SHA-256 convert
                  data of any size into fixed-length strings, creating a unique
                  "fingerprint" of the information. This is essential for data
                  integrity verification and password storage.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Skills & expertise */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">
              Core Expertise
            </h3>

            <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800">
              {/* Skills with computer science concepts */}
              <ul className="space-y-6">
                {skills.map((skill, index) => (
                  <li key={index} className="relative">
                    <div className="flex items-start">
                      {/* Binary representation of index (CS concept - binary numbers) */}
                      <div className="mr-3 font-mono text-xs text-blue-400 pt-1 opacity-70">
                        {index.toString(2).padStart(3, "0")}
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-white">
                          {skill}
                        </h4>
                        <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${85 - index * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Data structure representation (CS concept visualization) */}
                    {index < skills.length - 1 && (
                      <div className="absolute left-[7px] top-[30px] h-[calc(100%-10px)] w-px bg-gray-700 opacity-50">
                        <div className="absolute top-1/2 -left-1 w-3 h-px bg-gray-700"></div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Educational note about data structures */}
              <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">
                  Linked List Visualization
                </h4>
                <p className="text-sm text-gray-400">
                  The skills above are displayed as a linked list data
                  structure. In computer science, linked lists consist of nodes
                  where each node contains data and a reference (or "pointer")
                  to the next node in the sequence. This structure allows for
                  efficient insertion and deletion operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
