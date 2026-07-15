import { describe, it, expect } from "vitest";
import { formatNumber, relativeTime, truncate } from "./utils";

describe("formatNumber", () => {
  it("formats thousands", () => {
    expect(formatNumber(1500)).toBe("1.5K");
  });

  it("formats millions", () => {
    expect(formatNumber(1500000)).toBe("1.5M");
  });

  it("returns string for small numbers", () => {
    expect(formatNumber(500)).toBe("500");
  });
});

describe("relativeTime", () => {
  it("returns just now for recent date", () => {
    expect(relativeTime(new Date().toISOString())).toBe("just now");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Hello World This Is Long", 10)).toBe("Hello Worl...");
  });

  it("does not truncate short strings", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });
});
