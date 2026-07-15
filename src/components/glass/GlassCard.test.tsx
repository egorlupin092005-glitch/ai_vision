import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GlassCard from "./GlassCard";
import React from "react";

describe("GlassCard", () => {
  it("renders children", () => {
    render(<GlassCard hover={false}>Hello World</GlassCard>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders with glass classes", () => {
    const { container } = render(<GlassCard hover={false}>Card</GlassCard>);
    expect(container.firstChild).toHaveClass("glass-card");
  });

  it("applies custom className", () => {
    const { container } = render(
      <GlassCard hover={false} className="custom-class">
        Card
      </GlassCard>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
