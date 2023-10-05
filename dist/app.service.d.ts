import { dataStorageInterface } from './interfaces/data.storage';
import { StorageController } from './services/storage.service';
import { LoggingService } from './dependencies/DP/src/_dependencies/Audit/dependencies/log/interface/export';
import { BaseMessage } from './dependencies/DP/src/_interfaces/export';
import { SynchronisationService } from './services/synchronization.service';
import { ErrorTrigger, MessageSynchronisationServiceSetting } from './dependencies/DP/src/_dependencies/Audit/type/datatype';
export declare class AppService {
    private syncService;
    private storageController;
    private loggingService;
    private ActivityMessages;
    private DPC;
    private applicationName;
    private UCPId;
    private synchronizationServiceStatus;
    private loggingSubject;
    private storage;
    constructor(syncService: SynchronisationService, storageController: StorageController, loggingService: LoggingService);
    getHello(): {
        hello: string;
    };
    intepretMessage(body: BaseMessage | any, operation: 'read' | 'write' | 'update' | 'delete'): Promise<void>;
    dataOperation(data: dataStorageInterface): Promise<any>;
    startSynchronizationService(configurations: MessageSynchronisationServiceSetting): Promise<void>;
    syncOperation(syncRequest: ErrorTrigger | any): Promise<void>;
    private initializeAppServices;
    private notifyServer;
    private generateNotificationMessage;
    private sendNotificationToUCP;
    private getLoginResponseFromUCP;
}
