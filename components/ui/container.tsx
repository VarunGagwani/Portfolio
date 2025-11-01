import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          "mx-auto w-full",
          // Size variants
          {
            'max-w-screen-sm': size === 'sm',
            'max-w-screen-md': size === 'md', 
            'max-w-screen-lg': size === 'lg',
            'max-w-screen-xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          // Padding variants
          {
            'px-0': padding === 'none',
            'px-4 sm:px-6': padding === 'sm',
            'px-4 sm:px-6 lg:px-8': padding === 'md',
            'px-6 sm:px-8 lg:px-12': padding === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"

export { Container }