import React from 'react';
import { Search, Plus } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenCommandPalette: () => void;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenCommandPalette,
  onOpenAddModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-[0_1px_2px_0_rgba(15,23,42,0.02)]">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-[4px] bg-[#4338CA] flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-sm">
            ED
          </div>
          <span className="text-base font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0">
            Executive Enterprise Directory
          </span>
        </div>

        {/* Zone 2: 4-5 Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#475569]">
          <button
            type="button"
            onClick={() => onViewChange('cards')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'cards' || currentView === 'table'
                ? 'border-[#4338CA] text-[#4338CA] font-semibold'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Directory
          </button>
          <button
            type="button"
            onClick={() => onViewChange('org-chart')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'org-chart'
                ? 'border-[#4338CA] text-[#4338CA] font-semibold'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Org Hierarchy
          </button>
          <button
            type="button"
            onClick={() => onViewChange('compliance')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'compliance'
                ? 'border-[#4338CA] text-[#4338CA] font-semibold'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Compliance
          </button>
          <button
            type="button"
            onClick={() => onViewChange('analytics')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'analytics'
                ? 'border-[#4338CA] text-[#4338CA] font-semibold'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Headcount
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Search & Quick Action) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-[4px] text-xs text-[#64748B] transition-colors whitespace-nowrap shrink-0"
            title="Search Directory (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Search roster</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded-[3px] text-[#64748B]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-3.5 py-2 text-xs font-medium text-white bg-[#4338CA] hover:bg-[#3730A3] border border-[#3730A3] rounded-[4px] transition-colors whitespace-nowrap shrink-0 shadow-[0_1px_2px_0_rgba(15,23,42,0.06)] inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
};
