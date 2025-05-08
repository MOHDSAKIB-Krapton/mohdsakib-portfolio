"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { algoConcept, navLinks } from "@/constants/data";
import { NavLink } from "@/lib/helper/navlink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let threshold = 100;

      if (scrollY > threshold) {
        setIsScrolled(true); // Go right in the BST
      } else {
        setIsScrolled(false); // Go left in the BST
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % algoConcept.length);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 m-2 rounded-full  ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ">
        <div className="h-16 flex items-center justify-between  ">
          <div className="flex items-center space-x-2 ">
            <AnimatedShinyText className="font-mono text-lg font-bold">
              DevPortfolio
            </AnimatedShinyText>
            <div className="hidden md:block pl-2 ml-2 border-l border-gray-700 w-[150px] truncate">
              <TypingAnimation
                className="text-sm text-gray-400"
                delay={2000}
                startOnView={true}
              >
                {algoConcept[currentIndex]}
              </TypingAnimation>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="">
            <InteractiveHoverButton>
              <Link href="#contact" className="px-4 py-2 text-sm rounded-md">
                Hire Me
              </Link>
            </InteractiveHoverButton>
          </div>

          {/* Mobile menu button - we'd implement a proper mobile menu later */}
          <button className="hidden p-2">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
