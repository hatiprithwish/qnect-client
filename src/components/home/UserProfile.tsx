import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export default function UserProfilePage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/sign-in");
    }
  }, [isLoaded, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-black dark:text-white">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user.primaryEmailAddress?.emailAddress}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Member since
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(user.createdAt!).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <Button variant="destructive" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
