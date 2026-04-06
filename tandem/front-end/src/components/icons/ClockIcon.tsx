interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ClockIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M12 6V12L16 14" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
