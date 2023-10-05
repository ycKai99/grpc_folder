import { ServiceData } from '../interface/export';
export type GenericFisData = {
    type: 'Data';
    service: ServiceData;
    data: Record<string, GenericFisAlias>;
};
export type GenericFisAlias = {
    alias: string;
    rows: {
        row: GenericFisRow[];
    };
};
export type GenericFisRow = {
    rowId: string;
    rowNumber: number;
    column: GenericFisRowColumn;
};
export type GenericFisRowColumn = Record<string, string | number | boolean | null>;
