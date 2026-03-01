interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const GoogleIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
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
    <path
      fill="currentColor"
      d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.479-10.001 10.001s4.479 10.001 10.001 10.001c8.396 0 10.001-7.821 10.001-10.001 0-0.672-0.067-1.326-0.181-1.965h-9.82z"
    />
  </svg>
);
