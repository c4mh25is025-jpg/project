import React, { useState, useEffect } from 'react';
import { X, Save, UserPlus } from 'lucide-react';
import { Employee, Department, EmployeeStatus, EmploymentType } from '../types';
import { DEPARTMENTS, LOCATIONS } from '../data/mockEmployees';

interface EmployeeModalProps {
  isOpen: boolean;
  employeeToEdit: Employee | null;
  allEmployees: Employee[];
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  employeeToEdit,
  allEmployees,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    title: '',
    department: 'Engineering',
    team: '',
    email: '',
    phone: '',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    managerId: '',
    status: 'Active',
    employmentType: 'Full-time',
    desk: '',
    salaryBand: 'L5 - Senior',
    compensationTier: '$180,000 - $210,000',
    skills: []
  });

  const [skillsString, setSkillsString] = useState('');
  const [soc2Certified, setSoc2Certified] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
      setSkillsString(employeeToEdit.skills.join(', '));
      setSoc2Certified(employeeToEdit.compliance.soc2Certified);
    } else {
      setFormData({
        name: '',
        title: '',
        department: 'Engineering',
        team: 'Platform Systems',
        email: '',
        phone: '+1 (415) ',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
        managerId: allEmployees[0]?.id || '',
        status: 'Active',
        employmentType: 'Full-time',
        desk: 'Tower B - Floor 14',
        salaryBand: 'L5 - Senior Engineer',
        compensationTier: '$185,000 - $215,000',
        skills: ['TypeScript', 'Cloud Infrastructure', 'API Design']
      });
      setSkillsString('TypeScript, Cloud Infrastructure, API Design');
      setSoc2Certified(true);
    }
    setErrors({});
  }, [employeeToEdit, isOpen, allEmployees]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name?.trim()) errs.name = 'Full name is required';
    if (!formData.title?.trim()) errs.title = 'Title / Role is required';
    if (!formData.email?.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid corporate email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const managerObj = allEmployees.find((e) => e.id === formData.managerId);
    const parsedSkills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedOrNew: Employee = {
      id: employeeToEdit ? employeeToEdit.id : `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name!,
      title: formData.title!,
      department: (formData.department as Department) || 'Engineering',
      team: formData.team || 'Core Systems',
      email: formData.email!,
      phone: formData.phone || '+1 (415) 890-2100',
      location: formData.location || 'San Francisco, CA',
      timezone: formData.timezone || 'PST (UTC-8)',
      managerId: formData.managerId || null,
      managerName: managerObj ? managerObj.name : null,
      status: (formData.status as EmployeeStatus) || 'Active',
      employmentType: (formData.employmentType as EmploymentType) || 'Full-time',
      hireDate: employeeToEdit ? employeeToEdit.hireDate : new Date().toISOString().split('T')[0],
      avatar:
        employeeToEdit?.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      desk: formData.desk || 'Building 1 - Fl 4',
      salaryBand: formData.salaryBand || 'L5 - Senior',
      compensationTier: formData.compensationTier || '$180,000 - $210,000',
      skills: parsedSkills.length ? parsedSkills : ['Enterprise Architecture'],
      compliance: employeeToEdit?.compliance || {
        soc2Certified: soc2Certified,
        securityAwareness: 'Completed',
        hipaaTrained: true,
        ndaSigned: true,
        ethicsPolicyDate: new Date().toISOString().split('T')[0],
        annualReviewScore: '4.80 / 5.0'
      },
      directReportsCount: employeeToEdit?.directReportsCount || 0
    };

    onSave(updatedOrNew);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px]"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-[8px] border border-[#E2E8F0] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.04)] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 px-6 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#4338CA]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">
              {employeeToEdit ? `Edit Record: ${employeeToEdit.name}` : 'Provision New Employee Record'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-[4px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">
                Full Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. David Sterling"
                className={`w-full h-[38px] px-3 bg-white border rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA] ${
                  errors.name ? 'border-[#DC2626]' : 'border-[#CBD5E1]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-[#DC2626] mt-1">{errors.name}</p>}
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">
                Title & Role <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Staff Systems Architect"
                className={`w-full h-[38px] px-3 bg-white border rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA] ${
                  errors.title ? 'border-[#DC2626]' : 'border-[#CBD5E1]'
                }`}
              />
              {errors.title && <p className="text-[11px] text-[#DC2626] mt-1">{errors.title}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">
                Corporate Email <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@enterprise.internal"
                className={`w-full h-[38px] px-3 bg-white border rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA] ${
                  errors.email ? 'border-[#DC2626]' : 'border-[#CBD5E1]'
                }`}
              />
              {errors.email && <p className="text-[11px] text-[#DC2626] mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Direct Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (415) 890-0000"
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Team */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Functional Team</label>
              <input
                type="text"
                value={formData.team || ''}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                placeholder="e.g. Infrastructure & Security"
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Office Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                {LOCATIONS.filter((l) => l !== 'All Locations').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Manager */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Direct Manager</label>
              <select
                value={formData.managerId || ''}
                onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                <option value="">None (Reports to Board)</option>
                {allEmployees
                  .filter((e) => !employeeToEdit || e.id !== employeeToEdit.id)
                  .map((mgr) => (
                    <option key={mgr.id} value={mgr.id}>
                      {mgr.name} ({mgr.title})
                    </option>
                  ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Employment Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EmployeeStatus })}
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block font-medium text-[#334155] mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) =>
                  setFormData({ ...formData, employmentType: e.target.value as EmploymentType })
                }
                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contractor">Contractor</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium text-[#334155] mb-1">
              Skills & Core Competencies (comma separated)
            </label>
            <input
              type="text"
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
              placeholder="e.g. Distributed Systems, Kubernetes, Security Auditing"
              className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-[4px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          {/* Compliance Checkbox */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={soc2Certified}
                onChange={(e) => setSoc2Certified(e.target.checked)}
                className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#4338CA] focus:ring-[#4338CA]"
              />
              <span className="text-xs text-[#334155] font-medium">
                Mark SOC 2 Type II Security Protocol as Verified & Certified
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] font-medium rounded-[4px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 bg-[#4338CA] hover:bg-[#3730A3] border border-[#3730A3] text-white font-medium rounded-[4px] transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{employeeToEdit ? 'Save Changes' : 'Create Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
