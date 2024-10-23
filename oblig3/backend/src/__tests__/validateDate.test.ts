import { describe, it, expect } from "vitest";
import { validateDate } from "../config/validation";

//kjøres med pnpm test

describe("validateDate", () => {
  // test 1: normal use-case med standard ISO datestring
  it("should return true for valid ISO date string", () => {
    // arrange
    const testDate = "2024-03-25T12:00:00Z";
    // act
    const result = validateDate(testDate);
    // assert
    expect(result).toBe(true);
  });

  // test 2: edge case med tom string
  it("should return false for empty string", () => {
    // arrange
    const testDate = "";
    // act
    const result = validateDate(testDate);
    // assert
    expect(result).toBe(false);
  });

  // test 3: edge case med feil i datestring
  it("should return false for malformed date string", () => {
    // arrange
    const testDate = "2024-13-45T99:99:99Z"; // ugyldig måned, dag og tidspunkt
    // act
    const result = validateDate(testDate);
    // assert
    expect(result).toBe(false);
  });
});
