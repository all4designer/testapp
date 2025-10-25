import { forwardRef, LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm';
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', size, children, ...props }, ref) => {
    const classes = [
      'label',
      size && `label-${size}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <label ref={ref} className={classes} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
