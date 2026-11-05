import React from 'react';
import { Users, Globe, Building2, TrendingUp, Award, Clock } from 'lucide-react';
import { Employee } from '../types';

interface AnalyticsViewProps {
  employees: Employee[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ employees }) => {
  const total = employees.length;

  // Department counts
  const deptCounts: Record<string, number> = {};
  employees.forEach((e) => {
    deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
  });

  // Location counts
  const locCounts: Record<string, number> = {};
  employees.forEach((e) => {
    locCounts[e.location] = (locCounts[e.location] || 0) + 1;
  });

  // Employment type counts
  const typeCounts: Record<string, number> = {};
  employees.forEach((e) => {
    typeCounts[e.employmentType] = (typeCounts[e.employmentType] || 0) + 1;
  });

  // Status counts
  const activeCount = employees.filter((e) => e.status === 'Active').length;
  const onLeaveCount = employees.filter((e) => e.status === 'On Leave').length;
  const pendingCount = employees.filter((e) => e.status === 'Pending Review').length;

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Total Enterprise Headcount</span>
            <Users className="w-4 h-4 text-[#4338CA]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
            {total}
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            <span className="text-[#059669] font-medium font-mono tabular-nums">
              {Math.round((activeCount / total) * 100)}%
            </span>{' '}
            Active workforce ratio
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Operating Hubs & Hubs</span>
            <Globe className="w-4 h-4 text-[#4338CA]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
            {Object.keys(locCounts).length}
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Across 4 global timezones (PST, EST, GMT, CET)
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Average Seniority & Tenure</span>
            <Clock className="w-4 h-4 text-[#4338CA]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
            3.8 yrs
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Foundation hire retention rate 94.2%
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Performance Rating Avg</span>
            <Award className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
            4.84 / 5.0
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Annual executive peer calibration
          </p>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center justify-between">
            <span>Headcount by Department</span>
            <Building2 className="w-4 h-4 text-[#64748B]" />
          </h3>
          <div className="space-y-3">
            {Object.entries(deptCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([dept, count]) => {
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#334155]">{dept}</span>
                      <span className="font-mono tabular-nums text-[#64748B]">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#4338CA] h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center justify-between">
            <span>Geographic Distribution</span>
            <Globe className="w-4 h-4 text-[#64748B]" />
          </h3>
          <div className="space-y-3">
            {Object.entries(locCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([loc, count]) => {
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={loc} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#334155]">{loc}</span>
                      <span className="font-mono tabular-nums text-[#64748B]">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#515F74] h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
