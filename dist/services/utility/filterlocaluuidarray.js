"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLocalUUIDArray = void 0;
function filterLocalUUIDArray(data) {
    let arr = [];
    let uuid;
    data.forEach((item) => {
        if (item.entityName === "personprofile") {
            uuid = item.fileData.pers_id;
        }
        else {
            uuid = item.fileData.uuid;
        }
        arr.push(uuid);
    });
    return arr;
}
exports.filterLocalUUIDArray = filterLocalUUIDArray;
//# sourceMappingURL=filterlocaluuidarray.js.map