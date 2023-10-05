import { ExceptionData } from '../exception/ExceptionData';

export type NotificationData = {
  type?: string;
  message: string;
  appId?: string;
  url?: string;
};

export type NotificationException = NotificationData & ExceptionData;

export type NotificationMicroserviceData = NotificationData & {
  msMessage?: {};
  uiMessage?: {};
  scope?: {};
};

export type DatabaseNotificationData = NotificationData & {
  InstanceID: string; // TM Instance ID
  EntityTypeID: string; // TM service ID
  EntityTypeName: string; // TM service name
  ID: string; // TM person ID or TM Doc Id
  Code: string; // TM Doc reference no. (if any) or person Code
  Operation: string; // TM command such as savetransaction etc
  ReceivedDate: Date; // Message received date
};
/*
const test: DatabaseNotificationData = {
  message: 'DatabaseNotificationData',
  ReceivedDate: new Date('2022-03-02T02:53:01.939Z'),
  InstanceID: '5DAFE5A70BE34AE5C19E65B420D02BB7',
  EntityTypeID: 'Service Program',
  EntityTypeName: 'Service Program',
  ID: '',
  Code: '',
  Operation: 'Modify',
};

const test2: DatabaseNotificationData = {
  message: 'DatabaseNotificationData',
  ReceivedDate: new Date('2022-06-16T04:13:44.436Z'),
  InstanceID: '6BFFA7B807AC4BC94099C6DF64971E79',
  EntityTypeID: 'Purchase Requisition',
  EntityTypeName: 'Purchase Requisition',
  ID: '51308',
  Code: 'ABC/UQ/2010/10/00003',
  Operation: 'Modify',
};
*/
