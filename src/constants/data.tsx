import {
  Layout,
  MessageSquare,
  Database,
  Layers,
  Image,
  Globe,
  Github,
} from "lucide-react";
import { Project, Skill } from "./data.types";

export const navLinks = [
  { href: "/skills", label: "Skills" },
  { href: "/cs-concept", label: "CS Concepts" },
  { href: "/github", label: "Github Overview" },
  { href: "/blogs", label: "Blogs" },
];

export const algoConcept = [
  "QuickSort",
  "MergeSort",
  "BinarySearch",
  "DijkstraAlgorithm",
  "HashTable",
  "AStarAlgorithm",
  "DynamicProgramming",
  "GraphTraversal",
  "BreadthFirstSearch",
  "DepthFirstSearch",
];

export const aboutParagraphs: string[] = [
  "I'm a passionate developer with expertise in full-stack web development, focusing on React, Next.js, and modern JavaScript frameworks. My approach combines clean code with intuitive user experiences.",
  "With a strong foundation in computer science principles, I build scalable and maintainable applications that solve real-world problems while adhering to best practices and design patterns.",
  "Beyond development, I'm dedicated to sharing knowledge and contributing to the community through open-source projects, technical articles, mentoring aspiring developers and post the solutions of underrated problems that no one talks about.",
];

export const skills: Skill[] = [
  {
    name: "Algorithms & Data Structures",
    proficiency: 90,
    color: "from-blue-500 to-indigo-600",
    icon: "🔍",
    description:
      "Expertise in implementing efficient algorithms and selecting optimal data structures for complex problem-solving scenarios.",
  },
  {
    name: "System Architecture",
    proficiency: 85,
    color: "from-purple-500 to-pink-600",
    icon: "🏗️",
    description:
      "Designing scalable, maintainable system architectures with focus on microservices, serverless, and cloud-native approaches.",
  },
  {
    name: "Database Design",
    proficiency: 88,
    color: "from-green-500 to-emerald-600",
    icon: "🗃️",
    description:
      "Creating normalized, performance-optimized database schemas across SQL and NoSQL systems with efficient indexing strategies.",
  },
  {
    name: "API Development",
    proficiency: 92,
    color: "from-orange-500 to-amber-600",
    icon: "🔌",
    description:
      "Building RESTful and GraphQL APIs with robust authentication, validation, and documentation using modern best practices.",
  },
  {
    name: "Web Performance Optimization",
    proficiency: 87,
    color: "from-red-500 to-rose-600",
    icon: "⚡",
    description:
      "Implementing advanced techniques for minimizing load times, reducing bundle sizes, and optimizing rendering performance.",
  },
];

export const terminalHistory = [
  { type: "input", text: "ssh portfolio@server" },
  { type: "output", text: "Connected to portfolio server. Welcome!" },
  { type: "input", text: "cat about.txt" },
  {
    type: "output",
    text: "I'm a passionate developer who loves computer science concepts and creative coding.",
  },
  { type: "input", text: "ls -la projects/" },
  {
    type: "output",
    text:
      "total 6\n" +
      "drwxr-xr-x  2 portfolio users 4096 Apr 10 15:30 .\n" +
      "drwxr-xr-x 10 portfolio users 4096 Apr 10 15:30 ..\n" +
      "-rw-r--r--  1 portfolio users 2048 Apr 10 15:30 ecommerce-platform.md\n" +
      "-rw-r--r--  1 portfolio users 3072 Apr 10 15:30 ai-assistant.md\n" +
      "-rw-r--r--  1 portfolio users 1536 Apr 10 15:30 blockchain-explorer.md",
  },
  { type: "input", text: "exit" },
  { type: "output", text: "Disconnected from server. Goodbye!" },
];

export const projects: Project[] = [
  {
    name: "E-commerce Platform",
    description: "Built with Next.js, Redux, and Stripe integration",
    Icon: Layout,
    href: "#",
    cta: "View State Diagram",
    className: "md:col-span-1",
    background: <div className="bg-indigo-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Starting checkout flow..." },
      { type: "animated", content: "✔ User browsing products", delay: 1000 },
      { type: "animated", content: "✔ Item added to cart", delay: 1500 },
      { type: "animated", content: "✔ Checkout initiated", delay: 2000 },
      {
        type: "animated",
        content: "✔ Payment processed via Stripe",
        delay: 2500,
      },
      { type: "typing", content: "Success! Order complete.", delay: 3000 },
    ],
  },
  {
    name: "AI-Powered Chatbot",
    description: "Natural language processing with TensorFlow.js",
    Icon: MessageSquare,
    href: "#",
    cta: "View NLP Pipeline",
    className: "md:col-span-2",
    background: <div className="bg-blue-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Chatbot pipeline started..." },
      { type: "animated", content: "✔ Tokenization complete", delay: 1000 },
      {
        type: "animated",
        content: "✔ Entity recognition success",
        delay: 1500,
      },
      {
        type: "animated",
        content: "✔ Intent classified as 'order_status'",
        delay: 2000,
      },
      { type: "animated", content: "✔ Response generated", delay: 2500 },
      {
        type: "typing",
        content: "Bot: Your order is on the way!",
        delay: 3000,
      },
    ],
  },
  {
    name: "Database Migration Tool",
    description: "Schema management and data transformation system",
    Icon: Database,
    href: "#",
    cta: "View Transaction Flow",
    className: "md:col-span-2",
    background: <div className="bg-green-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Starting migration..." },
      { type: "animated", content: "✔ Connecting to database", delay: 1000 },
      { type: "animated", content: "✔ Validating schema", delay: 1500 },
      {
        type: "animated",
        content: "✔ Transforming data (users → clients)",
        delay: 2000,
      },
      {
        type: "animated",
        content: "✔ Migration committed (ACID)",
        delay: 2500,
      },
      {
        type: "typing",
        content: "Migration completed successfully.",
        delay: 3000,
      },
    ],
  },
  {
    name: "Portfolio Website",
    description: "Interactive portfolio with Next.js and Magic UI",
    Icon: Layers,
    href: "#",
    cta: "View Component Tree",
    className: "md:col-span-1",
    background: <div className="bg-purple-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Rendering components..." },
      { type: "animated", content: "├── Header", delay: 1000 },
      { type: "animated", content: "│   ├── Navigation", delay: 1300 },
      { type: "animated", content: "│   └── ThemeToggle", delay: 1600 },
      { type: "animated", content: "├── Projects", delay: 1900 },
      { type: "animated", content: "│   └── ProjectCard[]", delay: 2200 },
      { type: "animated", content: "└── Footer", delay: 2500 },
      { type: "typing", content: "Render complete.", delay: 3000 },
    ],
  },
  {
    name: "Image Processing API",
    description: "RESTful service for image manipulation and analysis",
    Icon: Image,
    href: "#",
    cta: "View Pipeline",
    className: "md:col-span-2",
    background: <div className="bg-pink-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Processing uploaded image..." },
      {
        type: "animated",
        content: "✔ Preprocessing (resize, normalize)",
        delay: 1000,
      },
      {
        type: "animated",
        content: "✔ Feature extraction (edges, contours)",
        delay: 1500,
      },
      { type: "animated", content: "✔ Color transformation", delay: 2000 },
      { type: "animated", content: "✔ Output generated (JPEG)", delay: 2500 },
      { type: "typing", content: "Image processed successfully.", delay: 3000 },
    ],
  },
  {
    name: "Web Scraping Tool",
    description: "Automated data extraction from websites",
    Icon: Globe,
    href: "#",
    cta: "View Request Lifecycle",
    className: "md:col-span-1",
    background: <div className="bg-amber-500 h-full w-full" />,
    terminalOutput: [
      { type: "typing", content: "> Scraping target site..." },
      { type: "animated", content: "✔ DNS lookup", delay: 1000 },
      { type: "animated", content: "✔ TCP handshake", delay: 1300 },
      { type: "animated", content: "✔ HTTP request sent", delay: 1600 },
      {
        type: "animated",
        content: "✔ HTML parsed (BeautifulSoup)",
        delay: 1900,
      },
      { type: "animated", content: "✔ Data extracted and stored", delay: 2200 },
      { type: "typing", content: "Scraping complete.", delay: 2600 },
    ],
  },
];

export const socialLinks: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "GitHub",
    href: "https://github.com/mohdsakib-KRAPTON",
    icon: <img src="/svg/github.svg" alt="GitHub" className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohdsakib001",
    icon: <img src="/svg/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mohdsakib001",
    icon: (
      <img
        src="/svg/twitter.svg"
        alt="Twitter"
        className="w-5 h-5 rounded-full "
      />
    ),
  },
];
