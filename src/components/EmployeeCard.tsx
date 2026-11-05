import React from 'react';
import { Mail, MessageSquare, ArrowUpRight, MapPin, Building2, User } from 'lucide-react';
import { Employee } from '../types';
import { StatusBadge } from './StatusBadge';
import { EmployeeAvatar } from './EmployeeAvatar';

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
  onQuickEmail: (employee: Employee, e: React.MouseEvent) => void;
  onQuickSlack: (employee: Employee, e: React.MouseEvent) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onSelect,
  onQuickEmail,
  onQuickSlack
}) => {
  return (
    <div
      onClick={() => onSelect(employee)}
      className="group relative bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[8px] p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] hover:shadow-[0_4px_6px_-1px_rgba(15,23,42,0.07),0_2px_4px_-2px_rgba(15,23,42,0.05)]"
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <EmployeeAvatar src={employee.avatar} name={employee.name} size={48} />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#0F172A] truncate leading-tight group-hover:text-[#4338CA] transition-colors">
                {employee.name}
              </h3>
              <p className="text-xs text-[#64748B] truncate mt-0.5" title={employee.title}>
                {employee.title}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <StatusBadge status={employee.status} />
          </div>
        </div>

        {/* Metadata Matrix */}
        <div className="border-t border-[#F1F5F9] pt-3 pb-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Building2 className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              <span>Department</span>
            </span>
            <span className="font-medium text-[#334155] truncate ml-2 max-w-[140px] text-right">
              {employee.department}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#64748B]">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <User className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              <span>Manager</span>
            </span>
            <span className="font-medium text-[#334155] truncate ml-2 max-w-[140px] text-right">
              {employee.managerName || '— (Direct to Board)'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#64748B]">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              <span>Location</span>
            </span>
            <span className="font-medium text-[#334155] truncate ml-2 max-w-[140px] text-right">
              {employee.location}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#64748B]">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Mail className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              <span>Email</span>
            </span>
            <span className="font-mono text-[11px] text-[#475569] truncate ml-2 max-w-[155px] text-right">
              {employee.email}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Subdued action row */}
      <div className="border-t border-[#F1F5F9] pt-3 mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title={`Send email to ${employee.name}`}
            onClick={(e) => onQuickEmail(employee, e)}
            className="p-1.5 rounded-[4px] text-[#64748B] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            type="button"
            title={`Message on Slack`}
            onClick={(e) => onQuickSlack(employee, e)}
            className="p-1.5 rounded-[4px] text-[#64748B] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-[#94A3B8] font-mono tabular-nums ml-1">
            {employee.id}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(employee)}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#4338CA] hover:text-[#3730A3] group/btn px-2 py-1 rounded-[4px] hover:bg-[#EEF2FF] transition-colors"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
