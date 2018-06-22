import { BlockNumber } from './index';
import { AxiosInstance } from 'axios';
export declare enum BlockTransactionInfo {
    Hash = 0,
    Detail = 1,
    Receipt = 2,
}
export declare enum METHODS {
    PEER_COUNT = "peerCount",
    BLOCK_NUMBER = "blockNumber",
    SEND_TRANSACTION = "sendTransaction",
    GET_BLOCK_BY_HASH = "getBlockByHash",
    GET_BLOCK_BY_NUMBER = "getBlockByNumber",
    GET_TRANSACTION_RECEIPT = "getTransactionReceipt",
    GET_LOGS = "getLogs",
    CALL = "call",
    GET_TRANSACTION = "getTransaction",
    GET_TRANSACTION_COUNT = "getTransactionCount",
    GET_CODE = "getCode",
    GET_ABI = "getAbi",
    NEW_FILTER = "newFilter",
    NEW_BLOCK_FILTER = "newBlockFilter",
    UNINSTALL_FILTER = "uninstallFilter",
    GET_FILTER_CHANGES = "getFilterChanges",
    GET_FILTER_LOGS = "getFilterLogs",
    GET_BALANCE = "getBalance",
    GET_TRANSACTION_PROOF = "getTransactionProof",
    METADATA = "getMetaData",
}
export declare type RPCParam = string | number | boolean | object | MetaData;
export declare type SignedData = string;
export declare type Hash = string;
export declare type Detailed = boolean;
export declare type BlockNumber = string | number;
export declare type ID = number;
export declare type Server = string;
export interface MetaData {
    chainId: number;
    chainName: string;
    operator: string;
    website: string;
    genesisTimestamp: number | string;
    validators: Hash[];
    blockInterval: number;
}
export interface Block {
    body: {
        transactions: Transaction[];
    };
}
export interface Transaction {
    blockHash: Hash;
    blockNumber: BlockNumber;
    content?: string;
    basicInfo?: string | {
        from: string;
        to: string;
        value: string;
        data: string;
    };
    hash: Hash;
    index: string;
}
export declare type Result = string | object | Transaction;
export interface JSONRPCError {
    code: string;
    message: string;
}
export interface IJSONRPCParams {
    method: METHODS;
    params: RPCParam[];
    id?: ID;
}
export interface IJSONRPC {
    jsonrpc: string;
    method: METHODS | string;
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
    setServer: (server: string) => void;
    netPeerCount: () => Promise<string | object | Transaction | JSONRPCError>;
    getBlockNumber: () => Promise<string | object | Transaction | JSONRPCError>;
    sendTransaction: (signedData: string) => Promise<string | object | Transaction | JSONRPCError>;
    getBlockByHash: ({ hash, txInfo, }: {
        hash: string;
        txInfo: BlockTransactionInfo;
    }) => Promise<string | object>;
    getBlockByNumber: ({ quantity, txInfo, }: {
        quantity: string | number;
        txInfo: BlockTransactionInfo;
    }) => Promise<string | object>;
    getTransactionReceipt: (hash: string) => Promise<string | object | Transaction | JSONRPCError>;
    getLogs: ({ topics, fromBlock, }?: {
        topics: string[];
        fromBlock: string | number;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    ethCall: ({ from, to, data, blockNumber, }: {
        from: string;
        to: string;
        data: string;
        blockNumber: string | number;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getTransaction: (hash: string) => Promise<Transaction>;
    getTransactionCount: ({ addr, blockNumber, }: {
        addr: string;
        blockNumber: string | number;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getCode: ({ contractAddr, blockNumber, }: {
        contractAddr: string;
        blockNumber: string | number;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getAbi: ({ addr, blockNumber }: {
        addr: string;
        blockNumber: string | number;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getTransactionProof: (hash: string) => Promise<string | object | Transaction | JSONRPCError>;
    getBlockHistory: ({ by, count, }: {
        by: string | number;
        count: number;
    }) => Promise<(string | object)[]>;
    metadata: ({ blockNumber }: {
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getBalance: ({ addr, quantity, }: {
        addr: string;
        quantity?: string | number | undefined;
    }) => Promise<string | object | Transaction | JSONRPCError>;
}
declare const nervosWeb3Plugin: ({ Web3, server }: {
    Web3?: any;
    server: string;
}) => {
    web3: any;
    Nervos: CITA;
};
export default nervosWeb3Plugin;
