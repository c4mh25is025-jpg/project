import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, LayoutGrid, List, Network, ShieldCheck, BarChart3, Download, Plus, RotateCcw } from 'lucide-react';
import { FilterState, ViewMode } from '../types';
import { DEPARTMENTS, LOCATIONS, STATUS_LIST, EMPLOYMENT_TYPES } from '../data/mockEmployees';

interface SearchFilterToolbarProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  filteredCount: number;
  onOpenCommandPalette: () => void;
  onOpenAddModal: () => void;
  onExportCSV: () => void;
}

export const SearchFilterToolbar: React.FC<SearchFilterToolbarProps> = ({
  filter,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  onOpenCommandPalette,
  onOpenAddModal,
  onExportCSV
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = Boolean(
    filter.searchQuery ||
    (filter.department && filter.department !== 'All Departments') ||
    (filter.location && filter.location !== 'All Locations') ||
    (filter.status && filter.status !== 'All Statuses') ||
    (filter.employmentType && filter.employmentType !== 'All Types')
  );

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="space-y-3 mb-6" ref={dropdownRef}>
      {/* Top Search & Primary Actions Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Composite Search Input */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by name, title, department, email, or employee ID..."
            className="w-full h-[38px] pl-10 pr-20 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA] focus:border-transparent transition-all shadow-[0_1px_2px_0_rgba(15,23,42,0.02)]"
          />
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
            title="Open Command Palette (⌘K)"
          >
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-[#F1F5F9] border border-[#CBD5E1] rounded-[3px] hover:bg-[#E2E8F0] transition-colors cursor-pointer">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>

        {/* View Switchers & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
          {/* View Mode Segmented Controls */}
          <div className="inline-flex items-center p-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[6px]">
            <button
              type="button"
              onClick={() => onViewModeChange('cards')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                viewMode === 'cards'
                  ? 'bg-white text-[#4338CA] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                viewMode === 'table'
                  ? 'bg-white text-[#4338CA] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="Data Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('org-chart')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                viewMode === 'org-chart'
                  ? 'bg-white text-[#4338CA] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="Org Chart Hierarchy"
            >
              <Network className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Org Chart</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('compliance')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                viewMode === 'compliance'
                  ? 'bg-white text-[#4338CA] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="Compliance Matrix"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compliance</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('analytics')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                viewMode === 'analytics'
                  ? 'bg-white text-[#4338CA] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="Headcount Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analytics</span>
            </button>
          </div>

          {/* Export CSV secondary button */}
          <button
            type="button"
            onClick={onExportCSV}
            className="h-[36px] inline-flex items-center gap-1.5 px-3 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-[4px] text-xs font-medium text-[#334155] transition-colors whitespace-nowrap shadow-[0_1px_2px_0_rgba(15,23,42,0.02)]"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export CSV</span>
          </button>

          {/* Add Employee primary button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="h-[36px] inline-flex items-center gap-1.5 px-3.5 bg-[#4338CA] hover:bg-[#3730A3] border border-[#3730A3] rounded-[4px] text-xs font-medium text-white transition-colors whitespace-nowrap shadow-[0_1px_2px_0_rgba(15,23,42,0.06)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Dropdown triggers with active counters */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-y border-[#E2E8F0] py-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#64748B] mr-1">Filters:</span>

          {/* Department Filter Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('department')}
              className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] border text-xs font-medium transition-colors ${
                filter.department && filter.department !== 'All Departments'
                  ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]'
                  : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{filter.department || 'Department'}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
            {openDropdown === 'department' && (
              <div className="absolute left-0 mt-1 w-52 bg-white border border-[#CBD5E1] rounded-[6px] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] py-1 z-30">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      onFilterChange({ department: dept === 'All Departments' ? '' : dept });
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F1F5F9] flex items-center justify-between ${
                      (dept === 'All Departments' && !filter.department) || filter.department === dept
                        ? 'font-semibold text-[#4338CA] bg-[#EEF2FF]'
                        : 'text-[#334155]'
                    }`}
                  >
                    <span>{dept}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('location')}
              className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] border text-xs font-medium transition-colors ${
                filter.location && filter.location !== 'All Locations'
                  ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]'
                  : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{filter.location || 'Location'}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
            {openDropdown === 'location' && (
              <div className="absolute left-0 mt-1 w-52 bg-white border border-[#CBD5E1] rounded-[6px] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] py-1 z-30">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      onFilterChange({ location: loc === 'All Locations' ? '' : loc });
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F1F5F9] flex items-center justify-between ${
                      (loc === 'All Locations' && !filter.location) || filter.location === loc
                        ? 'font-semibold text-[#4338CA] bg-[#EEF2FF]'
                        : 'text-[#334155]'
                    }`}
                  >
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('status')}
              className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] border text-xs font-medium transition-colors ${
                filter.status && filter.status !== 'All Statuses'
                  ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]'
                  : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{filter.status || 'Status'}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
            {openDropdown === 'status' && (
              <div className="absolute left-0 mt-1 w-48 bg-white border border-[#CBD5E1] rounded-[6px] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] py-1 z-30">
                {STATUS_LIST.map((stat) => (
                  <button
                    key={stat}
                    type="button"
                    onClick={() => {
                      onFilterChange({ status: stat === 'All Statuses' ? '' : stat });
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F1F5F9] flex items-center justify-between ${
                      (stat === 'All Statuses' && !filter.status) || filter.status === stat
                        ? 'font-semibold text-[#4338CA] bg-[#EEF2FF]'
                        : 'text-[#334155]'
                    }`}
                  >
                    <span>{stat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Employment Type Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('employmentType')}
              className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] border text-xs font-medium transition-colors ${
                filter.employmentType && filter.employmentType !== 'All Types'
                  ? 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]'
                  : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{filter.employmentType || 'Employment Type'}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
            {openDropdown === 'employmentType' && (
              <div className="absolute left-0 mt-1 w-48 bg-white border border-[#CBD5E1] rounded-[6px] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] py-1 z-30">
                {EMPLOYMENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      onFilterChange({ employmentType: type === 'All Types' ? '' : type });
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F1F5F9] flex items-center justify-between ${
                      (type === 'All Types' && !filter.employmentType) || filter.employmentType === type
                        ? 'font-semibold text-[#4338CA] bg-[#EEF2FF]'
                        : 'text-[#334155]'
                    }`}
                  >
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="h-7 inline-flex items-center gap-1 px-2 text-xs font-medium text-[#64748B] hover:text-[#B91C1C] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Count indicator */}
        <div className="text-xs text-[#64748B] font-mono tabular-nums">
          Showing <span className="font-semibold text-[#0F172A]">{filteredCount}</span> of {totalCount} records
        </div>
      </div>

      {/* Active Filter Chips Row */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mr-1">
            Active:
          </span>

          {filter.searchQuery && (
            <span className="h-7 inline-flex items-center gap-1 px-2 rounded-[4px] bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-medium text-[#3730A3]">
              <span>Query: "{filter.searchQuery}"</span>
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="hover:text-[#B91C1C]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.department && filter.department !== 'All Departments' && (
            <span className="h-7 inline-flex items-center gap-1 px-2 rounded-[4px] bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-medium text-[#3730A3]">
              <span>Dept: {filter.department}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ department: '' })}
                className="hover:text-[#B91C1C]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.location && filter.location !== 'All Locations' && (
            <span className="h-7 inline-flex items-center gap-1 px-2 rounded-[4px] bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-medium text-[#3730A3]">
              <span>Loc: {filter.location}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ location: '' })}
                className="hover:text-[#B91C1C]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.status && filter.status !== 'All Statuses' && (
            <span className="h-7 inline-flex items-center gap-1 px-2 rounded-[4px] bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-medium text-[#3730A3]">
              <span>Status: {filter.status}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ status: '' })}
                className="hover:text-[#B91C1C]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filter.employmentType && filter.employmentType !== 'All Types' && (
            <span className="h-7 inline-flex items-center gap-1 px-2 rounded-[4px] bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-medium text-[#3730A3]">
              <span>Type: {filter.employmentType}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ employmentType: '' })}
                className="hover:text-[#B91C1C]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] text-[#4338CA] hover:underline font-medium ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
