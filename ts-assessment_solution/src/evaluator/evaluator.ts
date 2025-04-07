
import * as funcs from "../functions"; //better sine index.ts can club them all and can be extended
import { Node, Value } from "../types/ast";

export class Evaluator {
    //TypeScript infer the right callable map from funcs (trying to avoid manyal writing func.add etc..)
    private readonly functions: Record<string, (...args: Value[]) => Value | Promise<Value>> = funcs;

    async evaluate(expression: Node): Promise<Value> {
        if (expression.type === "literal") {
            return expression.value;
        }

        if (
            !(expression.name in this.functions) ||
            typeof this.functions[expression.name] !== "function"
        ) {
            console.log("THROWING for:", expression.name); //extra logging tonfind what comes as param for undefined
            throw new Error(`Unknown function: ${expression.name}`);
        }
        
        
        const func = this.functions[expression.name];
        const args = await Promise.all(
            expression.parameters.map(param => this.evaluate(param))
        );
        return await func(...args);
    }
}