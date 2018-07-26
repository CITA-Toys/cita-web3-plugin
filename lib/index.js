"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const parser_1 = require("./utils/parser");
var typings_1 = require("./typings");
exports.METHODS = typings_1.METHODS;
exports.BlockTransactionInfo = typings_1.BlockTransactionInfo;
const typings_2 = require("./typings");
exports.JSONRPC = ({ method, params = [], id = Math.round(Math.random() * 100), }) => ({
    jsonrpc: '2.0',
    method,
    params,
    id,
});
class Nervos {
    constructor(server) {
        this.setServer = (server) => {
            this.server = server;
            this.citaFetchIns = axios_1.default.create({
                method: 'POST',
                url: this.server,
            });
        };
        this.netPeerCount = () => this.citaFetch({
            method: typings_2.METHODS.PEER_COUNT,
            params: [],
        });
        this.getBlockNumber = () => this.citaFetch({
            method: typings_2.METHODS.BLOCK_NUMBER,
            params: [],
        });
        this.sendSignedTransaction = (signedData) => this.citaFetch({
            method: typings_2.METHODS.SEND_RAW_TRANSACTION,
            params: [signedData],
        });
        this.getBlockByHash = ({ hash, txInfo }) => this.citaFetch({
            method: typings_2.METHODS.GET_BLOCK_BY_HASH,
            params: [parser_1.hashFormatter(hash), !!txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getBlockByNumber = ({ quantity, txInfo, }) => this.citaFetch({
            method: typings_2.METHODS.GET_BLOCK_BY_NUMBER,
            params: [parser_1.blockNumberFormatter(quantity), !!txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getTransactionReceipt = (hash) => this.citaFetch({
            method: typings_2.METHODS.GET_TRANSACTION_RECEIPT,
            params: [parser_1.hashFormatter(hash)],
        });
        this.getLogs = ({ topics = [], fromBlock = '0x0' } = {
            topics: [],
            fromBlock: '0x0',
        }) => this.citaFetch({
            method: typings_2.METHODS.GET_LOGS,
            params: [
                {
                    topics,
                    fromBlock,
                },
            ],
        });
        this.ethCall = ({ callObject, blockNumber, }) => this.citaFetch({
            method: typings_2.METHODS.CALL,
            params: [callObject, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getTransaction = (hash) => this.citaFetch({
            method: typings_2.METHODS.GET_TRANSACTION,
            params: [parser_1.hashFormatter(hash)],
        }).then(tx => parser_1.transactionParser(tx));
        this.getTransactionCount = ({ addr, blockNumber, }) => this.citaFetch({
            method: typings_2.METHODS.GET_TRANSACTION_COUNT,
            params: [addr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getCode = ({ contractAddr, blockNumber, }) => this.citaFetch({
            method: typings_2.METHODS.GET_CODE,
            params: [contractAddr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getAbi = ({ addr, blockNumber }) => this.citaFetch({
            method: typings_2.METHODS.GET_ABI,
            params: [addr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getTransactionProof = (hash) => this.citaFetch({
            method: typings_2.METHODS.GET_TRANSACTION_PROOF,
            params: [hash],
        });
        this.getBlockHistory = ({ by, count = 10 }) => {
            let blockNumbers = [];
            for (let i = 0; i < count; i++) {
                blockNumbers.push(parser_1.toHex(+by - i));
            }
            return Promise.all(blockNumbers.map(blockNumber => this.getBlockByNumber({
                quantity: blockNumber,
                txInfo: typings_2.BlockTransactionInfo.Detail,
            })));
        };
        this.metadata = ({ blockNumber = 'latest' }) => this.citaFetch({
            method: typings_2.METHODS.METADATA,
            params: [blockNumber],
        });
        this.getBalance = ({ addr, quantity = 'latest' }) => this.citaFetch({
            method: typings_2.METHODS.GET_BALANCE,
            params: [addr, parser_1.blockNumberFormatter(quantity)],
        });
        this.newFilter = (topics) => this.citaFetch({
            method: typings_2.METHODS.NEW_FILTER,
            params: [{ topics }],
        });
        this.newBlockFilter = () => this.citaFetch({
            method: typings_2.METHODS.NEW_BLOCK_FILTER,
            params: [],
        });
        this.uninstallFilter = (filterId) => this.citaFetch({
            method: typings_2.METHODS.UNINSTALL_FILTER,
            params: [filterId],
        });
        this.getFilterChanges = (filterId) => this.citaFetch({
            method: typings_2.METHODS.GET_FILTER_CHANGES,
            params: [filterId],
        });
        this.getFilterLogs = this.getFilterChanges;
        this.server = server;
        this.citaFetchIns = axios_1.default.create({
            method: 'POST',
            url: this.server,
        });
        this.citaFetch = _params => this.citaFetchIns({
            data: exports.JSONRPC(_params),
        })
            .then((res) => {
            const { data, status } = res;
            if (status !== 200)
                throw new Error('Error Status');
            if (data.error) {
                throw new Error(data.error);
            }
            return data.result;
        })
            .catch(err => {
            throw err;
        });
    }
}
exports.Nervos = Nervos;
const nervosWeb3Plugin = ({ Web3, server }) => {
    const web3 = Web3 ? new Web3(new Web3.providers.HttpProvider(server)) : null;
    return { web3, Nervos: new Nervos(server) };
};
exports.default = nervosWeb3Plugin;
