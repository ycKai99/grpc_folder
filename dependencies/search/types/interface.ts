import { Observable } from "rxjs"

export interface Conditions {
    $regex?: string,
    $dateRange?: DateRange,
    [key: string]: string | Date | DateRange | string[]
}
export interface DateRange {
    startDate: string | Date,
    endDate: string | Date,
    column: string
}

export type StorageLocationType = 'File' | 'MongoDB'

export interface StorageLocation {
    type: StorageLocationType,
    url: string
}
export interface ObservableStorage {
    type: "observable",
    ref: Observable<any>
}

export type Storage = ObservableStorage | StorageLocation
