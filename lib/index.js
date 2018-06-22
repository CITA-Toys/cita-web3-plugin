"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const parser_1 = require("./utils/parser");
var BlockTransactionInfo;
(function (BlockTransactionInfo) {
    BlockTransactionInfo[BlockTransactionInfo["Hash"] = 0] = "Hash";
    BlockTransactionInfo[BlockTransactionInfo["Detail"] = 1] = "Detail";
    BlockTransactionInfo[BlockTransactionInfo["Receipt"] = 2] = "Receipt";
})(BlockTransactionInfo = exports.BlockTransactionInfo || (exports.BlockTransactionInfo = {}));
var METHODS;
(function (METHODS) {
    METHODS["PEER_COUNT"] = "peerCount";
    METHODS["BLOCK_NUMBER"] = "blockNumber";
    METHODS["SEND_TRANSACTION"] = "sendTransaction";
    METHODS["GET_BLOCK_BY_HASH"] = "getBlockByHash";
    METHODS["GET_BLOCK_BY_NUMBER"] = "getBlockByNumber";
    METHODS["GET_TRANSACTION_RECEIPT"] = "getTransactionReceipt";
    METHODS["GET_LOGS"] = "getLogs";
    METHODS["CALL"] = "call";
    METHODS["GET_TRANSACTION"] = "getTransaction";
    METHODS["GET_TRANSACTION_COUNT"] = "getTransactionCount";
    METHODS["GET_CODE"] = "getCode";
    METHODS["GET_ABI"] = "getAbi";
    METHODS["NEW_FILTER"] = "newFilter";
    METHODS["NEW_BLOCK_FILTER"] = "newBlockFilter";
    METHODS["UNINSTALL_FILTER"] = "uninstallFilter";
    METHODS["GET_FILTER_CHANGES"] = "getFilterChanges";
    METHODS["GET_FILTER_LOGS"] = "getFilterLogs";
    METHODS["GET_BALANCE"] = "getBalance";
    METHODS["GET_TRANSACTION_PROOF"] = "getTransactionProof";
    METHODS["METADATA"] = "getMetaData";
})(METHODS = exports.METHODS || (exports.METHODS = {}));
exports.JSONRPC = ({ method, params = [], id = Math.round(Math.random() * 100), }) => ({
    jsonrpc: '2.0',
    method,
    params,
    id,
});
class CITA {
    constructor(server) {
        this.setServer = (server) => {
            this.citaFetchIns = axios_1.default.create({
                method: 'POST',
                url: server,
            });
        };
        this.netPeerCount = () => this.citaFetch({
            method: METHODS.PEER_COUNT,
            params: [],
        });
        this.getBlockNumber = () => this.citaFetch({
            method: METHODS.BLOCK_NUMBER,
            params: [],
        });
        this.sendTransaction = (signedData) => this.citaFetch({
            method: METHODS.SEND_TRANSACTION,
            params: [signedData],
        });
        this.getBlockByHash = ({ hash, txInfo, }) => this.citaFetch({
            method: METHODS.GET_BLOCK_BY_HASH,
            params: [parser_1.hashFormatter(hash), !!txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getBlockByNumber = ({ quantity, txInfo, }) => this.citaFetch({
            method: METHODS.GET_BLOCK_BY_NUMBER,
            params: [parser_1.blockNumberFormatter(quantity), !!txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getTransactionReceipt = (hash) => this.citaFetch({
            method: METHODS.GET_TRANSACTION_RECEIPT,
            params: [parser_1.hashFormatter(hash)],
        });
        this.getLogs = ({ topics = [], fromBlock = '0x0', } = { topics: [], fromBlock: '0x0' }) => this.citaFetch({
            method: METHODS.GET_LOGS,
            params: [
                {
                    topics,
                    fromBlock,
                },
            ],
        });
        this.ethCall = ({ from, to, data, blockNumber, }) => this.citaFetch({
            method: METHODS.CALL,
            params: [
                {
                    from,
                    to,
                    data,
                },
                parser_1.blockNumberFormatter(blockNumber),
            ],
        });
        this.getTransaction = (hash) => this.citaFetch({
            method: METHODS.GET_TRANSACTION,
            params: [parser_1.hashFormatter(hash)],
        }).then(tx => parser_1.transactionParser(tx));
        this.getTransactionCount = ({ addr, blockNumber, }) => this.citaFetch({
            method: METHODS.GET_TRANSACTION_COUNT,
            params: [addr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getCode = ({ contractAddr, blockNumber, }) => this.citaFetch({
            method: METHODS.GET_CODE,
            params: [contractAddr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getAbi = ({ addr, blockNumber }) => this.citaFetch({
            method: METHODS.GET_ABI,
            params: [addr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getTransactionProof = (hash) => this.citaFetch({
            method: METHODS.GET_TRANSACTION_PROOF,
            params: [hash],
        });
        this.getBlockHistory = ({ by, count = 10, }) => {
            let blockNumbers = [];
            for (let i = 0; i < count; i++) {
                blockNumbers.push(parser_1.toHex(+by - i));
            }
            return Promise.all(blockNumbers.map(blockNumber => this.getBlockByNumber({
                quantity: blockNumber,
                txInfo: BlockTransactionInfo.Detail,
            })));
        };
        this.metadata = ({ blockNumber }) => this.citaFetch({
            method: METHODS.METADATA,
            params: [blockNumber],
        });
        this.getBalance = ({ addr, quantity = 'latest', }) => this.citaFetch({
            method: METHODS.GET_BALANCE,
            params: [addr, parser_1.blockNumberFormatter(quantity)],
        });
        this.citaFetchIns = axios_1.default.create({
            method: 'POST',
            url: server,
        });
        this.citaFetch = _params => this.citaFetchIns({ data: exports.JSONRPC(_params) })
            .then(res => {
            const { data, status } = res;
            if (status !== 200)
                throw new Error('Error Status');
            return data;
        })
            .then((data) => {
            const { result = 'No Result', error } = data;
            if (error)
                throw error;
            return result;
        })
            .catch(err => {
            throw err;
        });
    }
}
exports.CITA = CITA;
const nervosWeb3Plugin = ({ Web3, server }) => {
    const web3 = Web3 ? new Web3(new Web3.providers.HttpProvider(server)) : null;
    return { web3, Nervos: new CITA(server) };
};
exports.default = nervosWeb3Plugin;
