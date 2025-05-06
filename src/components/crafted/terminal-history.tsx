import { terminalHistory } from "@/constants/data";
import { AnimatedSpan, Terminal, TypingAnimation } from "../magicui/terminal";

export function TerminalHistoryDemo() {
  return (
    <Terminal className="text-sm h-64 overflow-y-auto bg-black border border-gray-800 rounded-md p-4 text-white font-mono">
      {terminalHistory.map((entry, index) => {
        const delay = index * 1000;

        if (entry.type === "input") {
          return (
            <TypingAnimation key={index} delay={delay}>
              {`portfolio@server:~$ ${entry.text}`}
            </TypingAnimation>
          );
        }

        return (
          <AnimatedSpan
            key={index}
            delay={delay}
            className="text-gray-300 whitespace-pre-wrap"
          >
            {entry.text}
          </AnimatedSpan>
        );
      })}
    </Terminal>
  );
}
