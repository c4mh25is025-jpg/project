import React from 'react';
import { EmployeeStatus } from '../types';

interface StatusBadgeProps {
  status: EmployeeStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  let badgeStyle = '';
  let displayText = status.toUpperCase();

  switch (status) {
    case 'Active':
      badgeStyle = 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]';
      break;
    case 'On Leave':
      badgeStyle = 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]';
      break;
    case 'Pending Review':
      badgeStyle = 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]';
      break;
    case 'Inactive':
    default:
      badgeStyle = 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-wider rounded-full border border-solid leading-none shrink-0 ${badgeStyle} ${className}`}
      style={{ height: '20px' }}
    >
      {displayText}
    </span>
  );
};
