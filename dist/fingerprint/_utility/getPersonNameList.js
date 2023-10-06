"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonNameList = void 0;
function getPersonNameList(personFullDataName) {
    // Filtering by person name at the audit message service.
    let personNameList;
    personNameList = personFullDataName.map((person) => person.pers_name);
    return personNameList;
}
exports.getPersonNameList = getPersonNameList;
//# sourceMappingURL=getPersonNameList.js.map