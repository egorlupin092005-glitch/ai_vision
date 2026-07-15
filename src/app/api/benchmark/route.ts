import { NextResponse } from "next/server";
import { getBenchmarkData } from "@/lib/benchmarks";

export async function GET() {
  const data = await getBenchmarkData();
  return NextResponse.json(data);
}
