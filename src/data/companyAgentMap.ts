
export interface Company {
  agentId: string;
  companyName: string;
  logo?: string;
}

// Mapping of company IDs to their agent IDs and names
export const companyAgentMap: Record<string, Company> = {
  "1": {
    agentId: "cl_EHtMqAw7rNl3kbRxs3ozu",
    companyName: "TechCorp",
    logo: "/techcorp-logo.svg"
  },
  "2": {
    agentId: "cl_sample_agent_id_2",
    companyName: "HealthPlus",
    logo: "/healthplus-logo.svg"
  },
  "3": {
    agentId: "cl_sample_agent_id_3",
    companyName: "EcoSolutions",
    logo: "/ecosolutions-logo.svg"
  }
};

// Default agent ID if no company is specified
export const DEFAULT_AGENT_ID = "cl_EHtMqAw7rNl3kbRxs3ozu";
