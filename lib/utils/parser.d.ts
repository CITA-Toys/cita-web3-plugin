import { Transaction, Block } from '../index';
export declare const toHex: (num: number) => string;
export declare const blockNumberFormatter: (num: string | number) => string;
export declare const hashFormatter: (hash: string) => string;
export declare const transactionContentParser: (content: string) => {
    from: any;
    to: any;
    data: any;
    value: any;
};
export declare const transactionParser: (transaction: Transaction) => Transaction;
export declare const blockParser: (block: Block) => Block;
