import { AlertTriangleIcon } from "lucide-react";

interface FullPageErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function FullPageError({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: FullPageErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="mb-6">
          <AlertTriangleIcon className="h-16 w-16 text-red-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
