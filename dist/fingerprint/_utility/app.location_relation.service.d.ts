import { StorageController } from './app.storage.service';
export declare class LocationRelationController {
    private storageController;
    setStorageController(controller: StorageController): void;
    constructor();
    /**
     * @param entityName string
     * @param entityUUID optional, used when read image
     * @description pass data to storageController.readData(entityname, entityUUID)
     */
    readRelation(entityName: string, entityUUID?: string): Promise<string>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.writeData(entityname, data)
     */
    addRelation(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.updateData(entityname, data)
     */
    updateRelation(entityName: string, data: any): Promise<string>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.deleteData(entityname, data)
     */
    deleteRelation(entityName: string, entityUUID: string): Promise<string>;
}
