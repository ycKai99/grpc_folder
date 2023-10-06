export declare type ServerUCP = {
    ucpId: string;
};
export declare type SubscriptionData = {
    subscriptionId: string;
};
export declare type UserSessionsData = {
    sessions: UserSessionData[];
};
export declare type UserSessionData = {
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
        }
    ];
};
export declare type ServiceProvidersData = {
    providers: ServiceProviderData[];
};
export declare type ServiceProviderData = {
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
export declare type ServiceProviderCredentials = {
    name: string;
    secret: string;
    isRoot?: boolean;
    instanceId?: string;
    singleton?: boolean;
    url?: string;
};
export declare type RequestMessageData = {
    header: Record<string, unknown>;
    data: any;
};
export declare type ResponseMessageData = {
    header: Record<string, unknown>;
    data: any;
};
export declare type DefaultQueryDataItem = {
    queryName: string;
    queryString: string;
};
export declare type DefaultQueryData = {
    data: DefaultQueryDataItem[];
};
