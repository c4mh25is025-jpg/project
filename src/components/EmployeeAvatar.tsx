import React, { useState } from 'react';

interface EmployeeAvatarProps {
  src: string;
  name: string;
  size?: number; // default 48px
  className?: string;
}

export const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
  src,
  name,
  size = 48,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getBackgroundColor = (str: string) => {
    const colors = [
      'bg-indigo-600',
      'bg-slate-700',
      'bg-blue-600',
      'bg-violet-700',
      'bg-teal-700',
      'bg-cyan-700'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (hasError || !src) {
    return (
      <div
        className={`shrink-0 rounded-[4px] flex items-center justify-center text-white font-medium text-sm select-none ${getBackgroundColor(name)} ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`shrink-0 rounded-[4px] object-cover border border-[#E2E8F0] ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
