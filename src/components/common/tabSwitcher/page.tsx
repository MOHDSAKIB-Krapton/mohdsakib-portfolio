import React from "react";

interface RoundedTabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  containerClassName?: string;
}

export const RoundedTabSwitcher: React.FC<RoundedTabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  containerClassName = "",
}) => {
  return (
    <div className={`flex justify-center ${containerClassName}`}>
      <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-2 rounded-full transition-all duration-300 capitalize ${
              activeTab === tab
                ? "bg-white text-black shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            } ${className}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
