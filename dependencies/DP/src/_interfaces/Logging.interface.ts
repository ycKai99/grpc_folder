import { BaseMessage } from '../_dependencies/FISAppMessageJSUtility/interface/export';

// Type of log record
export interface LogType {
  id: string; // Record unique ID
  date: Date; // Date time when the data is logged
  data: string | BaseMessage; // Data to log
  dataTags: string[]; // Tags for the data
}

// Type of log setting
export interface LogSetting {
  // Type of log storage. Default is "File" which means that the log messages are saved to file.
  storage: string;
}

export interface LoggingServiceInterface {
  // Set log setting
  init(settings: LogSetting): void;

  // Log a message to current buffer and storage system. If id provided, return same id, else return a generated id.
  addToLog(message: string | BaseMessage, processTags: string[]): string;

  // First, find the message from current running buffer using id.
  // If cannot find from buffer, try find from storage and add the found record to buffer.
  // When done, return the found record.
  findLogs(
    search: { id: string } | { date: string } | { tag: string },
  ): LogType[];
}
