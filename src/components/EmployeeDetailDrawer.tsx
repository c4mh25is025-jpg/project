import React from 'react';
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Users,
  Copy,
  Check,
  Edit2,
  Download
} from 'lucide-react';
import { Employee } from '../types';
import { StatusBadge } from './StatusBadge';
import { EmployeeAvatar } from './EmployeeAvatar';

interface EmployeeDetailDrawerProps {
  employee: Employee | null;
  allEmployees: Employee[];
  isOpen: boolean;
  onClose: () => void;
  onSelectEmployee: (emp: Employee) => void;
  onEditEmployee: (emp: Employee) => void;
  onQuickEmail: (emp: Employee, e: React.MouseEvent) => void;
  onQuickSlack: (emp: Employee, e: React.MouseEvent) => void;
}

export const EmployeeDetailDrawer: React.FC<EmployeeDetailDrawerProps> = ({
  employee,
  allEmployees,
  isOpen,
  onClose,
  onSelectEmployee,
  onEditEmployee,
  onQuickEmail,
  onQuickSlack
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!isOpen || !employee) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  // Find manager object
  const manager = employee.managerId
    ? allEmployees.find((e) => e.id === employee.managerId)
    : null;

  // Find direct reports
  const directReports = allEmployees.filter((e) => e.managerId === employee.id);

  // Export mock vCard / summary text
  const exportVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
TITLE:${employee.title}
ORG:Executive Enterprise;${employee.department}
EMAIL;TYPE=INTERNET,WORK:${employee.email}
TEL;TYPE=WORK,VOICE:${employee.phone}
ADR;TYPE=WORK:;;${employee.desk};${employee.location}
NOTE:Employee ID: ${employee.id} | Status: ${employee.status}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employee.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2E8F0] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.04)] flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div>
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] tabular-nums">
                  Record {employee.id}
                </span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-xs font-medium text-[#475569]">
                  {employee.employmentType}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEditEmployee(employee)}
                  className="p-1.5 rounded-[4px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
                  title="Edit Employee Information"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-[4px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
                  title="Close Flyout"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Hero */}
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-start gap-4">
                <EmployeeAvatar
                  src={employee.avatar}
                  name={employee.name}
                  size={64}
                  className="border-2 border-white shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-[#0F172A] truncate">
                      {employee.name}
                    </h2>
                    <StatusBadge status={employee.status} />
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium leading-relaxed">
                    {employee.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#475569]">
                    <span className="inline-block bg-[#F1F5F9] px-2 py-0.5 rounded-[4px] font-medium text-[11px]">
                      {employee.department}
                    </span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="text-[11px] text-[#64748B]">{employee.team}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={(e) => onQuickEmail(employee, e)}
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3 bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-medium rounded-[4px] transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => onQuickSlack(employee, e)}
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] text-xs font-medium rounded-[4px] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Slack</span>
                </button>
                <button
                  type="button"
                  onClick={exportVCard}
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] text-xs font-medium rounded-[4px] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>vCard</span>
                </button>
              </div>
            </div>

            {/* Profile Sections */}
            <div className="p-6 space-y-6 text-xs">
              {/* Contact Information */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                  Direct Contact & Office Location
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[#475569]">
                      <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="font-mono text-xs">{employee.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(employee.email, 'email')}
                      className="text-[#64748B] hover:text-[#4338CA] p-1"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[#475569]">
                      <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="font-mono text-xs">{employee.phone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(employee.phone, 'phone')}
                      className="text-[#64748B] hover:text-[#4338CA] p-1"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <div className="flex items-center gap-2 text-[#334155]">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="font-medium">{employee.location}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] pl-5.5">{employee.desk}</div>
                    <div className="text-[11px] text-[#64748B] pl-5.5 font-mono tabular-nums">
                      {employee.timezone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizational Lineage */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                  Reporting Hierarchy
                </h3>
                <div className="space-y-3">
                  {/* Direct Manager */}
                  <div className="p-3 rounded-[6px] border border-[#E2E8F0] bg-white">
                    <div className="text-[11px] text-[#64748B] font-medium mb-1.5 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#4338CA]" />
                      <span>Reports Directly To:</span>
                    </div>
                    {manager ? (
                      <div
                        onClick={() => onSelectEmployee(manager)}
                        className="flex items-center gap-2.5 cursor-pointer hover:bg-[#F8FAFC] p-1.5 rounded-[4px] transition-colors"
                      >
                        <EmployeeAvatar src={manager.avatar} name={manager.name} size={32} />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs text-[#0F172A] hover:text-[#4338CA]">
                            {manager.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] truncate">
                            {manager.title}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-[#64748B] italic p-1.5">
                        Reports directly to Executive Board of Directors
                      </div>
                    )}
                  </div>

                  {/* Direct Reports */}
                  {directReports.length > 0 && (
                    <div className="p-3 rounded-[6px] border border-[#E2E8F0] bg-white">
                      <div className="text-[11px] text-[#64748B] font-medium mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#4338CA]" />
                          <span>Direct Reports:</span>
                        </span>
                        <span className="font-mono tabular-nums text-[#0F172A] font-semibold">
                          {directReports.length}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {directReports.map((report) => (
                          <div
                            key={report.id}
                            onClick={() => onSelectEmployee(report)}
                            className="flex items-center gap-2 p-1.5 rounded-[4px] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                          >
                            <EmployeeAvatar src={report.avatar} name={report.name} size={28} />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs text-[#0F172A] truncate hover:text-[#4338CA]">
                                {report.name}
                              </div>
                              <div className="text-[10px] text-[#64748B] truncate">
                                {report.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Compensation & Tenure Matrix */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                  Compensation Band & Service Tenure
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[10px] text-[#64748B]">Internal Level</div>
                    <div className="mt-1 font-mono font-semibold text-xs text-[#0F172A] tabular-nums">
                      {employee.salaryBand}
                    </div>
                  </div>
                  <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[10px] text-[#64748B]">Target Compensation</div>
                    <div className="mt-1 font-mono font-semibold text-xs text-[#0F172A] tabular-nums">
                      {employee.compensationTier}
                    </div>
                  </div>
                  <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[10px] text-[#64748B]">Hire Date</div>
                    <div className="mt-1 font-mono font-semibold text-xs text-[#0F172A] tabular-nums">
                      {employee.hireDate}
                    </div>
                  </div>
                  <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[10px] text-[#64748B]">Annual Performance</div>
                    <div className="mt-1 font-mono font-semibold text-xs text-[#059669] tabular-nums">
                      {employee.compliance.annualReviewScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance & Security Status */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                  Regulatory Compliance & Trust
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-[4px] border border-[#E2E8F0]">
                    <span className="text-[#334155]">SOC 2 Type II Security Protocol</span>
                    {employee.compliance.soc2Certified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Certified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#92400E] bg-[#FFFBEB] px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-[4px] border border-[#E2E8F0]">
                    <span className="text-[#334155]">Annual Security Awareness Course</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {employee.compliance.securityAwareness}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-[4px] border border-[#E2E8F0]">
                    <span className="text-[#334155]">NDA & Proprietary Rights Agreement</span>
                    <span className="text-[11px] font-medium text-[#059669]">Signed on file</span>
                  </div>
                </div>
              </div>

              {/* Skills & Core Competencies */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {employee.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-[4px] bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#334155]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-[11px] text-[#94A3B8] text-center">
            Executive Enterprise Directory · Internal Corporate Record
          </div>
        </div>
      </div>
    </div>
  );
};
