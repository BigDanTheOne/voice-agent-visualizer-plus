
import React from "react";
import { Mic, MicOff, Volume, VolumeOff, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentStatus = "idle" | "connecting" | "speaking" | "listening" | "processing";

interface StatusIndicatorProps {
  status: AgentStatus;
  className?: string;
}

export const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const getStatusDisplay = () => {
    switch (status) {
      case "idle":
        return (
          <div className="flex items-center space-x-2 text-gray-400">
            <MicOff className="h-5 w-5" />
            <span>Agent Ready</span>
          </div>
        );
      case "connecting":
        return (
          <div className="flex items-center space-x-2 text-amber-500 animate-pulse">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Connecting</span>
          </div>
        );
      case "speaking":
        return (
          <div className="flex items-center space-x-2 text-green-500">
            <Volume className="h-5 w-5" />
            <span>Speaking</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="h-4 w-1 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        );
      case "listening":
        return (
          <div className="flex items-center space-x-2 text-blue-500">
            <Mic className="h-5 w-5" />
            <span>Listening</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="h-4 w-1 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        );
      case "processing":
        return (
          <div className="flex items-center space-x-2 text-purple-500">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Processing</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("px-4 py-2 rounded-full bg-slate-50 shadow-sm border", className)}>
      {getStatusDisplay()}
    </div>
  );
};
