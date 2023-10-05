import { responseInterface } from '../interfaces/constsetting';
import { dataStorageInterfaceUpdate, dataStorageInterfaceWrite } from 'src/interfaces/data.storage';
export declare class DbConnectionController {
    private dbConnection;
    private genericDataSchema;
    constructor();
    init(): Promise<void>;
    readExec(entityName: string, entityUUID?: string): Promise<responseInterface>;
    writeExec(entityName: string, data: dataStorageInterfaceWrite, entityUUID?: string): Promise<responseInterface>;
    updateExec(entityNames: string, data: dataStorageInterfaceUpdate, entityUUID?: string): Promise<responseInterface>;
    deleteExec(entityName: string, entityUUID?: string): Promise<responseInterface>;
    checkEntityType(entityName: string, data: any): any;
}
