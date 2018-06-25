import { AxiosInstance } from 'axios';
export * from './typings';
import { BlockNumber, IJSONRPC, IJSONRPCParams, Server, Result, JSONRPCError, IJSONRPCResponse, METHODS, SignedData, Hash, BlockTransactionInfo, Block, Transaction } from './typings';
export { BlockNumber, IJSONRPC, IJSONRPCParams, Server, Result, JSONRPCError, IJSONRPCResponse, METHODS, SignedData, Hash, BlockTransactionInfo, Block, Transaction };
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
