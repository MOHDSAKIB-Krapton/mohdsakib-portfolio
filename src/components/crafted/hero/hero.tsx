"use client";

import { VideoText } from "@/components/magicui/video-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Network } from "lucide-react";
import Container from "@/components/common/container/page";
import { GlobeDemo } from "../BFSGlobe";
import { NodeCounter } from "../node-counter";

const iconAnimations = [
  {
    Component: Cpu,
    className: "text-cyan-400/70",
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, -10, 0, 10, 0],
      rotate: [0, 5, 0, -5, 0],
    },
    transition: {
      duration: 10,
    },
    position: "left-1/4 top-16",
  },
  {
    Component: Database,
    className: "text-purple-400/70",
    animate: {
      x: [0, -15, 0, 15, 0],
      y: [0, 10, 0, -10, 0],
      rotate: [0, -5, 0, 5, 0],
    },
    transition: {
      duration: 12,
    },
    position: "right-1/4 top-12",
  },
  {
    Component: Code,
    className: "text-blue-400/70",
    animate: {
      x: [0, 20, 0, -20, 0],
      y: [0, -5, 0, 5, 0],
      rotate: [0, 10, 0, -10, 0],
    },
    transition: {
      duration: 15,
    },
    position: "left-1/3 top-32",
  },
];

export default function HeroSection() {
  return (
    <section className="relative" id="hero">
      <div className="absolute top-1/4 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <Container>
        <div className="flex flex-col lg:flex-row mt-12 relative flex-1">
          <div className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-gray-800">
            <div className="flex items-center gap-2">
              <Network className="text-cyan-400 h-5 w-5" />
              <div className="text-xs font-mono">
                <span className="text-gray-400">NODES TRAVERSED: </span>
                <NodeCounter />
              </div>
            </div>
          </div>

          <div className="mx-auto z-10 text-center relative flex flex-1 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto space-y-5"
            >
              <div className="relative h-24">
                {iconAnimations.map(
                  (
                    { Component, className, animate, transition, position },
                    index
                  ) => (
                    <motion.div
                      key={index}
                      animate={animate}
                      transition={{
                        repeat: Infinity,
                        ease: "easeInOut",
                        ...transition,
                      }}
                      className={`absolute ${position} -z-10`}
                    >
                      <Component className={`h-8 w-8 ${className}`} />
                    </motion.div>
                  )
                )}
              </div>

              <div className="relative h-[150px] md:h-[250px] flex flex-col items-center justify-center gap-y-5">
                <VideoText
                  src="./videos/techy.mp4"
                  className="text-xs"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  preload="auto"
                >
                  Software
                </VideoText>
                <VideoText
                  src="./videos/techy.mp4"
                  className="text-xs"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  preload="auto"
                >
                  Engineer
                </VideoText>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-gray-800/50"
              >
                Witness a real-time graph traversal algorithm in action. The
                glowing green nodes represent the current path of a
                breadth-first search (BFS) across a dynamically generated
                network — just one of many CS concepts visualized throughout
                this portfolio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mt-10"
              >
                <InteractiveHoverButton className="group">
                  <span>View Projects</span>
                </InteractiveHoverButton>

                <InteractiveHoverButton className="group">
                  <span>Contact Me</span>
                </InteractiveHoverButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 min-h-96 flex">
            <GlobeDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
