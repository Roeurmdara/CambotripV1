"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Highlight {
  id: string;
  text: string;
}

interface Tip {
  id: string;
  text: string;
}

interface PlaceToVisit {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface Accommodation {
  id: string;
  name: string;
  type: string;
  price: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  price: string;
}

interface Gallery {
  id: string;
  url: string;
}

interface HealthSafety {
  id: string;
  text: string;
}

export default function EditDestinationPage() {
  const router = useRouter();
  const [destinationId, setDestinationId] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    hero_image: "",
    best_time: "",
    rating: "",
    category: "",
    map_url: "",
    lat: "",
    lng: "",
    adminSecret: "",
  });

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [places, setPlaces] = useState<PlaceToVisit[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [transGet, setTransGet] = useState("");
  const [transAround, setTransAround] = useState("");
  const [transCosts, setTransCosts] = useState("");
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [healthSafety, setHealthSafety] = useState<HealthSafety[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem("editDestinationId");
    if (id) {
      setDestinationId(id);
      loadDestination(id);
    } else {
      setStatus("No destination selected");
      setLoading(false);
    }
  }, []);

  async function loadDestination(id: string) {
    setStatus("Loading...");
    try {
      const res = await fetch(`/api/admin/destinations/${id}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
        setLoading(false);
        return;
      }

      const json = await res.json();
      const d = json.data;

      setForm({
        name: d.name || "",
        location: d.location || "",
        description: d.description || "",
        image: d.image || "",
        hero_image: d.hero_image || "",
        best_time: d.best_time || "",
        rating: d.rating ? String(d.rating) : "",
        lat: d.coordinates?.lat ? String(d.coordinates.lat) : "",
        lng: d.coordinates?.lng ? String(d.coordinates.lng) : "",
        adminSecret: "",
        category: d.category || "",
        map_url: d.map_url || "",
      });

      setHighlights(
        (d.highlights || []).map((t: any, i: number) => ({
          id: String(i) + "h",
          text: String(t),
        }))
      );
      setTips(
        (d.tips || []).map((t: any, i: number) => ({
          id: String(i) + "t",
          text: String(t),
        }))
      );
      setPlaces(
        (d.places_to_visit || []).map((p: any, i: number) => ({
          id: String(i) + "p",
          name: p.name || "",
          type: p.type || "",
          description: p.description || "",
        }))
      );
      setAccommodations(
        (d.accommodations || []).map((a: any, i: number) => ({
          id: String(i) + "a",
          name: a.name || "",
          type: a.type || "",
          price: a.price || "",
        }))
      );
      setRestaurants(
        (d.restaurants || []).map((r: any, i: number) => ({
          id: String(i) + "r",
          name: r.name || "",
          cuisine: r.cuisine || "",
          price: r.price || "",
        }))
      );
      setGallery(
        (d.gallery || []).map((u: any, i: number) => ({
          id: String(i) + "g",
          url: String(u),
        }))
      );
      setHealthSafety(
        (d.health_and_safety || []).map((h: any, i: number) => ({
          id: String(i) + "s",
          text: String(h),
        }))
      );

      setTransGet(d.transportation?.gettingThere || "");
      setTransAround(d.transportation?.gettingAround || "");
      setTransCosts(d.transportation?.costs || "");

      setStatus("Loaded");
      setLoading(false);
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  const addHighlight = () =>
    setHighlights([...highlights, { id: Date.now().toString(), text: "" }]);
  const removeHighlight = (id: string) =>
    setHighlights(highlights.filter((h) => h.id !== id));
  const updateHighlight = (id: string, text: string) =>
    setHighlights(highlights.map((h) => (h.id === id ? { ...h, text } : h)));

  const addTip = () =>
    setTips([...tips, { id: Date.now().toString(), text: "" }]);
  const removeTip = (id: string) => setTips(tips.filter((t) => t.id !== id));
  const updateTip = (id: string, text: string) =>
    setTips(tips.map((t) => (t.id === id ? { ...t, text } : t)));

  const addPlace = () =>
    setPlaces([...places, { id: Date.now().toString(), name: "", type: "", description: "" }]);
  const removePlace = (id: string) =>
    setPlaces(places.filter((p) => p.id !== id));
  const updatePlace = (id: string, field: "name" | "type" | "description", value: string) =>
    setPlaces(places.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const addAccommodation = () =>
    setAccommodations([...accommodations, { id: Date.now().toString(), name: "", type: "", price: "" }]);
  const removeAccommodation = (id: string) =>
    setAccommodations(accommodations.filter((a) => a.id !== id));
  const updateAccommodation = (id: string, field: "name" | "type" | "price", value: string) =>
    setAccommodations(accommodations.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  const addRestaurant = () =>
    setRestaurants([...restaurants, { id: Date.now().toString(), name: "", cuisine: "", price: "" }]);
  const removeRestaurant = (id: string) =>
    setRestaurants(restaurants.filter((r) => r.id !== id));
  const updateRestaurant = (id: string, field: "name" | "cuisine" | "price", value: string) =>
    setRestaurants(restaurants.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const addGalleryItem = () =>
    setGallery([...gallery, { id: Date.now().toString(), url: "" }]);
  const removeGalleryItem = (id: string) =>
    setGallery(gallery.filter((g) => g.id !== id));
  const updateGalleryItem = (id: string, url: string) =>
    setGallery(gallery.map((g) => (g.id === id ? { ...g, url } : g)));

  const addHealthSafety = () =>
    setHealthSafety([...healthSafety, { id: Date.now().toString(), text: "" }]);
  const removeHealthSafety = (id: string) =>
    setHealthSafety(healthSafety.filter((h) => h.id !== id));
  const updateHealthSafety = (id: string, text: string) =>
    setHealthSafety(healthSafety.map((h) => (h.id === id ? { ...h, text } : h)));

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!destinationId) return setStatus("No destination loaded");
    setStatus("Updating...");

    const payload: any = {
      name: form.name,
      location: form.location,
      description: form.description,
      image: form.image,
      hero_image: form.hero_image,
      category: form.category || null,
      map_url: form.map_url || null,
      best_time: form.best_time,
      rating: form.rating ? Number(form.rating) : null,
      coordinates: form.lat && form.lng ? { lat: Number(form.lat), lng: Number(form.lng) } : null,
      highlights: highlights.map((h) => h.text).filter(Boolean),
      tips: tips.map((t) => t.text).filter(Boolean),
      places_to_visit: places.filter((p) => p.name),
      accommodations: accommodations.filter((a) => a.name),
      restaurants: restaurants.filter((r) => r.name),
      transportation: transGet || transAround || transCosts ? {
        gettingThere: transGet,
        gettingAround: transAround,
        costs: transCosts,
      } : null,
      gallery: gallery.map((g) => g.url).filter(Boolean),
      health_and_safety: healthSafety.map((h) => h.text).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/admin/destinations/${destinationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": form.adminSecret || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("✓ Updated successfully!");
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  async function handleDelete() {
    if (!destinationId) return setStatus("No destination loaded");
    if (!confirm(`Delete this destination?`)) return;
    if (!form.adminSecret) {
      setStatus("Enter admin secret to delete");
      return;
    }

    setStatus("Deleting...");
    try {
      const res = await fetch(`/api/admin/destinations/${destinationId}`, {
        method: "DELETE",
        headers: { "x-admin-secret": form.adminSecret },
      });

      if (res.ok) {
        setStatus("✓ Deleted successfully!");
        setTimeout(() => router.push("/admin/destinations"), 1500);
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading destination...</p>
      </div>
    );
  }

  if (!destinationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <p className="text-lg text-gray-700 mb-6">{status}</p>
        <button
          onClick={() => router.push("/admin/destinations")}
          className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Edit Destination</h1>
          <p className="text-gray-500">Update all details for this destination</p>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`mb-8 px-4 py-3 text-sm ${
            status.includes("Error") || status.includes("error")
              ? "bg-red-50 border border-red-200 text-red-700"
              : "bg-green-50 border border-green-200 text-green-700"
          }`}>
            {status}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-12">
          {/* Basic Information */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Hero Image URL</label>
                  <input
                    type="text"
                    name="hero_image"
                    value={form.hero_image}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Best Time</label>
                  <input
                    type="text"
                    name="best_time"
                    value={form.best_time}
                    onChange={handleChange}
                    placeholder="Nov to Mar"
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Rating (0-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="temples"
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Location & Map */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Location & Map
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Map URL</label>
                <input
                  type="text"
                  name="map_url"
                  value={form.map_url}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Latitude</label>
                  <input
                    type="number"
                    name="lat"
                    value={form.lat}
                    onChange={handleChange}
                    step="0.0001"
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Longitude</label>
                  <input
                    type="number"
                    name="lng"
                    value={form.lng}
                    onChange={handleChange}
                    step="0.0001"
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Highlights
            </h2>
            <div className="space-y-3">
              {highlights.map((h) => (
                <div key={h.id} className="flex gap-2">
                  <input
                    type="text"
                    value={h.text}
                    onChange={(e) => updateHighlight(h.id, e.target.value)}
                    placeholder="Watch sunrise"
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(h.id)}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHighlight}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Highlight
              </button>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Tips
            </h2>
            <div className="space-y-3">
              {tips.map((t) => (
                <div key={t.id} className="flex gap-2">
                  <input
                    type="text"
                    value={t.text}
                    onChange={(e) => updateTip(t.id, e.target.value)}
                    placeholder="Bring water"
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeTip(t.id)}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTip}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Tip
              </button>
            </div>
          </section>

          {/* Places to Visit */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Places to Visit
            </h2>
            <div className="space-y-4">
              {places.map((p) => (
                <div key={p.id} className="p-5 bg-white border border-gray-200">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => updatePlace(p.id, "name", e.target.value)}
                      placeholder="Place name"
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={p.type}
                        onChange={(e) => updatePlace(p.id, "type", e.target.value)}
                        placeholder="Temple"
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removePlace(p.id)}
                        className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      value={p.description}
                      onChange={(e) => updatePlace(p.id, "description", e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPlace}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Place
              </button>
            </div>
          </section>

          {/* Accommodations */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Accommodations
            </h2>
            <div className="space-y-4">
              {accommodations.map((a) => (
                <div key={a.id} className="p-5 bg-white border border-gray-200">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={a.name}
                      onChange={(e) => updateAccommodation(a.id, "name", e.target.value)}
                      placeholder="Hotel name"
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={a.type}
                        onChange={(e) => updateAccommodation(a.id, "type", e.target.value)}
                        placeholder="Budget"
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        value={a.price}
                        onChange={(e) => updateAccommodation(a.id, "price", e.target.value)}
                        placeholder="$10-50"
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeAccommodation(a.id)}
                        className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addAccommodation}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Accommodation
              </button>
            </div>
          </section>

          {/* Restaurants */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Restaurants
            </h2>
            <div className="space-y-4">
              {restaurants.map((r) => (
                <div key={r.id} className="p-5 bg-white border border-gray-200">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={r.name}
                      onChange={(e) => updateRestaurant(r.id, "name", e.target.value)}
                      placeholder="Restaurant"
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={r.cuisine}
                        onChange={(e) => updateRestaurant(r.id, "cuisine", e.target.value)}
                        placeholder="Cuisine"
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        value={r.price}
                        onChange={(e) => updateRestaurant(r.id, "price", e.target.value)}
                        placeholder="$$"
                        className="w-32 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeRestaurant(r.id)}
                        className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addRestaurant}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Restaurant
              </button>
            </div>
          </section>

          {/* Transportation */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Transportation
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Getting There</label>
                <textarea
                  value={transGet}
                  onChange={(e) => setTransGet(e.target.value)}
                  placeholder="Fly to airport"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Getting Around</label>
                <textarea
                  value={transAround}
                  onChange={(e) => setTransAround(e.target.value)}
                  placeholder="Tuk-tuk"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Costs</label>
                <textarea
                  value={transCosts}
                  onChange={(e) => setTransCosts(e.target.value)}
                  placeholder="$15-25/day"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Gallery Images */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Gallery Images
            </h2>
            <div className="space-y-3">
              {gallery.map((g) => (
                <div key={g.id} className="flex gap-2">
                  <input
                    type="url"
                    value={g.url}
                    onChange={(e) => updateGalleryItem(g.id, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(g.id)}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addGalleryItem}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Image
              </button>
            </div>
          </section>

          {/* Health & Safety */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Health & Safety
            </h2>
            <div className="space-y-3">
              {healthSafety.map((h) => (
                <div key={h.id} className="flex gap-2">
                  <input
                    type="text"
                    value={h.text}
                    onChange={(e) => updateHealthSafety(h.id, e.target.value)}
                    placeholder="Drink bottled water"
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeHealthSafety(h.id)}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border border-gray-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHealthSafety}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
              >
                + Add Safety Tip
              </button>
            </div>
          </section>

          {/* Authentication */}
          <section>
            <h2 className="text-sm font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Authentication
            </h2>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Admin Secret</label>
              <input
                type="password"
                name="adminSecret"
                value={form.adminSecret}
                onChange={handleChange}
                required
                placeholder="Required"
                className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Update Destination
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 px-6 py-3 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Delete Destination
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/destinations")}
              className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}