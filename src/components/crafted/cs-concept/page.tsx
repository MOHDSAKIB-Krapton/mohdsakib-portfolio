"use client";

import { CodeComparison } from "@/components/magicui/code-comparison";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { MorphingText } from "@/components/magicui/morphing-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useState } from "react";

export default function CSConceptsSection() {
  const [activeTab, setActiveTab] = useState("architecture");

  // CS Concept: Security & Encryption
  // Using morphing text to demonstrate encryption
  const [isEncrypted, setIsEncrypted] = useState(false);
  const originalText =
    "Data security is fundamental to modern computing systems.";
  const encryptedText =
    "0xF8A4C291E93F862D4B2B0E74B88F72812735E5F3708F35A0DBC0BB634D33589E";

  const handleEncryptToggle = () => {
    setIsEncrypted(!isEncrypted);
  };

  // File structure for Next.js applications - Educational component
  const fileTreeItems = [
    {
      name: "next-app",
      children: [
        {
          name: "app",
          children: [
            { name: "layout.tsx", meta: "Root layout with providers" },
            { name: "page.tsx", meta: "Home page component" },
            {
              name: "(auth)",
              meta: "Route group",
              children: [
                {
                  name: "login",
                  children: [{ name: "page.tsx", meta: "Login page" }],
                },
                {
                  name: "register",
                  children: [{ name: "page.tsx", meta: "Register page" }],
                },
              ],
            },
            {
              name: "dashboard",
              children: [
                { name: "layout.tsx", meta: "Dashboard layout" },
                { name: "page.tsx", meta: "Dashboard page" },
                {
                  name: "[id]",
                  meta: "Dynamic route",
                  children: [
                    { name: "page.tsx", meta: "Dynamic page content" },
                  ],
                },
              ],
            },
            {
              name: "api",
              children: [{ name: "route.ts", meta: "API route handler" }],
            },
          ],
        },
        {
          name: "components",
          children: [
            { name: "ui", meta: "Reusable UI components" },
            { name: "features", meta: "Feature-specific components" },
          ],
        },
        {
          name: "lib",
          children: [
            { name: "utils.ts", meta: "Utility functions" },
            { name: "db.ts", meta: "Database client" },
          ],
        },
        { name: "public", meta: "Static assets" },
        { name: "next.config.js", meta: "Next.js configuration" },
        { name: "tailwind.config.js", meta: "Tailwind CSS configuration" },
      ],
    },
  ];

  const beforeCode = `import { NextRequest } from 'next/server';
 
  export const middleware = async (req: NextRequest) => {
    let user = undefined;
    let team = undefined;
    const token = req.headers.get('token'); 
   
    if(req.nextUrl.pathname.startsWith('/auth')) {
      user = await getUserByToken(token);
   
      if(!user) {
        return NextResponse.redirect('/login');
      }
    }
   
    if(req.nextUrl.pathname.startsWith('/team')) {
      user = await getUserByToken(token);
   
      if(!user) {
        return NextResponse.redirect('/login');
      }
   
      const slug = req.nextUrl.query.slug;
      team = await getTeamBySlug(slug); // [!code highlight]
   
      if(!team) { // [!code highlight]
        return NextResponse.redirect('/'); // [!code highlight]
      } // [!code highlight]
    } // [!code highlight]
   
    return NextResponse.next(); // [!code highlight]
  }
   
  export const config = {
    matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]
  };`;

  const afterCode = `import { createMiddleware, type MiddlewareFunctionProps } from '@app/(auth)/auth/_middleware';
  import { auth } from '@/app/(auth)/auth/_middleware'; // [!code --]
  import { auth } from '@/app/(auth)/auth/_middleware'; // [!code ++]
  import { team } from '@/app/(team)/team/_middleware';
   
  const middlewares = {
    '/auth{/:path?}': auth,
    '/team{/:slug?}': [ auth, team ],
  };
   
  export const middleware = createMiddleware(middlewares); // [!code focus]
   
  export const config = {
    matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
  };`;

  const tabContent = {
    architecture: (
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          Next.js App Directory Structure
        </h3>
        <p className="text-gray-400 mb-6">
          Understanding file structure is crucial for maintaining scalable
          applications. The App Router pattern in Next.js 13+ uses a
          directory-based routing system.
        </p>
        {/* <FileTree items={fileTreeItems} /> */}
      </div>
    ),
    optimization: (
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          Algorithm Optimization
        </h3>
        <p className="text-gray-400 mb-6">
          Optimizing algorithms can drastically improve performance. Below is an
          example of improving a duplicate-finding function from O(n²) to O(n)
          time complexity.
        </p>
        <CodeComparison
          beforeCode={beforeCode}
          afterCode={afterCode}
          language="typescript"
          filename="middleware.ts"
          lightTheme="github-light"
          darkTheme="github-dark"
          highlightColor="rgba(101, 117, 133, 0.16)"
        />
      </div>
    ),
    security: (
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          Cryptography & Hashing
        </h3>
        <p className="text-gray-400 mb-6">
          Securing data is one of the most important aspects of modern
          computing. Hover over the text below to see a demonstration of
          hashing.
        </p>
        <div
          className="bg-gray-800 p-4 rounded-md mb-6 cursor-pointer"
          onMouseEnter={handleEncryptToggle}
          onMouseLeave={handleEncryptToggle}
        >
          <MorphingText
            texts={[isEncrypted ? encryptedText : originalText]}
            className="text-green-400 font-mono"
          />
          <p className="text-gray-500 mt-2 text-sm">
            {isEncrypted
              ? "SHA-256 Hash (hover to decrypt)"
              : "Plain text (hover to encrypt)"}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md">
          <h4 className="text-white text-lg mb-2">How Hashing Works</h4>
          <TypingAnimation
            className="text-gray-400"
            // speed={40}
          >
            A hash function takes input data of any size and produces a
            fixed-size output. Even a small change in input produces a
            completely different hash, making it ideal for password storage and
            data integrity verification.
          </TypingAnimation>
        </div>
      </div>
    ),
  };

  return (
    <div className="relative w-full py-20 px-4 md:px-8 lg:px-16 bg-black">
      <InteractiveGridPattern
        className="absolute inset-0 opacity-20"
        size={30}
        offset={10}
        color="#3b82f6"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">CS Concepts</h2>
        <p className="text-gray-400 text-lg mb-8">
          Interactive demonstrations of key computer science principles
        </p>

        <div className="flex gap-2 mb-8">
          {["architecture", "optimization", "security"].map((tab) => (
            <InteractiveHoverButton
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </InteractiveHoverButton>
          ))}
        </div>

        {tabContent[activeTab]}
      </div>
    </div>
  );
}
