import { eventMessageInterface, fingerprintDataInterface, locationTagInterface, locationRelationInterface } from '../../_interface/fingerprintdata.interface';
import { DEVICE, STAT } from '../../_interface/fingerprint.constsetting';
export interface StandardFingerprintInterface {
    fpStandardInit(): any;
    fingerprintTemplate(): Promise<string>;
    readFingerprintTemplateData(): any;
    getFingerprintTemplateData(): fingerprintDataInterface[];
    setFingerprintTemplateData(data: fingerprintDataInterface[]): any;
    readEventMessageData(): any;
    getEventMessageData(): eventMessageInterface[];
    setEventMessageData(data: eventMessageInterface[]): any;
    readLocationTagData(): any;
    getLocationTagData(): locationTagInterface[];
    setLocationTagData(data: locationTagInterface[]): any;
    readLocationRelationData(): any;
    getLocationRelationData(): locationRelationInterface[];
    setLocationRelationData(data: locationRelationInterface[]): any;
    readData(entityName: string, entityUUID?: string): any;
    addData(entityName: string, data: any): any;
    updateData(entityName: string, data: any): any;
    deleteData(entityName: string, entityUUID: string): any;
    readLocationTag(entityName: string, entityUUID?: string): any;
    addLocationTag(entityName: string, data: any): any;
    updateLocationTag(entityName: string, data: any): any;
    deleteLocationTag(entityName: string, entityUUID: string): any;
    readLocationRelation(entityName: string, entityUUID?: string): any;
    addLocationRelation(entityName: string, data: any): any;
    updateLocationRelation(entityName: string, data: any): any;
    deleteLocationRelation(entityName: string, entityUUID: string): any;
    setScannerID(deviceNo: string): any;
    getScannerID(): string;
    setDeviceStatus(deviceStatus: DEVICE): any;
    getDeviceStatus(): DEVICE;
    setDeviceIP(deviceIP: string): any;
    getDeviceIP(): string;
}
export declare class StandardFingerprint implements StandardFingerprintInterface {
    private _eventMessageData;
    private _fingerprintTemplateData;
    private _locationTag;
    private _locationRelation;
    private _scannerID;
    private _deviceStatus;
    private _deviceIP;
    private connectionStatus;
    private fpTemplateArray;
    private storageController;
    private locationTagController;
    private locationRelationController;
    private countFpVerify;
    constructor();
    fpStandardInit(): Promise<void>;
    getConnectionStatus(): STAT;
    setConnectionStatus(data: STAT): Promise<void>;
    checkConnectionStatus(): Promise<void>;
    fpVerify(): Promise<string>;
    /**
     * @returns Promise string
     * @description get fingerprint template data
    */
    fingerprintTemplate(): Promise<string>;
    /**
     * @description read fingerprint template from mongoDB, and set into this._fingerprintTemplateData
    */
    readFingerprintTemplateData(): Promise<void>;
    /**
     * @returns fingerprintDataInterface
     * @description get fingerprint template data
    */
    getFingerprintTemplateData(): fingerprintDataInterface[];
    /**
     * @param data fingerprintDataInterface[]
     * @description set fingerprint template data
    */
    setFingerprintTemplateData(data: fingerprintDataInterface[]): Promise<void>;
    /**
     * @description read event message from mongoDB, and set into this._eventMessageData
    */
    readEventMessageData(): Promise<void>;
    /**
     * @returns data eventMessageInterface[]
     * @description get event message data
    */
    getEventMessageData(): eventMessageInterface[];
    /**
     * @param data eventMessageInterface[]
     * @description set event message data
    */
    setEventMessageData(data: eventMessageInterface[]): Promise<void>;
    /**
     * @description read location tag data, and set into this._locationTag
    */
    readLocationTagData(): Promise<void>;
    /**
     * @returns locationTagInterface[]
     * @description get location tag data
    */
    getLocationTagData(): locationTagInterface[];
    /**
     * @param data locationTagInterface[]
     * @description set location tag data
    */
    setLocationTagData(data: locationTagInterface[]): Promise<void>;
    /**
     * @description read location relation data, and set into this._locationRelation
    */
    readLocationRelationData(): Promise<void>;
    /**
     * @returns locationRelationInterface[]
     * @description set location relation data
    */
    getLocationRelationData(): locationRelationInterface[];
    /**
     * @param data locationRelationInterface[]
     * @description set location relation data
    */
    setLocationRelationData(data: locationRelationInterface[]): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read data from mongoDB, data is based on entityName
    */
    readData(entityName: string, entityUUID?: string): Promise<any>;
    /**
     * @param entityName string
     * @param data any
     * @description add data to mongoDB
    */
    addData(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    updateData(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete data from mongoDB
    */
    deleteData(entityName: string, entityUUID: string, data?: any): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read location tag from mongoDB, data is based on entityName
    */
    readLocationTag(entityName: string, entityUUID?: string): Promise<any>;
    /**
     * @param entityName string
     * @param data any
     * @description add location tag to mongoDB
    */
    addLocationTag(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    updateLocationTag(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete location tag from mongoDB
    */
    deleteLocationTag(entityName: string, entityUUID: string): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read location relation from mongoDB, data is based on entityName
    */
    readLocationRelation(entityName: string, entityUUID?: string): Promise<any>;
    /**
     * @param entityName string
     * @param data any
     * @description add location relation to mongoDB
    */
    addLocationRelation(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    updateLocationRelation(entityName: string, data: any): Promise<void>;
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete location relation from mongoDB
    */
    deleteLocationRelation(entityName: string, entityUUID: string): Promise<void>;
    readScannerIDData(entityName: string, entityUUID?: string): Promise<any>;
    /**
     * @param deviceNo string
     * @description set scanner ID
    */
    setScannerID(deviceNo: string): Promise<void>;
    /**
     * @returns string
     * @description get scanner ID
    */
    getScannerID(): string;
    /**
     * @param deviceStatus DEVICE enum
     * @description set device status
    */
    setDeviceStatus(deviceStatus: DEVICE): Promise<void>;
    /**
     * @returns DEVICE enum
     * @description get device status
    */
    getDeviceStatus(): DEVICE;
    /**
     * @param deviceIP string
     * @description set deviceIP into this._deviceIP
    */
    setDeviceIP(deviceIP: string): Promise<void>;
    /**
     * @returns string
     * @description get device IP
    */
    getDeviceIP(): string;
}
