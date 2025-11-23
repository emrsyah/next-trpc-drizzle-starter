"use client";

import { authClient } from "@/lib/auth/client";

export function UserProfile() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Force a refetch of the session
            refetch();
          },
        },
      });
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-medium">Error loading session</h3>
        <p className="text-red-600 text-sm mt-1">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <h3 className="text-gray-800 font-medium">Not authenticated</h3>
        <p className="text-gray-600 text-sm mt-1">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-500">Name</label>
          <p className="text-gray-900">{session.user.name || "Not provided"}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-900">{session.user.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">User ID</label>
          <p className="text-gray-900 text-sm font-mono">{session.user.id}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Created At</label>
          <p className="text-gray-900">
            {session.user.createdAt
              ? new Date(session.user.createdAt).toLocaleString()
              : "Unknown"}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Session Expires</label>
          <p className="text-gray-900">
            {new Date(session.session.expiresAt).toLocaleString()}
          </p>
        </div>

        {session.user.image && (
          <div>
            <label className="text-sm font-medium text-gray-500">Profile Image</label>
            <div className="mt-2">
              <img
                src={session.user.image}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Raw Session Data</h4>
        <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
