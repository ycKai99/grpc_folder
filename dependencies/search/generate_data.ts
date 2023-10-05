import * as fs from "fs"
import { faker } from '@faker-js/faker';

let GigaPayload: any[] = []
let tags = ['free', 'basic', 'business', 'enterprise', 'rich', 'super-rich', 'mega-rich', 'empire'];

export function createMessage(): any {
  return {
    header: {
      messageType: "Command",
      messageID: faker.datatype.uuid(),
      messageName: faker.word.adjective(),
      dateCreated: faker.date.recent(),
      isAggregated: faker.datatype.boolean(),
      servicecId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      requesterId: faker.datatype.uuid(),
      messagePreoducerInformation: {
        origin: {
          userApplication: {
            userAppId: faker.finance.accountName(),
            userAppName: faker.name.jobTitle()
          }
        },
        components: faker.word.adverb()
      },
      security: {
        ucpid: faker.datatype.uuid()
      },
      messageDataLocation: {
        isEmbaded: faker.datatype.boolean()
      },
      messageDataFormat: {
        dataFormate: faker.datatype.json()
      },
      requestExecutiomNode: faker.datatype.number(),
      requestTimeOut: faker.datatype.number(),
      command: faker.word.adjective()
    },
    data: {
      header: faker.datatype.uuid(),
      data: {
        appLogLocId: faker.datatype.uuid(),
        appData: {
          msgId: faker.datatype.uuid(),
          msgLogDateTime: faker.date.past(),
          msgDateTime: faker.date.past(),
          msgTag: faker.helpers.arrayElements(tags, 3),
          msgPayload: faker.lorem.sentences()
        }
      }
    }

  }

}


Array.from({ length: 100 }).forEach(() => {
  GigaPayload.push(createMessage());
});


fs.writeFileSync('payload.json', JSON.stringify(GigaPayload))

