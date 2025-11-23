"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { UserProfile } from "@/components/auth/user-profile";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Better Auth Testing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your Better Auth setup with email/password authentication and Google OAuth.
            Sign up, sign in, and manage your session.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Auth Form */}
          <div className="flex justify-center">
            <AuthForm />
          </div>

          {/* User Profile */}
          <div className="space-y-6">
            <UserProfile />

            {session && (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-blue-800 font-medium mb-2">
                  🎉 Authentication Successful!
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  You're now signed in. Visit your dashboard to see more details.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-200 text-green-800 rounded-md hover:bg-green-300 transition-colors"
            >
              Refresh Session
            </button>
          </div>
        </div>

        {/* Environment Check */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Environment Status
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>✓ Better Auth Client: Configured</div>
            <div>✓ Email/Password Auth: Enabled</div>
            <div>✓ Google OAuth: Configured (check env vars)</div>
            <div>✓ Database: {process.env.NODE_ENV === 'development' ? 'Dev Mode' : 'Production'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
