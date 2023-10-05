"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITYNAME = exports.PROCESS_STATUS = exports.STAT = exports.DB = exports.URL_MOBILE_DEVICE = exports.URL_SYNC_REMOTE_DATA = exports.URL_GET_NEW_FPID = exports.URL_REGISTER_FP = exports.URL_GET_FP_TEMPLATE = exports.REMOTE_SERVER = exports.LOCATION_RELATION_FILE_PATH = exports.LOCATION_TAG_FILE_PATH = exports.RESPONSE_MESSAGE_FILE_PATH = exports.FINGERPRINT_TEMPLATE_FILE_PATH = exports.FINGERPRINT_FILE_PATH = exports.MESSAGE_FILE_PATH = exports.LOCATION_RELATION_FILE = exports.LOCATION_TAG_FILE = exports.IMAGE_FOLDER = exports.RESPONSE_MESSAGE_FILE = exports.MESSAGE_NOTIFICATION_FILE = exports.FINGERPRINT_TEMPLATE_DATA_FILE = exports.FINGERPRINT_DATA_FILE = exports.DIRECTORY = void 0;
exports.DIRECTORY = "localStorage";
exports.FINGERPRINT_DATA_FILE = "fingerprintData.json";
exports.FINGERPRINT_TEMPLATE_DATA_FILE = "fingerprintTemplateData.json";
exports.MESSAGE_NOTIFICATION_FILE = "registeredFingerprintMessage.json";
exports.RESPONSE_MESSAGE_FILE = "handleResponseMessage.json";
exports.IMAGE_FOLDER = "localStorage/images/";
exports.LOCATION_TAG_FILE = "locationtag.json";
exports.LOCATION_RELATION_FILE = "locationrelation.json";
exports.MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.MESSAGE_NOTIFICATION_FILE;
exports.FINGERPRINT_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_DATA_FILE;
exports.FINGERPRINT_TEMPLATE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_TEMPLATE_DATA_FILE;
exports.RESPONSE_MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.RESPONSE_MESSAGE_FILE;
exports.LOCATION_TAG_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_TAG_FILE;
exports.LOCATION_RELATION_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_RELATION_FILE;
exports.REMOTE_SERVER = process.env.REMOTE_SERVER;
exports.URL_GET_FP_TEMPLATE = exports.REMOTE_SERVER + "fptemplate";
exports.URL_REGISTER_FP = exports.REMOTE_SERVER + "registerfp";
exports.URL_GET_NEW_FPID = exports.REMOTE_SERVER + "getNewFPId";
exports.URL_SYNC_REMOTE_DATA = exports.REMOTE_SERVER + "syncRemoteData";
exports.URL_MOBILE_DEVICE = "http://192.168.100.54:8080";
var DB;
(function (DB) {
    DB["FILE"] = "file";
    DB["MONGO"] = "mongo";
})(DB = exports.DB || (exports.DB = {}));
var STAT;
(function (STAT) {
    STAT["ONLINE"] = "online";
    STAT["OFFLINE"] = "offline";
})(STAT = exports.STAT || (exports.STAT = {}));
var PROCESS_STATUS;
(function (PROCESS_STATUS) {
    PROCESS_STATUS["NEW_FINGERPRINT"] = "new fingerprint";
    PROCESS_STATUS["UNREGISTER_FINGERPRINT"] = "unregister fingerprint";
    PROCESS_STATUS["REGISTERED_FINGERPRINT"] = "registered fingerprint";
    PROCESS_STATUS["VERIFIED_FINGERPRINT"] = "verified fingerprint";
})(PROCESS_STATUS = exports.PROCESS_STATUS || (exports.PROCESS_STATUS = {}));
var ENTITYNAME;
(function (ENTITYNAME) {
    ENTITYNAME["FP_TEMPLATE_MSG"] = "fingerprintTemplateData";
    ENTITYNAME["EVENT_MSG"] = "eventMessage";
    ENTITYNAME["LOCATION_TAG_MSG"] = "locationTag";
    ENTITYNAME["LOCATION_REL_MSG"] = "locationRelation";
    ENTITYNAME["GENERICDATA"] = "genericData";
    ENTITYNAME["DEVICE_TAG_MSG"] = "deviceTag";
    ENTITYNAME["PERSON_PROF_MSG"] = "personProfile";
    ENTITYNAME["CALENDAR"] = "icalendar";
    ENTITYNAME["EVENT"] = "ievent";
    ENTITYNAME["EVENTINCALENDAR"] = "eventInCalendarInformation";
    ENTITYNAME["FINGERPRINTLOGINACCESS"] = "fingerprintLoginAccess";
    ENTITYNAME["PERSONPHOTO"] = "PERSONPHOTO";
    ENTITYNAME["AUTHENTICATIONLOG"] = "AUTHENTICATIONLOG";
    ENTITYNAME["AUTHENTICATIONLOGBYPAYMENTCOLLECTION"] = "AUTHENTICATIONLOGBYPAYMENTCOLLECTION";
    ENTITYNAME["AUTHENTICATION_LOG_EXTENSION"] = "authenticationLogExtension";
})(ENTITYNAME = exports.ENTITYNAME || (exports.ENTITYNAME = {}));
//# sourceMappingURL=constsetting.js.map