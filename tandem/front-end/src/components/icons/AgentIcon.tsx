interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const AgentIcon: React.FC<IconProps> = ({
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
    <circle cx="12" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 10H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 18L7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 18L17 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="9" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
