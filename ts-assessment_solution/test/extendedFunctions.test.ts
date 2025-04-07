import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { contains, fetchGet } from "../src/functions/extendedFunctions";

// TypeScript that fetch is a mocked version of the real fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("Extended Functions", () => {
    describe("contains", () => {
        it("returns true when substring is present", () => {
            expect(contains("hello world", "world")).toBe(true);
        });

        it("returns false when substring is not present", () => {
            expect(contains("hello world", "moon")).toBe(false);
        });

        it("throws when inputs are not strings", () => {
            expect(() => contains(123 as any, "test")).toThrow();
            expect(() => contains("hello", null as any)).toThrow();
        });
    });

    describe("fetchGet", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("returns fetched content", async () => {
            const mockResponse = new Response("Mocked Google HTML content", {
                status: 200,
                statusText: "OK"
            });

            //fetch.mockResolvedValueOnce(mockResponse);
            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockResponse);


            const result = await fetchGet("https://mock.com");
            expect(result).toContain("Google");
        });

        it("throws if URL is not a string", async () => {
            //testing invalid input
            await expect(fetchGet(123)).rejects.toThrow("fetchGet: URL must be a string");
        });

        it("throws on non-ok response", async () => {
            const mockResponse = new Response("", {
                status: 404,
                statusText: "Not Found"
            });

            //mockResponse.ok = false; //this will not works since mockresponse is read only
            //Can also mocks the reponse manyally but not sure if needed since the response chexks for ok in code and 
            //return false

            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockResponse);


            await expect(fetchGet("https://broken.com")).rejects.toThrow("fetchGet: Failed to fetch");
        });
    });
});
