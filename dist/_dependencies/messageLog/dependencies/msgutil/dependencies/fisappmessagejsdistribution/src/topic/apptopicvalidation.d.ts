/*!
 * fisapptopicjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicBase } from './apptopictype';
/**
 * App topic validations.
 *
 */
/**
 * Validate app topic.
 *
 * @function validateTopic
 * @param topic {Topic} - Topic.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateTopic(topic: Topic): boolean;
/**
 * App topic base validations.
 *
 */
/**
 * Validate app topic base .
 *
 * @function validateTopicBase
 * @param topic {TopicBase} - Topic.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateTopicBase(topic: TopicBase): boolean;
