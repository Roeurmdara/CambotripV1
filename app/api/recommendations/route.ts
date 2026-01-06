import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

function tryParse(val: any) {
  if (!val) return null;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { travel_style, budget_range, interests } = body || {};

    const { data: dests, error } = await supabaseServer
      .from("destinations")
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const prefs: string[] = Array.isArray(interests) ? interests : [];

    // simple scoring function
    const scored = (dests || []).map((d: any) => {
      let score = 0;

      const category = (d.category || "").toString().toLowerCase();
      if (travel_style && category && travel_style.toLowerCase() === category)
        score += 3;

      const highlights = tryParse(d.highlights) || [];
      const places = tryParse(d.places_to_visit) || [];
      const restaurants = tryParse(d.restaurants) || [];

      prefs.forEach((p) => {
        const key = p.toString().toLowerCase();
        if (
          Array.isArray(highlights) &&
          highlights.some((h: any) =>
            (h || "").toString().toLowerCase().includes(key)
          )
        )
          score += 1;
        if (
          Array.isArray(places) &&
          places.some((pl: any) =>
            ((pl.name || "") + " " + (pl.type || ""))
              .toLowerCase()
              .includes(key)
          )
        )
          score += 1;
        if (
          Array.isArray(restaurants) &&
          restaurants.some((r: any) =>
            ((r.cuisine || "") + " " + (r.name || ""))
              .toLowerCase()
              .includes(key)
          )
        )
          score += 1;
      });

      if (d.rating) {
        const r = Number(d.rating) || 0;
        score += r / 5; // small boost for higher rating
      }

      return { ...d, __score: score };
    });

    scored.sort((a: any, b: any) => (b.__score || 0) - (a.__score || 0));

    return NextResponse.json(
      { recommendations: scored.slice(0, 20) },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? String(err) },
      { status: 500 }
    );
  }
}
