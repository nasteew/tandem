import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const DashboardIcon: React.FC<IconProps> = ({
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
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
    <circle cx="7" cy="17" r="1" fill="currentColor" />
  </svg>
);
