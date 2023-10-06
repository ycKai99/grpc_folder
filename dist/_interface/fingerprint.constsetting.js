"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FP_POSITION = exports.LOCATION_RELATION_FILE_PATH = exports.LOCATION_TAG_FILE_PATH = exports.RESPONSE_MESSAGE_FILE_PATH = exports.FINGERPRINT_TEMPLATE_FILE_PATH = exports.FINGERPRINT_FILE_PATH = exports.MESSAGE_FILE_PATH = exports.LOCATION_RELATION_FILE = exports.LOCATION_TAG_FILE = exports.IMAGE_FOLDER = exports.RESPONSE_MESSAGE_FILE = exports.MESSAGE_NOTIFICATION_FILE = exports.FINGERPRINT_TEMPLATE_DATA_FILE = exports.FINGERPRINT_DATA_FILE = exports.DIRECTORY = void 0;
exports.DIRECTORY = "localStorage";
exports.FINGERPRINT_DATA_FILE = "fingerprintData.json";
exports.FINGERPRINT_TEMPLATE_DATA_FILE = "fingerprintTemplateData.json";
exports.MESSAGE_NOTIFICATION_FILE = "registeredFingerprintMessage.json";
exports.RESPONSE_MESSAGE_FILE = "handleResponseMessage.json";
exports.IMAGE_FOLDER = "localStorage/images/";
exports.LOCATION_TAG_FILE = "locationtag.json";
exports.LOCATION_RELATION_FILE = "locationrelation.json";
// file full path
exports.MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.MESSAGE_NOTIFICATION_FILE;
exports.FINGERPRINT_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_DATA_FILE;
exports.FINGERPRINT_TEMPLATE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_TEMPLATE_DATA_FILE;
exports.RESPONSE_MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.RESPONSE_MESSAGE_FILE;
exports.LOCATION_TAG_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_TAG_FILE;
exports.LOCATION_RELATION_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_RELATION_FILE;
var FP_POSITION;
(function (FP_POSITION) {
    FP_POSITION["LEFT_PINKY"] = "left-pinky";
    FP_POSITION["LEFT_RING"] = "left-ring";
    FP_POSITION["LEFT_MIDDLE"] = "left-middle";
    FP_POSITION["LEFT_INDEX"] = "left-index";
    FP_POSITION["LEFT_THUMB"] = "left-thumb";
    FP_POSITION["RIGHT_THUMB"] = "right-thumb";
    FP_POSITION["RIGHT_INDEX"] = "right-index";
    FP_POSITION["RIGHT_MIDDLE"] = "right-middle";
    FP_POSITION["RIGHT_RING"] = "right-ring";
    FP_POSITION["RIGHT_PINKY"] = "right-pinky";
})(FP_POSITION = exports.FP_POSITION || (exports.FP_POSITION = {}));
//# sourceMappingURL=fingerprint.constsetting.js.map