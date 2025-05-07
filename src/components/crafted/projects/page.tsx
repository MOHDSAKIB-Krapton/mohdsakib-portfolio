"use client";

import { useState } from "react";
import {
  ArrowRight,
  Cloud,
  Code,
  File,
  FileText,
  MessageCircle,
  MessageCircleMore,
  Sparkles,
  User,
} from "lucide-react";
import { DynamicBeamLayout } from "../animated-beam-network";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { projects } from "@/constants/data";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { Project } from "@/constants/data.types";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalContent, setTerminalContent] = useState("");

  // CS Concept: State Machines
  // This section uses the concept of finite state machines where
  // the UI transforms between various states based on user input

  // CS Concept: Event Handling
  const handleProjectClick = (project: any) => {
    setActiveProject(project);
    setTerminalContent(project.terminalCommand);
    setTerminalOpen(true);
  };

  const handleTerminalClose = () => {
    setTerminalOpen(false);
  };

  const nodes = [
    { id: "googleDrive", icon: <Cloud />, column: 0 },
    { id: "docs", icon: <FileText />, column: 0 },
    { id: "whatsapp", icon: <MessageCircleMore />, column: 0 },
    { id: "messenger", icon: <MessageCircle />, column: 0 },
    { id: "notion", icon: <File />, column: 0 },
    { id: "openai", icon: <Sparkles />, column: 1 },
    { id: "user", icon: <User />, column: 2 },
  ];

  const connections = [
    { from: "drive", to: "openai" },
    { from: "docs", to: "openai" },
    { from: "whatsapp", to: "openai" },
    { from: "messenger", to: "openai" },
    { from: "notion", to: "openai" },
    { from: "openai", to: "user" },
  ];

  return (
    <div className="relative w-full bg-black py-20 px-4 md:px-8 lg:px-16">
      <DynamicBeamLayout nodes={nodes} connections={connections} />

      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
        <p className="text-gray-400 text-lg mb-8">
          Explore my work through the lens of computational state transitions
        </p>

        <BlurFade>
          {/* <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <BentoCard
                key={i}
                title={project.title}
                description={project.description}
                // Icon={project.icon}

                className={`cursor-pointer transition-all duration-300 ${
                  project.className
                } ${activeProject === project ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm">
                    <Code className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-400">View CS Concept</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </BentoCard>
            ))}
          </BentoGrid> */}
          <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <BentoCard
                key={i}
                name={project.name}
                description={project.description}
                Icon={project.Icon}
                background={project.background}
                href={project.href}
                cta={project.cta}
                className={`cursor-pointer transition-all duration-300 ${
                  activeProject === project ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </BentoGrid>
        </BlurFade>

        {terminalOpen && activeProject && (
          <div className="mt-8">
            <Terminal className="h-fit">
              {activeProject.terminalOutput.map((line: any, idx: number) =>
                line.type === "typing" ? (
                  <TypingAnimation
                    key={idx}
                    delay={line.delay || idx * 1000}
                    className={line.color || "text-muted-foreground"}
                  >
                    {line.content}
                  </TypingAnimation>
                ) : (
                  <AnimatedSpan
                    key={idx}
                    delay={line.delay || idx * 1000}
                    className={line.color || "text-green-500"}
                  >
                    {line.content}
                  </AnimatedSpan>
                )
              )}
            </Terminal>
          </div>
        )}
      </div>
    </div>
  );
}
