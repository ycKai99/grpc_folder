"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPrepService = void 0;
const mongoose_1 = require("mongoose");
const fs = require("fs");
class DataPrepService {
    constructor() {
        this.connectionStatus = 0;
    }
    loadObsData(storage, dataFromStorage) {
        if (storage.type == `File`) {
            this.streamFileData(storage, dataFromStorage);
        }
        else {
            this.streamMongoData(storage, dataFromStorage);
        }
    }
    streamMongoData(storage, subjectStream) {
        this.connectMongo(storage).then(() => {
            let message = this.MongooseConnection.model('Message', require('../types/message.schema'));
            let stream = message.find().cursor();
            stream.on('data', (data) => subjectStream.next(data));
            stream.on('error', (error) => subjectStream.error(error));
            stream.on('end', () => subjectStream.complete());
        });
    }
    streamFileData(storage, dataFromStorage) {
        let data = fs.readFileSync(storage.url, 'utf-8');
        let dataJson = JSON.parse(data);
        let count = 0;
        const intervalId = setInterval(() => {
            dataFromStorage.next(dataJson[count]);
            count++;
            if (count >= 100) {
                clearInterval(intervalId);
                dataFromStorage.complete();
            }
        }, 100);
    }
    async connectMongo(storage) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Connecting to ${storage.url}`);
                this.MongooseConnection = mongoose_1.default.createConnection(storage.url);
                this.connectionStatus = 1;
                resolve(this.connectionStatus);
            }
            catch (error) {
                this.connectionStatus = 0;
                console.error('An error occurred while connecting to the database:', error);
                setTimeout(() => {
                    this.connectMongo(storage).then(() => {
                        resolve(this.connectionStatus);
                    });
                    console.log(`Reconnecting...`);
                }, 3000);
            }
        });
    }
}
exports.DataPrepService = DataPrepService;
//# sourceMappingURL=dataprep.service.js.map