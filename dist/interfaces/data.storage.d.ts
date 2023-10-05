export type dataStorageInterface = dataStorageInterfaceRead | dataStorageInterfaceWrite | dataStorageInterfaceUpdate | dataStorageInterfaceDelete;
export interface dataStorageInterfaceRead {
    operation: "read";
    entityName: string;
    uuid?: string;
}
export interface dataStorageInterfaceWrite {
    operation: "write";
    entityName: string;
    uuid: string;
    data: string;
}
export interface dataStorageInterfaceUpdate {
    operation: "update";
    entityName: string;
    uuid: string;
    data: string;
}
export interface dataStorageInterfaceDelete {
    operation: "delete";
    entityName: string;
    uuid: string;
}
