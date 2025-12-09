import { NextResponse } from "next/server";
import { spirits } from "@/entities/spirit/model/data";

export async function GET() {
  return NextResponse.json(spirits);
}
