"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Mail, KeyRound } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (
    loginEmail: string,
    loginPassword: string,
    rememberMe: boolean,
  ) => {
    setError("");
    setResetMessage("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Please fill in both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (loginEmail === "admin@eventvault.ca" && loginPassword === "test123") {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loginEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("authToken", "demo-token-12345");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } else {
      setError("Invalid email or password. Try: admin@eventvault.ca / test123");
    }

    setLoading(false);
  };

  const handlePasswordReset = async (email: string) => {
    if (!email.trim()) {
      setResetMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setResetMessage("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "admin@eventvault.ca") {
      setResetMessage(
        "Demo: Password reset email would be sent to admin@eventvault.ca",
      );
    } else {
      setResetMessage(`Reset link sent to ${email} (simulated)`);
    }

    setResetSent(true);
    setLoading(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetMessage("");
    setResetSent(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-indigo-50 px-4">
      <Card className="w-full max-w-md border-2 border-indigo-200 shadow-2xl shadow-indigo-100/50">
        <AuthCard
          icon={
            showForgotPassword ? (
              <KeyRound className="h-6 w-6 text-indigo-600" />
            ) : (
              <Mail className="h-6 w-6 text-indigo-600" />
            )
          }
          title={
            showForgotPassword
              ? resetSent
                ? "Check Your Email"
                : "Reset Password"
              : "Login to EventVault"
          }
          description={
            showForgotPassword
              ? resetSent
                ? "We've sent password reset instructions to your email"
                : "Enter your email to receive reset instructions"
              : "Enter your credentials to access the dashboard"
          }
        />

        <CardContent className="space-y-6">
          {showForgotPassword ? (
            <ForgotPasswordForm
              onBackToLogin={handleBackToLogin}
              onSubmit={handlePasswordReset}
              loading={loading}
              message={resetMessage}
              resetSent={resetSent}
            />
          ) : (
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={() => setShowForgotPassword(true)}
              loading={loading}
              error={error}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
