/// <reference types="multer" />
import express from 'express';
import { AppService } from './app.service';
import { SampleDto } from './interfaces/sample.dto';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { FisCreateMessageUtility, FisReadDataUtility, MessageTypeProfile, DataTypeProfile } from './dependencies/DP/src/_interfaces/export';
export declare class AppController {
    private readonly appService;
    private readonly http;
    messageUtil: FisCreateMessageUtility;
    dataUtil: FisReadDataUtility;
    messageType: MessageTypeProfile;
    dataType: DataTypeProfile;
    constructor(appService: AppService, http: HttpService);
    sayHello(): {
        hello: string;
    };
    uploadFile(body: SampleDto, file: Express.Multer.File): {
        body: SampleDto;
        file: Express.Multer.File;
    };
    messageOperation(body: any): Promise<void>;
    dataOperation(body: any): Promise<any>;
    res_render(jadefile: any, res: any, jadeargument: any): any;
    getUploadFileManagement(req: any, res: any): any;
    getDownloadFileManagement(req: any, res: Response): Promise<express.Response<any, Record<string, any>>>;
    readData(entityname: string, entityUUID?: any): Promise<string>;
    writeData(entityname: string, payloadData: any): Promise<string>;
    startSynnchronization(body: any): Promise<void>;
    syncOperation(body: any): Promise<void>;
}
