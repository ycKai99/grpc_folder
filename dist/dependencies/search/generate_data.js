"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const fs = require("fs");
const faker_1 = require("@faker-js/faker");
let GigaPayload = [];
let tags = ['free', 'basic', 'business', 'enterprise', 'rich', 'super-rich', 'mega-rich', 'empire'];
function createMessage() {
    return {
        header: {
            messageType: "Command",
            messageID: faker_1.faker.datatype.uuid(),
            messageName: faker_1.faker.word.adjective(),
            dateCreated: faker_1.faker.date.recent(),
            isAggregated: faker_1.faker.datatype.boolean(),
            servicecId: faker_1.faker.datatype.uuid(),
            userId: faker_1.faker.datatype.uuid(),
            requesterId: faker_1.faker.datatype.uuid(),
            messagePreoducerInformation: {
                origin: {
                    userApplication: {
                        userAppId: faker_1.faker.finance.accountName(),
                        userAppName: faker_1.faker.name.jobTitle()
                    }
                },
                components: faker_1.faker.word.adverb()
            },
            security: {
                ucpid: faker_1.faker.datatype.uuid()
            },
            messageDataLocation: {
                isEmbaded: faker_1.faker.datatype.boolean()
            },
            messageDataFormat: {
                dataFormate: faker_1.faker.datatype.json()
            },
            requestExecutiomNode: faker_1.faker.datatype.number(),
            requestTimeOut: faker_1.faker.datatype.number(),
            command: faker_1.faker.word.adjective()
        },
        data: {
            header: faker_1.faker.datatype.uuid(),
            data: {
                appLogLocId: faker_1.faker.datatype.uuid(),
                appData: {
                    msgId: faker_1.faker.datatype.uuid(),
                    msgLogDateTime: faker_1.faker.date.past(),
                    msgDateTime: faker_1.faker.date.past(),
                    msgTag: faker_1.faker.helpers.arrayElements(tags, 3),
                    msgPayload: faker_1.faker.lorem.sentences()
                }
            }
        }
    };
}
exports.createMessage = createMessage;
Array.from({ length: 100 }).forEach(() => {
    GigaPayload.push(createMessage());
});
fs.writeFileSync('payload.json', JSON.stringify(GigaPayload));
//# sourceMappingURL=generate_data.js.map