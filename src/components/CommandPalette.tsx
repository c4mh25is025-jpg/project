import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Network, ShieldCheck, BarChart3, Plus, Download, ArrowRight } from 'lucide-react';
import { Employee, ViewMode } from '../types';
import { EmployeeAvatar } from './EmployeeAvatar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  onNavigateView: (mode: ViewMode) => void;
  onOpenAddModal: () => void;
  onExportCSV: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  employees,
  onSelectEmployee,
  onNavigateView,
  onOpenAddModal,
  onExportCSV
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown for ⌘K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter matched items
  const matchedEmployees = query.trim()
    ? employees.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.department.toLowerCase().includes(query.toLowerCase()) ||
          e.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : employees.slice(0, 4);

  const navigationActions = [
    { label: 'View Employee Grid', icon: User, action: () => onNavigateView('cards') },
    { label: 'View Employee Roster Table', icon: User, action: () => onNavigateView('table') },
    { label: 'View Organizational Hierarchy Tree', icon: Network, action: () => onNavigateView('org-chart') },
    { label: 'View Compliance & Regulatory Matrix', icon: ShieldCheck, action: () => onNavigateView('compliance') },
    { label: 'View Workforce Headcount Analytics', icon: BarChart3, action: () => onNavigateView('analytics') },
    { label: 'Provision New Employee Record', icon: Plus, action: onOpenAddModal },
    { label: 'Export Complete Roster (CSV)', icon: Download, action: onExportCSV }
  ].filter((act) => !query || act.label.toLowerCase().includes(query.toLowerCase()));

  const allItemsCount = matchedEmployees.length + navigationActions.length;

  const handleArrowNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allItemsCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItemsCount) % allItemsCount);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex < matchedEmployees.length) {
        onSelectEmployee(matchedEmployees[selectedIndex]);
        onClose();
      } else {
        const actionIdx = selectedIndex - matchedEmployees.length;
        if (navigationActions[actionIdx]) {
          navigationActions[actionIdx].action();
          onClose();
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-xl bg-white rounded-[8px] border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.04)] overflow-hidden z-10 flex flex-col">
        {/* Search Input */}
        <div className="p-3 px-4 border-b border-[#E2E8F0] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#94A3B8]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleArrowNav}
            placeholder="Type a command or search employees..."
            className="w-full text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none bg-transparent"
          />
          <kbd className="text-[10px] font-mono text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] px-1.5 py-0.5 rounded-[3px]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 text-xs">
          {/* Employee Results */}
          {matchedEmployees.length > 0 && (
            <div className="mb-2">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Employees ({matchedEmployees.length})
              </div>
              {matchedEmployees.map((emp, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={emp.id}
                    onClick={() => {
                      onSelectEmployee(emp);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-2 rounded-[4px] cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#EEF2FF] text-[#4338CA]' : 'hover:bg-[#F8FAFC] text-[#0F172A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <EmployeeAvatar src={emp.avatar} name={emp.name} size={28} />
                      <div className="min-w-0">
                        <div className="font-semibold text-xs truncate">{emp.name}</div>
                        <div className="text-[11px] text-[#64748B] truncate">
                          {emp.title} · {emp.department}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#94A3B8] tabular-nums shrink-0 ml-2">
                      {emp.id}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          {navigationActions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Navigation & Actions
              </div>
              {navigationActions.map((act, idx) => {
                const itemIndex = matchedEmployees.length + idx;
                const isSelected = selectedIndex === itemIndex;
                const Icon = act.icon;
                return (
                  <div
                    key={act.label}
                    onClick={() => {
                      act.action();
                      onClose();
                    }}
                    className={`flex items-center justify-between p-2 rounded-[4px] cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#EEF2FF] text-[#4338CA]' : 'hover:bg-[#F8FAFC] text-[#334155]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-[#64748B]" />
                      <span className="font-medium text-xs">{act.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#94A3B8]" />
                  </div>
                );
              })}
            </div>
          )}

          {allItemsCount === 0 && (
            <div className="py-8 text-center text-xs text-[#64748B]">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 px-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span>Use ↑ ↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Executive Directory Quick Launcher</span>
        </div>
      </div>
    </div>
  );
};
