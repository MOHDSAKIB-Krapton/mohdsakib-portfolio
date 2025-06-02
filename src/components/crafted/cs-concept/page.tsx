"use client";

import Container from "@/components/common/container/page";
import { CodeComparison } from "@/components/magicui/code-comparison";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useState } from "react";
import { FileTree } from "./file-tree/page";
import { InteractiveGrid } from "../interacted-grid/page";
import { RoundedTabSwitcher } from "@/components/common/tabSwitcher/page";

export default function CSConceptsSection() {
  const [activeTab, setActiveTab] = useState("architecture");

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

  const tabContent: any = {
    architecture: (
      <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">
          Next.js App Directory Structure
        </h3>
        <p className="text-gray-400 mb-6">
          Understanding file structure is crucial for maintaining scalable
          applications. The App Router pattern in Next.js 13+ uses a
          directory-based routing system.
        </p>
        <FileTree />
      </div>
    ),
    optimization: (
      <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
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
          lightTheme="github-dark"
          darkTheme="github-dark"
          highlightColor="rgba(101, 117, 133, 0.16)"
        />
      </div>
    ),
  };

  return (
    <section className="relative w-full min-h-screen " id="cs-concepts">
      <InteractiveGrid className="opacity-40" />
      <Container>
        <div className="relative z-10 w-full space-y-12">
          <h2 className="text-4xl font-bold text-white mb-4">CS Concepts</h2>
          <p className="text-gray-400 text-lg mb-8">
            Interactive demonstrations of key computer science principles
          </p>

          <RoundedTabSwitcher
            tabs={["architecture", "optimization"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {tabContent[activeTab]}
        </div>
      </Container>
    </section>
  );
}
