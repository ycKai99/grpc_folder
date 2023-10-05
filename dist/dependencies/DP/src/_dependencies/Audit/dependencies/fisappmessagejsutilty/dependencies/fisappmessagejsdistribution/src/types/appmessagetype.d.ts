import { MessageHeader, UserInterfaceComponentTypes, FisAppServerComponents, SystemServers } from './fisappmessageschema';
export * from './fisappmessageschema';
export * from './appcommontype';
export * from './messageparameter';
export interface ModuleProfile {
    alias: string;
    module: string;
    objectName: string;
}
export interface AppMessageHeaderOptions {
    permissibleMessageType?: object;
    validator?: Function;
}
export interface AppResponseMessageHeaderOptions extends AppMessageHeaderOptions {
    permissibleRespondToMessageType?: object;
}
export type GenericHeader = Record<string, unknown>;
export type GenericHeaderOf<T> = {
    [P in keyof T]: T[P];
};
export type Header = MessageHeader & GenericHeader;
export type Component = UserInterfaceComponentTypes | FisAppServerComponents | SystemServers;
