interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const StatisticIcon: React.FC<IconProps> = ({
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
    <path d="M3 17V20H21V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 14V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 14V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 20L21 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
