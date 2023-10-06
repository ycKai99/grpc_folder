"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowcount_process_argument_class = exports.setcolumns_process_argument_class = exports.cancelchanges_process_argument_class = exports.distribute_process_argument_class = exports.post_process_argument_class = exports.save_process_argument_class = exports.appendrow_process_argument_class = exports.insertrow_process_argument_class = exports.retrieve_process_argument_class = exports.new_process_argument_class = exports.generate_parameters = exports.generate_handler = void 0;
const export_1 = require("../_dependencies/DP/src/interface/export");
const uuid_1 = require("uuid");
function generate_handler(notification, handler_type_name, tag) {
    let msg_data = JSON.parse(JSON.stringify(notification));
    let new_handler = {
        notification: msg_data,
        task_ID: uuid_1.v4(),
        service_Id: "",
        handler_type_name: handler_type_name,
        removed_steps: [],
        steps: [],
        process_status: "New",
        task_date: new Date(),
        tag: tag
    };
    if (msg_data["data"]
        && msg_data["data"]["DatabaseNotificationData"]
        && msg_data["data"]["DatabaseNotificationData"]["EntityTypeID"]) {
        new_handler.service_Id = msg_data["data"]["DatabaseNotificationData"]["EntityTypeID"];
    }
    return new_handler;
}
exports.generate_handler = generate_handler;
function generate_parameters(messagehelper, processname, payload) {
    let new_argument;
    let UCP_ID = payload.UCP_Id;
    // Remove item from payload
    delete payload['UCP_Id'];
    if (payload["ServiceID"]) {
        payload['serviceId'] = payload["ServiceID"];
        delete payload["ServiceID"];
    }
    let source = "";
    let target = "";
    if (payload["setSource"]) {
        source = payload["setSource"];
        delete payload["setSource"];
    }
    if (payload["setTarget"]) {
        target = payload["setTarget"];
        delete payload["setTarget"];
    }
    switch (processname) {
        case export_1.Command.New:
            new_argument = new new_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.New, payload, export_1.Command.New);
            break;
        case export_1.Command.InsertRow:
            new_argument = new insertrow_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.InsertRow, payload, export_1.Command.InsertRow);
            break;
        case export_1.Command.AppendRow:
            new_argument = new appendrow_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.AppendRow, payload, export_1.Command.AppendRow);
            break;
        case export_1.Command.Retrieve:
            new_argument = new retrieve_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getQueryMessage_ext(UCP_ID, export_1.Query.GetData, payload.serviceId, payload, export_1.Query.GetData);
            break;
        case export_1.Command.Save:
            new_argument = new save_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.Save, payload, export_1.Command.Save);
            break;
        case export_1.Command.Post:
            new_argument = new post_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.Post, payload, export_1.Command.Post);
            break;
        case export_1.Command.Execute:
            new_argument = new post_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.Execute, payload, export_1.Command.Execute);
            break;
        case export_1.Command.Distribute:
            new_argument = new distribute_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.Distribute, payload, export_1.Command.Distribute);
            break;
        case export_1.Command.CancelChanges:
            new_argument = new cancelchanges_process_argument_class();
            new_argument.payload = payload;
            new_argument.request[0] = messagehelper.getCommandMessage(UCP_ID, export_1.Command.CancelChanges, payload, export_1.Command.CancelChanges);
            break;
        case export_1.Command.SetColumn:
            let data_row = [];
            let dataColumn = payload;
            data_row = dataColumn.data;
            new_argument = new setcolumns_process_argument_class();
            new_argument.payload = dataColumn;
            for (let ind = 0; ind < data_row.length; ind++) {
                let newPayload = data_row[ind];
                let service_Id_str = dataColumn.serviceId;
                newPayload["serviceId"] = service_Id_str;
                let newrequest = messagehelper.getCommandMessage(UCP_ID, export_1.Command.SetColumn, newPayload, export_1.Command.SetColumn);
                new_argument.request[ind] = newrequest;
            }
            break;
        // case FisQuery.RowCount:
        //     new_argument = new rowcount_process_argument_class();
        //     new_argument.payload = payload;
        //     new_argument.request[0] = messagehelper.getQueryMessage(UCP_ID,FisQuery.RowCount,payload.ServiceID,payload);
        //     break;     
        default: {
            throw new Error("Invalid command or query");
            break;
        }
    }
    if (source > "") {
        let ind = 0;
        for (ind = 0; ind < new_argument.request.length; ind++) {
            new_argument.request[ind] = setSource(new_argument.request[ind], source);
        }
    }
    if (target > "") {
        let ind = 0;
        for (ind = 0; ind < new_argument.request.length; ind++) {
            new_argument.request[ind] = setTarget(new_argument.request[ind], target);
        }
    }
    return new_argument;
}
exports.generate_parameters = generate_parameters;
function setSource(message, source) {
    const returnMessage = JSON.parse(JSON.stringify(message));
    returnMessage.header.messageProducerInformation.origin.userApplication.userAppId = source;
    return returnMessage;
}
function setTarget(message, target) {
    const returnMessage = JSON.parse(JSON.stringify(message));
    returnMessage.header.messageDataLocation.remoteInstanceId = target;
    return returnMessage;
}
class new_process_argument_class {
    constructor() {
        this.processname = export_1.Command.New;
        this.payload = null;
        this.request = [];
        this.response = [];
    }
}
exports.new_process_argument_class = new_process_argument_class;
class retrieve_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Retrieve;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.retrieve_process_argument_class = retrieve_process_argument_class;
class insertrow_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Retrieve;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.insertrow_process_argument_class = insertrow_process_argument_class;
class appendrow_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Retrieve;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.appendrow_process_argument_class = appendrow_process_argument_class;
class save_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Save;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.save_process_argument_class = save_process_argument_class;
class post_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Post;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.post_process_argument_class = post_process_argument_class;
class distribute_process_argument_class {
    constructor() {
        this.processname = export_1.Command.Distribute;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.distribute_process_argument_class = distribute_process_argument_class;
class cancelchanges_process_argument_class {
    constructor() {
        this.processname = export_1.Command.CancelChanges;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.cancelchanges_process_argument_class = cancelchanges_process_argument_class;
class setcolumns_process_argument_class {
    constructor() {
        this.processname = export_1.Command.SetColumn;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.setcolumns_process_argument_class = setcolumns_process_argument_class;
class rowcount_process_argument_class {
    constructor() {
        this.processname = export_1.Query.RowCount;
        this.payload = {
            id: ""
        };
        this.request = [];
        this.response = [];
    }
}
exports.rowcount_process_argument_class = rowcount_process_argument_class;
//# sourceMappingURL=process_parameters.js.map