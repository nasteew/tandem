interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const MenuIcon: React.FC<IconProps> = ({ className, width = 24, height = 24, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
