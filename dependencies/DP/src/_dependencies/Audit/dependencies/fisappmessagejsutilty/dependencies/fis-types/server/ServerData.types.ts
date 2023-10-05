
export type ServerUCP = {
  ucpId: string;
};

export type SubscriptionData = {
  subscriptionId: string;
};

export type UserSessionsData = {
  sessions: UserSessionData[];
};

export type UserSessionData = {
  id: string;
  token?: string;
  lastActionOn: string;
  timeout: number;
  connections: [
    {
      isDone: boolean;
      client: {
        transport: string;
        clientIp: string;
      };
    },
  ];
};

export type ServiceProvidersData = {
  providers: ServiceProviderData[];
};

export type ServiceProviderData = {
  id: string;
  name: string;
  status: string;
  lastActionOn: Date;
  isRoot?: boolean;
  instanceId?: string;
  singleton?: boolean;
  databaseSourceName?: string;
  url?: string;
};

export type ServiceProviderCredentials = {
  name: string;
  secret: string;
  isRoot?: boolean;
  instanceId?: string;
  singleton?: boolean;
  url?: string;
};

export type RequestMessageData = {
  header: Record<string, unknown>;
  data: any;
};

export type ResponseMessageData = {
  header: Record<string, unknown>;
  data: any;
};

export type DefaultQueryDataItem = {
  queryName: string;
  queryString: string;
};

export type DefaultQueryData = {
  data: DefaultQueryDataItem[];
};
