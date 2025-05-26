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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out m-2 rounded-full max-w-7xl mx-auto ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AnimatedShinyText className="font-mono text-lg font-bold">
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

            {/* Mobile menu button with morphing animation */}
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

      {/* Mobile Menu Modal with CodeGrid-style animations */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background with morphing effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 transform transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isMobileMenuOpen ? "scale-100 rotate-0" : "scale-110 rotate-12"
            }`}
          />

          {/* Animated overlay shapes */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full transform transition-all duration-1500 ease-out ${
              isMobileMenuOpen
                ? "translate-x-0 translate-y-0 scale-100"
                : "translate-x-48 -translate-y-48 scale-0"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full transform transition-all duration-1300 ease-out ${
              isMobileMenuOpen
                ? "translate-x-0 translate-y-0 scale-100"
                : "-translate-x-40 translate-y-40 scale-0"
            }`}
          />

          {/* Backdrop blur overlay */}
          <div
            className={`absolute inset-0 backdrop-blur-xl bg-black/20 transition-all duration-800 ease-out ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Modal Content Container */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transform transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen ? "scale-100 rotate-0" : "scale-95 rotate-3"
          }`}
        >
          <div className="w-full max-w-md">
            {/* Logo Section with reveal animation */}
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
                  MohdSakib
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

            {/* Navigation Links with staggered morphing animations */}
            <nav className="">
              <ul className="space-y-6">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <div
                      className={`transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isMobileMenuOpen
                          ? "translate-x-0 translate-y-0 opacity-100 scale-100"
                          : "translate-x-[-50px] translate-y-[20px] opacity-0 scale-95"
                      }`}
                      style={{
                        transitionDelay: `${400 + index * 150}ms`,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="group relative block py-6 px-8 text-2xl font-bold text-white transition-all duration-500 ease-out overflow-hidden rounded-2xl"
                      >
                        {/* Background morphing shape */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left rounded-2xl" />

                        {/* Text content */}
                        <div className="relative flex items-center justify-between">
                          <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                            {link.label}
                          </span>

                          {/* Animated arrow */}
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

                        {/* Bottom border animation */}
                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button with morphing animation */}
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
              <Link
                href="#contact"
                className="group relative inline-block"
                onClick={closeMobileMenu}
              >
                <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] transition-all duration-500 ease-out group-hover:scale-105">
                  <div className="relative rounded-full bg-black px-12 py-4 transition-all duration-500 ease-out group-hover:bg-transparent">
                    <span className="relative text-xl font-bold text-white transition-all duration-500 ease-out">
                      Hire Me
                    </span>
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping"
                    style={{ animationDelay: "200ms" }}
                  />
                  <div
                    className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </Link>
            </div>

            {/* Footer with reveal animation */}
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

        {/* Close area (tap outside to close) */}
        <div className="absolute inset-0 -z-10" onClick={closeMobileMenu} />
      </div>
    </>
  );
}
