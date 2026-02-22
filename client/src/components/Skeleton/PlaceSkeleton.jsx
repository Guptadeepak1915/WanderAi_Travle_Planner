const PlaceSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-2" />

        {/* Address */}
        <div className="h-4 bg-gray-200 rounded-full w-full mb-1" />
        <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-4" />

        {/* Rating + Distance */}
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded-full w-16" />
          <div className="h-4 bg-gray-200 rounded-full w-16" />
        </div>

        {/* Category */}
        <div className="h-6 bg-gray-200 rounded-full w-24 mb-3" />

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
};

export default PlaceSkeleton;