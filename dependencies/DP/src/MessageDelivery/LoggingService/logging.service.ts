import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  LoggingServiceInterface,
  LogSetting,
  LogType,
} from '../../_interfaces/Logging.interface';
import {
  BaseMessage,
  Uuid,
} from '../../_dependencies/FISAppMessageJSUtility/interface/export';

@Injectable()
export class LoggingService
  extends ConsoleLogger
  implements LoggerService, NestInterceptor, LoggingServiceInterface
{
  protected isLogAllMessages: boolean = true;
  protected uuidgenerator: Uuid = new Uuid();
  protected buffer: LogType[] = []; // Default buffer
  protected defaultDataTags: string[] = ['Standard Tag For Logging'];
  protected settings: LogSetting;

  constructor(context: string) {
    super(context);

    this.init({
      storage: process.env.storage || 'File',
    });

    if (context > '') {
      this.overrideDefaultTags([context]);
    }

    return this;
  }

  /**
   * Set if want to log all messages
   *
   * @param {boolean} logAll set to true to log all messages. Default is true.
   */
  public setLogAll(logAll: boolean) {
    this.isLogAllMessages = logAll;
  }

  /**
   * Set to change default process tag
   *
   * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  public overrideDefaultTags(tags: string[]) {
    this.defaultDataTags = tags;
  }

  /**
   * Append to default process tag
   *
   * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  public appendDefaultTags(tags: string[]) {
    this.defaultDataTags = this.defaultDataTags.concat(tags);
  }

  /**
   * Intercept execution contect to add to log
   *
   * @param {ExecutionContext} context Execution context.
   * @param {CallHandler} next Next function called.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Add the request to log
    let req = context.switchToHttp().getRequest();
    this.addToLog(req, ['request']);

    // Proceed with handling the next event
    let handledObservable: Observable<any> = next.handle();

    // Subscribe response stream to log
    this.subscribeToLog(handledObservable, ['response']);

    return handledObservable;
  }

  /**
   * Subscribe and add to Log
   *
   * @param {Observable<any>} newObservable to subscribe and add to log
   */
  public subscribeToLog(
    newObservable: Observable<any>,
    dataTags: string[] = [],
  ) {
    // Subscribe and add to Log
    newObservable.subscribe({
      next: (msg: any) => {
        this.addToLog(msg, dataTags);
      },
      error: (err) => {
        console.log(err.message, dataTags);
      },
      complete: () => {},
    });
  }

  /**
   * Add a message to log at key.
   *
   * @param {string|BaseMessage} message Message format compliants to FisApp
   * @param {string[]} dataTags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  public addToLog(message: string | BaseMessage, dataTags: string[] = []) {
    let isAddToDefaultLog: boolean = true;
    let key: string = '';

    // Create key either from message id
    if (!message) {
    } else {
      if (!message['header']) {
      } else {
        if (!message['header']['messageID']) {
        } else {
          key = (<BaseMessage>message).header.messageID;
        }
      }
    }

    // or create key generate from uuid
    if (key > '') {
    } else {
      key = this.uuidgenerator.generateId();
    }

    // Process and add to log
    if (isAddToDefaultLog) {
      // get data
      let messageData: object = message as object;

      while (messageData['data']) {
        messageData = messageData['data'] as object;
      }

      // get all tags
      let tags: string[] = [];

      // check default tag
      if (this.defaultDataTags && this.defaultDataTags.length > 0) {
        tags = tags.concat(this.defaultDataTags);
      }

      // check current tag
      if (dataTags && dataTags.length > 0) {
        tags = tags.concat(dataTags);
      }

      // Create new message
      let newMessage: LogType = {
        id: key,
        data: message,
        date: new Date(), // This is the received date
        dataTags: tags,
      };

      this.buffer.push(newMessage);
    }

    return key;
  }

  /**
   * Check if  a key existed
   *
   * @param {string} key Key that you want to check
   */
  public checkExisted(key: string): boolean {
    let returnBool = false;

    this.buffer.forEach((log: LogType) => {
      if (log.id == key || returnBool == true) {
        returnBool = true;
      }
    });

    return returnBool;
  }

  /**
   * Find all log records
   *
   */
  public getLogs(): LogType[] {
    return this.buffer;
  }

  /**
   * Setup.
   *
   * @param {LogSetting} settings Settings for storage and buffer.
   */
  public init(settings: LogSetting): void {
    this.settings = settings;
  }

  /**
   * Find log records with id, date or tag
   *
   * @param {{id:string}|{date:string}|{tag:string}} search Set search.id to find id/key. Set search.date to find a specific date. Set search.tag to find a specific tag.
   */
  public findLogs(
    search: { id: string } | { date: string } | { tag: string },
  ): LogType[] {
    // This is a simple implementation without storage
    let foundLog: LogType[] = [];

    this.buffer.forEach((log: LogType) => {
      if (search['id']) {
        if (log.id == search['id']) {
          foundLog.push(log);
        }
      }

      if (search['date']) {
        if (log.date == search['date']) {
          foundLog.push(log);
        }
      }

      if (search['tag']) {
        if (log.dataTags.includes(search['tag'])) {
          foundLog.push(log);
        }
      }
    });

    return foundLog;
  }

  /**
   * Write a 'log' level log.
   * @param {string|BaseMessage} message Message format compliants to FisApp
   * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  log(message: string | BaseMessage, ...optionalParams: any[]) {
    if (optionalParams['tags']) {
      optionalParams['tags'].push('log');
    }

    // Add the message to log
    this.addToLog(message, optionalParams['tags']);

    return super.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   * @param {string|BaseMessage} message Message format compliants to FisApp
   * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  error(message: any, ...optionalParams: any[]) {
    if (optionalParams['tags']) {
      optionalParams['tags'].push('error');
    }

    // Add the message to log
    this.addToLog(message, optionalParams['tags']);

    return super.log(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   * @param {string|BaseMessage} message Message format compliants to FisApp
   * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
   */
  warn(message: any, ...optionalParams: any[]) {
    if (optionalParams['tags']) {
      optionalParams['tags'].push('warn');
    }

    // Add the message to log
    this.addToLog(message, optionalParams['tags']);

    return super.log(message, ...optionalParams);
  }
}
