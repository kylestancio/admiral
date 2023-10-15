import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants>{
  children?: React.ReactNode
}

export const buttonVariants = cva(
  "rounded-md shadow-sm",
  { 
    variants: {
      variant: {
        "primary":
          "bg-purple-700 text-white hover:bg-purple-800 disabled:bg-purple-800 disabled:text-purple-400 dark:bg-pruple-100 dark:text-white dark:hover:bg-purple-900 dark:disabled:bg-purple-800 dark:disabled:text-purple-400",
        "secondary":
          "bg-zinc-500 text-white hover:bg-zinc-600 disabled:bg-zinc-600 disabled:text-zinc-400 dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-400",
        "dark": 
          "bg-zinc-900 text-zinc-100 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:disabled:bg-zinc-300 dark:disabled:text-zinc-700",
        "light":
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-300 disabled:bg-zinc-200 disabled:text-zinc-500 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500",
        "outline-primary":
          "outline outline-1 outline-purple-700 text-purple-700 hover:bg-purple-100 disabled:text-zinc-500 disabled:hover:bg-transparent dark:outline-purple-500 dark:text-purple-500 dark:hover:bg-purple-950 dark:hover:text-white dark:disabled:text-zinc-500 dark:disabled:bg-transparent",
        "outline-secondary":
          "outline outline-1 outline-zinc-700 text-zinc-700 hover:bg-zinc-100 disabled:text-zinc-500 disabled:hover:bg-transparent dark:outline-zinc-500 dark:text-zinc-500 dark:hover:bg-zinc-950 dark:hover:text-zinc-100 dark:disabled:text-zinc-500 dark:disabled:bg-transparent",
      },
      size: {
        default:
          "px-2 py-1 text-base",
        sm:
          "px-1 text-sm",
        icon:
          "text-xs"
      }
    },
    defaultVariants: {
      variant: "dark",
      size: "default"
    }
  }
)

export function Button({variant, size, className, children, ...props}:ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </button>
  )
}
