import { EmployeeData } from '../data/EmployeeData.types';
import {
  FisServiceProgram,
  GenericData,
  NotificationMicroserviceData,
  OrganisationProfile,
  ProductProfile,
  RequestMessageData,
  ResponseMessageData,
  RoleTypeProfile,
  ServiceProgram,
  ServiceProvidersData,
  UserSessionsData,
  LeaveBalance,
  LeaveHistory,
  LeaveTypeProfile,
  EntityData,
} from '../interface/export';

import {
  SampleData,
  MetaData,
  EditStatus,
  GenericFisData,
  Document,
} from '../interface/export';
import {
  NotificationData,
  NotificationException,
  DatabaseNotificationData,
} from '../interface/export';
import { ServerUCP, SubscriptionData } from '../interface/export';
import { StatusResponse, StatusException } from '../interface/export';
import { SummaryResponse } from '../interface/export';
import { AccountProfile } from '../interface/export';

// All type must be declared here
type declaredDataTypeFormatList = {
  NotificationData: NotificationData;
  NotificationException: NotificationException;
  NotificationMicroserviceData: NotificationMicroserviceData;
  ServerUCP: ServerUCP;
  SubscriptionData: SubscriptionData;
  UserSessionsData: UserSessionsData;
  ServiceProvidersData: ServiceProvidersData;
  StatusResponse: StatusResponse;
  StatusException: StatusException;
  GenericData: GenericData;
  SummaryResponse: SummaryResponse;
  DatabaseNotificationData: DatabaseNotificationData;
  RequestMessageData: RequestMessageData;
  ResponseMessageData: ResponseMessageData;

  // data types
  AccountProfile: AccountProfile;
  Document: Document;
  EditStatus: EditStatus;
  FisServiceProgram: FisServiceProgram;
  GenericFisData: GenericFisData;
  MetaData: MetaData;
  OrganisationProfile: OrganisationProfile;
  ProductProfile: ProductProfile;
  RoleTypeProfile: RoleTypeProfile;
  SampleData: SampleData;
  ServiceProgram: ServiceProgram;
  LeaveBalance: LeaveBalance;
  LeaveHistory: LeaveHistory;
  LeaveTypeProfile: LeaveTypeProfile;
  EntityData: EntityData;
  EmployeeData: EmployeeData;
};

type AtLeastOne<Obj, Keys = keyof Obj> = Keys extends keyof Obj
  ? Pick<Obj, Keys>
  : never;
type pickedDataTypeFormatList = {
  [P in keyof declaredDataTypeFormatList]: declaredDataTypeFormatList[P];
};
export type DataTypeFormat = AtLeastOne<pickedDataTypeFormatList>;

//// Test sample
// const aa:DataTypeFormat= {
//     "SampleData":{
//         "id":"a",
//         "code":"a"
//     }
// }
