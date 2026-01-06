"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DotWave from "@/components/DotWave";

interface Destination {
  id: string;
  name: string;
  location: string;
  image?: string;
  category?: string;
  rating?: number;
}

export default function DestinationsDashboard() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [showSecretPrompt, setShowSecretPrompt] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/destinations");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setDestinations(json.data || []);
    } catch (err: any) {
      setStatus("Error loading destinations: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!adminSecret) {
      setPendingDelete(id);
      setShowSecretPrompt(true);
      return;
    }

    if (!confirm(`Delete ${id}?`)) {
      setPendingDelete(null);
      return;
    }

    setStatus("Deleting...");
    try {
      const res = await fetch(`/api/admin/destinations/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": adminSecret },
      });

      if (res.ok) {
        setStatus("Deleted successfully");
        setDestinations(destinations.filter((d) => d.id !== id));
        setPendingDelete(null);
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("Delete error: " + (j?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  }

  function handleEdit(id: string) {
    sessionStorage.setItem("editDestinationId", id);
    router.push("/admin/destinations/edit");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Destinations</h1>
          
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/destinations/new")}
              className="px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Destination
            </button>
            <button
              onClick={fetchDestinations}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className="mb-8 px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm">
            {status}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] ">
        <DotWave />
      </div>
        ) : destinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 mb-4">No destinations yet</p>
            <button
              onClick={() => router.push("/admin/destinations/new")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Create your first destination
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                {/* Image */}
                {dest.image && (
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{dest.name}</h3>
                  
                  <p className="text-sm text-gray-500 mb-4">{dest.location}</p>

                  <div className="flex items-center gap-4 mb-6 text-xs text-gray-400">
                    {dest.category && <span>{dest.category}</span>}
                    {dest.rating && (
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {dest.rating}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(dest.id)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dest.id)}
                      disabled={pendingDelete === dest.id && !adminSecret}
                      className="flex-1 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-gray-400 font-mono">
                    {dest.id.substring(0, 12)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showSecretPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-8">
            <h2 className="text-xl font-light text-gray-900 mb-6">Admin Secret Required</h2>
            
            <input
              type="password"
              placeholder="Enter admin secret"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black mb-6"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (pendingDelete) handleDelete(pendingDelete);
                  setShowSecretPrompt(false);
                }}
                className="flex-1 px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowSecretPrompt(false);
                  setPendingDelete(null);
                  setAdminSecret("");
                }}
                className="flex-1 px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}