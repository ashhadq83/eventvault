import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-950 mb-6 tracking-tight">
          EventVault
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-700 mb-10">
          The Smart Way to Book Banquet Halls & Events
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">Fast Availability</CardTitle>
              <CardDescription>Real-time calendar, no conflicts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Check rooms instantly</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">Easy Invoicing</CardTitle>
              <CardDescription>Deposits via Stripe</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Auto-generated contracts</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">Mobile Ready</CardTitle>
              <CardDescription>Staff & admin on the go</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">React Native coming soon</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg">
            Explore Venues
          </Button>
          <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-700 px-10 py-6 text-lg">
            Admin Dashboard
          </Button>
        </div>

        <p className="mt-16 text-gray-500 text-sm">
          Built by Ashhad • Calgary, Alberta • 2026
        </p>
      </div>
    </div>
  );
}