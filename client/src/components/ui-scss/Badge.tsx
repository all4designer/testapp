import { forwardRef, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'outline' | 'secondary';
  hover?: boolean;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'primary', hover, children, ...props }, ref) => {
    const classes = [
      'badge',
      `badge-${variant}`,
      hover && 'badge-hover',
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
