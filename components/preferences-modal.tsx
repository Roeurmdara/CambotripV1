"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: UserPreferences) => Promise<void>;
}

export interface UserPreferences {
  travelTypes: string[];
  month: string;
  budget: string;
}

const TRAVEL_TYPES = [
  { id: "temple", label: "🏛️ Temples & Heritage" },
  { id: "mountain", label: "⛰️ Mountains & Hiking" },
  { id: "sea", label: "🏖️ Beaches & Sea" },
  { id: "nature", label: "🌿 Nature & Wildlife" },
  { id: "culture", label: "🎭 Culture & Local Life" },
  { id: "food", label: "🍜 Food & Cuisine" },
  { id: "adventure", label: "🪂 Adventure Sports" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const BUDGETS = [
  { id: "budget", label: "Budget (Under $50/day)" },
  { id: "moderate", label: "Moderate ($50-150/day)" },
  { id: "comfort", label: "Comfort ($150-300/day)" },
  { id: "luxury", label: "Luxury (Over $300/day)" },
];

export default function PreferencesModal({
  isOpen,
  onClose,
  onSave,
}: PreferencesModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((t) => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        travelTypes: selectedTypes,
        month: selectedMonth,
        budget: selectedBudget,
      });
      onClose();
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Find Your Perfect Destination
          </h2>
          <button
            onClick={handleSkip}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Travel Types */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              1. What types of travel do you enjoy?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TRAVEL_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeToggle(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedTypes.includes(type.id)
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Month */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              2. When do you want to visit?
            </h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a month...</option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              3. What's your budget?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BUDGETS.map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => setSelectedBudget(budget.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedBudget === budget.id
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {budget.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-6 flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={loading}
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || (selectedTypes.length === 0 && !selectedMonth && !selectedBudget)}
          >
            {loading ? "Saving..." : "Find Destinations"}
          </Button>
        </div>
      </div>
    </div>
  );
}
