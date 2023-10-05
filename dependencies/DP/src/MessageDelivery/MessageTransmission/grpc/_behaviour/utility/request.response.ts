import { Request, Response } from './messages_pb';

export class DpRequest extends Request {
  constructor(requestId?: string) {
    super();
    this.setId(requestId ? requestId : '');
  }

  getId() {
    return super.getId() ? super.getId() : '';
  }

  setDpMessage(messageObj: string) {
    super.setMessage(messageObj);
  }
}

export class DpResponse extends Response {}
