"use client";

import { useState } from "react";
import Link from "next/link";
import { MorphingText } from "@/components/magicui/morphing-text";
import Container from "@/components/common/container/page";

export default function Footer() {
  const [terminalVisible, setTerminalVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Hash function demonstration (simplified SHA-256 concept)
  // This is a very simplified version just to demonstrate the concept
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16).padStart(8, "0");
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "Email", url: "mailto:your.email@example.com" },
  ];

  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      {/* <div className="container mx-auto px-4 py-12"> */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              <MorphingText
                texts={["Developer", "Problem Solver", "CS Enthusiast"]}
                className="text-lg font-semibold"
              />
            </h3>
            <p className="mb-4">
              Building elegant solutions with code and computer science
              principles.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  data-hash={hashString(link.name)}
                  onMouseEnter={(e) => {
                    // Show hash value on hover (simulating cryptographic concepts)
                    const target = e.currentTarget;
                    const originalText = target.textContent;
                    target.setAttribute(
                      "data-original-text",
                      originalText || ""
                    );
                    target.textContent = target.getAttribute("data-hash");
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.textContent =
                      target.getAttribute("data-original-text");
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Middle column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="hover:text-white transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#education"
                  className="hover:text-white transition-colors"
                >
                  CS Concepts
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {currentYear} - Built with Next.js and Magic UI</p>
          <p className="mt-1 text-xs">
            <span className="font-mono">
              {/* Recursive function visualization - shows how a recursive countdown works */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className="inline-block px-1 opacity-80"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {5 - i}
                  </span>
                ))}
              <span className="text-green-500">
                recursion(0) // Base case reached!
              </span>
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
