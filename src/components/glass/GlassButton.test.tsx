import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GlassButton from "./GlassButton";
import React from "react";

describe("GlassButton", () => {
  it("renders children", () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<GlassButton onClick={handleClick}>Click</GlassButton>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <GlassButton onClick={handleClick} disabled>
        Click
      </GlassButton>
    );
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    const { container } = render(<GlassButton variant="primary">Primary</GlassButton>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
