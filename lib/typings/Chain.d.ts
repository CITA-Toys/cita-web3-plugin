import { BasicTypes } from './basicTypes';
export declare type BasicInfo = string | {
    from: BasicTypes.Hash;
    to: BasicTypes.Hash;
    value: string;
    data: string;
};
export declare namespace Chain {
    interface TransactionInBlock {
        hash: BasicTypes.Hash;
        content: BasicTypes.TransactionContent;
        basicInfo?: BasicInfo;
    }
    interface Transaction extends TransactionInBlock {
        blockNumber: BasicTypes.BlockNumber;
        blockHash: BasicTypes.Hash;
        index: string;
    }
    interface BlockHeader {
        timestamp: number;
        prevHash: BasicTypes.Hash;
        number: string;
        gasUsed: string;
        proposer: BasicTypes.Hash;
        receiptsRoot: BasicTypes.Hash;
        stateRoot: BasicTypes.Hash;
        transactionsRoot: BasicTypes.Hash;
        proof: {
            Tendermint: {
                proposal: BasicTypes.Hash;
                height: number;
                round: number;
                commits: {
                    [hash: string]: BasicTypes.Hash;
                };
            };
        };
    }
    interface Block<T> {
        version: number;
        hash: BasicTypes.Hash;
        header: BlockHeader;
        stateRoot: BasicTypes.Hash;
        transactionsRoot: BasicTypes.Hash;
        receiptsRoot: BasicTypes.Hash;
        gasUsed: string;
        number: string;
        proposer: BasicTypes.Hash;
        body: {
            transactions: T[];
        };
    }
    interface TransactionReceipt {
        transactionHash: BasicTypes.Hash;
        transactionIndex: string;
        blockHash: BasicTypes.Hash;
        blockNumber: string;
        cumulativeGasUsed: string;
        gasUsed: string;
        contractAddress: BasicTypes.Hash | null;
        logs: Log[];
        root: BasicTypes.Hash;
        errorMessage: string;
    }
    interface Log {
        address: BasicTypes.Hash;
        topics: BasicTypes.Hash[];
        data: string;
        blockHash: BasicTypes.Hash;
        blockNumber: string;
        transactionHash: BasicTypes.Hash;
        transactionIndex: string;
        logIndex: string;
        transactionLogIndex: string;
    }
    interface MetaData {
        chainId: number;
        chainName: string;
        operator: string;
        website: string;
        genesisTimestamp: number;
        validators: BasicTypes.Hash[];
        blockInterval: number;
        tokenName: string;
        tokenSymbol: string;
        tokenAvatar: string;
    }
}
