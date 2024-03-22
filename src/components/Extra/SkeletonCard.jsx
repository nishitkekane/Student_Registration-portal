import { Skeleton } from '../ui/skeleton'

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}
