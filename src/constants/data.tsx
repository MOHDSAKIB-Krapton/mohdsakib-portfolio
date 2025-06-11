import {
  Layout,
  MessageSquare,
  Database,
  Layers,
  Image,
  Globe,
} from "lucide-react";
import { Project, Skill } from "./data.types";

export const navLinks = [
  { href: "/skills", label: "Skills" },
  { href: "/cs-concept", label: "CS Concepts" },
  { href: "/github", label: "Github Overview" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
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
    icon: (
      <img
        src="/svg/github.svg"
        alt="GitHub"
        title="GitHub"
        loading="lazy"
        className="w-7 h-7"
      />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohdsakib001",
    icon: (
      <img
        src="/svg/linkedin.svg"
        alt="LinkedIn"
        title="LinkedIn"
        loading="lazy"
        className="w-8 h-8"
      />
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mohdsakib001",
    icon: (
      <img
        src="/svg/twitter.svg"
        alt="Twitter"
        title="Twitter"
        loading="lazy"
        className="w-7 h-7 rounded-full "
      />
    ),
  },
];

export const bigOExamples = [
  { complexity: "O(1)", meaning: "Constant Time - direct lookup" },
  { complexity: "O(log n)", meaning: "Logarithmic Time - binary search" },
  { complexity: "O(n)", meaning: "Linear Time - array traversal" },
  {
    complexity: "O(n log n)",
    meaning: "Efficient Sort - mergesort, heapsort",
  },
  { complexity: "O(n²)", meaning: "Nested Loops - bubble sort" },
];

export const initialBlogs = [
  {
    id: 1,
    title: "Mastering Edge AI: Deploying Machine Learning at the Edge in 2025",
    summary:
      "Edge AI is no longer a buzzword—it's the new frontier of real-time, secure, and efficient computing. This blog dives deep into how developers can train, optimize, and deploy models to edge devices using 2025's latest toolchains.",
    content: [
      "Edge AI is revolutionizing how applications respond in real-time. In 2025, with the exponential rise in smart devices and IoT ecosystems, developers are shifting from centralized cloud models to deploying AI directly on edge hardware. This shift reduces latency, ensures better data privacy, and enhances performance, especially in mission-critical applications like autonomous vehicles, smart surveillance, remote healthcare, and real-time predictive maintenance.",

      "Deploying AI on the edge requires a fundamentally different approach compared to traditional cloud setups. Developers must meticulously account for hardware constraints such as limited memory, restricted processing power, energy efficiency, and harsh environmental conditions. Toolchains like TensorFlow Lite, OpenVINO, Apple’s CoreML, Google's Coral, and NVIDIA’s Jetson SDK have significantly matured by 2025. These tools facilitate seamless model quantization, pruning, compilation, and hardware-specific optimization, enabling robust AI deployments even on ultra-low-power devices.",

      "Real-time model updates present another critical challenge for Edge AI systems. Continuous deployment at the edge demands sophisticated over-the-air (OTA) update mechanisms, alongside comprehensive rollback and fail-safe strategies. With GitOps-inspired workflows emerging as standard, development teams now orchestrate massive fleets of edge devices similarly to managing Kubernetes clusters—leveraging declarative deployment approaches, strict security policies, and built-in observability frameworks like Prometheus and Grafana, thus streamlining maintenance and ensuring operational stability.",

      "Security becomes paramount as AI models run outside traditional centralized data centers, exponentially increasing attack surfaces. In 2025, robust security practices encompass encrypted model weights, secure enclaves (such as ARM TrustZone and Intel SGX), and AI-driven anomaly detection mechanisms. Additionally, advancements in federated learning enable organizations to train AI models collaboratively on decentralized data sets without compromising data privacy, significantly reducing data transit vulnerabilities.",

      "Numerous industry leaders, including Tesla, Siemens, and Medtronic, have successfully deployed advanced Edge AI solutions. Tesla's autonomous systems locally analyze vast sensor arrays in real-time, optimizing safety decisions. Siemens employs Edge AI in industrial IoT for predictive maintenance, drastically reducing downtime. In healthcare, Medtronic utilizes edge-driven analytics for rapid diagnosis in remote areas. Furthermore, open-source communities such as EdgeImpulse, RedHat Device Edge, and Linux Foundation's LF Edge have democratized access to cutting-edge tools, accelerating innovation and reducing barriers for startups and smaller enterprises.",

      "Looking forward, the convergence of ultra-fast 5G/6G networks with Edge AI architectures will blur distinctions between edge, cloud, and hybrid computing. Developers must adeptly navigate hybrid environments, construct resilient inference pipelines capable of seamless fallback and recovery, and master unified frameworks supporting deployments across diverse hardware architectures, including ARM, x86, and emerging platforms like RISC-V.",

      "Ultimately, Edge AI represents more than performance optimization—it signifies a transformative architectural paradigm shift. Developers and organizations adapting swiftly to this new frontier will spearhead the next generation of intelligent, responsive, and secure digital solutions, reshaping industries and redefining what's achievable at the edge.",
    ],
    category: "AI",
    tags: ["Edge AI", "Machine Learning", "Deployment", "IoT", "Privacy"],
    imageUrl:
      "https://images.pexels.com/photos/12367694/pexels-photo-12367694.jpeg",
    extraImages: [
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
    ],
    date: "June 11, 2025",
    readTime: 10,
  },
  {
    id: 2,
    title: "Quantum Computing in 2025: The Next Frontier for Developers",
    summary:
      "Quantum computing has transitioned from theoretical promise to practical application. This blog covers what software developers must know in 2025 about quantum frameworks, real-world use-cases, and the skills required to engage in quantum-enabled projects.",
    content: [
      "Quantum computing, once considered purely theoretical, has reached practical usability in 2025. Developers now integrate quantum algorithms with classical workflows, achieving breakthroughs in cryptography, optimization, machine learning, and scientific simulations. The advent of robust quantum frameworks like IBM's Qiskit, Google's Cirq, and Microsoft's Azure Quantum allows software teams to experiment with quantum applications efficiently.",

      "Quantum algorithms differ fundamentally from classical counterparts. Developers must understand core quantum concepts such as superposition, entanglement, and quantum decoherence. Training in languages tailored for quantum programming like Q#, OpenQASM, and Python-based quantum frameworks is increasingly critical. Advanced quantum hardware by IBM, Google, IonQ, and Rigetti offers cloud-based platforms for developers to prototype solutions without upfront hardware investments.",

      "Real-world applications of quantum computing in 2025 include pharmaceutical research, logistics optimization, financial modeling, and cybersecurity. Financial institutions employ quantum algorithms to optimize complex portfolios and risk modeling. Logistics companies leverage quantum optimization for real-time routing solutions, significantly reducing operational costs. Pharmaceutical giants use quantum simulations to accelerate drug discovery, drastically shortening research timelines.",

      "However, quantum computing presents distinct security challenges. Post-quantum cryptography has emerged to counter quantum-enabled threats, prompting developers to adopt new cryptographic standards proactively. Integrating quantum-safe algorithms like lattice-based cryptography and hash-based signatures becomes mandatory to secure sensitive data against quantum decryption.",

      "Looking ahead, quantum software development is likely to follow hybrid models, seamlessly combining classical computing with quantum co-processors. Frameworks and APIs facilitating easy integration will become the standard toolkit for software developers, requiring adaptability and continuous learning.",

      "In conclusion, quantum computing represents a radical shift in software development paradigms. Developers equipped with quantum literacy and a deep understanding of its capabilities and limitations will lead technological advances in industries previously bound by classical computational limits.",
    ],
    category: "Quantum Computing",
    tags: ["Quantum Computing", "Cryptography", "Optimization", "Future Tech"],
    imageUrl:
      "https://images.pexels.com/photos/5471149/pexels-photo-5471149.jpeg",
    extraImages: [
      "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
      "https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg",
      "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
    ],
    date: "June 12, 2025",
    readTime: 10,
  },
  {
    id: 3,
    title: "Securing Modern Web Applications: Adopting Zero Trust in 2025",
    summary:
      "In an era where cyber threats continuously evolve, Zero Trust has emerged as the security framework of choice. This blog explains the implementation and best practices of Zero Trust in protecting web applications in 2025.",
    content: [
      "Cybersecurity threats have escalated dramatically, prompting the widespread adoption of the Zero Trust security model by 2025. Unlike traditional perimeter-based security, Zero Trust operates under the assumption that threats exist both inside and outside network boundaries, advocating for continuous verification and limited access privileges.",

      "Implementing Zero Trust requires a comprehensive rethinking of web application architecture. Developers must integrate multifactor authentication (MFA), continuous adaptive risk assessments, micro-segmentation, and strict least-privilege access controls into their design. Emerging standards and platforms like Google's BeyondCorp, Microsoft's Zero Trust framework, and open-source tools have streamlined the adoption of these practices.",

      "A critical aspect of Zero Trust architecture is identity management. In 2025, decentralized identity and robust identity-as-a-service (IDaaS) solutions are commonplace, ensuring secure yet frictionless user experiences. Developers utilize advanced protocols such as OAuth 3.0, OpenID Connect 2.0, and WebAuthn to ensure secure authentication and authorization processes.",

      "Furthermore, advanced analytics and real-time monitoring tools powered by AI have become integral to Zero Trust environments. Machine learning-driven anomaly detection enables swift response to breaches and proactive identification of vulnerabilities, significantly enhancing the security posture of web applications. Platforms like Datadog, Splunk, and Palo Alto Networks provide robust solutions for visibility and analytics, deeply integrated into application pipelines.",

      "Real-world cases illustrate the efficacy of Zero Trust implementations. Banks, healthcare providers, and government agencies have drastically reduced breach impacts through rigorous adherence to Zero Trust principles. Continuous verification, automated threat responses, and rigorous auditing mechanisms ensure compliance and reduce risk significantly.",

      "Looking forward, the Zero Trust model will become even more sophisticated, integrating seamlessly with cloud-native architectures and edge computing environments. Developers need ongoing training and awareness to leverage emerging tools effectively and continuously adapt their strategies against evolving threats.",

      "Ultimately, embracing Zero Trust represents an essential strategic shift for developers and organizations aiming to secure their applications and data comprehensively. By embedding Zero Trust principles into every stage of application development, teams ensure security resilience and adaptability in an increasingly interconnected and hazardous digital landscape.",
    ],
    category: "Security",
    tags: [
      "Zero Trust",
      "Cybersecurity",
      "Web Security",
      "DevSecOps",
      "Privacy",
    ],
    imageUrl:
      "https://images.pexels.com/photos/11035377/pexels-photo-11035377.jpeg",
    extraImages: [
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
      "https://images.pexels.com/photos/3197390/pexels-photo-3197390.jpeg",
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
    ],
    date: "June 13, 2025",
    readTime: 10,
  },
];
