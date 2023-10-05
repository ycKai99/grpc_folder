import { Observable } from 'rxjs';
import { Conditions, Storage } from '../types/interface';
export declare class SearchService {
    private dataPrepService;
    constructor();
    callFromOtherClass(): void;
    query(storage: Storage, ...conditions: Conditions[]): Observable<any>;
    private filterFromObs;
    private hasMatchingProps;
    private filterByKeyValue;
    private matchValues;
    private filterViaRegex;
    private filterByDateRange;
}
