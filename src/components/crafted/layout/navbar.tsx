"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { algoConcept, navLinks } from "@/constants/data";
import { NavLink } from "@/lib/helper/navlink";
import { Cross } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let threshold = 70;

      if (scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-4 right-4 z-[80] transition-all duration-500 ease-out m-2 rounded-full max-w-7xl mx-auto ${
          isScrolled
            ? "bg-black/20 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AnimatedShinyText className="font-mono text-lg font-bold text-white">
                MohdSakib
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

            <div className="hidden md:block">
              <InteractiveHoverButton>
                <Link href="#contact" className="px-4 py-2 text-sm rounded-md">
                  Hire Me
                </Link>
              </InteractiveHoverButton>
            </div>

            <button
              className={`md:hidden p-3 relative z-[60] transition-all duration-700 ease-out rounded-full ${
                isMobileMenuOpen ? "bg-white" : "bg-transparent"
              }`}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                {/* Top line */}
                <span
                  className={`absolute w-6 h-0.5 transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    isMobileMenuOpen
                      ? "bg-black rotate-45 translate-y-0"
                      : "bg-white translate-y-[-6px] rotate-0"
                  }`}
                />
                {/* Middle line */}
                <span
                  className={`absolute w-6 h-0.5 transform transition-all duration-500 ease-out ${
                    isMobileMenuOpen
                      ? "bg-black scale-0 opacity-0"
                      : "bg-white scale-100 opacity-100"
                  }`}
                />
                {/* Bottom line */}
                <span
                  className={`absolute w-6 h-0.5 transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    isMobileMenuOpen
                      ? "bg-black -rotate-45 translate-y-0"
                      : "bg-white translate-y-[6px] rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            isMobileMenuOpen
              ? "backdrop-blur-md bg-black/60"
              : "backdrop-blur-none bg-transparent"
          }`}
          style={{
            transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
          }}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transform transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen ? "scale-100 rotate-0" : "scale-95 rotate-3"
          }`}
          style={{
            transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
          }}
        >
          <div
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 z-50"
          >
            <Cross width={24} height={24} />
          </div>

          <div className="w-full max-w-md">
            <div
              className={`text-center transform transition-all duration-1000 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative">
                <AnimatedShinyText className="font-mono text-4xl font-bold text-white mb-4">
                  Software Engineer
                </AnimatedShinyText>
                <div
                  className={`h-px bg-gradient-to-r from-transparent via-white/50 to-transparent transform transition-all duration-800 ease-out ${
                    isMobileMenuOpen ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                />
              </div>
              <div className="">
                <TypingAnimation
                  className="text-lg text-gray-300 font-light"
                  delay={2000}
                  startOnView={isMobileMenuOpen}
                >
                  {algoConcept[currentIndex]}
                </TypingAnimation>
              </div>
            </div>

            <nav className="">
              <ul className="">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <div
                      className={`transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isMobileMenuOpen
                          ? "translate-y-0  opacity-100 scale-100"
                          : " translate-y-[50px] opacity-0 scale-95"
                      }`}
                      style={{
                        transitionDelay: `${index * 120 + 400}ms`,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="group relative block py-6 px-8 text-2xl font-bold text-white transition-all duration-500 ease-out overflow-hidden rounded-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left rounded-2xl" />

                        <div className="relative flex items-center justify-between">
                          <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                            {link.label}
                          </span>

                          <div className="transform group-hover:translate-x-2 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className={`text-center transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-90"
              }`}
              style={{
                transitionDelay: `${400 + navLinks.length * 150 + 200}ms`,
              }}
            >
              <div className="hidden md:block">
                <InteractiveHoverButton>
                  <Link
                    href="#contact"
                    className="px-4 py-2 text-sm rounded-md"
                  >
                    Hire Me
                  </Link>
                </InteractiveHoverButton>
              </div>
            </div>

            <div
              className={`text-center mt-16 transform transition-all duration-1000 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: `${400 + navLinks.length * 150 + 400}ms`,
              }}
            >
              <p className="text-gray-400 text-sm font-light">
                Let's build something extraordinary together
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10" onClick={closeMobileMenu} />
      </div>
    </>
  );
}
