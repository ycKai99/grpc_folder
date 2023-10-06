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
    FP_FAILED_REGISTER = "Register failed",
    FAILED_VERIFY = "Verify failed.",
    FAILED_SYNCDATA = "Data sync failed",
    FAILED_READ_FILE_JSON = "Read file failed",
    FAILED_TO_READ_EVENT_MSG_DATA = "FAILED TO READ EVENT MESSAGE DATA",
    FAILED_TO_READ_FP_TEMPLATE_DATA = "FAILED TO READ FINGERPRINT TEMPLATE DATA",
    FAILED_TO_READ_INIT_DATA = "FAILED TO READ INIT DATA",
    FAILED_EXCEED_FILE_SIZE = "Exceed file size",
    FAILED_CREATE_FILE = "Failed create file",
    FAILED_WRITE_DATA = "failed append data",
    FAILED_REFRESH_CONNECTION = "Failed to refresh connection status",
    FP_SUCCESS_REGISTER = "Registered successful.",
    FP_ALREADY_REGISTERED = "Fingerprint already registered",
    FP_UNREGISTER = "Fingerprint unregister",
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
    DATABASE_FINDALL_ERROR = "Failed to find database",
    DATABASE_FINDALL_SUCCESS = "Success to find database",
    DATABASE_SAVE_DATA = "Success to save data",
    DATABASE_FAILED_SAVE_DATA = "Failed to save data",
    AXIOS_SUCCESS_GET = "Success get method",
    AXIOS_FAILED_GET = "Failed to get method",
    AXIOS_SUCCESS_POST = "Success post method",
    AXIOS_FAILED_POST = "Failed to post method",
    SCAN_FINGER_REQUIRED = "Please scan your finger.",
    SET_FINGER_SUCCESS = "SET FINGER SUCCESSFUL.",
    ALL_FIELD_REQUIRED = "Please select all the required field.",
    INVALID_FINGER_EDGES = "Bad fingerprint, Please try again",
    INVALID_FINGER_SCORE = "Fingerprint already registered.",
    SETTING_SAME_FINGER = "Fingerprint already set, Please try other finger.",
    SELECTED_CHANGED = "Selection changed, Please select back.",
    EMPTY_DATA = "Data is empty, please set finger first.",
    SELECTION_CHANGED = "Person Name change. Please change it back.",
    EMPTY_ORGANIZATION_FIELD = "Organisation must be selected.",
    EMPTY_PERSON_FIELD = "Person must be selected.",
    EMPTY_FINGER_FIELD = "Finger must be selected.",
    SUCCESS_REGISTER = "Register success."
}
export declare const enum FP_URL {
    UPDATE_PHONE_FP_TEMPLATE = "NEWFPTEMPLATE",
    DELETE_PHONE_FP_TEMPLATE = "DELETEFPTEMPLATE"
}
export declare const enum DEVICE {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    UNAVAILABLE = "NO DEVICE"
}
export declare enum FP_POSITION {
    LEFT_PINKY = "left-pinky",
    LEFT_RING = "left-ring",
    LEFT_MIDDLE = "left-middle",
    LEFT_INDEX = "left-index",
    LEFT_THUMB = "left-thumb",
    RIGHT_THUMB = "right-thumb",
    RIGHT_INDEX = "right-index",
    RIGHT_MIDDLE = "right-middle",
    RIGHT_RING = "right-ring",
    RIGHT_PINKY = "right-pinky"
}
export declare const enum RESPONSE_STATUS {
    ERROR = -1,
    SUCCESS = 1,
    NOTHING = 0
}
export declare const enum DB {
    FILE = "file",
    MONGO = "mongo"
}
export declare const enum STAT {
    ONLINE = "online",
    OFFLINE = "offline"
}
export declare const enum PROCESS_STATUS {
    NEW_FINGERPRINT = "new fingerprint",
    UNREGISTERED_FINGERPRINT = "unregistered fingerprint",
    REGISTERED_FINGERPRINT = "registered fingerprint",
    VERIFIED_FINGERPRINT = "verified fingerprint",
    AUTHORIZATION_FINGERPRINT_SUCCESS = "authorization success",
    AUTHORIZATION_FINGERPRINT_FAILED = "authorization failed",
    AUTHENTICATE_FINGERPRINTT_SUCCESS = "authenticate success",
    AUTHENTICATE_FINGERPRINTT_FAILED = "authenticate failed"
}
export declare const enum FPENTITYNAME {
    FP_TEMPLATE_MSG = "fingerprintTemplateData",
    EVENT_MSG = "eventMessage",
    LOCATION_TAG = "locationTag",
    LOCATION_REL = "locationRelation",
    GENERICFILEDATA = "genericFileData",
    DEVICE_TAG_MSG = "deviceTag",
    PERSON_PROF_MSG = "personProfile",
    AUTHENTICATION_LOG = "authenticationLog",
    AUTHENTICATION_LOG_BY_PAYMENT_COLLECTION = "authenticationLogByPaymentCollection",
    AUTHENTICATION_LOG_EXTENSION = "authenticationLogExtension"
}
