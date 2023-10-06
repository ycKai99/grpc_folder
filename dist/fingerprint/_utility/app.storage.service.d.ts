export declare class StorageController {
    constructor();
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read data from mongoDB, data is based on entityName
     */
    readData(entityName: string, entityUUID?: any): Promise<string>;
    /**
     * @param entityName string
     * @param data any
     * @description add data to mongoDB
     */
    writeData(entityName: string, payloadData: any): Promise<string>;
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
     */
    updateData(entityName: string, payloadData: any): Promise<string>;
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete data from mongoDB
     */
    deleteData(entityName: string, entityUUID: string, payloadData?: any): Promise<string>;
}
export declare class FingerprintStorageController extends StorageController {
    constructor();
    /**
     * @param entityName string
     * @param entityUUID optional, used when read image
     * @description pass data to storageController.readData(entityname, entityUUID)
     */
    readFpData(entityName: any, entityUUID?: any): Promise<string>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController
     */
    writeFpData(entityName: any, data: any): Promise<string>;
}
