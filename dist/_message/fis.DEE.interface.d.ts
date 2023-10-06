import { NotificationHeader, NotificationMessage } from "../_dependencies/DP/src/interface/export";
export interface DatabaseNotificationHeader extends NotificationHeader {
    messageDestination?: {
        DataSource?: string;
    };
}
export interface DatabaseNotificationMessage extends NotificationMessage {
    data: any;
    header: DatabaseNotificationHeader;
}
