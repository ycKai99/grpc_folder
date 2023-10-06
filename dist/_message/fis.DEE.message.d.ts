import { FisCreateMessageUtility } from "../_dependencies/DP/src/interface/export";
import { DatabaseNotificationMessage } from "./fis.DEE.interface";
export declare class FisDEEMessageHelper extends FisCreateMessageUtility {
    getNotificationMessage(ucpId: string, command: any, data?: any, messageName?: string, DataSource?: string): DatabaseNotificationMessage;
}
