import { METHODS } from './index';
import { BasicTypes } from './BasicTypes';
import { Chain } from './Chain';
export declare type RPCParam = any;
export declare namespace RpcRequest {
    interface Params {
        method: METHODS;
        params: RPCParam[];
        id?: BasicTypes.ID;
    }
    interface Request extends Params {
        jsonrpc: '2.0';
        id: BasicTypes.ID;
    }
}
export declare namespace RpcResult {
    interface JSONRPC {
        id: BasicTypes.ID;
        jsonrpc: BasicTypes.JSONRPC_VERSION;
        error?: {
            code: BasicTypes.ErrorCode;
            message: BasicTypes.ErrorMessage;
        };
    }
    type PeerCount = string;
    type BlockNumber = BasicTypes.BlockNumber;
    type BlockByHash = Chain.Block<Chain.TransactionInBlock>;
    type BlockByNumber = Chain.Block<Chain.TransactionInBlock>;
    type TransactionReceipt = Chain.TransactionReceipt;
    interface sendRawTransaction {
        hash: BasicTypes.Hash;
        status: string;
    }
    type Logs = Chain.Log[];
    type Transaction = Chain.Transaction;
    type TransactionCount = string;
    type Code = string;
    type Abi = string;
    type Balance = string;
    type newFilter = string;
    type newBlockFilter = string;
    type uninstallFilter = boolean;
    type FilterChanges = Chain.Log[];
    type FilterLogs = Chain.Log[];
    type TransactionProof = BasicTypes.Hash;
    type MetaData = Chain.MetaData;
    interface Error {
        code: BasicTypes.ErrorCode;
        message: BasicTypes.ErrorMessage;
    }
    type Result = PeerCount | BlockNumber | BlockByHash | BlockByNumber | TransactionReceipt | sendRawTransaction | Logs | Transaction | TransactionCount | Code | Abi | Balance | newFilter | newBlockFilter | uninstallFilter | FilterChanges | FilterLogs | TransactionProof | MetaData;
    interface Response extends JSONRPC {
        result: Result;
        error: Error;
    }
}
