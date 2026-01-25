"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Clock } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Bookings", value: "24", icon: Calendar, color: "blue" },
    { title: "Revenue", value: "$18,420", icon: DollarSign, color: "green" },
    { title: "Pending", value: "5", icon: Clock, color: "yellow" },
    { title: "Clients", value: "18", icon: Users, color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          EventVault Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back, Admin. Here&apos;s your venue overview.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of your dashboard... */}
      </div>
    </div>
  );
}
