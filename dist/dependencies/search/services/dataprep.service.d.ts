import { Subject } from "rxjs";
import { StorageLocation } from "../types/interface";
export declare class DataPrepService {
    private MongooseConnection;
    private connectionStatus;
    loadObsData(storage: StorageLocation, dataFromStorage: Subject<any>): void;
    private streamMongoData;
    private streamFileData;
    private connectMongo;
}
