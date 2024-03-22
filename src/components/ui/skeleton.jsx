import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary', className)}
      {...props}
    />
  )
}

export { Skeleton }
