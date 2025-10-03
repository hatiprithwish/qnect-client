import { useProblems } from "../hooks/useProblems";

const ProblemsPage = () => {
  const { data, isLoading, error } = useProblems();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading problems...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">
          Error loading problems: {error.message}
        </div>
      </div>
    );
  }

  if (!data?.problems || data.problems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg">No problems found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">System Design Problems</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.problems.map((problem) => (
          <div
            key={problem.publicId}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-600">
              {problem.title}
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed">
              {problem.description}
            </div>
            <div className="mt-4 text-xs text-gray-400 uppercase tracking-wide">
              ID: {problem.publicId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsPage;
