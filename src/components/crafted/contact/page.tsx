"use client";

import React, { useState, useEffect } from "react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Terminal } from "@/components/magicui/terminal";

export default function ContactFSMSection() {
  // FSM states for our contact form
  const STATES = {
    IDLE: "idle",
    VALIDATING: "validating",
    PROCESSING: "processing",
    SUCCESS: "success",
    ERROR: "error",
  };

  // Current state of our FSM
  const [formState, setFormState] = useState(STATES.IDLE);

  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // For visualizing the state machine
  const [stateHistory, setStateHistory] = useState([STATES.IDLE]);
  const [stateExplanation, setStateExplanation] = useState("");

  // FSM transition function
  const transition = (currentState: any, action: any) => {
    // Record state history for visualization
    setStateHistory((prev) => [...prev, action]);

    // State transition logic
    switch (currentState) {
      case STATES.IDLE:
        if (action === STATES.VALIDATING) {
          setStateExplanation(
            "Validating form inputs for correctness and security..."
          );
          return STATES.VALIDATING;
        }
        break;

      case STATES.VALIDATING:
        if (action === STATES.PROCESSING) {
          setStateExplanation("Inputs validated! Processing submission...");
          return STATES.PROCESSING;
        }
        if (action === STATES.ERROR) {
          setStateExplanation("Validation failed! Please check your inputs.");
          return STATES.ERROR;
        }
        break;

      case STATES.PROCESSING:
        if (action === STATES.SUCCESS) {
          setStateExplanation("Message successfully sent!");
          return STATES.SUCCESS;
        }
        if (action === STATES.ERROR) {
          setStateExplanation("Server error occurred during processing.");
          return STATES.ERROR;
        }
        break;

      case STATES.SUCCESS:
      case STATES.ERROR:
        if (action === STATES.IDLE) {
          setStateExplanation("Form reset to initial state.");
          return STATES.IDLE;
        }
        break;
    }

    // If no valid transition, stay in current state
    return currentState;
  };

  // Validate inputs (simple example)
  const validateInputs = () => {
    if (!name.trim()) return false;
    if (!email.trim() || !email.includes("@")) return false;
    if (!message.trim()) return false;
    return true;
  };

  // Handle form submission through FSM transitions
  const handleSubmit = () => {
    // Transition to validating state
    setFormState(transition(formState, STATES.VALIDATING));

    // Simulate validation process
    setTimeout(() => {
      if (validateInputs()) {
        // Valid inputs - move to processing
        setFormState(transition(formState, STATES.PROCESSING));

        // Simulate server processing
        setTimeout(() => {
          // 90% chance of success for demo purposes
          if (Math.random() < 0.9) {
            setFormState(transition(formState, STATES.SUCCESS));
          } else {
            setFormState(transition(formState, STATES.ERROR));
          }
        }, 2000);
      } else {
        // Invalid inputs
        setFormState(transition(formState, STATES.ERROR));
      }
    }, 1500);
  };

  // Reset the form
  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFormState(transition(formState, STATES.IDLE));
    setStateHistory([STATES.IDLE]);
    setStateExplanation("Form ready for input.");
  };

  // Initialize state explanation on component mount
  useEffect(() => {
    setStateExplanation("Form ready for input.");
  }, []);

  // Get the appropriate terminal display text based on current state
  const getTerminalContent = () => {
    switch (formState) {
      case STATES.IDLE:
        return [
          "Contact Form FSM initialized",
          "Current State: IDLE",
          "Waiting for user input...",
        ];
      case STATES.VALIDATING:
        return [
          "Current State: VALIDATING",
          "Checking name format...",
          "Verifying email structure...",
          "Scanning message for invalid content...",
        ];
      case STATES.PROCESSING:
        return [
          "Current State: PROCESSING",
          "All inputs validated ✓",
          "Preparing network request...",
          "Connecting to server...",
          "Sending data...",
        ];
      case STATES.SUCCESS:
        return [
          "Current State: SUCCESS",
          "Server response: 200 OK",
          "Message delivered successfully!",
          "Thank you for reaching out.",
        ];
      case STATES.ERROR:
        return [
          "Current State: ERROR",
          validateInputs()
            ? "Server error encountered."
            : "Input validation failed.",
          "Please verify your inputs or try again later.",
        ];
      default:
        return ["System initializing..."];
    }
  };

  return (
    <section className="w-full py-16 bg-gray-950 text-white relative">
      {/* <SmoothCursor /> */}

      <div className="max-w-6xl mx-auto px-4" id="contact-fsm-section">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">
            <AnimatedShinyText>Get In Touch</AnimatedShinyText>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            This contact form demonstrates a Finite State Machine - a
            fundamental concept in computer science for managing complex state
            transitions and process flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
            <InteractiveGridPattern
              className="absolute inset-0 opacity-10"
              width={24}
              height={24}
              squaresClassName="bg-[rgb(59, 130, 246)]"
            />

            <h3 className="text-xl font-semibold mb-4 relative z-10">
              Contact Form
            </h3>
            <p className="text-gray-400 mb-6 relative z-10">
              Current State:{" "}
              <span className="text-blue-400 font-medium">
                {formState.toUpperCase()}
              </span>
            </p>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={
                    formState !== STATES.IDLE && formState !== STATES.ERROR
                  }
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
                  disabled={
                    formState !== STATES.IDLE && formState !== STATES.ERROR
                  }
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
                  disabled={
                    formState !== STATES.IDLE && formState !== STATES.ERROR
                  }
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                />
              </div>

              {(formState === STATES.IDLE || formState === STATES.ERROR) && (
                <InteractiveHoverButton onClick={handleSubmit}>
                  Send Message
                </InteractiveHoverButton>
              )}

              {(formState === STATES.VALIDATING ||
                formState === STATES.PROCESSING) && (
                <button
                  disabled
                  className="w-full py-3 px-6 text-white bg-blue-600 opacity-75 rounded-md cursor-not-allowed"
                >
                  Processing...
                </button>
              )}

              {formState === STATES.SUCCESS && (
                <InteractiveHoverButton onClick={resetForm}>
                  Send Another Message
                </InteractiveHoverButton>
              )}
            </div>

            <div className="mt-8 text-sm text-gray-400 relative z-10">
              <p className="mb-2">{stateExplanation}</p>
              <p className="text-xs">
                State History:{" "}
                {stateHistory.map((s) => s.toUpperCase()).join(" → ")}
              </p>
            </div>
          </div>

          {/* FSM Visualization */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Finite State Machine Visualization
            </h3>
            <p className="text-gray-400 mb-4">
              Watch the FSM process your form submission through different
              states
            </p>

            <div className="h-64 mb-6">
              <Terminal>
                {getTerminalContent().map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </Terminal>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-3">
                What is a Finite State Machine?
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                A Finite State Machine (FSM) is a mathematical model used in
                computer science and many other fields to design systems that
                can be in exactly one of a finite number of states at any given
                time. FSMs are used in everything from compilers and regular
                expressions to UI workflows and game logic.
              </p>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="text-sm font-medium mb-2">
                  Key FSM Concepts Demonstrated:
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>
                    • <span className="text-blue-400">States:</span> Idle,
                    Validating, Processing, Success, Error
                  </li>
                  <li>
                    • <span className="text-blue-400">Transitions:</span> Rules
                    for moving between states
                  </li>
                  <li>
                    • <span className="text-blue-400">Events:</span> User
                    actions that trigger transitions
                  </li>
                  <li>
                    • <span className="text-blue-400">Actions:</span> Operations
                    performed during transitions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
