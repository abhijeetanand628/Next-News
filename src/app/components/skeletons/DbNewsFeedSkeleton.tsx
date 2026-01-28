import Skeleton from "../Skeleton";

export default function DbNewsFeedSkeleton() {
  return (
    <div className="mb-12">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="w-48 h-8 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100"
          >
            {/* Image */}
            <Skeleton className="w-full h-40" />

            {/* Content */}
            <div className="p-4 flex flex-col h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-20 h-4 rounded" />
              </div>

              <div className="space-y-2 mb-4">
                <Skeleton className="w-full h-5 rounded" />
                <Skeleton className="w-3/4 h-5 rounded" />
              </div>

              <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                <Skeleton className="w-24 h-4 rounded" />
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
