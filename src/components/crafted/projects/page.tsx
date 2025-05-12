// "use client";

// import { useState } from "react";
// import {
//   ArrowRight,
//   Cloud,
//   Code,
//   File,
//   FileText,
//   MessageCircle,
//   MessageCircleMore,
//   Sparkles,
//   User,
// } from "lucide-react";
// import { DynamicBeamLayout } from "../animated-beam-network";
// import { BlurFade } from "@/components/magicui/blur-fade";
// import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
// import { projects } from "@/constants/data";
// import {
//   AnimatedSpan,
//   Terminal,
//   TypingAnimation,
// } from "@/components/magicui/terminal";
// import { Project } from "@/constants/data.types";
// import Container from "@/components/common/container/page";

// export default function ProjectsSection() {
//   const [activeProject, setActiveProject] = useState<Project | null>(null);
//   const [terminalOpen, setTerminalOpen] = useState(false);
//   const [terminalContent, setTerminalContent] = useState("");

//   // CS Concept: State Machines
//   // This section uses the concept of finite state machines where
//   // the UI transforms between various states based on user input

//   // CS Concept: Event Handling
//   const handleProjectClick = (project: any) => {
//     setActiveProject(project);
//     setTerminalContent(project.terminalCommand);
//     setTerminalOpen(true);
//   };

//   const handleTerminalClose = () => {
//     setTerminalOpen(false);
//   };

//   const nodes = [
//     { id: "googleDrive", icon: <Cloud />, column: 0 },
//     { id: "docs", icon: <FileText />, column: 0 },
//     { id: "whatsapp", icon: <MessageCircleMore />, column: 0 },
//     { id: "messenger", icon: <MessageCircle />, column: 0 },
//     { id: "notion", icon: <File />, column: 0 },
//     { id: "openai", icon: <Sparkles />, column: 1 },
//     { id: "user", icon: <User />, column: 2 },
//   ];

//   const connections = [
//     { from: "drive", to: "openai" },
//     { from: "docs", to: "openai" },
//     { from: "whatsapp", to: "openai" },
//     { from: "messenger", to: "openai" },
//     { from: "notion", to: "openai" },
//     { from: "openai", to: "user" },
//   ];

//   return (
//     <Container>
//       <div className="relative w-full">
//         <DynamicBeamLayout nodes={nodes} connections={connections} />

//         <div className="max-w-7xl mx-auto mb-16">
//           <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
//           <p className="text-gray-400 text-lg mb-8">
//             Explore my work through the lens of computational state transitions
//           </p>

//           <BlurFade>
//             {/* <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
//             {projects.map((project, i) => (
//               <BentoCard
//                 key={i}
//                 title={project.title}
//                 description={project.description}
//                 // Icon={project.icon}

//                 className={`cursor-pointer transition-all duration-300 ${
//                   project.className
//                 } ${activeProject === project ? "ring-2 ring-blue-500" : ""}`}
//                 onClick={() => handleProjectClick(project)}
//               >
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="flex items-center text-sm">
//                     <Code className="w-4 h-4 mr-1 text-gray-400" />
//                     <span className="text-gray-400">View CS Concept</span>
//                   </div>
//                   <ArrowRight className="w-4 h-4 text-gray-400" />
//                 </div>
//               </BentoCard>
//             ))}
//           </BentoGrid> */}
//             <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
//               {projects.map((project, i) => (
//                 <BentoCard
//                   key={i}
//                   name={project.name}
//                   description={project.description}
//                   Icon={project.Icon}
//                   background={project.background}
//                   href={project.href}
//                   cta={project.cta}
//                   className={`cursor-pointer transition-all duration-300 ${
//                     activeProject === project ? "ring-2 ring-blue-500" : ""
//                   }`}
//                   onClick={() => handleProjectClick(project)}
//                 />
//               ))}
//             </BentoGrid>
//           </BlurFade>

//           {terminalOpen && activeProject && (
//             <div className="mt-8">
//               <Terminal className="h-fit">
//                 {activeProject.terminalOutput.map((line: any, idx: number) =>
//                   line.type === "typing" ? (
//                     <TypingAnimation
//                       key={idx}
//                       delay={line.delay || idx * 1000}
//                       className={line.color || "text-muted-foreground"}
//                     >
//                       {line.content}
//                     </TypingAnimation>
//                   ) : (
//                     <AnimatedSpan
//                       key={idx}
//                       delay={line.delay || idx * 1000}
//                       className={line.color || "text-green-500"}
//                     >
//                       {line.content}
//                     </AnimatedSpan>
//                   )
//                 )}
//               </Terminal>
//             </div>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  Code,
  FileText,
  RefreshCw,
  Search,
  Tag,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Container from "@/components/common/container/page";
import { Button } from "@/components/ui/button";

// Blog data fetching service
const BlogService = {
  // Function to fetch blog content using Gemini API
  async generateBlogContent(topic: any) {
    try {
      // Replace with your actual Gemini API implementation
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error("Failed to generate blog content");
      return await response.json();
    } catch (error) {
      console.error("Error generating blog content:", error);
      return null;
    }
  },

  // Function to fetch images from Pexels API
  async fetchImage(query: string) {
    try {
      // Replace with your actual Pexels API implementation
      const response = await fetch("/api/fetch-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to fetch image");
      return await response.json();
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  },

  // Function to fetch trending tech topics
  async fetchTrendingTopics() {
    try {
      // Replace with your actual API implementation for trending topics
      const response = await fetch("/api/trending-topics");
      if (!response.ok) throw new Error("Failed to fetch trending topics");
      return await response.json();
    } catch (error) {
      console.error("Error fetching trending topics:", error);
      return [
        "AI Ethics",
        "Web Development",
        "Blockchain",
        "Machine Learning",
        "Quantum Computing",
      ];
    }
  },
};

// Blog Card Component
const BlogCard = ({ blog, onClick }: { blog: any; onClick: any }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={() => onClick(blog)}
    >
      <div className="relative overflow-hidden rounded-xl h-48 mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-20">
          {/* <Badge className="bg-blue-500 hover:bg-blue-600">
            {blog.category}
          </Badge> */}
          <div className="bg-blue-500 hover:bg-blue-600">{blog.category}</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
        {blog.title}
      </h3>

      <p className="text-gray-400 mb-3 line-clamp-3">{blog.summary}</p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{blog.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{blog.readTime} min read</span>
        </div>
      </div>
    </motion.div>
  );
};

// Blog Detail View Component
const BlogDetailView = ({ blog, onClose }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 overflow-auto"
    >
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="relative h-80">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
          >
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
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 hover:bg-blue-600">{blog.category}</div>
            {/* <Badge className="bg-blue-500 hover:bg-blue-600">
              {blog.category}
            </Badge> */}
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {blog.date}
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" /> {blog.readTime} min read
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">{blog.title}</h2>

          <div className="prose prose-invert max-w-none">
            {blog.content
              .split("\n\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-300">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string, index: number) => (
                <div
                  key={index}
                  // variant="outline"
                  className="text-gray-400 border-gray-700"
                >
                  {tag}
                </div>
                // <Badge
                //   key={index}
                //   variant="outline"
                //   className="text-gray-400 border-gray-700"
                // >
                //   {tag}
                // </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button variant="ghost" className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" /> Like this article
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                Share <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Blog Generation Panel Component
const BlogGenerationPanel = ({ onBlogGenerated }: any) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await BlogService.fetchTrendingTopics();
      setTrendingTopics(topics);
    };

    fetchTopics();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      // Generate blog content
      const blogData = await BlogService.generateBlogContent(topic);
      if (!blogData) throw new Error("Failed to generate blog");

      // Fetch related image
      const imageData = await BlogService.fetchImage(topic);
      if (!imageData) throw new Error("Failed to fetch image");

      // Create complete blog object
      const newBlog = {
        ...blogData,
        imageUrl: imageData.url,
        date: new Date().toLocaleDateString(),
        readTime: Math.floor(Math.random() * 8) + 3, // 3-10 min read time
      };

      onBlogGenerated(newBlog);
    } catch (error) {
      console.error("Error generating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-8">
      <div className="flex items-center gap-2 text-white mb-4">
        <Zap className="w-5 h-5 text-yellow-400" />
        <h3 className="text-xl font-bold">Generate New Blog Post</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <input
            placeholder="Enter a topic or keyword"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
          {/* <Input
            placeholder="Enter a topic or keyword"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-gray-800 border-gray-700"
          /> */}
        </div>

        <div className="md:col-span-1">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded"
          >
            <option disabled value="">
              Trending Topics
            </option>
            {trendingTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          {/* <Select onValueChange={(value) => setTopic(value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Trending Topics" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {trendingTopics.map((topic, index) => (
                <SelectItem key={index} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <div className="md:col-span-1">
          <Button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Blog Section Component
export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample blog data for initial state
  const initialBlogs = [
    {
      id: 1,
      title: "The Rise of AI-Generated Content in Modern Web Development",
      summary:
        "Exploring how AI is transforming content creation for developers and designers in 2025.",
      content:
        "AI-generated content is revolutionizing how developers approach web projects. With tools like Gemini and other large language models, the process of creating engaging website copy, blog posts, and even functional code has been streamlined significantly.\n\nIn this article, we explore the practical applications of AI content generation in modern web development workflows. From automatically creating blog posts to generating placeholder content during development phases, AI tools are becoming an essential part of the developer's toolkit.\n\nHowever, there are important considerations regarding the quality and uniqueness of AI-generated content. While these tools excel at producing grammatically correct and contextually relevant text, there's still a need for human oversight to ensure brand voice consistency and factual accuracy.\n\nLooking ahead, we can expect even more sophisticated integration between AI content generation and web development frameworks, potentially leading to fully automated content management systems that can update themselves based on user behavior and trending topics.",
      category: "AI",
      tags: ["AI", "Web Development", "Content Creation", "Automation"],
      imageUrl:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      date: "May 12, 2025",
      readTime: 5,
    },
    {
      id: 2,
      title: "Building Resilient Microservices with Event-Driven Architecture",
      summary:
        "Learn how event-driven design patterns can enhance your microservices implementation.",
      content:
        "Microservices architecture continues to evolve, and one of the most powerful patterns emerging in 2025 is the integration of event-driven design principles. This approach fundamentally changes how services communicate, moving from direct request-response patterns to a more decoupled model based on events.\n\nEvent-driven architecture (EDA) allows microservices to publish events when something noteworthy happens without needing to know which services will consume these events. This creates a highly resilient system where failure in one service doesn't necessarily impact others.\n\nIn this article, we explore practical implementation strategies for EDA in microservices environments. We cover event sourcing, CQRS (Command Query Responsibility Segregation), and various message broker options like Kafka, RabbitMQ, and cloud-native solutions.\n\nReal-world case studies demonstrate how companies have achieved significant improvements in scalability and reliability by adopting these patterns. The article also addresses common challenges in implementing event-driven microservices and strategies to overcome them.",
      category: "Backend",
      tags: ["Microservices", "Architecture", "Event-Driven", "Scalability"],
      imageUrl:
        "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg",
      date: "May 10, 2025",
      readTime: 7,
    },
    {
      id: 3,
      title: "Web Assembly in 2025: Beyond the Browser",
      summary:
        "Discover how WASM is expanding beyond browsers into servers, mobile, and IoT applications.",
      content:
        "Web Assembly (WASM) has transcended its original purpose as a browser technology and is now making significant inroads into server-side computing, mobile development, and even IoT applications. This shift represents a major evolution in how we think about cross-platform code execution.\n\nIn this comprehensive analysis, we examine the current state of WASM in 2025 and explore its expanded ecosystem. We look at how frameworks like Wasmer, Wasmtime, and WASI have matured to enable WASM modules to run efficiently in diverse environments beyond the browser.\n\nParticularly interesting is the adoption of WASM in edge computing scenarios, where its lightweight nature and security sandboxing provide significant advantages. Several major cloud providers now offer WASM runtimes as first-className deployment targets for edge functions.\n\nThe article also covers performance benchmarks comparing WASM to native code and container-based deployments across different use cases. We conclude with a look at the developing standards and tooling that are helping to drive WASM adoption across the industry.",
      category: "WebDev",
      tags: ["WebAssembly", "Edge Computing", "Performance", "Cross-platform"],
      imageUrl:
        "https://images.pexels.com/photos/11035481/pexels-photo-11035481.jpeg",
      date: "May 8, 2025",
      readTime: 6,
    },
  ];

  // Load initial blogs
  useEffect(() => {
    // Simulating API fetch with a delay
    const timer = setTimeout(() => {
      setBlogs(initialBlogs as any);
      setFilteredBlogs(initialBlogs as any);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = blogs;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (blog: any) =>
          blog.title.toLowerCase().includes(query) ||
          blog.summary.toLowerCase().includes(query) ||
          blog.tags.some((tag: any) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      results = results.filter((blog: any) => blog.category === activeCategory);
    }

    setFilteredBlogs(results);
  }, [searchQuery, activeCategory, blogs]);

  // Get unique categories from blogs
  const categories = [
    "All",
    ...new Set(blogs.map((blog: any) => blog.category)),
  ];

  // Handle blog click
  const handleBlogClick = (blog: any) => {
    setSelectedBlog(blog);
  };

  // Handle blog generation
  const handleBlogGenerated = (newBlog: any) => {
    const updatedBlogs = [
      {
        ...newBlog,
        id: blogs.length + 1,
      },
      ...blogs,
    ];
    setBlogs(updatedBlogs as any);
    setFilteredBlogs(updatedBlogs as any);
  };

  return (
    <Container>
      <div className="relative w-full py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Tech Insights
              </h2>
              <p className="text-gray-400 text-lg">
                Daily updates on the latest tech trends and innovations
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <FileText className="text-blue-500 w-6 h-6" />
              <span className="text-gray-300 font-medium">
                {blogs.length} Articles
              </span>
            </div>
          </div>

          {/* Blog Generation Panel */}
          <BlogGenerationPanel onBlogGenerated={handleBlogGenerated} />

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
              {/* <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              /> */}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-700 text-gray-400 hover:text-white"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <BlurFade>
            {loading ? (
              // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              //   {[1, 2, 3, 4, 5, 6].map((item) => (
              //     <div key={item} className="space-y-4">
              //       <Skeleton className="h-48 w-full rounded-xl" />
              //       <Skeleton className="h-6 w-3/4" />
              //       <Skeleton className="h-4 w-full" />
              //       <Skeleton className="h-4 w-5/6" />
              //       <div className="flex justify-between">
              //         <Skeleton className="h-4 w-1/4" />
              //         <Skeleton className="h-4 w-1/4" />
              //       </div>
              //     </div>
              //   ))}
              // </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="h-48 w-full rounded-xl bg-gray-700 animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {filteredBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog: any) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        onClick={handleBlogClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-400 max-w-md">
                      We couldn't find any articles matching your search
                      criteria. Try adjusting your search or generate a new blog
                      post.
                    </p>
                  </div>
                )}
              </>
            )}
          </BlurFade>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetailView
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </Container>
  );
}

// API Route for Blog Generation (create this file at /app/api/generate-blog/route.js)
// export async function POST(request) {
//   const { topic } = await request.json();
//
//   try {
//     // Replace with your actual Gemini API implementation
//     const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-goog-api-key': process.env.GEMINI_API_KEY,
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Generate a technical blog post about ${topic}. Include a title, summary,
//                       main content with paragraphs, and 4-5 relevant tags. Format as JSON.`,
//               },
//             ],
//           },
//         ],
//       }),
//     });
//
//     const data = await response.json();
//
//     // Process the response and extract structured blog data
//     const blogContent = JSON.parse(data.candidates[0].content.parts[0].text);
//
//     return new Response(JSON.stringify(blogContent), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error generating blog content:', error);
//     return new Response(JSON.stringify({ error: 'Failed to generate blog content' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// API Route for Fetching Images (create this file at /app/api/fetch-image/route.js)
// export async function POST(request) {
//   const { query } = await request.json();
//
//   try {
//     // Replace with your actual Pexels API implementation
//     const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
//       headers: {
//         'Authorization': process.env.PEXELS_API_KEY,
//       },
//     });
//
//     const data = await response.json();
//
//     if (data.photos && data.photos.length > 0) {
//       return new Response(JSON.stringify({ url: data.photos[0].src.large }), {
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } else {
//       // Fallback image if no results
//       return new Response(JSON.stringify({
//         url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg'
//       }), {
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     return new Response(JSON.stringify({
//       error: 'Failed to fetch image',
//       url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg'
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// API Route for Trending Topics (create this file at /app/api/trending-topics/route.js)
// export async function GET() {
//   try {
//     // In a real implementation, you might fetch these from a news API or other source
//     const trendingTopics = [
//       "AI Ethics",
//       "Web Development",
//       "Blockchain",
//       "Machine Learning",
//       "Quantum Computing",
//       "Edge Computing",
//       "Cybersecurity",
//       "AR/VR",
//       "Cloud Native",
//       "DevOps"
//     ];
//
//     return new Response(JSON.stringify(trendingTopics), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching trending topics:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch trending topics' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
