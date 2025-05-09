
import React from "react";
import { Company } from "@/data/companyAgentMap";

interface CompanyHeaderProps {
  company: Company;
}

const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  return (
    <div className="flex items-center space-x-3 p-4 mb-6 bg-white rounded-xl shadow-sm border">
      {company.logo && (
        <div className="flex-shrink-0 h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={company.logo} 
            alt={`${company.companyName} logo`}
            className="h-10 w-10 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold text-slate-800">{company.companyName}</h1>
        <p className="text-sm text-slate-500">Virtual Agent Assistant</p>
      </div>
    </div>
  );
};

export default CompanyHeader;
