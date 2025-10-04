import { useParams, Link } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { PracticePageLayout } from "../components/layout";
import { useProblemDetail } from "../data/queries/problemsQueries";
import { Spinner } from "../components/ui/spinner";
import { FullPageError } from "../components/ui/FullPageError";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CircleIcon } from "lucide-react";

export default function PracticePage() {
  const { problemId } = useParams<{ problemId: string }>();
  const {
    data: problemData,
    isLoading,
    isError,
    error,
  } = useProblemDetail(problemId!);

  if (isError) {
    return (
      <FullPageError
        title="Failed to load problem"
        message={error?.message || "An unexpected error occurred"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const leftSidebar = (
    <div className="space-y-6">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-xl font-bold text-black dark:text-white"
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <AcademicCapIcon className="w-5 h-5 text-black dark:text-white" />
        </div>
        <span>Qnect</span>
      </Link>

      {/* Problem Details */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <React.Fragment>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {problemData?.problem.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="warning" className="capitalize">
                {problemData?.problem.difficulty}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                60 Mins
              </Badge>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold text-black dark:text-white">
                Problem Overview
              </h4>
              <p className="text-gray3 mt-1 text-sm">
                {problemData?.problem.description}
              </p>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold text-black dark:text-white">
                Functional Requirements
              </h4>
              <ul className="space-y-3 text-black dark:text-white mt-1">
                {problemData?.problem.functionalRequirements.map(
                  (requirement) => (
                    <li
                      key={requirement}
                      className="bg-primary/10 p-2 rounded-md flex gap-2"
                    >
                      <div className="w-1 h-1 mt-1">
                        <CircleIcon
                          className="w-1.5 h-1.5 text-primary"
                          fill="currentColor"
                        />
                      </div>
                      <span className="text-xs">{requirement}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold text-black dark:text-white">
                Non-Functional Requirements
              </h4>
              <ul className="space-y-3 text-black dark:text-white mt-1">
                {problemData?.problem.nonFunctionalRequirements.map(
                  (requirement) => (
                    <li
                      key={requirement}
                      className="bg-primary/10 p-2 rounded-md flex gap-2"
                    >
                      <div className="w-1 h-1 mt-1">
                        <CircleIcon
                          className="w-1.5 h-1.5 text-primary"
                          fill="currentColor"
                        />
                      </div>
                      <span className="text-xs">{requirement}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );

  const rightSidebar = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Tools & Resources
      </h3>
      <div className="space-y-2">
        <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="font-medium text-gray-800 dark:text-gray-200">
            Drawing Tools
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Shapes, arrows, text
          </div>
        </button>
        <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="font-medium text-gray-800 dark:text-gray-200">
            Templates
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pre-built components
          </div>
        </button>
        <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="font-medium text-gray-800 dark:text-gray-200">
            Evaluation
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Check your solution
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <PracticePageLayout leftSidebar={leftSidebar} rightSidebar={rightSidebar}>
      <div className="h-full flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Practice Problem
        </h1>
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Problem ID: {problemId}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is where the practice problem content will be displayed.
          </p>
          <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Design canvas will be rendered here
            </p>
          </div>
        </div>
      </div>
    </PracticePageLayout>
  );
}
