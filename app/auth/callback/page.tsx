"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import OnboardingQuestionnaire from "@/components/OnboardingQuestionnaire";
import { useRouter } from "next/navigation";
import DotWave from "@/components/DotWave";

export default function AuthCallback() {
  const [user, setUser] = useState<any>(null);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        console.log("Auth callback: user =", user?.id);

        if (!user) {
          console.log("No user found, redirecting to login");
          router.push("/auth/login");
          return;
        }

        setUser(user);

        // Check if user has completed onboarding. If the query errors
        // (for example RLS denying access) treat it as no preferences so
        // we show the questionnaire.
        const { data, error } = await supabase
          .from("user_preferences")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.warn(
            "Could not read user_preferences (will show onboarding):",
            error
          );
          setNeedsOnboarding(true);
        } else if (!data) {
          console.log("No preferences found, show onboarding");
          setNeedsOnboarding(true);
        } else {
          console.log("Preferences found, redirecting to destinations");
          router.push("/destinations");
        }
      } catch (err) {
        console.error("Error in auth callback:", err);
        setNeedsOnboarding(true);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] ">
        <DotWave />
      </div>
    );
  }

  if (needsOnboarding && user) {
    return (
      <OnboardingQuestionnaire
        userId={user.id}
        onComplete={() => router.push("/destinations")}
      />
    );
  }

  return (
   <div className="flex items-center justify-center min-h-[300px] ">
        <DotWave />
      </div>
  );
}
