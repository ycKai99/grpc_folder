import { ServiceData } from '../interface/export';
export type EditStatus = {
    type: 'EditStatus';
    service: ServiceData;
    state: string;
    status: string;
    isEditable: boolean;
    permission: PermissionData;
    data: Record<string, AliasPermission>;
};
export type PermissionData = {
    approve: boolean;
    cancel: boolean;
    check: boolean;
    commit: boolean;
    create: boolean;
    delete: boolean;
    distribute: boolean;
    modify: boolean;
    post: boolean;
    print: boolean;
    reopen: boolean;
    retrieve: boolean;
    reverse: boolean;
    save: boolean;
    unpost: boolean;
    verify: boolean;
    voids: boolean;
};
export type AliasPermission = {
    alias: string;
    isEditable: boolean;
    row: {
        isMultiRow: boolean;
        permission: RowPermissionData;
    };
    column: Record<string, ColumnPermissionData>;
};
export type RowPermissionData = {
    add: boolean;
    delete: boolean;
};
export type ColumnPermissionData = {
    visible: boolean;
    isEditable: boolean;
};
