interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const TrophyIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M6 9H4V6H6V9Z" strokeWidth="1.5" />
    <path d="M18 9H20V6H18V9Z" strokeWidth="1.5" />
    <path d="M8 21H16" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17V21" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 4V9C8 12 12 13 12 13C12 13 16 12 16 9V4H8Z" strokeWidth="1.5" />
  </svg>
);
