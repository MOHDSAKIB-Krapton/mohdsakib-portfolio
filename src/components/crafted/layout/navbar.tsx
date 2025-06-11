"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { algoConcept, navLinks, socialLinks } from "@/constants/data";
import { NavLink } from "@/lib/helper/navlink";
import {
  Cross,
  Github,
  Globe,
  IndianRupee,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

    handleScroll();

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
            ? "bg-black/20 backdrop-blur-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <a href="/" title="Home" className="flex items-center space-x-2">
              <AnimatedShinyText className="font-mono text-lg font-bold text-white">
                MohdSakib
              </AnimatedShinyText>
              <div className="hidden md:block pl-2 ml-2 border-l border-gray-700 w-[150px] truncate">
                <TypingAnimation
                  className="text-sm text-gray-200"
                  startOnView={true}
                >
                  {algoConcept[currentIndex]}
                </TypingAnimation>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  className="relative text-sm text-white duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <InteractiveHoverButton>
                <a
                  href="/contact"
                  title="Contact"
                  className="px-4 py-2 text-sm rounded-md"
                >
                  Hire Me
                </a>
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

      <div className={`fixed inset-0 z-50 md:hidden`}>
        <div
          className={`absolute inset-0 transition-opacity duration-700 bg-black ${
            isMobileMenuOpen
              ? "opacity-40 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobileMenu}
        />

        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 min-h-[70%] w-full max-w-md bg-white rounded-2xl py-8 transition-transform duration-500 ease-in-out flex flex-col justify-evenly space-y-8 ${
            isMobileMenuOpen ? "translate-y-0" : "translate-y-[150%]"
          }`}
          style={{
            transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
          }}
        >
          <div
            className={`text-center transform transition-all duration-1000 ease-out space-y-1`}
          >
            <div className="relative">
              <AnimatedShinyText className="font-mono text-4xl font-bold mb-4">
                Software Engineer
              </AnimatedShinyText>
            </div>
          </div>

          <nav className="mt-10">
            <ul className="px-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between p-3 text-lg font-semibold text-black rounded-md hover:bg-red-50 transition-colors duration-300 ${
                        isActive
                          ? "backdrop-blur-lg bg-black/80 text-white"
                          : ""
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-gray-400">&gt;</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-10 px-6 py-4 border-t border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>Freelance</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Remote / India</span>
                </div>
              </div>

              <a
                href="mailto:youremail@example.com"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-black text-sm"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>

            <div className="flex justify-center gap-5 text-gray-600 text-xl mt-2">
              {socialLinks.map((link, index) => {
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    title={link.name}
                    aria-label={link.name}
                    className="flex items-center justify-center"
                  >
                    {link.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA: Hire Me */}
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
                <a
                  href="/contact"
                  title="Contact"
                  className="px-4 py-2 text-sm rounded-md"
                >
                  Hire Me
                </a>
              </InteractiveHoverButton>
            </div>
          </div>

          <div
            className={`text-center transform transition-all duration-1000 ease-out`}
          >
            <p className="text-gray-400 text-sm font-light">
              Let's build something extraordinary together
            </p>

            <div className="">
              <TypingAnimation
                className="text-sm text-gray-600 font-light underline"
                startOnView={isMobileMenuOpen}
              >
                {algoConcept[currentIndex]}
              </TypingAnimation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
