"use client";

import { useState } from "react";
import Link from "next/link";
import { MorphingText } from "@/components/magicui/morphing-text";
import Container from "@/components/common/container/page";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Simplified hash function to simulate CS cryptographic concepts
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString(16).padStart(8, "0");
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mohdsakib-KRAPTON" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mohdsakib001" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "Email", url: "mailto:mohdsakib.work@gmail.com" },
  ];

  const bigOExamples = [
    { complexity: "O(1)", meaning: "Constant Time - direct lookup" },
    { complexity: "O(log n)", meaning: "Logarithmic Time - binary search" },
    { complexity: "O(n)", meaning: "Linear Time - array traversal" },
    {
      complexity: "O(n log n)",
      meaning: "Efficient Sort - mergesort, heapsort",
    },
    { complexity: "O(n²)", meaning: "Nested Loops - bubble sort" },
  ];

  return (
    <footer className=" text-gray-400 border-t border-gray-800">
      <Container>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Developer Info */}
            <div>
              <p className="mb-4">
                Writing code that bridges theory and practice, with a love for
                clean architecture and optimized performance.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors relative group"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Sitemap */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sitemap</h3>
              <ul className="space-y-2">
                {["about", "projects", "skills", "education", "contact"].map(
                  (section) => (
                    <li key={section}>
                      <Link
                        href={`#${section}`}
                        className="hover:text-white transition-colors capitalize"
                      >
                        {section}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Column 3: CS Concept - Big-O */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Big-O Complexity Guide
              </h3>
              <p className="text-sm mb-4">
                Understanding algorithm complexity is key to writing performant
                code:
              </p>
              <ul className="space-y-2 text-xs font-mono">
                {bigOExamples.map(({ complexity, meaning }) => (
                  <li
                    key={complexity}
                    className="hover:text-white group transition-all"
                  >
                    <span className="text-green-400">{complexity}</span>{" "}
                    <span className="text-gray-500 group-hover:text-gray-300">
                      – {meaning}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
            <p>
              © {currentYear} - Built with Next.js, Tailwind CSS, and ❤️ for CS
            </p>
            <p className="mt-1 text-xs font-mono text-gray-500">
              Countdown to base case:&nbsp;
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="inline-block animate-pulse px-0.5">
                    {5 - i}
                  </span>
                ))}
              <span className="text-green-500"> → base case reached!</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
