export default function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow animate-pulse text-center">

      <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>

      <div className="h-8 bg-gray-300 rounded mt-4"></div>

    </div>
  );
}