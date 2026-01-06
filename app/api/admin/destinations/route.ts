import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");
    if (process.env.ADMIN_SECRET && adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const raw = await req.json();

    function tryParseJSON(val: any) {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    }

    const items = Array.isArray(raw) ? raw : [raw];

    const normalized = items.map((it: any) => {
      const obj = { ...it };
      if (!obj.id) obj.id = randomUUID();
      obj.rating = obj.rating ? Number(obj.rating) : null;
      obj.coordinates = tryParseJSON(obj.coordinates) || null;
      obj.highlights = tryParseJSON(obj.highlights) || [];
      obj.tips = tryParseJSON(obj.tips) || [];
      obj.places_to_visit = tryParseJSON(obj.places_to_visit) || [];
      obj.accommodations = tryParseJSON(obj.accommodations) || [];
      obj.restaurants = tryParseJSON(obj.restaurants) || [];
      obj.transportation = tryParseJSON(obj.transportation) || null;
      obj.gallery = tryParseJSON(obj.gallery) || [];
      obj.health_and_safety = tryParseJSON(obj.health_and_safety) || [];
      if (!obj.created_at) obj.created_at = new Date().toISOString();
      obj.updated_at = new Date().toISOString();
      return obj;
    });

    const first = normalized[0];
    if (!first?.name || !first?.location) {
      return NextResponse.json(
        { error: "Missing required fields (name/location)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("destinations")
      .insert(normalized)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("destinations")
      .select("id, name, location, image, category, rating")
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? String(err) },
      { status: 500 }
    );
  }
}
