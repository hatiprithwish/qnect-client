import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import {
  signUpFormSchema,
  verificationCodeSchema,
  type SignUpFormData,
  type VerificationCodeData,
} from "./atoms";

export default function SignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const verificationForm = useForm<VerificationCodeData>({
    resolver: zodResolver(verificationCodeSchema),
  });

  const handleSubmit = form.handleSubmit(async (data: SignUpFormData) => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(
        clerkError.errors?.[0]?.message ||
          "Failed to sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  });

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(
        clerkError.errors?.[0]?.message || "Failed to sign up with Google."
      );
    }
  };

  const handleGithubSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(
        clerkError.errors?.[0]?.message || "Failed to sign up with GitHub."
      );
    }
  };

  const handleVerify = verificationForm.handleSubmit(
    async (data: VerificationCodeData) => {
      if (!isLoaded) return;

      setIsLoading(true);
      setError("");

      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.code,
        });

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          navigate("/");
        }
      } catch (err: unknown) {
        const clerkError = err as { errors?: Array<{ message: string }> };
        setError(
          clerkError.errors?.[0]?.message ||
            "Failed to verify code. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 text-2xl font-bold text-black dark:text-white"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <AcademicCapIcon className="w-6 h-6 text-black dark:text-white" />
          </div>
          <span>Qnect</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {pendingVerification ? "Verify your email" : "Create your account"}
        </h2>
        {!pendingVerification && (
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!pendingVerification ? (
            <>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignUp}
                  >
                    <img src="/google-icon.svg" className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGithubSignUp}
                  >
                    <img src="/github-icon.svg" className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {error}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Enter your first name"
                        {...form.register("firstName")}
                      />
                      <FieldError
                        errors={
                          form.formState.errors.firstName
                            ? [form.formState.errors.firstName]
                            : []
                        }
                      />
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Enter your last name"
                        {...form.register("lastName")}
                      />
                      <FieldError
                        errors={
                          form.formState.errors.lastName
                            ? [form.formState.errors.lastName]
                            : []
                        }
                      />
                    </FieldContent>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="emailAddress">Email address</FieldLabel>
                  <FieldContent>
                    <Input
                      id="emailAddress"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      {...form.register("emailAddress")}
                    />
                    <FieldError
                      errors={
                        form.formState.errors.emailAddress
                          ? [form.formState.errors.emailAddress]
                          : []
                      }
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter your password"
                      {...form.register("password")}
                    />
                    <FieldError
                      errors={
                        form.formState.errors.password
                          ? [form.formState.errors.password]
                          : []
                      }
                    />
                  </FieldContent>
                </Field>

                <div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner className="h-4 w-4 mr-2" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <form className="space-y-6" onSubmit={handleVerify}>
              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              )}

              <div className="text-sm text-gray-600 dark:text-gray-400">
                We've sent a verification code to{" "}
                <strong>{form.getValues("emailAddress")}</strong>. Please enter
                it below.
              </div>

              <Field>
                <FieldLabel htmlFor="code">Verification code</FieldLabel>
                <FieldContent>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter code"
                    {...verificationForm.register("code")}
                  />
                  <FieldError
                    errors={
                      verificationForm.formState.errors.code
                        ? [verificationForm.formState.errors.code]
                        : []
                    }
                  />
                </FieldContent>
              </Field>

              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify email"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
