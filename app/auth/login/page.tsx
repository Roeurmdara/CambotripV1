"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./action";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);

    const result = await loginAction(email, password);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.data?.session) {
      // Set the session on the client side so Supabase client knows about it
      await supabase.auth.setSession(result.data.session);
      setError("");
      router.push("/");
      router.refresh();
    } else {
      setError("");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm px-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-light text-neutral-900 text-center">
            Login
          </h1>

          {error && (
            <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-4 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-neutral-500 text-center mt-4">
            Don't have an account?{" "}
            <a href="/auth/signup" className="underline hover:text-neutral-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
