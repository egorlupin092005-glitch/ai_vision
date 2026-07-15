import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BenchmarkChart from "./BenchmarkChart";
import type { BenchmarkModel } from "@/types/benchmark";
import React from "react";

const mockData: BenchmarkModel[] = [
  { model: "Claude Fable 5", provider: "Anthropic", composite: 91, coding: 94, reasoning: 89, knowledge: 89, math: 85, agentic: 99, trend: [85, 88, 90, 91] },
  { model: "Gemini 3.1 Pro", provider: "Google", composite: 88, coding: 89, reasoning: 96, knowledge: 91, math: 80, agentic: 84, trend: [82, 85, 87, 88] },
];

describe("BenchmarkChart", () => {
  it("renders without crashing with data", () => {
    const { container } = render(<BenchmarkChart data={mockData} category="composite" />);
    expect(container).toBeDefined();
  });

  it("renders without crashing with empty data", () => {
    const { container } = render(<BenchmarkChart data={[]} category="composite" />);
    expect(container).toBeDefined();
  });
});
