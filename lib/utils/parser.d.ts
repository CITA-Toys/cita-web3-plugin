import { Chain } from '../typings';
export declare const hexToBytes: (hex: string) => number[];
export declare const bytesToHex: (bytes: Uint8Array) => string;
export declare const toHex: (num: number) => string;
export declare const blockNumberFormatter: (num: string | number) => string;
export declare const hashFormatter: (hash: string) => string;
export declare const transactionContentParser: (content: string) => {
    from: any;
    to: any;
    data: any;
    value: any;
};
export declare const transactionParser: (transaction: Chain.TransactionInBlock) => Chain.TransactionInBlock;
export declare const blockParser: (block: Chain.Block<Chain.TransactionInBlock>) => Chain.Block<Chain.TransactionInBlock>;
