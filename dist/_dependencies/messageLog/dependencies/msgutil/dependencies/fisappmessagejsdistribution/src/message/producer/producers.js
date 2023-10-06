"use strict";
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemServer = exports.AppServer = exports.UI = void 0;
/**
 * Message producer classes.
 */
var appmessageproducerui_1 = require("./appmessageproducerui");
Object.defineProperty(exports, "UI", { enumerable: true, get: function () { return appmessageproducerui_1.AppMessageProducerUi; } });
var appmessageproducerappserver_1 = require("./appmessageproducerappserver");
Object.defineProperty(exports, "AppServer", { enumerable: true, get: function () { return appmessageproducerappserver_1.AppMessageProducerAppServer; } });
var appmessageproducersystemserver_1 = require("./appmessageproducersystemserver");
Object.defineProperty(exports, "SystemServer", { enumerable: true, get: function () { return appmessageproducersystemserver_1.AppMessageProducerSystemServer; } });
//# sourceMappingURL=producers.js.map