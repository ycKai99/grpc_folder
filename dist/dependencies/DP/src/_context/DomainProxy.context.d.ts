import { States } from "../_states/DomainProxy.states";
export interface contextInterface {
    requestId: string;
    state: States;
    target?: string;
    message: any;
}
