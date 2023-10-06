import { StorageController } from './app.storage.service';
export declare class LocationTagController {
    private storageController;
    setStorageController(controller: StorageController): void;
    constructor();
    /**
     * @param entityName string
     * @param entityUUID optional, used when read image
     * @description pass data to storageController.readData(entityName, entityUUID)
     */
    readTag(entityName: string, entityUUID?: string): Promise<string>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.writeData(entityName, data)
     */
    addTag(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.updateData(entityName, data)
     */
    updateTag(entityName: string, data: any): Promise<string>;
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.deleteData(entityName, data)
     */
    deleteTag(entityName: string, entityUUID: string): Promise<string>;
}
