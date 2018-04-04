import { AxiosInstance } from 'axios';
export declare enum CITA_METHODS {
    NET_PEER_COUNT = "net_peerCount",
    CITA_BLOCK_NUMBER = "cita_blockNumber",
    SEND_TRANSACTION = "cita_sendTransaction",
    GET_BLOCK_BY_HASH = "cita_getBlockByHash",
    GET_BLOCK_BY_NUMBER = "cita_getBlockByNumber",
    ETH_GET_TRANSACTION_RECEIPT = "eth_getTransactionReceipt",
    ETH_GET_LOGS = "eth_getLogs",
    ETH_CALL = "eth_call",
    CITA_GET_TRANSACTION = "cita_getTransaction",
    ETH_GET_TRANSACTION_COUNT = "eth_getTransactionCount",
    ETH_GET_CODE = "eth_getCode",
    ETH_GET_ABI = "eth_getAbi",
    ETH_NEW_FILTER = "eth_newFilter",
    ETH_NEW_BLOCK_FILTER = "eth_newBlockFilter",
    ETH_UNINSTALL_FILTER = "eth_uninstallFilter",
    ETH_GET_FILTER_CHANGES = "eth_getFilterChanges",
    ETH_GET_FILTER_LOGS = "eth_getFilterLogs",
    CITA_GET_TRANSACTION_PROOF = "cita_getTransactionProof",
}
export declare type RPCParam = string | number | boolean;
export declare type SignedData = string;
export declare type Hash = string;
export declare type Detailed = boolean;
export declare type BlockNumber = string;
export declare type ID = number;
export declare type Server = string;
export declare type Result = string | object;
export interface JSONRPCError {
    code: string;
    message: string;
}
export interface IJSONRPCParams {
    method: CITA_METHODS;
    params: RPCParam[];
    id?: ID;
}
export interface IJSONRPC {
    jsonrpc: string;
    method: CITA_METHODS | string;
    params: RPCParam[];
    id: ID;
}
export interface IJSONRPCResponse {
    jsonrpc: string;
    id: ID;
    error?: JSONRPCError;
    result?: Result;
}
export declare const JSONRPC: ({ method, params, id, }: IJSONRPCParams) => IJSONRPC;
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
