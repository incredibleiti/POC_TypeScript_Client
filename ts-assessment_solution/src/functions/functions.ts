import { Value } from "types/ast";

export function equals(arg1: Value, arg2: Value): boolean {
    return arg1 === arg2; //added === for strict checking type n value
}

export function not(arg: Value): boolean {
    return !arg; //avoding clutter syntax of checking and condfitional true:false
}

export function add(...params: Value[]): number {
    return params.reduce((sum: number, val) => { //making sure sum is always a number else can also be null
        if (typeof val !== "number") {
            throw new Error(`Invalid argument to add(): ${JSON.stringify(val)} is not a number`);
        }
        return sum + val;
    }, 0);
}

