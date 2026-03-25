interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const StreakIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
