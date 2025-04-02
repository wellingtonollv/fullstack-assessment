import { cn } from "@/shared/utils/tailwindcss/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md opacity-60 bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
