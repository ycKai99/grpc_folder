export type IdType = string | number;
export interface IdGenerator {
    generateId<T extends IdType>(): T;
}
export declare function generateNewId<T extends IdGenerator, R extends IdType>(generator: new () => T): R;
export declare class Uuid implements IdGenerator {
    constructor();
    generateId<T extends IdType>(): T;
}
