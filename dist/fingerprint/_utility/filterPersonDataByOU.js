"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPersonDataByOU = void 0;
function filterPersonDataByOU(personData, accessibleOrgnData) {
    // Filter the items based on whether orgn_full_name exists in accessibleOrgnData
    let filteredData = personData.filter(item => accessibleOrgnData.some(accessibleItem => accessibleItem.class_code === item.orgn_code));
    return filteredData;
}
exports.filterPersonDataByOU = filterPersonDataByOU;
//# sourceMappingURL=filterPersonDataByOU.js.map