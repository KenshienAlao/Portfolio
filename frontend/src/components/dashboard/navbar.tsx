import { useState } from "react";
import { ThemeTogglerButton } from "../theme-toggle";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaInbox,
  FaTerminal,
  FaWrench,
} from "react-icons/fa";
import { Tab } from "@/types/dashboard";

interface props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Navbar({ activeTab, setActiveTab }: props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: LuLayoutDashboard },
    { id: "projects", label: "Projects", icon: FiLayers },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "skills", label: "Skills", icon: FaWrench },
    { id: "setup", label: "Setup", icon: FaTerminal },
    { id: "messages", label: "Messages", icon: FaInbox },
  ] as const;

  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`hidden md:flex border-r border-border bg-surface/50 backdrop-blur-xl flex-col p-4 sticky top-0 h-screen z-10 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-mono text-base font-bold tracking-tight text-text-primary transition-opacity duration-200">
              <span className="text-accent">$</span>
              <span>admin</span>
              <span className="text-accent">_</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-border/40 bg-surface/30 text-text-secondary hover:bg-surface hover:text-text-primary transition-colors hidden md:block"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FaChevronRight className="h-4 w-4" />
            ) : (
              <FaChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center rounded-lg py-2.5 text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center px-0" : "px-3 justify-start"
                } ${
                  isActive
                    ? "bg-accent text-on-accent shadow-soft"
                    : "text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent hover:border-border/30"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span
                    className={`transition-all duration-200 origin-left ${
                      isCollapsed
                        ? "opacity-0 w-0 overflow-hidden pointer-events-none"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
          <div className={isCollapsed ? "mx-auto" : ""}>
            <ThemeTogglerButton />
          </div>
        </div>
      </aside>
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-surface/95 backdrop-blur-2xl py-2 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex justify-around items-center z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isMobileCollapsed ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMobileCollapsed(true)}
          className={`absolute top-0 right-4 border-t border-x border-border bg-surface/95 backdrop-blur-2xl px-3 py-1 rounded-t-lg text-text-secondary hover:text-text-primary flex items-center justify-center gap-1 font-mono text-[10px] transition-all duration-300 ${
            isMobileCollapsed
              ? "opacity-0 pointer-events-none translate-y-0"
              : "opacity-100 -translate-y-full"
          }`}
          aria-label="Hide Navigation"
        >
          <FaChevronLeft className="h-3.5 w-3.5 -rotate-90" />
          <span>Hide</span>
        </button>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] relative transition-colors ${
                isActive ? "text-accent font-semibold" : "text-text-secondary"
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="scale-90 font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setIsMobileCollapsed(false)}
        className={`md:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/90 text-accent shadow-lg backdrop-blur-md transition-all duration-300 ${
          isMobileCollapsed
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-20 opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Expand Menu"
      >
        <LuLayoutDashboard className="h-5 w-5 animate-pulse" />
      </button>
    </>
  );
}
