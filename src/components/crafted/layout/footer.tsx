"use client";

import Link from "next/link";
import Container from "@/components/common/container/page";
import { bigOExamples, navLinks, socialLinks } from "@/constants/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    title={link.name}
                    aria-label={link.name}
                    className="flex items-center justify-center"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sitemap</h3>
              <ul className="space-y-2">
                {navLinks.map((section, idx) => (
                  <li key={idx}>
                    <Link
                      href={section.href}
                      className="hover:text-white transition-colors capitalize"
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center ">
            <p>
              © {currentYear} - Built with Next.js, Tailwind CSS, and ❤️ for CS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
