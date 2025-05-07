"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Globe } from "@/components/magicui/globe";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { VideoText } from "@/components/magicui/video-text";
import { TypingAnimation } from "@/components/magicui/terminal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function HeroSection() {
  // Simulating data structure for the globe - representing a graph data structure
  // Each point is a node in the graph, and connections represent edges
  const [globeData, setGlobeData] = useState<any[]>([]);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  // Generate a graph-like data structure for the globe
  // This demonstrates graph theory concepts from computer science
  useEffect(() => {
    // Graph generation algorithm - creates a network of connected points
    const generateGraphData = () => {
      const points = [];
      const totalPoints = 40;

      // Create nodes (vertices)
      for (let i = 0; i < totalPoints; i++) {
        // Random position on the globe (spherical coordinates)
        const lat = Math.random() * 180 - 90;
        const lng = Math.random() * 360 - 180;
        const size = Math.random() * 1.5 + 0.5;

        points.push({
          id: i,
          lat,
          lng,
          size,
          color: i % 5 === 0 ? "#3b82f6" : "#6366f1",
          connections: [] as number[],
        });
      }

      // Create edges (using a modified minimum spanning tree approach)
      for (let i = 0; i < totalPoints; i++) {
        // Each node connects to 1-3 other nodes
        const numConnections = Math.floor(Math.random() * 3) + 1;

        for (let j = 0; j < numConnections; j++) {
          // Find a node to connect to (avoiding self-connections)
          let targetNode;
          do {
            targetNode = Math.floor(Math.random() * totalPoints);
          } while (
            targetNode === i ||
            points[i].connections.includes(targetNode)
          );

          // Add bidirectional connection
          points[i].connections.push(targetNode);
          points[targetNode].connections.push(i);
        }
      }

      return points;
    };

    setGlobeData(generateGraphData());

    // Simulate graph traversal algorithm
    // This demonstrates Breadth-First Search (BFS) traversal
    const startTraversal = () => {
      const visited = new Set<number>();
      const queue: number[] = [0]; // Start from node 0
      visited.add(0);

      const traversalInterval = setInterval(() => {
        if (queue.length === 0) {
          clearInterval(traversalInterval);
          // Reset after full traversal
          setTimeout(() => {
            setActiveNodes([]);
            startTraversal();
          }, 3000);
          return;
        }

        // Dequeue a vertex
        const currentNode = queue.shift()!;

        // Process current node - show it as active
        setActiveNodes((prev) => [...prev, currentNode]);

        // Get all adjacent vertices
        const connections = globeData[currentNode]?.connections || [];

        // For each adjacent vertex, if not visited, mark as visited and enqueue
        for (const neighbor of connections) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }, 500); // Process a node every 500ms

      return () => clearInterval(traversalInterval);
    };

    // Start the traversal after a delay
    const timer = setTimeout(startTraversal, 1500);
    return () => clearTimeout(timer);
  }, []);

  // CS roles for typing animation
  const roles = [
    "Software Engineer",
    "Algorithm Designer",
    "Full-Stack Developer",
    "System Architect",
    "ML Engineer",
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* AnimatedBeam for visual enhancement */}
      {/* <AnimatedBeam
        className="absolute inset-0 opacity-30"
        // size={400}
        // quantity={10}
        duration={20000}
      /> */}

      <div className="absolute z-10 opacity-70 top-120 bottom-0 left-0 right-0">
        {/* <Globe
          config={
            {
              //   baseColor=[]
              // pointSize = 1.5,
              //   lineWidth=0.5
              //   pointColor="#3b82f6"
              //   lineColor="rgba(99, 102, 241, 0.5)"
              //   backgroundColor="transparent"
              //   globeColor="#000000"
              //   glowColor="#4338ca"
              //   enableGlow={true}
              //   points={globeData.map((point) => ({
              //     lat: point.lat,
              //     lng: point.lng,
              //     size: activeNodes.includes(point.id) ? point.size * 2 : point.size,
              //     color: activeNodes.includes(point.id) ? "#10b981" : point.color,
              //   }))}
              //   connections={globeData.flatMap((point) =>
              //     point.connections
              //       .filter((targetId) => targetId > point.id) // Avoid duplicate connections
              //       .map((targetId) => ({
              //         sourceId: point.id,
              //         targetId,
              //         sourceCoordinates: {
              //           lat: globeData[point.id].lat,
              //           lng: globeData[point.id].lng,
              //         },
              //         targetCoordinates: {
              //           lat: globeData[targetId].lat,
              //           lng: globeData[targetId].lng,
              //         },
              //       }))
              //               )
              //               }
            }
          }
        /> */}

        <Globe />

        {/* <Globe
          config={{
            // COBE configuration options
            devicePixelRatio: 2,
            width: 800,
            height: 800,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 1,
            mapBaseBrightness: 0,
            baseColor: [0, 0, 0],
            markerColor: [59 / 255, 130 / 255, 246 / 255], // Converted from "#3b82f6"
            glowColor: [67 / 255, 56 / 255, 202 / 255], // Converted from "#4338ca"
            scale: 1,
            offset: [0, 0],
            markers: globeData.map((point) => ({
              location: [point.lat, point.lng],
              size: activeNodes.includes(point.id)
                ? point.size * 2
                : point.size,
              color: activeNodes.includes(point.id)
                ? [16 / 255, 185 / 255, 129 / 255]
                : [
                    point.color[0] / 255,
                    point.color[1] / 255,
                    point.color[2] / 255,
                  ],
            })),
            onRender: (state) => {
              // Custom rendering logic if needed
            },
          }}
        /> */}
      </div>

      {/* Content container */}
      {/* <SmoothCursor /> */}
      <div className="container mx-auto px-4 z-10 text-center relative">
        <div className="max-w-3xl mx-auto">
          {/* Main headline with VideoText */}
          <VideoText
            className="text-4xl md:text-6xl font-bold mb-4"
            src="https://cdn.pixabay.com/vimeo/149196734/code-2834.mp4"
            autoPlay={true}
            loop={true}
            muted={true}
          >
            Computer Science Portfolio
          </VideoText>

          {/* Subtitle with typing animation */}
          <div className="h-8 mb-8">
            <TypingAnimation
              className="text-6xl text-blue-400"
              //   typingSpeed={70}
              //   deletingSpeed={50}
              //   delayBetweenWords={2000}
              //   loop={true}
            >
              {/* {roles} */}
              Software Engineer
            </TypingAnimation>
          </div>

          {/* Description that explains the graph visualization */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Witness a real-time graph traversal algorithm in action. The glowing
            green nodes represent the current path of a breadth-first search
            (BFS) across a dynamically generated network — just one of many CS
            concepts visualized throughout this portfolio.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <InteractiveHoverButton>
              <Link href="#projects" className="px-8 py-3 rounded-md text-base">
                View Projects
              </Link>
            </InteractiveHoverButton>

            <InteractiveHoverButton>
              <Link href="#contact" className="px-8 py-3 rounded-md text-base">
                Contact Me
              </Link>
            </InteractiveHoverButton>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
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
              className="text-blue-400"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
