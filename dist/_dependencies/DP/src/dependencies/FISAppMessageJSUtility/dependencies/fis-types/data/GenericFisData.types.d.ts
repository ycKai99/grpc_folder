import { ServiceData } from '../interface/export';
export declare type GenericFisData = {
    type: 'Data';
    service: ServiceData;
    data: Record<string, GenericFisAlias>;
};
export declare type GenericFisAlias = {
    alias: string;
    rows: {
        row: GenericFisRow[];
    };
};
export declare type GenericFisRow = {
    rowId: string;
    rowNumber: number;
    column: GenericFisRowColumn;
};
export declare type GenericFisRowColumn = Record<string, string | number | boolean | null>;
