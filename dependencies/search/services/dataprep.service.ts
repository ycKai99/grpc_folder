import mongoose, { Model, Mongoose } from "mongoose";
import { Observable, Subject } from "rxjs";
import * as fs from 'fs'
import { StorageLocation } from "../types/interface";


export class DataPrepService {

    private MongooseConnection : mongoose.Connection
    private connectionStatus = 0

    // Data preparations: Purely Observables
    public loadObsData(storage: StorageLocation, dataFromStorage: Subject<any>) {
        if (storage.type == `File`) {
            this.streamFileData(storage, dataFromStorage)
        } else {
            this.streamMongoData(storage, dataFromStorage)
        }
    }

    private streamMongoData(storage: StorageLocation, subjectStream: Subject<any>) {
        this.connectMongo(storage).then(() => {
            let message: Model<any> = this.MongooseConnection.model('Message', require('../types/message.schema'))
            let stream = message.find().cursor()
    
            stream.on('data', (data: any) => subjectStream.next(data));
            stream.on('error', (error) => subjectStream.error(error));
            stream.on('end', () => subjectStream.complete());
        })
    }

    private streamFileData(storage: StorageLocation, dataFromStorage: Subject<any>) {
        let data = fs.readFileSync(storage.url, 'utf-8')
        let dataJson = JSON.parse(data)
        let count = 0
        const intervalId = setInterval(() => {
            dataFromStorage.next(dataJson[count]);
            count++;
            if (count >= 100) {
                clearInterval(intervalId);
                dataFromStorage.complete();
            }
        }, 100)

    }

    // Conect to designated storage destination
    private async connectMongo(storage: StorageLocation) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Connecting to ${storage.url}`)
                this.MongooseConnection = mongoose.createConnection(storage.url)
                this.connectionStatus = 1
                resolve(this.connectionStatus)
            }
            catch(error) {
                this.connectionStatus = 0
                console.error('An error occurred while connecting to the database:', error);
                setTimeout(() => {
                    this.connectMongo(storage).then(() => {
                        resolve(this.connectionStatus)
                    })
                    console.log(`Reconnecting...`)
                }, 3000);
            }
        })
    }
}

