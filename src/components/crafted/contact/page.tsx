"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Terminal } from "@/components/magicui/terminal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Container from "@/components/common/container/page";
import EmailServices from "@/services/email/page";

// FSM States
enum FSMStates {
  IDLE = "idle",
  VALIDATING = "validating",
  PROCESSING = "processing",
  SUCCESS = "success",
  ERROR = "error",
}

// Hardcoded Text Content
const CONSTANTS = {
  heading: "Get In Touch",
  subText:
    "This contact form demonstrates a Finite State Machine - a fundamental concept in computer science for managing complex state transitions and process flow.",
  fsmExplanation:
    "A Finite State Machine (FSM) is a mathematical model used in computer science and many other fields to design systems that can be in exactly one of a finite number of states at any given time.",
  fsmConcepts: [
    "• States: Idle, Validating, Processing, Success, Error",
    "• Transitions: Rules for moving between states",
    "• Events: User actions that trigger transitions",
    "• Actions: Operations performed during transitions",
  ],
};

// FSM State Transition Logic
function getNextState(current: FSMStates, action: FSMStates): FSMStates {
  switch (current) {
    case FSMStates.IDLE:
      return action === FSMStates.VALIDATING ? FSMStates.VALIDATING : current;
    case FSMStates.VALIDATING:
      return [FSMStates.PROCESSING, FSMStates.ERROR].includes(action)
        ? action
        : current;
    case FSMStates.PROCESSING:
      return [FSMStates.SUCCESS, FSMStates.ERROR].includes(action)
        ? action
        : current;
    case FSMStates.SUCCESS:
    case FSMStates.ERROR:
      return action === FSMStates.IDLE ? FSMStates.IDLE : current;
    default:
      return current;
  }
}

export default function ContactFSMSection() {
  const [formState, setFormState] = useState<FSMStates>(FSMStates.IDLE);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [stateHistory, setStateHistory] = useState<FSMStates[]>([
    FSMStates.IDLE,
  ]);
  const [stateExplanation, setStateExplanation] = useState(
    "Form ready for input."
  );

  const updateState = (action: FSMStates) => {
    setFormState((prev) => {
      const next = getNextState(prev, action);
      setStateHistory((h) => [...h, next]);
      setStateExplanation(getExplanation(next));
      return next;
    });
  };

  const getExplanation = (state: FSMStates) => {
    switch (state) {
      case FSMStates.VALIDATING:
        return "Validating form inputs...";
      case FSMStates.PROCESSING:
        return "Inputs valid! Sending your message...";
      case FSMStates.SUCCESS:
        return "Message sent successfully!";
      case FSMStates.ERROR:
        return "Something went wrong. Please try again.";
      default:
        return "Form ready for input.";
    }
  };

  const validateInputs = () => {
    return name.trim() && email.trim().includes("@") && message.trim();
  };

  const handleSubmit = async () => {
    updateState(FSMStates.VALIDATING);
    await new Promise((res) => setTimeout(res, 1000));

    if (!validateInputs()) return updateState(FSMStates.ERROR);

    updateState(FSMStates.PROCESSING);
    await new Promise((res) => setTimeout(res, 500));

    const success = await EmailServices.sendEmails(name, email, message);
    updateState(success ? FSMStates.SUCCESS : FSMStates.ERROR);

    setName("");
    setEmail("");
    setMessage("");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStateHistory([FSMStates.IDLE]);
    updateState(FSMStates.IDLE);
  };

  const getTerminalContent = useMemo(() => {
    switch (formState) {
      case FSMStates.IDLE:
        return ["Contact Form FSM initialized", "Waiting for input..."];
      case FSMStates.VALIDATING:
        return [
          "Checking name...",
          "Verifying email...",
          "Scanning message...",
        ];
      case FSMStates.PROCESSING:
        return ["Inputs valid ✓", "Connecting to server...", "Sending data..."];
      case FSMStates.SUCCESS:
        return ["✅ Message sent!", "Thank you for reaching out."];
      case FSMStates.ERROR:
        return validateInputs()
          ? ["❌ Server error. Please try again."]
          : ["❌ Input validation failed."];
      default:
        return ["Loading..."];
    }
  }, [formState]);

  const isEditable =
    formState === FSMStates.IDLE || formState === FSMStates.ERROR;
  const isProcessing =
    formState === FSMStates.VALIDATING || formState === FSMStates.PROCESSING;

  return (
    <Container>
      <section className="w-full text-white relative py-12" id="contact">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {CONSTANTS.heading}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-[80%] mx-auto">
            {CONSTANTS.subText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM SECTION */}
          <div className="p-6 backdrop-blur-sm bg-black/20 rounded-lg relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
            <p className="text-gray-400 mb-6">
              Current State:{" "}
              <span className="text-blue-400 font-medium">
                {formState.toUpperCase()}
              </span>
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditable}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditable}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!isEditable}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                />
              </div>

              {isEditable && (
                <InteractiveHoverButton
                  onClick={handleSubmit}
                  className="text-black"
                >
                  Send Message
                </InteractiveHoverButton>
              )}

              {isProcessing && (
                <button
                  disabled
                  className="w-full py-3 px-6 text-white bg-blue-600 opacity-75 rounded-md cursor-not-allowed"
                >
                  Processing...
                </button>
              )}

              {formState === FSMStates.SUCCESS && (
                <InteractiveHoverButton
                  onClick={resetForm}
                  className="text-black"
                >
                  Send Another Message
                </InteractiveHoverButton>
              )}
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p className="mb-2">{stateExplanation}</p>
              <p className="text-xs">
                State History:{" "}
                {stateHistory.map((s) => s.toUpperCase()).join(" → ")}
              </p>
            </div>
          </div>

          {/* TERMINAL + INFO SECTION */}
          <div className="backdrop-blur-sm bg-black/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Finite State Machine Visualization
            </h3>
            <p className="text-gray-400 mb-4">
              Watch the FSM process your form submission through different
              states
            </p>

            <div className="h-64 mb-6">
              <Terminal className="backdrop-blur-sm bg-black/20 rounded-lg border-0">
                {getTerminalContent.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </Terminal>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-3">
                What is a Finite State Machine?
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                {CONSTANTS.fsmExplanation}
              </p>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="text-sm font-medium mb-2">
                  Key FSM Concepts Demonstrated:
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  {CONSTANTS.fsmConcepts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
