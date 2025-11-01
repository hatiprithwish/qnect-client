import { Link } from "react-router-dom";
import { useSystemDesignProblemsList } from "../../data/queries/sytemDesignProblemsQueries";
import { AppLayout } from "@/components/layout/app-layout/AppLayout";

const ProblemsPage = () => {
  const { data, isLoading, error } = useSystemDesignProblemsList();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg">Loading system design problems...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-red-500 text-lg">
            Error loading system design problems: {error.message}
          </div>
        </div>
      );
    }

    if (!data?.systemDesignProblems || data.systemDesignProblems.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-gray-500 text-lg">
            No system design problems found
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          System Design Problems
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.systemDesignProblems.map((systemDesignProblem) => (
            <Link
              key={systemDesignProblem.publicId}
              to={`/practice/${systemDesignProblem.publicId}`}
            >
              <div className="rounded-lg shadow-md p-6 border border-primary hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-xl font-semibold mb-3 text-primary">
                  {systemDesignProblem.title}
                </h2>
                <div className="text-black dark:text-white text-sm leading-relaxed">
                  {systemDesignProblem.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return <AppLayout>{renderContent()}</AppLayout>;
};

export default ProblemsPage;
