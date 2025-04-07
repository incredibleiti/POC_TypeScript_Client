import { Value } from "types/ast";

// Use `node-fetch` if you're on Node <18
// import fetch from "node-fetch";
// npm -v --> v22.14.0 (thus works for my assignment)

export async function fetchGet(url: Value): Promise<string> {
    if (typeof url !== "string") {
        throw new Error("fetchGet: URL must be a string");
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`fetchGet: Failed to fetch ${url} – ${response.statusText}`);
    }

    return await response.text();
}

export function contains(str: Value, substr: Value): boolean {
    if (typeof str !== "string" || typeof substr !== "string") {
        throw new Error("contains: both arguments must be strings");
    }

    return str.includes(substr);
}
