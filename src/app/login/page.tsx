"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border-indigo-200 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-indigo-900 text-center">
            Login to EventVault
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => {
              if (email === "admin@eventvault.ca" && password === "test123") {
                alert("Logged in successfully! (demo)");
                // In real app: redirect to /dashboard
                window.location.href = "/dashboard";
              } else {
                setError(
                  "Invalid email or password. Try admin@eventvault.ca / test123",
                );
              }
            }}
          >
            Login
          </Button>

          <p className="text-center text-sm text-gray-500">
            Forgot password?{" "}
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Reset here
            </span>
          </p>

          {error && (
            <p className="text-center text-red-600 text-sm mt-2">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
