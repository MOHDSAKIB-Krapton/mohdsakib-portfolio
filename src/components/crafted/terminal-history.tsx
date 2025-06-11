"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, KeyboardEvent } from "react";

type TerminalHistoryItem = {
  type: "input" | "output" | "error";
  text: string;
};

interface TerminalProps {
  history: TerminalHistoryItem[];
  prompt?: string;
  onSubmit: (command: string) => void;
  className?: string;
  autoFocus?: boolean;
  maxHistoryItems?: number;
}

export const Terminal = ({
  history = [],
  prompt = "user@terminal:~$",
  onSubmit,
  className,
  autoFocus = true,
  maxHistoryItems = 100,
}: TerminalProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLPreElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when component mounts
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle click anywhere in terminal to focus input
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Submit command
  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setCommandHistory((prev) => {
        const newHistory = [inputValue, ...prev];
        // Limit history size
        return newHistory.slice(0, maxHistoryItems);
      });
      setInputValue("");
      setHistoryIndex(-1);
      setCursorPosition(0);
    }
  };

  // Handle key press events
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navigate command history up
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        const historyCommand = commandHistory[newIndex];
        setInputValue(historyCommand);
        setCursorPosition(historyCommand.length);

        // Schedule cursor position update after React updates the DOM
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = historyCommand.length;
            inputRef.current.selectionEnd = historyCommand.length;
          }
        }, 0);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navigate command history down
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const historyCommand = commandHistory[newIndex];
        setInputValue(historyCommand);
        setCursorPosition(historyCommand.length);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = historyCommand.length;
            inputRef.current.selectionEnd = historyCommand.length;
          }
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
        setCursorPosition(0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion - you can enhance this with actual tab completion logic
      const newValue = inputValue + "  ";
      setInputValue(newValue);
      setCursorPosition(newValue.length);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newValue.length;
          inputRef.current.selectionEnd = newValue.length;
        }
      }, 0);
    }
  };

  // Track cursor position
  const handleSelectionChange = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Render history items with appropriate styling
  const renderHistoryItem = (item: TerminalHistoryItem, index: number) => {
    const colors = {
      input: "text-blue-400",
      output: "text-gray-200",
      error: "text-red-400",
    };

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid"
      >
        {item.type === "input" ? (
          <div className="flex flex-wrap gap-2">
            <span className="text-green-400">{prompt}</span>
            <span className={colors[item.type]}>{item.text}</span>
          </div>
        ) : (
          <div
            className={cn("whitespace-pre-wrap break-words", colors[item.type])}
          >
            {item.text}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={cn(
        "h-full w-full rounded-xl  overflow-hidden  flex flex-col",
        className
      )}
    >
      <div className="flex flex-row gap-x-2 px-4 py-2 border-b border-gray-800 bg-gray-800">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>

      <pre
        ref={containerRef}
        className="p-4 overflow-auto flex-1 font-mono text-sm"
      >
        <code className="grid gap-y-2 w-full">
          {/* Render terminal history */}
          {history.map(renderHistoryItem)}

          {/* Current input line */}
          <div className="flex flex-wrap gap-2 items-start">
            <span className="text-green-400 whitespace-nowrap">{prompt}</span>
            <div className="relative inline-block min-w-[1ch] flex-1">
              <span className="text-blue-400 whitespace-pre-wrap break-words">
                {inputValue.substring(0, cursorPosition)}
                {showCursor && (
                  <span className="absolute inline-block bg-blue-500 w-[0.6em] h-[1.2em] -ml-[0.3em] animate-pulse" />
                )}
                {inputValue.substring(cursorPosition)}
              </span>

              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onSelect={handleSelectionChange}
                onBlur={() => setShowCursor(false)}
                onFocus={() => setShowCursor(true)}
                className="absolute top-0 left-0 w-full h-full opacity-[0.01] resize-none overflow-hidden outline-none bg-transparent"
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                rows={1}
              />
            </div>
          </div>
        </code>
      </pre>
    </div>
  );
};

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <span className={cn("text-sm font-mono tracking-tight", className)}>
      {displayedText}
    </span>
  );
};
