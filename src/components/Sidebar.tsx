import React from 'react';
import {
  Users,
  Building2,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers
} from 'lucide-react';
import { Department } from '../types';
import { DEPARTMENTS, LOCATIONS } from '../data/mockEmployees';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeDepartment: string;
  onSelectDepartment: (dept: string) => void;
  activeLocation: string;
  onSelectLocation: (loc: string) => void;
  departmentCounts: Record<string, number>;
  totalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeDepartment,
  onSelectDepartment,
  activeLocation,
  onSelectLocation,
  departmentCounts,
  totalCount
}) => {
  return (
    <aside
      className={`shrink-0 transition-all duration-200 border-r border-[#E2E8F0] bg-white hidden md:flex flex-col justify-between ${
        isCollapsed ? 'w-16' : 'w-[280px]'
      }`}
    >
      <div className="p-4 space-y-6">
        {/* Collapse toggle header */}
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#4338CA]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Organization
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-[4px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors ${
              isCollapsed ? 'mx-auto' : ''
            }`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Department Filter Section */}
        <div>
          {!isCollapsed && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 px-2 flex items-center justify-between">
              <span>Departments</span>
              <Building2 className="w-3.5 h-3.5" />
            </div>
          )}

          <nav className="space-y-0.5">
            {DEPARTMENTS.map((dept) => {
              const isSelected =
                (dept === 'All Departments' && !activeDepartment) || activeDepartment === dept;
              const count = dept === 'All Departments' ? totalCount : departmentCounts[dept] || 0;

              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onSelectDepartment(dept === 'All Departments' ? '' : dept)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#EEF2FF] text-[#4338CA] font-semibold'
                      : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  } ${isCollapsed ? 'justify-center px-1' : ''}`}
                  title={dept}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Briefcase className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#4338CA]' : 'text-[#94A3B8]'}`} />
                    {!isCollapsed && <span className="truncate">{dept}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-[3px] ${
                        isSelected
                          ? 'bg-[#4338CA] text-white'
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Location Filter Section */}
        {!isCollapsed && (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 px-2 flex items-center justify-between">
              <span>Global Hubs</span>
              <MapPin className="w-3.5 h-3.5" />
            </div>

            <nav className="space-y-0.5">
              {LOCATIONS.map((loc) => {
                const isSelected =
                  (loc === 'All Locations' && !activeLocation) || activeLocation === loc;

                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => onSelectLocation(loc === 'All Locations' ? '' : loc)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#EEF2FF] text-[#4338CA] font-semibold'
                        : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    }`}
                  >
                    <span className="truncate">{loc}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2 text-xs text-[#059669] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>SOC 2 Type II Verified</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1 leading-normal">
            Encrypted directory record database. All profile access is logged under SOC 2 compliance.
          </p>
        </div>
      ) : (
        <div className="p-3 border-t border-[#E2E8F0] flex justify-center" title="SOC 2 Type II Verified">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
        </div>
      )}
    </aside>
  );
};
