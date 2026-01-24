"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  onForgotPassword: () => void;
  loading: boolean;
  error: string;
}

export default function LoginForm({
  onSubmit,
  onForgotPassword,
  loading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, rememberMe);
  };

  const handleDemoLogin = () => {
    setEmail("admin@eventvault.ca");
    setPassword("test123");
    setRememberMe(true);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@eventvault.ca"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="test123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400 pr-12"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={loading}
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
          onClick={onForgotPassword}
          disabled={loading}
        >
          Forgot password?
        </button>

        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
          onClick={handleDemoLogin}
          disabled={loading}
        >
          Use demo credentials
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm text-center">{error}</p>
        </div>
      )}

      <div className="text-center text-sm">
        <div className="inline-block bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100">
          <p className="font-medium text-indigo-700 mb-1">Demo Access</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="text-center sm:text-left">
              <span className="text-gray-600">Email:</span>
              <span className="font-mono text-gray-800 ml-2">
                admin@eventvault.ca
              </span>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-gray-600">Password:</span>
              <span className="font-mono text-gray-800 ml-2">test123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
