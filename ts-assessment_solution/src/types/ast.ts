export type Value = string | boolean | number | Date | null | Value[];

export type LiteralNode = {
    readonly type: "literal";
    readonly value: Value;
};

export type FunctionName = "add" | "equals" | "not" | "contains" | "fetchGet"; //extended for assignment requirment for fetcget and contains

export type FunctionNode = {
    readonly type: "function";
    readonly name: FunctionName;
    readonly parameters: readonly Node[];
};

export type Node = LiteralNode | FunctionNode;
