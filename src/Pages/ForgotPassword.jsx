import React, { useState } from "react";
import { useForgotPassword } from "@/core/Hooks/Api/userData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Forgot Password
        </h2>

        {isSuccess ? (
          <p className="text-green-600 dark:text-green-400 text-center">
            If an account with that email exists, a password reset link has been
            sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>

            {isError && (
              <p className="text-red-600 dark:text-red-400 text-center text-sm">
                {error?.response?.data?.message ||
                  "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
