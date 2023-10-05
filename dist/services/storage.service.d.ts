import { DB } from '../interfaces/constsetting';
export declare class StorageController {
    private entityName_storageType;
    private dbConnectionController;
    constructor();
    init(): Promise<void>;
    getStorageType(entityName: string): DB;
    setStorageType(entityName: string, data: DB): void;
    readData(entityName: string, entityUUID?: string): Promise<any>;
    writeData(entityName: string, entityUUID: string, data: string): Promise<import("../interfaces/constsetting").responseInterface>;
    updateData(entityName: string, entityUUID: string, data: any): Promise<import("../interfaces/constsetting").responseInterface>;
    deleteData(entityName: string, entityUUID: string): Promise<import("../interfaces/constsetting").responseInterface>;
}
