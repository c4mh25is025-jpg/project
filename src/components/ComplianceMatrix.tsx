import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, Mail, FileCheck, RefreshCw } from 'lucide-react';
import { Employee } from '../types';
import { EmployeeAvatar } from './EmployeeAvatar';

interface ComplianceMatrixProps {
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  onSendReminder: (emp: Employee) => void;
  onToggleCertification: (empId: string, certKey: 'soc2' | 'hipaa') => void;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({
  employees,
  onSelectEmployee,
  onSendReminder,
  onToggleCertification
}) => {
  const [filterNeedsAction, setFilterNeedsAction] = useState(false);

  // Compute metrics
  const totalEmployees = employees.length;
  const soc2Count = employees.filter((e) => e.compliance.soc2Certified).length;
  const soc2Rate = Math.round((soc2Count / totalEmployees) * 100);

  const secAwarenessCompleted = employees.filter(
    (e) => e.compliance.securityAwareness === 'Completed'
  ).length;
  const secRate = Math.round((secAwarenessCompleted / totalEmployees) * 100);

  const ndaCount = employees.filter((e) => e.compliance.ndaSigned).length;
  const ndaRate = Math.round((ndaCount / totalEmployees) * 100);

  const pendingItemsCount = employees.filter(
    (e) => !e.compliance.soc2Certified || e.compliance.securityAwareness !== 'Completed'
  ).length;

  const displayedEmployees = filterNeedsAction
    ? employees.filter(
        (e) => !e.compliance.soc2Certified || e.compliance.securityAwareness !== 'Completed'
      )
    : employees;

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: SOC 2 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>SOC 2 Type II Certified</span>
            <ShieldCheck className="w-4 h-4 text-[#4338CA]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
              {soc2Rate}%
            </span>
            <span className="text-xs text-[#64748B] font-mono tabular-nums">
              ({soc2Count}/{totalEmployees})
            </span>
          </div>
          <div className="mt-2 w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#4338CA] h-1.5 rounded-full transition-all"
              style={{ width: `${soc2Rate}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Security Awareness */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Security Awareness Course</span>
            <FileCheck className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
              {secRate}%
            </span>
            <span className="text-xs text-[#64748B] font-mono tabular-nums">
              ({secAwarenessCompleted}/{totalEmployees})
            </span>
          </div>
          <div className="mt-2 w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#059669] h-1.5 rounded-full transition-all"
              style={{ width: `${secRate}%` }}
            />
          </div>
        </div>

        {/* Metric 3: NDA Compliance */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Executed NDA & IP Assignment</span>
            <CheckCircle2 className="w-4 h-4 text-[#334155]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-[#0F172A]">
              {ndaRate}%
            </span>
            <span className="text-xs text-[#64748B] font-mono tabular-nums">
              ({ndaCount}/{totalEmployees})
            </span>
          </div>
          <div className="mt-2 w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#334155] h-1.5 rounded-full transition-all"
              style={{ width: `${ndaRate}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Pending Action Items */}
        <div className="bg-white border border-[#E2E8F0] rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#92400E]">
            <span>Action Required</span>
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-[#D97706]">
              {pendingItemsCount}
            </span>
            <span className="text-xs text-[#64748B]">pending certifications</span>
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setFilterNeedsAction(!filterNeedsAction)}
              className={`text-[11px] font-medium transition-colors ${
                filterNeedsAction
                  ? 'text-[#4338CA] underline font-semibold'
                  : 'text-[#D97706] hover:underline'
              }`}
            >
              {filterNeedsAction ? 'Show all employees' : 'Filter by action required →'}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Table Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-[8px] overflow-hidden shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Enterprise Compliance & Regulatory Matrix
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Auditable security protocol verifications, background screening, and annual ethics sign-offs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 text-xs text-[#334155] cursor-pointer">
              <input
                type="checkbox"
                checked={filterNeedsAction}
                onChange={(e) => setFilterNeedsAction(e.target.checked)}
                className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#4338CA] focus:ring-[#4338CA]"
              />
              <span className="font-medium">Only show pending reviews</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">SOC 2 Type II</th>
                <th className="py-3 px-4 text-center">Security Awareness</th>
                <th className="py-3 px-4 text-center">HIPAA Protocol</th>
                <th className="py-3 px-4 text-center">NDA Signed</th>
                <th className="py-3 px-4">Ethics Sign-Off</th>
                <th className="py-3 px-4 text-right">Review Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {displayedEmployees.map((emp) => {
                const needsAction =
                  !emp.compliance.soc2Certified ||
                  emp.compliance.securityAwareness !== 'Completed';

                return (
                  <tr
                    key={emp.id}
                    onClick={() => onSelectEmployee(emp)}
                    className="h-12 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-4 font-medium text-[#0F172A]">
                      <div className="flex items-center gap-2.5">
                        <EmployeeAvatar src={emp.avatar} name={emp.name} size={30} />
                        <div>
                          <div className="font-semibold text-xs text-[#0F172A] hover:text-[#4338CA]">
                            {emp.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#94A3B8] tabular-nums">
                            {emp.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-4 text-[#334155]">{emp.department}</td>

                    {/* SOC 2 Toggle */}
                    <td
                      className="py-2.5 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCertification(emp.id, 'soc2');
                      }}
                    >
                      {emp.compliance.soc2Certified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Certified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    {/* Security Awareness */}
                    <td className="py-2.5 px-4 text-center">
                      {emp.compliance.securityAwareness === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    {/* HIPAA */}
                    <td
                      className="py-2.5 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCertification(emp.id, 'hipaa');
                      }}
                    >
                      {emp.compliance.hipaaTrained ? (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#059669] cursor-pointer" title="HIPAA Trained - Click to toggle" />
                      ) : (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#CBD5E1] cursor-pointer" title="Not required / Not trained" />
                      )}
                    </td>

                    {/* NDA */}
                    <td className="py-2.5 px-4 text-center">
                      {emp.compliance.ndaSigned ? (
                        <span className="text-[11px] text-[#059669] font-medium">Signed</span>
                      ) : (
                        <span className="text-[11px] text-[#B91C1C] font-medium">Missing</span>
                      )}
                    </td>

                    {/* Ethics Sign-off */}
                    <td className="py-2.5 px-4 font-mono text-[11px] text-[#475569] tabular-nums">
                      {emp.compliance.ethicsPolicyDate}
                    </td>

                    {/* Annual Review Score */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs font-semibold tabular-nums text-[#334155]">
                      {emp.compliance.annualReviewScore}
                    </td>

                    {/* Actions */}
                    <td
                      className="py-2.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {needsAction ? (
                        <button
                          type="button"
                          onClick={() => onSendReminder(emp)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D97706] hover:text-[#92400E] bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] px-2 py-1 rounded-[4px] transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Ping</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#059669] font-medium">Compliant</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
