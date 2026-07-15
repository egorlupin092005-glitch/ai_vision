import React from "react";
import BenchmarkDashboard from "@/components/benchmark/BenchmarkDashboard";
import { getBenchmarkData } from "@/lib/benchmarks";

export default async function HomePage() {
  const data = await getBenchmarkData();
  return <BenchmarkDashboard data={data} />;
}
