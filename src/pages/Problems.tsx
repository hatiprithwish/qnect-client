import { AppLayout } from "../components/layout";
import { useProblemsList } from "../data/queries/problemsQueries";

const ProblemsPage = () => {
  const { data, isLoading, error } = useProblemsList();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Loading problems...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-red-500 text-lg">
            Error loading problems: {error.message}
          </div>
        </div>
      );
    }

    if (!data?.problems || data.problems.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-gray-500 text-lg">No problems found</div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          System Design Problems
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.problems.map((problem) => (
            <div
              key={problem.publicId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-3 text-primary dark:text-primary">
                {problem.title}
              </h2>
              <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {problem.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <AppLayout>{renderContent()}</AppLayout>;
};

export default ProblemsPage;
