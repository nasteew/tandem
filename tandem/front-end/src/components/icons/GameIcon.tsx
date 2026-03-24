interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const GameIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="1.5" />
    <circle cx="8" cy="12" r="1.5" fill="currentColor" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    <path d="M10 12H14" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
