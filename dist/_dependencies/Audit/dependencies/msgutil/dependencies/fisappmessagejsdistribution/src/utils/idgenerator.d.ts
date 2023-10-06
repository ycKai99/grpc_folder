/**
 * Id type is string or number
 *
 * @type IdType
 */
export declare type IdType = string | number;
/**
 * Id Generator.
 *
 * @interface IdGenerator
 */
export interface IdGenerator {
    generateId<T extends IdType>(): T;
}
/**
 * Generate new Id.
 *
 * @function generateNewId
 * @param generator {<T extends IdGenerator} - Id Generator.
 * @return {<R>} - Generic type of IdType.
 */
export declare function generateNewId<T extends IdGenerator, R extends IdType>(generator: new () => T): R;
/**
 * Uuid Generator.
 *
 * @class Uuid
 */
export declare class Uuid implements IdGenerator {
    constructor();
    generateId<T extends IdType>(): T;
}
