import { expect, describe, it } from "@jest/globals";
import { add, equals, not } from "../src/functions/functions";

describe("Basic Functions", () => {
    it("adds numbers", () => {
        expect(add(1, 2, 3)).toBe(6);
    });

    it("throws on non-number in add", () => {
        expect(() => add(1, "foo" as any)).toThrow();
    });

    it("checks equality", () => {
        expect(equals(1, 1)).toBe(true);
        expect(equals("1", 1)).toBe(false);
    });

    it("inverts boolean values", () => {
        expect(not(true)).toBe(false);
        expect(not(false)).toBe(true);
    });
});
