export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "CS Concepts" },
  { href: "#contact", label: "Contact" },
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
