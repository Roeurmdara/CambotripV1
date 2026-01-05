"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "./action";
import { supabase } from "@/lib/supabase";
import PreferencesModal, {
  UserPreferences,
} from "@/components/preferences-modal";
import { saveUserPreferences } from "@/lib/preferences";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);

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
    } else {
      try {
        console.log("Signup successful, result:", result);
        
        // If there's a session from signup (auto-confirmed or no email confirmation),
        // set it on the client
        if (result?.data?.session) {
          console.log("Setting session from signup response...");
          await supabase.auth.setSession(result.data.session);
        } else {
          // No session yet - user may need to confirm email or account is auto-confirmed
          // Try to refresh the session from storage/cookies
          console.log("No session in response, trying to get user...");
          const { data: { user } } = await supabase.auth.getUser();
          console.log("Current user:", user?.id);
        }
        
        console.log("Redirecting to /auth/callback...");
        router.push("/auth/callback");
        router.refresh();
      } catch (error) {
        console.error("Error during redirect:", error);
        setError("Failed to redirect. Please try again.");
      }
    }
  }

  async function handleSavePreferences(preferences: UserPreferences) {
    setSavingPreferences(true);
    try {
      const result = await saveUserPreferences(preferences);
      if (result.success) {
        router.push("/destinations");
        router.refresh();
      } else {
        setError(result.error || "Failed to save preferences");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      setError("An error occurred while saving preferences");
    } finally {
      setSavingPreferences(false);
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

        <PreferencesModal
          isOpen={showPreferences}
          onClose={() => {
            setShowPreferences(false);
            router.push("/destinations");
            router.refresh();
          }}
          onSave={handleSavePreferences}
        />
      </div>
    </div>
  );
}
