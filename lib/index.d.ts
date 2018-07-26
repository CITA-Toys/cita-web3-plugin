import { AxiosInstance } from 'axios';
export { BasicTypes, RpcRequest, RpcResult, Chain, METHODS, BlockTransactionInfo } from './typings';
import { RpcRequest, RpcResult, Chain, BlockTransactionInfo } from './typings';
export declare const JSONRPC: ({ method, params, id, }: RpcRequest.Params) => RpcRequest.Request;
export declare class Nervos {
    server: string;
    citaFetchIns: AxiosInstance;
    citaFetch: (config: RpcRequest.Params) => Promise<RpcResult.Result>;
    constructor(server: string);
    setServer: (server: string) => void;
    netPeerCount: () => Promise<string>;
    getBlockNumber: () => Promise<string>;
    sendSignedTransaction: (signedData: string) => Promise<RpcResult.sendRawTransaction>;
    getBlockByHash: ({ hash, txInfo }: {
        hash: string;
        txInfo: BlockTransactionInfo;
    }) => Promise<RpcResult.Result>;
    getBlockByNumber: ({ quantity, txInfo, }: {
        quantity: string;
        txInfo: BlockTransactionInfo;
    }) => Promise<RpcResult.Result>;
    getTransactionReceipt: (hash: string) => Promise<Chain.TransactionReceipt>;
    getLogs: ({ topics, fromBlock }?: {
        topics: string[];
        fromBlock: string;
    }) => Promise<Chain.Log[]>;
    ethCall: ({ callObject, blockNumber, }: {
        callObject: {
            from?: string | undefined;
            to: string;
            data: string;
        };
        blockNumber: string;
    }) => Promise<RpcResult.Result>;
    getTransaction: (hash: string) => Promise<Chain.TransactionInBlock>;
    getTransactionCount: ({ addr, blockNumber, }: {
        addr: string;
        blockNumber: string;
    }) => Promise<string>;
    getCode: ({ contractAddr, blockNumber, }: {
        contractAddr: string;
        blockNumber: string;
    }) => Promise<string>;
    getAbi: ({ addr, blockNumber }: {
        addr: string;
        blockNumber: string;
    }) => Promise<string>;
    getTransactionProof: (hash: string) => Promise<string>;
    getBlockHistory: ({ by, count }: {
        by: string;
        count: number;
    }) => Promise<Chain.Block<Chain.TransactionInBlock>[]>;
    metadata: ({ blockNumber }: {
        blockNumber: string;
    }) => Promise<Chain.MetaData>;
    getBalance: ({ addr, quantity }: {
        addr: string;
        quantity?: string | undefined;
    }) => Promise<string>;
    newFilter: (topics: string[]) => Promise<string>;
    newBlockFilter: () => Promise<string>;
    uninstallFilter: (filterId: string) => Promise<boolean>;
    getFilterChanges: (filterId: string) => Promise<Chain.Log[]>;
    getFilterLogs: (filterId: string) => Promise<Chain.Log[]>;
}
declare const nervosWeb3Plugin: ({ Web3, server }: {
    Web3?: any;
    server: string;
}) => {
    web3: any;
    Nervos: Nervos;
};
export default nervosWeb3Plugin;
