"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPersonInPersonDataSet = void 0;
// Find matching personData in personDataArray and return matched personData record.
function findPersonInPersonDataSet(personDataSet, personToIdentify) {
    // DECLARATION
    let result = null;
    let personDataArray = personDataSet;
    // CURRENTLY NO PASSPORT, MANUALLY SET THE VALUE
    let personDataSetPassport = "";
    let personToIdentifyPassport = "";
    // NATIONALITY = MALAYSIAN (MY)
    if (personToIdentify.pers_nationality === "MY") {
        console.log("NATIONALITY -> MALAYSIAN");
        // IF GOT IC, filtered by person name, nationality, ic, organisation code
        if (personToIdentify.pers_new_ic && personToIdentify.pers_new_ic !== null) {
            console.log("MALAYSIAN : GOT IC");
            result = personDataArray.filter(x => {
                if (x.pers_name === personToIdentify.pers_name &&
                    x.pers_nationality === personToIdentify.pers_nationality &&
                    x.pers_new_ic === personToIdentify.pers_new_ic //&& 
                //x.orgn_code === personToIdentify.orgn_code
                ) {
                    return x;
                }
            });
        }
        // WITHOUT IC, filtered by person name, nationality
        else {
            console.log("MALAYSIAN : NO IC");
            result = personDataArray.filter(x => {
                if (x.pers_name === personToIdentify.pers_name &&
                    x.pers_nationality === personToIdentify.pers_nationality) {
                    return x;
                }
            });
        }
    }
    // NATIONALITY = FOREIGN WORKER (FW)
    else {
        console.log("NATIONALITY -> FOREIGN WORKER");
        result = personDataArray.filter(x => {
            if (x.pers_name === personToIdentify.pers_name &&
                x.pers_nationality === personToIdentify.pers_nationality &&
                x.pers_sex === personToIdentify.pers_sex) {
                return x;
            }
        });
        // Checking for passport only, does not affect search logic
        if (result.length !== 0) {
            if (!personToIdentifyPassport) {
                console.log("FOREIGN WORKER : NO PASSPORT");
            }
        }
        // WITH DOB
        if (personToIdentify.pers_dob && personToIdentify.pers_dob !== null) {
            console.log('FOREIGN WORKER : GOT DOB');
            result = personDataArray.filter(x => {
                if (x.pers_name === personToIdentify.pers_name &&
                    x.pers_dob === personToIdentify.pers_dob &&
                    //x.orgn_code === personToIdentify.orgn_code && 
                    personDataSetPassport === personToIdentifyPassport) {
                    return x;
                }
            });
        }
        // WITHOUT DOB
        else {
            console.log('FOREIGN WORKER : NO DOB');
            result = personDataArray.filter(x => {
                if (x.pers_name === personToIdentify.pers_name &&
                    //x.orgn_code === personToIdentify.orgn_code && 
                    personDataSetPassport === personToIdentifyPassport) {
                    return x;
                }
            });
        }
    }
    if (result.length === 0) {
        result = {};
    }
    else {
        // result = result[0]
    }
    return result;
}
exports.findPersonInPersonDataSet = findPersonInPersonDataSet;
//# sourceMappingURL=findPersonInPersonDataSet.js.map