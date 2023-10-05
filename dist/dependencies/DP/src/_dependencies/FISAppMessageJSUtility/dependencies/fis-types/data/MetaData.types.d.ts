export type MetaData = {
    type: 'Metadata';
    service: ServiceData;
    data: Record<string, AliasColumnMetaData>;
};
export type ServiceData = {
    serviceId: string;
    serviceName: string;
    serviceType: string;
    instanceId: string;
    date: string;
    title: string;
    version: string;
};
export type AliasColumnMetaData = {
    alias: string;
    column: Record<string, ColumnMetaData>;
};
export type ColumnMetaData = {
    name: string;
    isKey: boolean;
    dataType: string;
    length: number;
    scale: number;
    caption: string;
    isCompute: boolean;
    tag: string;
};
