import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { Employee } from '../types';
import { StatusBadge } from './StatusBadge';
import { EmployeeAvatar } from './EmployeeAvatar';

interface EmployeeTableProps {
  employees: Employee[];
  selectedEmployeeIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onSelectEmployee: (employee: Employee) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (column: any) => void;
  onQuickEmail: (employee: Employee, e: React.MouseEvent) => void;
  onQuickSlack: (employee: Employee, e: React.MouseEvent) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  selectedEmployeeIds,
  onToggleSelect,
  onSelectAll,
  onSelectEmployee,
  sortBy,
  sortOrder,
  onSortChange,
  onQuickEmail,
  onQuickSlack
}) => {
  const isAllSelected = employees.length > 0 && selectedEmployeeIds.length === employees.length;

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity ml-1.5" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#4338CA] ml-1.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#4338CA] ml-1.5" />
    );
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[8px] overflow-hidden shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] select-none text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  aria-label="Select all employees"
                  className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#4338CA] focus:ring-[#4338CA] cursor-pointer"
                />
              </th>
              <th
                onClick={() => onSortChange('name')}
                className="py-3 px-4 cursor-pointer hover:text-[#0F172A] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span>Employee Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('title')}
                className="py-3 px-4 cursor-pointer hover:text-[#0F172A] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span>Role & Title</span>
                  {renderSortIcon('title')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('department')}
                className="py-3 px-4 cursor-pointer hover:text-[#0F172A] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span>Department</span>
                  {renderSortIcon('department')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('location')}
                className="py-3 px-4 cursor-pointer hover:text-[#0F172A] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span>Location & Timezone</span>
                  {renderSortIcon('location')}
                </div>
              </th>
              <th className="py-3 px-4">Manager</th>
              <th className="py-3 px-4">Status</th>
              <th
                onClick={() => onSortChange('hireDate')}
                className="py-3 px-4 cursor-pointer hover:text-[#0F172A] transition-colors group text-right"
              >
                <div className="flex items-center justify-end">
                  <span>Hire Date</span>
                  {renderSortIcon('hireDate')}
                </div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#64748B]">
                  No employees found matching the active filter criteria.
                </td>
              </tr>
            ) : (
              employees.map((emp) => {
                const isSelected = selectedEmployeeIds.includes(emp.id);
                return (
                  <tr
                    key={emp.id}
                    className={`h-12 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#F2F3FF]' : ''
                    }`}
                    onClick={() => onSelectEmployee(emp)}
                  >
                    <td
                      className="py-2.5 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(emp.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(emp.id)}
                        aria-label={`Select ${emp.name}`}
                        className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#4338CA] focus:ring-[#4338CA] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#0F172A]">
                      <div className="flex items-center gap-3">
                        <EmployeeAvatar src={emp.avatar} name={emp.name} size={32} />
                        <div>
                          <div className="font-semibold text-xs text-[#0F172A] hover:text-[#4338CA] transition-colors">
                            {emp.name}
                          </div>
                          <div className="font-mono text-[11px] text-[#94A3B8] tabular-nums">
                            {emp.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-[#334155]">{emp.title}</td>
                    <td className="py-2.5 px-4">
                      <span className="inline-block text-[#334155] font-medium bg-[#F1F5F9] px-2 py-0.5 rounded-[4px] text-[11px]">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-[#475569]">
                      <div>{emp.location}</div>
                      <div className="text-[11px] text-[#94A3B8] font-mono tabular-nums">
                        {emp.timezone}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-[#475569]">
                      {emp.managerName ? (
                        <span className="font-medium text-[#334155]">{emp.managerName}</span>
                      ) : (
                        <span className="text-[#94A3B8] italic">Board of Directors</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-xs tabular-nums text-[#475569]">
                      {emp.hireDate}
                    </td>
                    <td
                      className="py-2.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          title="Send Email"
                          onClick={(e) => onQuickEmail(emp, e)}
                          className="p-1 rounded-[4px] text-[#64748B] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Send Slack Message"
                          onClick={(e) => onQuickSlack(emp, e)}
                          className="p-1 rounded-[4px] text-[#64748B] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Open Profile"
                          onClick={() => onSelectEmployee(emp)}
                          className="p-1 rounded-[4px] text-[#64748B] hover:text-[#4338CA] hover:bg-[#EEF2FF] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
