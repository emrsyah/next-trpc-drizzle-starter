import { UserProfile } from "@/components/auth/user-profile";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome to your authenticated dashboard. Here you can see your session information.
          </p>
        </div>

        <UserProfile />
      </div>
    </div>
  );
}
