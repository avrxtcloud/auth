import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'premium'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
      outline: "border border-white/10 bg-transparent hover:bg-white/5 hover:text-white",
      secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
      ghost: "hover:bg-white/5 hover:text-white",
      link: "text-emerald-500 underline-offset-4 hover:underline",
      premium: "bg-white/[0.03] border border-white/08 text-white hover:bg-white/08 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4",
      lg: "h-14 px-8 rounded-2xl text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
