import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ZoomIn, ZoomOut, RotateCcw, UserCheck, Shield } from 'lucide-react';
import { Employee } from '../types';
import { EmployeeAvatar } from './EmployeeAvatar';
import { StatusBadge } from './StatusBadge';

interface OrgChartProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
}

export const OrgChart: React.FC<OrgChartProps> = ({ employees, onSelectEmployee }) => {
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchHighlight, setSearchHighlight] = useState<string>('');

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Find root node (CEO Sarah Jenkins)
  const rootEmployee = employees.find((e) => e.managerId === null) || employees[0];

  // Helper to get direct reports
  const getDirectReports = (managerId: string) => {
    return employees.filter((e) => e.managerId === managerId);
  };

  const renderNode = (emp: Employee, depth = 0) => {
    const directReports = getDirectReports(emp.id);
    const hasChildren = directReports.length > 0;
    const isCollapsed = Boolean(collapsedNodes[emp.id]);
    const isMatched = searchHighlight.trim().length > 0 &&
      (emp.name.toLowerCase().includes(searchHighlight.toLowerCase()) ||
       emp.title.toLowerCase().includes(searchHighlight.toLowerCase()) ||
       emp.department.toLowerCase().includes(searchHighlight.toLowerCase()));

    return (
      <div key={emp.id} className="flex flex-col items-center">
        {/* Node Card */}
        <div
          onClick={() => onSelectEmployee(emp)}
          className={`relative group bg-white border rounded-[8px] p-3 w-64 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] hover:shadow-[0_4px_6px_-1px_rgba(15,23,42,0.07)] transition-all cursor-pointer ${
            isMatched
              ? 'ring-2 ring-[#4338CA] border-[#4338CA]'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <EmployeeAvatar src={emp.avatar} name={emp.name} size={40} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-semibold text-[#0F172A] truncate group-hover:text-[#4338CA] transition-colors">
                  {emp.name}
                </h4>
                <StatusBadge status={emp.status} className="scale-90 origin-right" />
              </div>
              <p className="text-[11px] text-[#64748B] truncate mt-0.5" title={emp.title}>
                {emp.title}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[#475569]">
                <span className="bg-[#F1F5F9] px-1.5 py-0.5 rounded-[3px] font-medium truncate max-w-[120px]">
                  {emp.department}
                </span>
                <span className="font-mono text-[#94A3B8] tabular-nums">{emp.id}</span>
              </div>
            </div>
          </div>

          {/* Direct reports expansion trigger if node has children */}
          {hasChildren && (
            <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1 font-mono tabular-nums">
                <UserCheck className="w-3 h-3 text-[#4338CA]" />
                <span>{directReports.length} {directReports.length === 1 ? 'Report' : 'Direct Reports'}</span>
              </span>
              <button
                type="button"
                onClick={(e) => toggleCollapse(emp.id, e)}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[3px] bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#4338CA] font-medium transition-colors"
                title={isCollapsed ? 'Expand branch' : 'Collapse branch'}
              >
                {isCollapsed ? (
                  <>
                    <span>Expand</span>
                    <ChevronRight className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Collapse</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Tree Connectors & Children */}
        {hasChildren && !isCollapsed && (
          <div className="flex flex-col items-center">
            {/* Vertical connector from parent card */}
            <div className="w-[1.5px] h-6 bg-[#CBD5E1]" />

            {/* Horizontal bar spanning children */}
            <div className="relative flex justify-center">
              {directReports.length > 1 && (
                <div
                  className="absolute top-0 h-[1.5px] bg-[#CBD5E1]"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `calc(100% - ${256 / 2}px)`
                  }}
                />
              )}

              <div className="flex gap-6 items-start pt-6">
                {directReports.map((child) => (
                  <div key={child.id} className="relative flex flex-col items-center">
                    {/* Vertical connector down to child node */}
                    <div className="absolute -top-6 w-[1.5px] h-6 bg-[#CBD5E1]" />
                    {renderNode(child, depth + 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden">
      {/* Org Chart Top Toolbar */}
      <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
            <span>Organizational Hierarchy Graph</span>
            <span className="text-[11px] font-normal text-[#64748B] font-mono tabular-nums">
              ({employees.length} active positions mapped)
            </span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Interactive multi-level enterprise reporting structure with recursive line management.
          </p>
        </div>

        {/* Zoom Controls & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            value={searchHighlight}
            onChange={(e) => setSearchHighlight(e.target.value)}
            placeholder="Highlight name or role..."
            className="h-8 px-2.5 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#4338CA]"
          />

          <div className="inline-flex items-center bg-white border border-[#CBD5E1] rounded-[4px] p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(60, prev - 10))}
              className="p-1 hover:bg-[#F1F5F9] rounded-[3px] text-[#64748B] hover:text-[#0F172A]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono tabular-nums text-[#334155]">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
              className="p-1 hover:bg-[#F1F5F9] rounded-[3px] text-[#64748B] hover:text-[#0F172A]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="p-1 border-l border-[#E2E8F0] ml-0.5 hover:bg-[#F1F5F9] rounded-[3px] text-[#64748B] hover:text-[#0F172A]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-8 overflow-auto min-h-[600px] bg-[#FAF8FF]/40 flex justify-center">
        <div
          className="transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {rootEmployee && renderNode(rootEmployee)}
        </div>
      </div>
    </div>
  );
};
