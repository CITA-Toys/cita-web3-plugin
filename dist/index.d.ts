/// <reference path="../typings/index.d.ts" />
import { AxiosInstance } from 'axios';
export declare class CITA {
    citaFetchIns: AxiosInstance;
    citaFetch: (config: IJSONRPCParams) => Promise<Result | JSONRPCError>;
    constructor(server: Server);
    netPeerCount: () => Promise<string | object | JSONRPCError>;
    getBlockNumber: () => Promise<string | object | JSONRPCError>;
    sendTransaction: (signedData: string) => Promise<string | object | JSONRPCError>;
    getBlockByHash: ({ hash, detailed }: {
        hash: string;
        detailed: boolean;
    }) => Promise<string | object | JSONRPCError>;
    getBlockByNumber: ({ quantity, detailed, }: {
        quantity: string;
        detailed: boolean;
    }) => Promise<string | object | JSONRPCError>;
    getTransactionReceipt: (hash: string) => Promise<string | object | JSONRPCError>;
}
declare const citaWeb3Plugin: ({ web3, server }: {
    web3?: any;
    server: string;
}) => {
    web3: any;
    CITA: CITA;
};
export default citaWeb3Plugin;
