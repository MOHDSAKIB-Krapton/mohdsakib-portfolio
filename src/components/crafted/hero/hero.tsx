"use client";

import { useState, useEffect, useRef } from "react";
import { Globe } from "@/components/magicui/globe";
import { VideoText } from "@/components/magicui/video-text";
import { TypingAnimation } from "@/components/magicui/terminal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Cpu, Database, Network } from "lucide-react";
import { Marker } from "cobe";
import Container from "@/components/common/container/page";

const GLOBE_MARKERS: Marker[] = [
  // Original + Expanded Set of Global Markers
  { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
  { location: [40.7128, -74.006], size: 0.1 }, // New York
  { location: [51.5074, -0.1278], size: 0.05 }, // London
  { location: [35.6895, 139.6917], size: 0.05 }, // Tokyo
  { location: [14.5995, 120.9842], size: 0.03 }, // Manila
  { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
  { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
  { location: [30.0444, 31.2357], size: 0.07 }, // Cairo
  { location: [39.9042, 116.4074], size: 0.08 }, // Beijing
  { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
  { location: [19.4326, -99.1332], size: 0.1 }, // Mexico City
  { location: [34.6937, 135.5022], size: 0.05 }, // Osaka
  { location: [41.0082, 28.9784], size: 0.06 }, // Istanbul
  { location: [55.7558, 37.6176], size: 0.05 }, // Moscow
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
  { location: [48.8566, 2.3522], size: 0.05 }, // Paris
  { location: [52.52, 13.405], size: 0.05 }, // Berlin
  { location: [28.6139, 77.209], size: 0.08 }, // New Delhi
  { location: [6.5244, 3.3792], size: 0.09 }, // Lagos
  { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Simulating data structure for the globe - representing a graph data structure
  const [globeData, setGlobeData] = useState<any[]>([]);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [particleCount, setParticleCount] = useState(0);

  // Generate a graph-like data structure for the globe
  // useEffect(() => {
  //   // Graph generation algorithm - creates a network of connected points
  //   const generateGraphData = () => {
  //     const points = [];
  //     const totalPoints = 40;

  //     // Create nodes (vertices)
  //     for (let i = 0; i < totalPoints; i++) {
  //       // Random position on the globe (spherical coordinates)
  //       const lat = Math.random() * 180 - 90;
  //       const lng = Math.random() * 360 - 180;
  //       const size = Math.random() * 1.5 + 0.5;

  //       points.push({
  //         id: i,
  //         lat,
  //         lng,
  //         size,
  //         color: i % 5 === 0 ? "#3b82f6" : "#6366f1",
  //         connections: [] as number[],
  //       });
  //     }

  //     // Create edges (using a modified minimum spanning tree approach)
  //     for (let i = 0; i < totalPoints; i++) {
  //       // Each node connects to 1-3 other nodes
  //       const numConnections = Math.floor(Math.random() * 3) + 1;

  //       for (let j = 0; j < numConnections; j++) {
  //         // Find a node to connect to (avoiding self-connections)
  //         let targetNode;
  //         do {
  //           targetNode = Math.floor(Math.random() * totalPoints);
  //         } while (
  //           targetNode === i ||
  //           points[i].connections.includes(targetNode)
  //         );

  //         // Add bidirectional connection
  //         points[i].connections.push(targetNode);
  //         points[targetNode].connections.push(i);
  //       }
  //     }

  //     return points;
  //   };

  //   setGlobeData(generateGraphData());

  //   // Simulate graph traversal algorithm
  //   // This demonstrates Breadth-First Search (BFS) traversal
  //   const startTraversal = () => {
  //     const visited = new Set<number>();
  //     const queue: number[] = [0]; // Start from node 0
  //     visited.add(0);

  //     const traversalInterval = setInterval(() => {
  //       if (queue.length === 0) {
  //         clearInterval(traversalInterval);
  //         // Reset after full traversal
  //         setTimeout(() => {
  //           setActiveNodes([]);
  //           startTraversal();
  //         }, 3000);
  //         return;
  //       }

  //       // Dequeue a vertex
  //       const currentNode = queue.shift()!;

  //       // Process current node - show it as active
  //       setActiveNodes((prev) => [...prev, currentNode]);
  //       setParticleCount((prev) => prev + 1);

  //       // Get all adjacent vertices
  //       const connections = globeData[currentNode]?.connections || [];

  //       // For each adjacent vertex, if not visited, mark as visited and enqueue
  //       for (const neighbor of connections) {
  //         if (!visited.has(neighbor)) {
  //           visited.add(neighbor);
  //           queue.push(neighbor);
  //         }
  //       }
  //     }, 500); // Process a node every 500ms

  //     return () => clearInterval(traversalInterval);
  //   };

  //   // Start the traversal after a delay
  //   const timer = setTimeout(startTraversal, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  // CS roles for typing animation
  const roles = [
    "Software Engineer",
    "Algorithm Designer",
    "Full-Stack Developer",
    "System Architect",
    "ML Engineer",
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <Container>
        <div className="h-screen flex flex-col md:flex-row mt-12 relative">
          {/* Animated beam effect */}
          {/* <AnimatedBeam
        className="absolute inset-0 opacity-40"
        size={500}
        quantity={15}
        duration={25000}
      /> */}

          {/* Particle counter */}
          <div className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-gray-800">
            <div className="flex items-center gap-2">
              <Network className="text-cyan-400 h-5 w-5" />
              <div className="text-xs font-mono">
                <span className="text-gray-400">NODES TRAVERSED: </span>
                <span className="text-cyan-400">
                  {particleCount.toString().padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Content container */}
          <div className="container mx-auto px-4 z-10 text-center relative flex-1 h-full">
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

              {/* <VideoText
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
              // src="https://cdn.pixabay.com/vimeo/149196734/code-2834.mp4"
              src="https://cdn.magicui.design/ocean-small.webm"
              autoPlay={true}
              loop={true}
              muted={true}
            >
              Computer Science Portfolio
            </VideoText> */}

              <div className="relative h-[150px] md:h-[250px] flex flex-col items-center justify-center gap-y-5">
                <VideoText src="./videos/techy.mp4" className="text-xs">
                  Software
                </VideoText>
                <VideoText src="./videos/techy.mp4" className="text-xs">
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

          <div className="flex-1 z-10 opacity-80 h-full w-full items-center justify-center relative">
            <Globe
              config={{
                width: 800,
                height: 800,
                onRender: (state) => {
                  state.phi += 0.005;
                },
                phi: 0,
                theta: 0.3,
                mapSamples: 8000,
                mapBrightness: 0.2,
                baseColor: [1, 1, 1],
                markerColor: [251 / 255, 100 / 255, 21 / 255],
                glowColor: [1, 1, 1],
                markers: GLOBE_MARKERS,
                diffuse: 0.4,
                devicePixelRatio: typeof window !== "undefined" ? 2 : 1,
                dark: 0,
              }}
              className="inset-0 absolute"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
