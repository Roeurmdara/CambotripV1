"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "./action";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    // Validate inputs
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    const result = await signupAction(name, email, password);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.data?.session) {
      // Set the session on the client side if account is auto-confirmed
      await supabase.auth.setSession(result.data.session);
      setError("");
      router.push("/");
      router.refresh();
    } else {
      setError("");
      router.push(
        "/auth/login?message=Check your email to confirm your account"
      );
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm px-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-light text-neutral-900 text-center">
            Sign Up
          </h1>

          {error && (
            <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-4 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 transition-colors"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 transition-colors"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3 rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-xs text-neutral-500 text-center mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="underline hover:text-neutral-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
