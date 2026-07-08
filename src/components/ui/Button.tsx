import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fence-iron disabled:pointer-events-none disabled:opacity-50",
      {
        'bg-fence-iron text-white shadow-sm hover:bg-fence-iron/90': variant === 'default',
        'border border-fence-iron/20 bg-white hover:bg-white/50 hover:text-fence-iron': variant === 'outline',
        'hover:bg-white/50 hover:text-fence-iron': variant === 'ghost',
        'h-9 px-4 py-2': size === 'default',
        'h-8 px-3 text-xs': size === 'sm',
        'h-10 px-8': size === 'lg',
      },
      className
    );

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children;
      const { children, ...restProps } = props;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ref: ref as any,
        ...restProps,
      } as any);
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
