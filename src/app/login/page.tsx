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
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  KeyRound,
  CheckCircle,
  MailOpen,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Clear previous messages
    setError("");
    setResetMessage("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "admin@eventvault.ca" && password === "test123") {
      // Store auth token (demo)
      localStorage.setItem("authToken", "demo-token-12345");

      // Simulate successful login with delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } else {
      setError("Invalid email or password. Try: admin@eventvault.ca / test123");
      setPassword(""); // Clear password on failed attempt
    }

    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      setResetMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setResetMessage("");

    // Simulate API call delay for sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if it's the demo email
    if (resetEmail === "admin@eventvault.ca") {
      setResetSent(true);
      setResetMessage(
        "Demo: Password reset email would be sent to admin@eventvault.ca",
      );
    } else {
      // For other emails, show realistic message
      setResetSent(true);
      setResetMessage(`Reset link sent to ${resetEmail} (simulated)`);
    }

    setLoading(false);

    // Don't auto-hide - let user see the success message
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmail("");
    setResetMessage("");
    setResetSent(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showForgotPassword) {
      handlePasswordReset(e);
    } else {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-indigo-50 px-4">
      <Card className="w-full max-w-md border-2 border-indigo-200 shadow-2xl shadow-indigo-100/50">
        <CardHeader className="space-y-1 pb-6">
          {showForgotPassword ? (
            <>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                {resetSent ? (
                  <MailOpen className="h-6 w-6 text-indigo-600" />
                ) : (
                  <KeyRound className="h-6 w-6 text-indigo-600" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-indigo-900 text-center">
                {resetSent ? "Check Your Email" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {resetSent
                  ? "We've sent password reset instructions to your email"
                  : "Enter your email to receive reset instructions"}
              </CardDescription>
            </>
          ) : (
            <>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-indigo-900 text-center">
                Login to EventVault
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your credentials to access the dashboard
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {showForgotPassword ? (
            // Forgot Password Form
            <form onSubmit={handleSubmit} className="space-y-5">
              {!resetSent ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-11 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400"
                      disabled={loading}
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 pt-1">
                      Enter the email associated with your account
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </>
              ) : (
                // Success State
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-gray-700 font-medium">
                      Email Sent Successfully!
                    </p>
                    <p className="text-sm text-gray-600">
                      {resetEmail === "admin@eventvault.ca"
                        ? "For this demo, no actual email is sent. In a real application, you would receive a password reset link."
                        : "In a real application, you would receive a password reset link in your inbox."}
                    </p>
                  </div>
                </div>
              )}

              {resetMessage && !resetSent && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    resetMessage.includes("Please enter")
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {resetMessage}
                </div>
              )}

              <div className="text-center space-y-3">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  ← Back to Login
                </button>

                {resetSent && (
                  <div className="pt-2">
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-gray-700 hover:underline"
                      onClick={() => {
                        setResetSent(false);
                        setResetMessage("");
                      }}
                    >
                      Need to resend or use a different email?
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            // Login Form
            <>
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
                {/* // remember me and submit button */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                  onClick={() => setShowForgotPassword(true)}
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="text-center text-sm">
                <div className="inline-block bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100">
                  <p className="font-medium text-indigo-700 mb-1">
                    Demo Access
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <div className="text-center sm:text-left">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-mono text-gray-800 ml-2">
                        admin@eventvault.ca
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-gray-600">Password:</span>
                      <span className="font-mono text-gray-800 ml-2">
                        test123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
