/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { v4 as uuidV4 } from 'uuid';

/**
 * Id type is string or number
 * 
 * @type IdType
 */
export type IdType = string | number;

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
export function generateNewId<T extends IdGenerator, R extends IdType>(generator: new () => T): R {
    try {
        return new generator().generateId();
    }
    catch (e) {
        throw "Generate new Id failed.\n" + e;
    }
}

/**
 * Uuid Generator.
 *
 * @class Uuid
 */
export class Uuid implements IdGenerator {
    constructor() {
    }

    generateId<T extends IdType>(): T {
        try {
            return uuidV4() as T;
        }
        catch (e) {
            throw e;
        }
    }
}
