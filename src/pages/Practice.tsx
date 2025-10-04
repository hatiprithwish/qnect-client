import { useParams } from "react-router-dom";
import { AppLayout } from "../components/layout";

export default function PracticePage() {
  const { problemId } = useParams<{ problemId: string }>();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Practice Problem
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Problem ID: {problemId}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is where the practice problem content will be displayed.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
