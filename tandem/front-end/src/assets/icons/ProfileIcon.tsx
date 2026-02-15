import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const ProfileIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M4 20V19C4 15.6863 7.23858 13 11.2 13H12.8C16.7614 13 20 15.6863 20 19V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="17" cy="6" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
