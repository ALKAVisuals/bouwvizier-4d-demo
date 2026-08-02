import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition disabled:cursor-not-allowed disabled:opacity-55";
  const variants = {
    primary: "bg-[#1d2226] text-white hover:bg-black",
    secondary: "border border-[#d8dde0] bg-white text-[#23282c] hover:bg-[#f5f6f4]",
    ghost: "text-[#475159] hover:bg-[#f0f2f2]",
    danger: "bg-[#b94942] text-white hover:bg-[#9f3d37]",
  };
  const sizes = { sm: "min-h-9 px-3 text-sm", md: "min-h-11 px-4 text-sm" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}
