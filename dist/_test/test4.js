"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing4 = void 0;
const fs = require("fs");
const findPersonInPersonDataSet_1 = require("../fingerprint/_utility/findPersonInPersonDataSet");
async function testing4() {
    let messagesJSON = await fs.readFileSync("personFullData.json");
    let personData = JSON.parse(messagesJSON);
    // TEST CASE 1 : MALAYSIAN WITHOUT IC
    let personWithoutICToIdentify = {
        pers_id: '4331',
        pers_name: 'john smith',
        pers_new_ic: '',
        pers_sex: 'M',
        pers_code: 'W00011',
        pers_dob: '2000-01-01T00:00:00.000Z',
        pers_race: '00',
        pers_religion: null,
        pers_marital: 'S',
        pers_nationality: 'MY',
        orgn_code: 'AAAA',
        orgn_full_name: 'AAAA',
        emp_id: 3701,
        emp_employ_type: 'full',
        emp_number: 'MY00001352',
    };
    personData.push(personWithoutICToIdentify);
    let result1 = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personData, personWithoutICToIdentify);
    console.log("RESULT 1 : ", result1);
    // TEST CASE 2 : MALAYSIAN WITH IC
    let personWithICToIdentify = {
        pers_id: '4332',
        pers_name: 'jack ',
        pers_new_ic: '000000000012',
        pers_sex: 'M',
        pers_code: 'W00012',
        pers_dob: '2000-01-01T00:00:00.000Z',
        pers_race: '00',
        pers_religion: null,
        pers_marital: 'S',
        pers_nationality: 'MY',
        orgn_code: 'AAAA',
        orgn_full_name: 'AAAA',
        emp_id: 3702,
        emp_employ_type: 'full',
        emp_number: 'MY00002352',
    };
    personData.push(personWithICToIdentify);
    let result2 = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personData, personWithICToIdentify);
    console.log("RESULT 2 : ", result2);
    // TEST CASE 3 : FOREIGNER EMPLOYEE WITHOUT DOB
    let personWithoutDOBToIdentifyFW = {
        pers_id: '4334',
        pers_name: 'Sunny',
        pers_new_ic: '000000000012',
        pers_sex: 'M',
        pers_code: 'W00013',
        pers_dob: '',
        pers_race: '00',
        pers_religion: null,
        pers_marital: 'S',
        pers_nationality: 'SG',
        orgn_code: 'AAAA',
        orgn_full_name: 'AAAA',
        emp_id: 3703,
        emp_employ_type: 'full',
        emp_number: 'MY00003352',
    };
    personData.push(personWithoutDOBToIdentifyFW);
    let result3 = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personData, personWithoutDOBToIdentifyFW);
    console.log("RESULT 3 : ", result3);
    // TEST CASE 4 : FOREIGNER EMPLOYEE WITH DOB
    let personWithDOBToIdentifyFW = {
        pers_id: '4333',
        pers_name: 'Rick',
        pers_new_ic: '000000000012',
        pers_sex: 'M',
        pers_code: 'W00014',
        pers_dob: '2000-01-01T00:00:00.000Z',
        pers_race: '00',
        pers_religion: null,
        pers_marital: 'S',
        pers_nationality: 'SG',
        orgn_code: 'AAAA',
        orgn_full_name: 'AAAA',
        emp_id: 3704,
        emp_employ_type: 'full',
        emp_number: 'MY00004352',
    };
    personData.push(personWithDOBToIdentifyFW);
    let result4 = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personData, personWithDOBToIdentifyFW);
    console.log("RESULT 4 : ", result4);
    // TEST CASE 5 : RETURN NULL
    let nullFormat = {
        pers_id: '4334',
        pers_name: '',
        pers_new_ic: '000000000012',
        pers_sex: 'M',
        pers_code: 'W00015',
        pers_dob: '',
        pers_race: '00',
        pers_religion: null,
        pers_marital: 'S',
        pers_nationality: 'SG',
        orgn_code: 'AAAA',
        orgn_full_name: 'AAAA',
        emp_id: 3705,
        emp_employ_type: 'full',
        emp_number: 'MY00005352',
    };
    let result5 = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personData, nullFormat);
    console.log("RESULT 5 : ", result5);
}
exports.testing4 = testing4;
testing4();
//# sourceMappingURL=test4.js.map