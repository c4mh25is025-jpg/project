/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Employee, FilterState, ViewMode } from './types';
import { INITIAL_EMPLOYEES } from './data/mockEmployees';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchFilterToolbar } from './components/SearchFilterToolbar';
import { EmployeeCard } from './components/EmployeeCard';
import { EmployeeTable } from './components/EmployeeTable';
import { OrgChart } from './components/OrgChart';
import { ComplianceMatrix } from './components/ComplianceMatrix';
import { AnalyticsView } from './components/AnalyticsView';
import { EmployeeDetailDrawer } from './components/EmployeeDetailDrawer';
import { EmployeeModal } from './components/EmployeeModal';
import { CommandPalette } from './components/CommandPalette';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import { Download, Mail, CheckSquare, X } from 'lucide-react';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    department: '',
    location: '',
    status: '',
    employmentType: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const showToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Department counts
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach((e) => {
      counts[e.department] = (counts[e.department] || 0) + 1;
    });
    return counts;
  }, [employees]);

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        // Search query
        if (filter.searchQuery.trim()) {
          const q = filter.searchQuery.toLowerCase();
          const matchName = emp.name.toLowerCase().includes(q);
          const matchTitle = emp.title.toLowerCase().includes(q);
          const matchDept = emp.department.toLowerCase().includes(q);
          const matchEmail = emp.email.toLowerCase().includes(q);
          const matchId = emp.id.toLowerCase().includes(q);
          const matchSkills = emp.skills.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchDept && !matchEmail && !matchId && !matchSkills) {
            return false;
          }
        }

        // Department
        if (filter.department && filter.department !== 'All Departments') {
          if (emp.department !== filter.department) return false;
        }

        // Location
        if (filter.location && filter.location !== 'All Locations') {
          if (emp.location !== filter.location) return false;
        }

        // Status
        if (filter.status && filter.status !== 'All Statuses') {
          if (emp.status !== filter.status) return false;
        }

        // Employment type
        if (filter.employmentType && filter.employmentType !== 'All Types') {
          if (emp.employmentType !== filter.employmentType) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let valA: string = '';
        let valB: string = '';

        if (filter.sortBy === 'name') {
          valA = a.name;
          valB = b.name;
        } else if (filter.sortBy === 'department') {
          valA = a.department;
          valB = b.department;
        } else if (filter.sortBy === 'title') {
          valA = a.title;
          valB = b.title;
        } else if (filter.sortBy === 'hireDate') {
          valA = a.hireDate;
          valB = b.hireDate;
        } else if (filter.sortBy === 'location') {
          valA = a.location;
          valB = b.location;
        }

        const cmp = valA.localeCompare(valB);
        return filter.sortOrder === 'asc' ? cmp : -cmp;
      });
  }, [employees, filter]);

  // Sort change handler
  const handleSortChange = (column: FilterState['sortBy']) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Table selection toggling
  const handleToggleSelect = (id: string) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployeeIds.length === filteredEmployees.length) {
      setSelectedEmployeeIds([]);
    } else {
      setSelectedEmployeeIds(filteredEmployees.map((e) => e.id));
    }
  };

  // Quick action: Email
  const handleQuickEmail = (emp: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${emp.email}?subject=Enterprise%20Directory%20Inquiry`;
    showToast(`Dispatching mail to ${emp.name}`, emp.email, 'info');
  };

  // Quick action: Slack
  const handleQuickSlack = (emp: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(
      `Direct Slack link opened for ${emp.name}`,
      `Routing to internal messaging workspace @${emp.name.toLowerCase().replace(/\s+/g, '.')}`,
      'info'
    );
  };

  // Save new or edited employee
  const handleSaveEmployee = (emp: Employee) => {
    setEmployees((prev) => {
      const exists = prev.some((item) => item.id === emp.id);
      if (exists) {
        return prev.map((item) => (item.id === emp.id ? emp : item));
      } else {
        return [emp, ...prev];
      }
    });

    if (selectedEmployee?.id === emp.id) {
      setSelectedEmployee(emp);
    }

    showToast(
      employeeToEdit ? 'Employee Record Updated' : 'New Employee Provisioned',
      `${emp.name} (${emp.id}) has been synced across directory and reporting tree.`
    );
    setEmployeeToEdit(null);
  };

  // Toggle compliance verification
  const handleToggleCertification = (empId: string, certKey: 'soc2' | 'hipaa') => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== empId) return emp;
        const newCompliance = { ...emp.compliance };
        if (certKey === 'soc2') {
          newCompliance.soc2Certified = !newCompliance.soc2Certified;
        } else if (certKey === 'hipaa') {
          newCompliance.hipaaTrained = !newCompliance.hipaaTrained;
        }
        return { ...emp, compliance: newCompliance };
      })
    );

    const emp = employees.find((e) => e.id === empId);
    showToast(
      'Compliance Record Audited',
      `Updated ${certKey.toUpperCase()} certification for ${emp?.name || empId}.`
    );
  };

  // Send compliance reminder
  const handleSendReminder = (emp: Employee) => {
    showToast(
      'Compliance Notice Dispatched',
      `Automated certification renewal notice sent to ${emp.email}.`,
      'info'
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    const targetList =
      selectedEmployeeIds.length > 0
        ? employees.filter((e) => selectedEmployeeIds.includes(e.id))
        : filteredEmployees;

    const headers = [
      'Employee ID',
      'Full Name',
      'Title',
      'Department',
      'Team',
      'Email',
      'Phone',
      'Location',
      'Timezone',
      'Manager',
      'Status',
      'Employment Type',
      'Hire Date',
      'Salary Band',
      'Compensation Tier',
      'SOC2 Certified'
    ];

    const rows = targetList.map((e) => [
      `"${e.id}"`,
      `"${e.name}"`,
      `"${e.title}"`,
      `"${e.department}"`,
      `"${e.team}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.location}"`,
      `"${e.timezone}"`,
      `"${e.managerName || 'None'}"`,
      `"${e.status}"`,
      `"${e.employmentType}"`,
      `"${e.hireDate}"`,
      `"${e.salaryBand}"`,
      `"${e.compensationTier}"`,
      `"${e.compliance.soc2Certified ? 'Yes' : 'No'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `executive_enterprise_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      'Directory Roster Exported',
      `Exported ${targetList.length} employee records to CSV file.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
      {/* Top Bar Navigation */}
      <Header
        currentView={viewMode}
        onViewChange={setViewMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAddModal={() => {
          setEmployeeToEdit(null);
          setIsAddModalOpen(true);
        }}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Persistent 280px Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeDepartment={filter.department}
          onSelectDepartment={(dept) => {
            setFilter((prev) => ({ ...prev, department: dept }));
            if (viewMode === 'compliance' || viewMode === 'analytics') {
              setViewMode('cards');
            }
          }}
          activeLocation={filter.location}
          onSelectLocation={(loc) => {
            setFilter((prev) => ({ ...prev, location: loc }));
            if (viewMode === 'compliance' || viewMode === 'analytics') {
              setViewMode('cards');
            }
          }}
          departmentCounts={departmentCounts}
          totalCount={employees.length}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {/* Multi-Select Floating Bulk Action Strip */}
          {selectedEmployeeIds.length > 0 && viewMode === 'table' && (
            <div className="mb-4 p-3 bg-[#EEF2FF] border border-[#C7D2FE] rounded-[6px] flex items-center justify-between text-xs text-[#3730A3] shadow-sm animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#4338CA]" />
                <span className="font-semibold">{selectedEmployeeIds.length} records selected</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4338CA] text-white rounded-[4px] hover:bg-[#3730A3] font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Selected CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(
                      'Batch Compliance Notice Sent',
                      `Notified ${selectedEmployeeIds.length} employees of mandatory policy renewals.`,
                      'info'
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CBD5E1] text-[#334155] rounded-[4px] hover:bg-[#F1F5F9] font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Batch Policy Notice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEmployeeIds([])}
                  className="p-1 hover:text-[#B91C1C]"
                  title="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Search & Filter Toolbar (visible for cards and table views) */}
          {(viewMode === 'cards' || viewMode === 'table') && (
            <SearchFilterToolbar
              filter={filter}
              onFilterChange={(newF) => setFilter((prev) => ({ ...prev, ...newF }))}
              onResetFilters={() =>
                setFilter({
                  searchQuery: '',
                  department: '',
                  location: '',
                  status: '',
                  employmentType: '',
                  sortBy: 'name',
                  sortOrder: 'asc'
                })
              }
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalCount={employees.length}
              filteredCount={filteredEmployees.length}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onOpenAddModal={() => {
                setEmployeeToEdit(null);
                setIsAddModalOpen(true);
              }}
              onExportCSV={handleExportCSV}
            />
          )}

          {/* Sub-view Header for Specialized Views */}
          {viewMode === 'org-chart' && (
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
                  Organizational Hierarchy Structure
                </h1>
                <p className="text-xs text-[#64748B] mt-1">
                  Executive governance architecture, direct reporting lineages, and department heads.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className="h-8 px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs font-medium text-[#334155] hover:bg-[#F1F5F9] transition-colors"
              >
                Back to Directory
              </button>
            </div>
          )}

          {viewMode === 'compliance' && (
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
                  Compliance & Certification Audit
                </h1>
                <p className="text-xs text-[#64748B] mt-1">
                  Regulatory verifications, SOC 2 certification status, HIPAA security, and training logs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className="h-8 px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs font-medium text-[#334155] hover:bg-[#F1F5F9] transition-colors"
              >
                Back to Directory
              </button>
            </div>
          )}

          {viewMode === 'analytics' && (
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
                  Workforce & Headcount Metrics
                </h1>
                <p className="text-xs text-[#64748B] mt-1">
                  Executive talent distribution, location density, and organization growth analytics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className="h-8 px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs font-medium text-[#334155] hover:bg-[#F1F5F9] transition-colors"
              >
                Back to Directory
              </button>
            </div>
          )}

          {/* Conditional View Rendering */}
          {viewMode === 'cards' && (
            <>
              {filteredEmployees.length === 0 ? (
                <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-12 text-center shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
                  <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center mx-auto mb-3 font-semibold text-lg">
                    0
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">No employees found</h3>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1">
                    No directory records match your current filter selection. Try adjusting your search query or reset the filters.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFilter({
                        searchQuery: '',
                        department: '',
                        location: '',
                        status: '',
                        employmentType: '',
                        sortBy: 'name',
                        sortOrder: 'asc'
                      })
                    }
                    className="mt-4 px-4 py-2 bg-[#4338CA] text-white text-xs font-medium rounded-[4px] hover:bg-[#3730A3] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEmployees.map((emp) => (
                    <EmployeeCard
                      key={emp.id}
                      employee={emp}
                      onSelect={(e) => setSelectedEmployee(e)}
                      onQuickEmail={handleQuickEmail}
                      onQuickSlack={handleQuickSlack}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {viewMode === 'table' && (
            <EmployeeTable
              employees={filteredEmployees}
              selectedEmployeeIds={selectedEmployeeIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onSelectEmployee={(e) => setSelectedEmployee(e)}
              sortBy={filter.sortBy}
              sortOrder={filter.sortOrder}
              onSortChange={handleSortChange}
              onQuickEmail={handleQuickEmail}
              onQuickSlack={handleQuickSlack}
            />
          )}

          {viewMode === 'org-chart' && (
            <OrgChart
              employees={employees}
              onSelectEmployee={(e) => setSelectedEmployee(e)}
            />
          )}

          {viewMode === 'compliance' && (
            <ComplianceMatrix
              employees={employees}
              onSelectEmployee={(e) => setSelectedEmployee(e)}
              onSendReminder={handleSendReminder}
              onToggleCertification={handleToggleCertification}
            />
          )}

          {viewMode === 'analytics' && (
            <AnalyticsView employees={employees} />
          )}
        </main>
      </div>

      {/* Slide-over Profile Drawer */}
      <EmployeeDetailDrawer
        employee={selectedEmployee}
        allEmployees={employees}
        isOpen={Boolean(selectedEmployee)}
        onClose={() => setSelectedEmployee(null)}
        onSelectEmployee={(e) => setSelectedEmployee(e)}
        onEditEmployee={(emp) => {
          setEmployeeToEdit(emp);
          setIsAddModalOpen(true);
        }}
        onQuickEmail={handleQuickEmail}
        onQuickSlack={handleQuickSlack}
      />

      {/* Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={isAddModalOpen}
        employeeToEdit={employeeToEdit}
        allEmployees={employees}
        onClose={() => {
          setIsAddModalOpen(false);
          setEmployeeToEdit(null);
        }}
        onSave={handleSaveEmployee}
      />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        employees={employees}
        onSelectEmployee={(emp) => setSelectedEmployee(emp)}
        onNavigateView={(mode) => setViewMode(mode)}
        onOpenAddModal={() => {
          setEmployeeToEdit(null);
          setIsAddModalOpen(true);
        }}
        onExportCSV={handleExportCSV}
      />

      {/* Notification Toast Stack */}
      <NotificationToast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
