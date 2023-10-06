/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, Command, Query, Subscription } from '../../types/appmessagetype';
/**
 * Request message parameter.
 * Consists of:
 *  Base message parameter.
 *  Resquest time out.
 *  To execute after a specified certain time(since message created).
 *
 * @interface RequestMessageParameter
 */
export interface RequestMessageParameter extends MessageParameter {
    /**
     * If not completed within stipulated time (since message created)
     * then cancel request. Time out in milli seconds.
     * 0 - no time out.
     *
     * @interface RequestMessageParameter
     * @property resquestTimeOut
     * @type {number}
     */
    resquestTimeOut?: number;
    /**
     * To execute after a specified certain time(since message created).
     * 0 as immediate.
     * -1 as batch queue.
     *
     * @interface RequestMessageParameter
     * @property requestExecutionMode
     * @type {number}
     */
    requestExecutionMode?: number;
}
/**
 * Command message parameter.
 * Consists of:
 *  Request message parameter.
 *  Command.
 *
 * @interface CommandMessageParameter
 */
export interface CommandMessageParameter extends RequestMessageParameter {
    /**
     * Command to perform.
     *
     * @interface CommandMessageParameter
     * @property command
     * @type {Command}
     */
    command: Command;
}
/**
 * Query message parameter.
 * Consists of:
 *  Request message parameter.
 *  Query.
 *
 * @interface QueryMessageParameter
 */
export interface QueryMessageParameter extends RequestMessageParameter {
    /**
     * Query to perform.
     *
     * @interface QueryMessageParameter
     * @property query
     * @type {Query}
     */
    query: Query;
}
/**
 * Subscription message parameter.
 * Consists of:
 *  Request message parameter.
 *  Subscription type.
 *  Effect date time when to start subscribing. Default is right now.
 *  Effect date time when to end subscribing. Default is forever.
 *
 * @interface SubscriptionMessageParameter
 */
export interface SubscriptionMessageParameter extends RequestMessageParameter {
    /**
     * Subscription type.
     *
     * @interface SubscriptionMessageParameter
     * @property subscription
     * @type {Subscription}
     */
    subscription: Subscription;
    /**
     * Effect date time when to start subscribing..
     *
     * @interface SubscriptionMessageParameter
     * @property startSubscribingDateTime
     * @type {Date | string}
     */
    startSubscribingDateTime: Date | string;
    /**
     * Effect date time when to end subscribing..
     *
     * @interface SubscriptionMessageParameter
     * @property endSubscribingDateTime
     * @type {Date | string}
     */
    endSubscribingDateTime: Date | string;
}
