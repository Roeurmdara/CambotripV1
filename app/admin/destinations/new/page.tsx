"use client";
import React, { useState } from "react";

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

export default function NewDestinationPage() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
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
  const categories = [
    "temples",
    "beaches",
    "nature",
    "culture",
    "adventure",
    "city",
    "shopping",
    "nightlife",
  ];
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
  const [bulkJson, setBulkJson] = useState("");
  const [status, setStatus] = useState("");
  const [idToManage, setIdToManage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
    setPlaces([
      ...places,
      { id: Date.now().toString(), name: "", type: "", description: "" },
    ]);
  const removePlace = (id: string) =>
    setPlaces(places.filter((p) => p.id !== id));
  const updatePlace = (id: string, field: string, value: string) =>
    setPlaces(places.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const addAccommodation = () =>
    setAccommodations([
      ...accommodations,
      { id: Date.now().toString(), name: "", type: "", price: "" },
    ]);
  const removeAccommodation = (id: string) =>
    setAccommodations(accommodations.filter((a) => a.id !== id));
  const updateAccommodation = (id: string, field: string, value: string) =>
    setAccommodations(
      accommodations.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  const addRestaurant = () =>
    setRestaurants([
      ...restaurants,
      { id: Date.now().toString(), name: "", cuisine: "", price: "" },
    ]);
  const removeRestaurant = (id: string) =>
    setRestaurants(restaurants.filter((r) => r.id !== id));
  const updateRestaurant = (id: string, field: string, value: string) =>
    setRestaurants(
      restaurants.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );

  const addGalleryImage = () =>
    setGallery([...gallery, { id: Date.now().toString(), url: "" }]);
  const removeGalleryImage = (id: string) =>
    setGallery(gallery.filter((g) => g.id !== id));
  const updateGalleryImage = (id: string, url: string) =>
    setGallery(gallery.map((g) => (g.id === id ? { ...g, url } : g)));

  const addHealthSafety = () =>
    setHealthSafety([...healthSafety, { id: Date.now().toString(), text: "" }]);
  const removeHealthSafety = (id: string) =>
    setHealthSafety(healthSafety.filter((h) => h.id !== id));
  const updateHealthSafety = (id: string, text: string) =>
    setHealthSafety(
      healthSafety.map((h) => (h.id === id ? { ...h, text } : h))
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    const payload = {
      name: form.name,
      location: form.location,
      description: form.description,
      image: form.image,
      hero_image: form.hero_image,
      category: form.category || null,
      map_url: form.map_url || null,
      best_time: form.best_time,
      rating: form.rating ? Number(form.rating) : null,
      coordinates:
        form.lat && form.lng
          ? { lat: Number(form.lat), lng: Number(form.lng) }
          : null,
      highlights: highlights.map((h) => h.text).filter((t) => t),
      tips: tips.map((t) => t.text).filter((t) => t),
      places_to_visit: places.filter((p) => p.name),
      accommodations: accommodations.filter((a) => a.name),
      restaurants: restaurants.filter((r) => r.name),
      transportation:
        transGet || transAround || transCosts
          ? {
              gettingThere: transGet,
              gettingAround: transAround,
              costs: transCosts,
            }
          : null,
      gallery: gallery.map((g) => g.url).filter((u) => u),
      health_and_safety: healthSafety.map((h) => h.text).filter((t) => t),
    } as any;

    try {
      const res = await fetch("/api/admin/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": form.adminSecret || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("✓ Destination saved successfully!");
        setForm({
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
        setHighlights([]);
        setTips([]);
        setPlaces([]);
        setAccommodations([]);
        setRestaurants([]);
        setTransGet("");
        setTransAround("");
        setTransCosts("");
        setGallery([]);
        setHealthSafety([]);
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus("Error: " + (json?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  async function handleBulkSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Importing...");

    let payload;
    try {
      payload = JSON.parse(bulkJson);
    } catch (err: any) {
      setStatus("Error: Invalid JSON - " + err.message);
      return;
    }

    try {
      const res = await fetch("/api/admin/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": form.adminSecret || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        const count = Array.isArray(json.data) ? json.data.length : 1;
        setStatus(`✓ Imported ${count} destination(s)`);
        setBulkJson("");
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus("Error: " + (json?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  async function loadDestinationById() {
    if (!idToManage) return setStatus("Enter an id to load");
    setStatus("Loading...");
    try {
      const res = await fetch(`/api/admin/destinations/${idToManage}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
        return;
      }
      const json = await res.json();
      const d = json.data;
      if (!d) return setStatus("Not found");

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
      } as any);

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
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  async function handleUpdate() {
    if (!idToManage) return setStatus("Enter id to update");
    setStatus("Updating...");
    const payload: any = {
      name: form.name,
      location: form.location,
      description: form.description,
      image: form.image,
      hero_image: form.hero_image,
      category: (form as any).category || null,
      map_url: (form as any).map_url || null,
      best_time: form.best_time,
      rating: form.rating ? Number(form.rating) : null,
      coordinates:
        form.lat && form.lng
          ? { lat: Number(form.lat), lng: Number(form.lng) }
          : null,
      highlights: highlights.map((h) => h.text).filter(Boolean),
      tips: tips.map((t) => t.text).filter(Boolean),
      places_to_visit: places.filter((p) => p.name),
      accommodations: accommodations.filter((a) => a.name),
      restaurants: restaurants.filter((r) => r.name),
      transportation:
        transGet || transAround || transCosts
          ? {
              gettingThere: transGet,
              gettingAround: transAround,
              costs: transCosts,
            }
          : null,
      gallery: gallery.map((g) => g.url).filter(Boolean),
      health_and_safety: healthSafety.map((h) => h.text).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/admin/destinations/${idToManage}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": form.adminSecret || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        setStatus("Updated: " + (json?.data?.id || ""));
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  async function handleDelete() {
    if (!idToManage) return setStatus("Enter id to delete");
    if (!confirm(`Delete destination ${idToManage}?`)) return;
    setStatus("Deleting...");
    try {
      const res = await fetch(`/api/admin/destinations/${idToManage}`, {
        method: "DELETE",
        headers: { "x-admin-secret": form.adminSecret || "" },
      });
      if (res.ok) {
        setStatus("Deleted");
        setForm({
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
        } as any);
        setHighlights([]);
        setTips([]);
        setPlaces([]);
        setAccommodations([]);
        setRestaurants([]);
        setGallery([]);
        setHealthSafety([]);
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("Error: " + (j?.error || res.statusText));
      }
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 0",
    fontSize: "15px",
    border: "none",
    borderBottom: "1px solid #e0e0e0",
    background: "transparent",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical" as const,
    minHeight: "80px",
    paddingTop: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "1px solid #000",
    background: "transparent",
    color: "#000",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.2s",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "#000",
    color: "#fff",
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    borderColor: "#dc3545",
    color: "#dc3545",
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 400,
          marginBottom: "48px",
          letterSpacing: "-0.02em",
        }}
      >
        Destination Admin
      </h1>

      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 48,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <button
          type="button"
          onClick={() => setMode("single")}
          style={{
            padding: "12px 24px",
            background: "transparent",
            color: mode === "single" ? "#000" : "#999",
            border: "none",
            borderBottom:
              mode === "single" ? "2px solid #000" : "2px solid transparent",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.2s",
            marginBottom: "-1px",
          }}
        >
          Single
        </button>
        <button
          type="button"
          onClick={() => setMode("bulk")}
          style={{
            padding: "12px 24px",
            background: "transparent",
            color: mode === "bulk" ? "#000" : "#999",
            border: "none",
            borderBottom:
              mode === "bulk" ? "2px solid #000" : "2px solid transparent",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.2s",
            marginBottom: "-1px",
          }}
        >
          Bulk Import
        </button>
      </div>

      {mode === "single" && (
        <form onSubmit={handleSubmit}>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Basic Information
            </h2>

            <div style={{ marginBottom: 24 }}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Destination name *"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Location *"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                style={textareaStyle}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginBottom: 24,
              }}
            >
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                style={inputStyle}
              />
              <input
                name="hero_image"
                value={form.hero_image}
                onChange={handleChange}
                placeholder="Hero image URL"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
              }}
            >
              <input
                name="best_time"
                value={form.best_time}
                onChange={handleChange}
                placeholder="Best time to visit"
                style={inputStyle}
              />
              <input
                name="rating"
                value={form.rating}
                onChange={handleChange}
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Rating (0-5)"
                style={inputStyle}
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  color: form.category ? "#000" : "#9ca3af", // gray when empty
                }}
              >
                <option value="" disabled>
                  Select category
                </option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Coordinates
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <input
                name="lat"
                value={form.lat}
                onChange={handleChange}
                type="number"
                step="0.0001"
                placeholder="Latitude"
                style={inputStyle}
              />
              <input
                name="lng"
                value={form.lng}
                onChange={handleChange}
                type="number"
                step="0.0001"
                placeholder="Longitude"
                style={inputStyle}
              />
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Highlights
            </h2>
            {highlights.map((h) => (
              <div
                key={h.id}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={h.text}
                  onChange={(e) => updateHighlight(h.id, e.target.value)}
                  placeholder="Highlight"
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(h.id)}
                  style={{
                    ...buttonStyle,
                    padding: "8px 12px",
                    fontSize: "12px",
                    borderColor: "#dc3545",
                    color: "#dc3545",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              style={{ ...buttonStyle, marginTop: 12, fontSize: "12px" }}
            >
              Add Highlight
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Tips
            </h2>
            {tips.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={t.text}
                  onChange={(e) => updateTip(t.id, e.target.value)}
                  placeholder="Tip"
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeTip(t.id)}
                  style={{
                    ...buttonStyle,
                    padding: "8px 12px",
                    fontSize: "12px",
                    borderColor: "#dc3545",
                    color: "#dc3545",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTip}
              style={{ ...buttonStyle, marginTop: 12, fontSize: "12px" }}
            >
              Add Tip
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Places to Visit
            </h2>
            {places.map((p) => (
              <div
                key={p.id}
                style={{
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePlace(p.id, "name", e.target.value)}
                  placeholder="Place name"
                  style={{ ...inputStyle, marginBottom: 12 }}
                />
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    value={p.type}
                    onChange={(e) => updatePlace(p.id, "type", e.target.value)}
                    placeholder="Type"
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                  <button
                    type="button"
                    onClick={() => removePlace(p.id)}
                    style={{
                      ...buttonStyle,
                      padding: "8px 12px",
                      fontSize: "12px",
                      borderColor: "#dc3545",
                      color: "#dc3545",
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
                <textarea
                  value={p.description}
                  onChange={(e) =>
                    updatePlace(p.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  style={{ ...textareaStyle, minHeight: "60px", marginTop: 12 }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addPlace}
              style={{ ...buttonStyle, fontSize: "12px" }}
            >
              Add Place
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Accommodations
            </h2>
            {accommodations.map((a) => (
              <div
                key={a.id}
                style={{
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <input
                  type="text"
                  value={a.name}
                  onChange={(e) =>
                    updateAccommodation(a.id, "name", e.target.value)
                  }
                  placeholder="Name"
                  style={{ ...inputStyle, marginBottom: 12 }}
                />
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    value={a.type}
                    onChange={(e) =>
                      updateAccommodation(a.id, "type", e.target.value)
                    }
                    placeholder="Type"
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                  <input
                    type="text"
                    value={a.price}
                    onChange={(e) =>
                      updateAccommodation(a.id, "price", e.target.value)
                    }
                    placeholder="Price"
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeAccommodation(a.id)}
                    style={{
                      ...buttonStyle,
                      padding: "8px 12px",
                      fontSize: "12px",
                      borderColor: "#dc3545",
                      color: "#dc3545",
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAccommodation}
              style={{ ...buttonStyle, fontSize: "12px" }}
            >
              Add Accommodation
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Restaurants
            </h2>
            {restaurants.map((r) => (
              <div
                key={r.id}
                style={{
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) =>
                    updateRestaurant(r.id, "name", e.target.value)
                  }
                  placeholder="Name"
                  style={{ ...inputStyle, marginBottom: 12 }}
                />
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    value={r.cuisine}
                    onChange={(e) =>
                      updateRestaurant(r.id, "cuisine", e.target.value)
                    }
                    placeholder="Cuisine"
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                  <input
                    type="text"
                    value={r.price}
                    onChange={(e) =>
                      updateRestaurant(r.id, "price", e.target.value)
                    }
                    placeholder="$$$"
                    style={{
                      ...inputStyle,
                      marginBottom: 0,
                      width: "80px",
                      flexShrink: 0,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeRestaurant(r.id)}
                    style={{
                      ...buttonStyle,
                      padding: "8px 12px",
                      fontSize: "12px",
                      borderColor: "#dc3545",
                      color: "#dc3545",
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRestaurant}
              style={{ ...buttonStyle, fontSize: "12px" }}
            >
              Add Restaurant
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Transportation
            </h2>
            <textarea
              value={transGet}
              onChange={(e) => setTransGet(e.target.value)}
              placeholder="Getting There"
              style={{ ...textareaStyle, marginBottom: 24 }}
            />
            <textarea
              value={transAround}
              onChange={(e) => setTransAround(e.target.value)}
              placeholder="Getting Around"
              style={{ ...textareaStyle, marginBottom: 24 }}
            />
            <textarea
              value={transCosts}
              onChange={(e) => setTransCosts(e.target.value)}
              placeholder="Costs"
              style={textareaStyle}
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Gallery
            </h2>
            {gallery.map((g) => (
              <div
                key={g.id}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <input
                  type="url"
                  value={g.url}
                  onChange={(e) => updateGalleryImage(g.id, e.target.value)}
                  placeholder="Image URL"
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(g.id)}
                  style={{
                    ...buttonStyle,
                    padding: "8px 12px",
                    fontSize: "12px",
                    borderColor: "#dc3545",
                    color: "#dc3545",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGalleryImage}
              style={{ ...buttonStyle, marginTop: 12, fontSize: "12px" }}
            >
              Add Image
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Health & Safety
            </h2>
            {healthSafety.map((h) => (
              <div
                key={h.id}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={h.text}
                  onChange={(e) => updateHealthSafety(h.id, e.target.value)}
                  placeholder="Safety tip"
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeHealthSafety(h.id)}
                  style={{
                    ...buttonStyle,
                    padding: "8px 12px",
                    fontSize: "12px",
                    borderColor: "#dc3545",
                    color: "#dc3545",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHealthSafety}
              style={{ ...buttonStyle, marginTop: 12, fontSize: "12px" }}
            >
              Add Safety Tip
            </button>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Submit
            </h2>
            <div style={{ marginBottom: 24 }}>
              <input
                name="map_url"
                value={form.map_url}
                onChange={handleChange}
                placeholder="Map URL"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <input
                name="adminSecret"
                value={form.adminSecret}
                onChange={handleChange}
                type="password"
                required
                placeholder="Admin secret *"
                style={inputStyle}
              />
            </div>

            <button type="submit" style={primaryButtonStyle}>
              Save Destination
            </button>
          </section>
        </form>
      )}

      {mode === "bulk" && (
        <form onSubmit={handleBulkSubmit}>
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              JSON Array
            </h2>
            <textarea
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              placeholder='[{"name":"Angkor Wat","location":"Siem Reap",...}]'
              style={{
                ...textareaStyle,
                minHeight: "240px",
                fontFamily: "monospace",
                fontSize: "13px",
                marginBottom: 8,
              }}
            />
            <div style={{ fontSize: "12px", color: "#999", marginBottom: 24 }}>
              Paste a JSON array of destinations
            </div>

            <div style={{ marginBottom: 24 }}>
              <input
                name="adminSecret"
                value={form.adminSecret}
                onChange={handleChange}
                type="password"
                required
                placeholder="Admin secret *"
                style={inputStyle}
              />
            </div>

            <button type="submit" style={primaryButtonStyle}>
              Import Destinations
            </button>
          </section>
        </form>
      )}

      {status && (
        <div
          style={{
            marginTop: 48,
            padding: "16px",
            background: status.includes("Error")
              ? "#fff5f5"
              : status.includes("✓")
              ? "#f0fdf4"
              : "#fafafa",
            color: status.includes("Error")
              ? "#dc3545"
              : status.includes("✓")
              ? "#16a34a"
              : "#666",
            fontSize: "14px",
            border: `1px solid ${
              status.includes("Error")
                ? "#fee"
                : status.includes("✓")
                ? "#dcfce7"
                : "#e0e0e0"
            }`,
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
