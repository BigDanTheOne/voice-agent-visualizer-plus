
import React, { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Button } from "@/components/ui/button";
import { Phone, MicOff, Loader, PhoneOff } from "lucide-react";
import { StatusIndicator, AgentStatus } from "@/components/StatusIndicator";
import CompanyHeader from "@/components/CompanyHeader";
import { companyAgentMap, DEFAULT_AGENT_ID, Company } from "@/data/companyAgentMap";
import { useToast } from "@/components/ui/use-toast";

// Your Retell API key (you should use an environment variable for this in production)
const RETELL_API_KEY = "re_1234"; // Replace with your actual API key

const Index = () => {
  const [client, setClient] = useState<RetellWebClient | null>(null);
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [isCallActive, setIsCallActive] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Parse URL parameters to get company ID
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get("company_id");
    
    if (companyId && companyAgentMap[companyId]) {
      setCompany(companyAgentMap[companyId]);
    } else {
      // Use default company if no valid company ID is provided
      const defaultCompany = {
        agentId: DEFAULT_AGENT_ID,
        companyName: "Voice Agent Demo",
      };
      setCompany(defaultCompany);
    }
    
    setIsLoading(false);
  }, []);

  const startCall = async () => {
    if (!company) return;
    
    setStatus("connecting");
    try {
      const retellClient = new RetellWebClient({
        apiKey: RETELL_API_KEY,
        agentId: company.agentId,
        onCallStart: () => {
          setStatus("listening");
          setIsCallActive(true);
        },
        onCallEnd: () => {
          setStatus("idle");
          setIsCallActive(false);
          setClient(null);
        },
        // Add status indicators based on agent state
        onAgentSpeaking: () => setStatus("speaking"),
        onAgentStopSpeaking: () => setStatus("listening"),
        onUserSpeaking: () => setStatus("listening"),
        onUserStopSpeaking: () => setStatus("processing"),
      });
      
      setClient(retellClient);
      await retellClient.startCall();
      
      toast({
        title: "Call started",
        description: `Connected to ${company.companyName} virtual agent`,
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setStatus("idle");
      toast({
        title: "Failed to start call",
        description: "There was an issue connecting to the voice agent",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    if (client) {
      await client.stopCall();
      setStatus("idle");
      setIsCallActive(false);
      setClient(null);
      
      toast({
        title: "Call ended",
        description: "The voice agent call has been ended",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader className="h-10 w-10 text-slate-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-md">
        {company && <CompanyHeader company={company} />}

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              {isCallActive ? "Voice Agent Active" : "Start Voice Conversation"}
            </h2>
            <p className="text-slate-500 mb-6">
              {isCallActive 
                ? "Your voice conversation is in progress"
                : "Click the button below to start talking with our AI voice agent"}
            </p>
            
            {status !== "idle" && (
              <StatusIndicator 
                status={status}
                className="mx-auto mb-6"
              />
            )}
            
            <div className="flex justify-center">
              {!isCallActive ? (
                <Button
                  onClick={startCall}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-6 flex items-center space-x-2 shadow-lg"
                  disabled={status === "connecting"}
                >
                  {status === "connecting" ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : (
                    <Phone className="h-6 w-6" />
                  )}
                  <span className="ml-2">Start Conversation</span>
                </Button>
              ) : (
                <Button
                  onClick={endCall}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-6 flex items-center space-x-2 shadow-lg"
                >
                  <PhoneOff className="h-6 w-6" />
                  <span className="ml-2">End Conversation</span>
                </Button>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <h3 className="text-sm font-medium text-slate-700 mb-2">How it works</h3>
            <ol className="list-decimal text-sm text-slate-600 pl-5 space-y-2">
              <li>Click the button to start a conversation with our AI voice agent</li>
              <li>Speak naturally as you would in a normal conversation</li>
              <li>The visual indicator will show if the agent is speaking or listening</li>
              <li>Click the end call button when you're finished</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Powered by Retell AI • {company?.companyName || "Voice Agent Demo"}
        </div>
      </div>
    </div>
  );
};

export default Index;
