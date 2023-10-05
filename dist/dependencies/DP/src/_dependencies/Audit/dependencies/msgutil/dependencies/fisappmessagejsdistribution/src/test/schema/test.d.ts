export type Prop1 = "VAL1" | "VAL2";
export type Prop2 = "VAL3" | "VAL4";
export type Prop3 = Prop1 | Prop2;
export interface Test {
    prop1?: Prop1;
    prop2?: Prop2;
    prop3?: Prop3;
    [k: string]: unknown;
}
