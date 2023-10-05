import { States } from "../_states/basic.states";

export interface contextInterface{
    requestId: string,
    state: States,    
    target?: string,
    message: any
} 
 