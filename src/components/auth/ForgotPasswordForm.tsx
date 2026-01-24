"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onSubmit: (email: string) => Promise<void>;
  loading: boolean;
  message: string;
  resetSent: boolean;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onSubmit,
  loading,
  message,
  resetSent,
}: ForgotPasswordFormProps) {
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(resetEmail);
  };

  return (
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
        <SuccessMessage email={resetEmail} />
      )}

      {message && !resetSent && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.includes("Please enter")
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="text-center space-y-3">
        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
          onClick={onBackToLogin}
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
                setResetEmail("");
                onBackToLogin();
              }}
            >
              Need to resend or use a different email?
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

function SuccessMessage({ email }: { email: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-gray-700 font-medium">Email Sent Successfully!</p>
        <p className="text-sm text-gray-600">
          {email === "admin@eventvault.ca"
            ? "For this demo, no actual email is sent. In a real application, you would receive a password reset link."
            : "In a real application, you would receive a password reset link in your inbox."}
        </p>
      </div>
    </div>
  );
}
