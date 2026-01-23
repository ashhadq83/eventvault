"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-6">
          Welcome to EventVault Dashboard
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          You are logged in (demo mode). Bookings, calendar, staff tasks coming
          soon.
        </p>
        <p className="text-sm text-gray-500">
          Admin area – full control over venues, inquiries, and reports
        </p>
      </div>
    </div>
  );
}
