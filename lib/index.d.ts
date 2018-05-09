import { BlockNumber } from './index';
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
    ETH_GET_BALANCE = "eth_getBalance",
    CITA_GET_TRANSACTION_PROOF = "cita_getTransactionProof",
    METADATA = "cita_getMetaData",
}
export declare type RPCParam = string | number | boolean | object | MetaData;
export declare type SignedData = string;
export declare type Hash = string;
export declare type Detailed = boolean;
export declare type BlockNumber = string;
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
    setServer: (server: string) => void;
    netPeerCount: () => Promise<string | object | Transaction | JSONRPCError>;
    getBlockNumber: () => Promise<string | object | Transaction | JSONRPCError>;
    sendTransaction: (signedData: string) => Promise<string | object | Transaction | JSONRPCError>;
    getBlockByHash: ({ hash, detailed }: {
        hash: string;
        detailed: boolean;
    }) => Promise<string | object>;
    getBlockByNumber: ({ quantity, detailed, }: {
        quantity: string;
        detailed: boolean;
    }) => Promise<string | object>;
    getTransactionReceipt: (hash: string) => Promise<string | object | Transaction | JSONRPCError>;
    getLogs: ({ topics, fromBlock, }?: {
        topics: string[];
        fromBlock: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    ethCall: ({ from, to, data, blockNumber, }: {
        from: string;
        to: string;
        data: string;
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getTransaction: (hash: string) => Promise<Transaction>;
    getTransactionCount: ({ accountAddr, blockNumber, }: {
        accountAddr: string;
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getCode: ({ contractAddr, blockNumber, }: {
        contractAddr: string;
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getAbi: ({ addr, blockNumber }: {
        addr: string;
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getTransactionProof: (hash: string) => Promise<string | object | Transaction | JSONRPCError>;
    getBlockHistory: ({ by, count, }: {
        by: string;
        count: number;
    }) => Promise<(string | object)[]>;
    metaData: ({ blockNumber }: {
        blockNumber: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
    getBalance: ({ addr, quantity, }: {
        addr: string;
        quantity: string;
    }) => Promise<string | object | Transaction | JSONRPCError>;
}
declare const citaWeb3Plugin: ({ Web3, server }: {
    Web3?: any;
    server: string;
}) => {
    web3: any;
    CITA: CITA;
};
export default citaWeb3Plugin;
