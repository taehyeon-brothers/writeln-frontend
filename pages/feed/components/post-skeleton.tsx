import { Skeleton } from "@/pages/base/components/skeleton";
import { Card } from "@/pages/base/components/card";

export function PostSkeleton() {
  return (
    <Card className="overflow-hidden rounded-3xl bg-white p-0 shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
    </Card>
  );
}
