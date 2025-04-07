import { describe, it, expect, test, afterAll, beforeEach } from "@jest/globals";
import { Evaluator } from "../src/evaluator/evaluator";

let evaluator: Evaluator;

describe("Evaluator", () => {
    beforeEach(() => {
        evaluator = new Evaluator();
    });

    afterAll(() => {
        evaluator = null!;
    });

    it("evaluates a literal expression", async () => {
        const r = await evaluator.evaluate({ type: "literal", value: "13" });
        expect(r).toEqual("13");
    });

    it("evaluates a 'not' function expression", async () => {
        const r = await evaluator.evaluate({
            type: "function",
            name: "not",
            parameters: [{ type: "literal", value: true }]
        });
        expect(r).toBe(false);
    });

    it("evaluates an 'add' function expression", async () => {
        const result = await evaluator.evaluate({
            type: "function",
            name: "add",
            parameters: [
                { type: "literal", value: 0.3 },
                { type: "literal", value: 0.6 }
            ]
        });
        expect(result).toBeCloseTo(0.9);
    });

    test("throws an error for an invalid expression", async () => {
        // @ts-expect-error
        await expect(evaluator.evaluate({ type: "" })).rejects.toThrow();
    });

    it("throws an error for an unknown function", async () => {
        const badExpression = {
            type: "function",
            name: "doesNotExist", // explicitly wrong function name
            parameters: []
        } as any;
        
        //await expect(evaluator.evaluate(badExpression)).rejects.toThrow();
        await expect(evaluator.evaluate(badExpression)).rejects.toThrow("Unknown function: doesNotExist");
    });
});