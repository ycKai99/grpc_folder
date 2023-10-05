export declare const DIRECTORY: string;
export declare const FINGERPRINT_DATA_FILE: string;
export declare const FINGERPRINT_TEMPLATE_DATA_FILE: string;
export declare const MESSAGE_NOTIFICATION_FILE: string;
export declare const RESPONSE_MESSAGE_FILE: string;
export declare const IMAGE_FOLDER: string;
export declare const LOCATION_TAG_FILE: string;
export declare const LOCATION_RELATION_FILE: string;
export declare const MESSAGE_FILE_PATH: string;
export declare const FINGERPRINT_FILE_PATH: string;
export declare const FINGERPRINT_TEMPLATE_FILE_PATH: string;
export declare const RESPONSE_MESSAGE_FILE_PATH: string;
export declare const LOCATION_TAG_FILE_PATH: string;
export declare const LOCATION_RELATION_FILE_PATH: string;
export declare const enum SUBMIT_VALUE {
    INITIALIZE_DEVICE = "INITIALIZE_DEVICE",
    ENROLL_FINGERPRINT = "ENROLL_FINGERPRINT",
    VERIFY_FINGERPRINT = "VERIFY_FINGERPRINT",
    IDENTIFY_FINGERPRINT = "IDENTIFY_FINGERPRINT",
    CLOSE_FINGERPRINT = "CLOSE_FINGERPRINT"
}
export declare const enum FILE_EXTENSION {
    JPEG = "jpeg",
    BITMAP = "bmp",
    PNG = "png",
    JSON = "json"
}
export declare const enum RESPONSE_MESSAGE {
    FAILED_READ_DIR = "Read directory failed, readdir method error.",
    FAILED_REGISTER = "Register failed",
    FAILED_SAVE_IMAGE = "Failed to save image.",
    FAILED_VERIFY = "Verify failed.",
    FAILED_SYNCDATA = "Data sync failed",
    FAILED_READ_FILE_JSON = "Read file failed",
    FAILED_EXCEED_FILE_SIZE = "Exceed file size",
    FAILED_CREATE_FILE = "Failed create file",
    FAILED_WRITE_DATA = "failed append data",
    FAILED_REFRESH_CONNECTION = "Failed to refresh connection status",
    SUCCESS_SAVE_IMAGE = "Save image successful.",
    SUCCESS_VERIFY = "Verify success.",
    SUCCESS_SYNCDATA = "Data sync success.",
    SUCCESS_CREATE_FILE = "Success created file",
    SUCCESS_WRITE_DATA = "Success append data",
    UNKNOWN_ERROR = "Unknown error",
    FOLDER_EXISTED = "Folder exists.",
    FOLDER_CREATED = "Folder created.",
    DATABASE_CONNECTED = "Connected to mongo database",
    DATABASE_CONNECT_ERROR = "Failed to connect database",
    DATABASE_DISCONNECTED = "Disconnect to database",
    DATABASE_RECONNECTED = "Reconnect to database",
    DATABASE_FAILED_READ_DATA = "Failed to read data",
    DATABASE_SUCCESS_READ_DATA = "Success to read data",
    DATABASE_SUCCESS_SAVE_DATA = "Success to save data",
    DATABASE_FAILED_SAVE_DATA = "Failed to save data",
    DATABASE_FAILED_DELETE_DATA = "Failed to delete data",
    DATABASE_SUCCESS_DELETE_DATA = "Success to delete data",
    DATABASE_FAILED_UPDATE_DATA = "Failed to update data",
    DATABASE_SUCCESS_UPDATE_DATA = "Success to update data",
    AXIOS_SUCCESS_GET = "Success get method",
    AXIOS_FAILED_GET = "Failed to get method",
    AXIOS_SUCCESS_POST = "Success post method",
    AXIOS_FAILED_POST = "Failed to post method"
}
export declare const REMOTE_SERVER: string;
export declare const URL_GET_FP_TEMPLATE: string;
export declare const URL_REGISTER_FP: string;
export declare const URL_GET_NEW_FPID: string;
export declare const URL_SYNC_REMOTE_DATA: string;
export declare const URL_MOBILE_DEVICE: string;
export declare const enum FINGERPRINT_POSITION {
    LEFT_THUMB = 0,
    LEFT_INDEX = 1,
    LEFT_MIDDLE = 2,
    LEFT_RING = 3,
    LEFT_PINKY = 4,
    RIGHT_THUMB = 5,
    RIGHT_INDEX = 6,
    RIGHT_MIDDLE = 7,
    RIGHT_RING = 8,
    RIGHT_PINKY = 9,
    UNKNOWN = 10
}
export declare enum DB {
    FILE = "file",
    MONGO = "mongo"
}
export declare enum STAT {
    ONLINE = "online",
    OFFLINE = "offline"
}
export declare enum PROCESS_STATUS {
    NEW_FINGERPRINT = "new fingerprint",
    UNREGISTER_FINGERPRINT = "unregister fingerprint",
    REGISTERED_FINGERPRINT = "registered fingerprint",
    VERIFIED_FINGERPRINT = "verified fingerprint"
}
export declare enum ENTITYNAME {
    FP_TEMPLATE_MSG = "fingerprintTemplateData",
    EVENT_MSG = "eventMessage",
    LOCATION_TAG_MSG = "locationTag",
    LOCATION_REL_MSG = "locationRelation",
    GENERICDATA = "genericData",
    DEVICE_TAG_MSG = "deviceTag",
    PERSON_PROF_MSG = "personProfile",
    CALENDAR = "icalendar",
    EVENT = "ievent",
    EVENTINCALENDAR = "eventInCalendarInformation",
    FINGERPRINTLOGINACCESS = "fingerprintLoginAccess",
    PERSONPHOTO = "PERSONPHOTO",
    AUTHENTICATIONLOG = "AUTHENTICATIONLOG",
    AUTHENTICATIONLOGBYPAYMENTCOLLECTION = "AUTHENTICATIONLOGBYPAYMENTCOLLECTION",
    AUTHENTICATION_LOG_EXTENSION = "authenticationLogExtension"
}
export declare const enum RESPONSE_STATUS {
    ERROR = -1,
    SUCCESS = 1,
    NOTHING = 0
}
export interface responseInterface {
    status: RESPONSE_STATUS;
    message: any;
    data?: any;
}
