"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageBaseTransformer = void 0;
/**
 * App base message transformer.
 *
 * @class AppMessageBaseTransformer
 */
class AppMessageBaseTransformer {
    /**
     * Transform app base message.
     *
     * @class AppMessageBaseTransformer
     * @method transform
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
    transform(message) {
        return {};
    }
    /**
     * Validate app base message.
     *
     * @class AppMessageBaseTransformer
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message) {
        return true;
    }
}
exports.AppMessageBaseTransformer = AppMessageBaseTransformer;
//# sourceMappingURL=appmessagebasetransformer.js.map