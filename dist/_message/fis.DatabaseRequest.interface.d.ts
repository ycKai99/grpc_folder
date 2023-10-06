import { CommandHeader, CommandMessage } from "../_dependencies/DP/src/interface/export";
export interface DatabaseFisCommandHeader extends CommandHeader {
    messageDestination?: {
        DataSource?: string;
    };
}
export interface DatabaseFisAppRequestMessage extends CommandMessage {
    header: DatabaseFisCommandHeader;
}
