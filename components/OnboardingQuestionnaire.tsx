"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Mountain,
  Palmtree,
  Users,
  Crown,
  Wallet,
  Building,
  UtensilsCrossed,
  Camera,
  Music,
  ShoppingBag,
  Waves,
} from "lucide-react";

interface OnboardingQuestionnaireProps {
  userId: string;
  onComplete: () => void;
}

export default function OnboardingQuestionnaire({
  userId,
  onComplete,
}: OnboardingQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    travel_style: "",
    budget_range: "",
    interests: [] as string[],
  });
  const router = useRouter();

  const travelStyles = [
    { value: "adventure", label: "Adventure", icon: Mountain, color: "orange" },
    {
      value: "relaxation",
      label: "Relaxation",
      icon: Palmtree,
      color: "green",
    },
    { value: "cultural", label: "Cultural", icon: Building, color: "purple" },
    { value: "luxury", label: "Luxury", icon: Crown, color: "yellow" },
  ];

  const budgetRanges = [
    {
      value: "budget",
      label: "Budget Friendly",
      description: "$-$$",
      icon: Wallet,
    },
    {
      value: "mid-range",
      label: "Mid Range",
      description: "$$-$$$",
      icon: Wallet,
    },
    { value: "luxury", label: "Luxury", description: "$$$-$$$$", icon: Crown },
  ];

  const interestOptions = [
    { value: "temples", label: "Temples & History", icon: Building },
    { value: "nature", label: "Nature & Wildlife", icon: Mountain },
    { value: "food", label: "Food & Cuisine", icon: UtensilsCrossed },
    { value: "beaches", label: "Beaches", icon: Waves },
    { value: "photography", label: "Photography", icon: Camera },
    { value: "nightlife", label: "Nightlife", icon: Music },
    { value: "shopping", label: "Shopping", icon: ShoppingBag },
    { value: "culture", label: "Local Culture", icon: Users },
  ];

  const handleStyleSelect = (style: string) => {
    setPreferences({ ...preferences, travel_style: style });
    setStep(2);
  };

  const handleBudgetSelect = (budget: string) => {
    setPreferences({ ...preferences, budget_range: budget });
    setStep(3);
  };

  const toggleInterest = (interest: string) => {
    const newInterests = preferences.interests.includes(interest)
      ? preferences.interests.filter((i) => i !== interest)
      : [...preferences.interests, interest];
    setPreferences({ ...preferences, interests: newInterests });
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("user_preferences").insert({
        user_id: userId,
        travel_style: preferences.travel_style,
        budget_range: preferences.budget_range,
        interests: preferences.interests,
      });

      if (error) throw error;

      onComplete();
      router.push("/destinations");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full ">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? "w-16 bg-black" : "w-8 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-gray-600">Step {step} of 3</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Question 1: Travel Style */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 border-1 border-black"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-3 text-center">
                What's your travel style?
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Choose the vibe that excites you most
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {travelStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <motion.button
                      key={style.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStyleSelect(style.value)}
                      className={`p-6  border-1 transition-all ${
                        preferences.travel_style === style.value
                          ? "border-gray-800 bg-blue-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Icon
                        className={`w-12 h-12 mx-auto mb-3 text-${style.color}-600`}
                      />
                      <p className="font-semibold text-gray-800">
                        {style.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Question 2: Budget Range */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-3 text-center">
                What's your budget?
              </h2>
              <p className="text-gray-600 text-center mb-8">
                We'll show you the best options for your range
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {budgetRanges.map((budget) => {
                  const Icon = budget.icon;
                  return (
                    <motion.button
                      key={budget.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBudgetSelect(budget.value)}
                      className={`p-8  border-1 transition-all ${
                        preferences.budget_range === budget.value
                          ? "border-gray-800 bg-blue-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Icon className="w-12 h-12 mx-auto mb-3 text-black" />
                      <p className="font-bold text-gray-800 text-lg mb-1">
                        {budget.label}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {budget.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-6 mx-auto block text-gray-500 hover:text-gray-700"
              >
                 Back
              </button>
            </motion.div>
          )}

          {/* Question 3: Interests */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-3 text-center">
                What interests you?
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Select all that apply (minimum 1)
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {interestOptions.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = preferences.interests.includes(
                    interest.value
                  );
                  return (
                    <motion.button
                      key={interest.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest.value)}
                      className={`p-6  border-1 transition-all ${
                        isSelected
                          ? "border-gray-800 bg-blue-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Icon
                        className={`w-10 h-10 mx-auto mb-2 ${
                          isSelected ? "text-black" : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`font-semibold text-sm ${
                          isSelected ? "text-gray-800" : "text-gray-600"
                        }`}
                      >
                        {interest.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                   Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={preferences.interests.length === 0}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    preferences.interests.length > 0
                      ? "bg-white text-black hover:bg-black hover:text-white "
                      : "bg-gray-black text-black cursor-not-allowed"
                  }`}
                >
                  Complete Setup 
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
