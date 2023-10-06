export interface ConnectionInterface {
    IdName: string;
    Description: string;
    Type: 'SocketIO' | 'Http' | 'Microservice' | 'grpc';
    Target: string;
}
