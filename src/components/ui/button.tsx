import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  paddingX?: string;
}

// Record is a built-in utility type in TypeScript
// It creates an object with specific key (ButtonVariant in this case) and that key has a specific value (string in this case)

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",

  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface",
};

const Button = ({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  paddingX = "px-4",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg ${paddingX} font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
        fullWidth ? "w-full" : "w-fit"
      } ${variants[variant]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
