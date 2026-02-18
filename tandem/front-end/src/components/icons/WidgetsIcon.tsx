import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const WidgetsIcon: React.FC<IconProps> = ({
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
    {/* 👇 ТРЕТИЙ SVG-код */}
    <rect
      x="4"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="13"
      y="4"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="4"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="13"
      y="13"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
