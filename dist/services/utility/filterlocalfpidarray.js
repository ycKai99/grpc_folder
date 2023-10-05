"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLocalFPIDArray = void 0;
function filterLocalFPIDArray(data) {
    let arr = [];
    data.forEach(element => { arr.push(element['fpid']); });
    console.log('Fptemplate length : ', arr.length);
    return arr;
}
exports.filterLocalFPIDArray = filterLocalFPIDArray;
//# sourceMappingURL=filterlocalfpidarray.js.map