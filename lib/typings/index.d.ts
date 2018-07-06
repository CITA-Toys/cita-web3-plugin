export declare enum BlockTransactionInfo {
    Hash = 0,
    Detail = 1,
    Receipt = 2,
}
export declare enum METHODS {
    PEER_COUNT = "peerCount",
    BLOCK_NUMBER = "blockNumber",
    SEND_RAW_TRANSACTION = "sendRawTransaction",
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
