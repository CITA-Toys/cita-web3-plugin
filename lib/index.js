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
var CITA_METHODS;
(function (CITA_METHODS) {
    CITA_METHODS["NET_PEER_COUNT"] = "net_peerCount";
    CITA_METHODS["CITA_BLOCK_NUMBER"] = "cita_blockNumber";
    CITA_METHODS["SEND_TRANSACTION"] = "cita_sendTransaction";
    CITA_METHODS["GET_BLOCK_BY_HASH"] = "cita_getBlockByHash";
    CITA_METHODS["GET_BLOCK_BY_NUMBER"] = "cita_getBlockByNumber";
    CITA_METHODS["ETH_GET_TRANSACTION_RECEIPT"] = "eth_getTransactionReceipt";
    CITA_METHODS["ETH_GET_LOGS"] = "eth_getLogs";
    CITA_METHODS["ETH_CALL"] = "eth_call";
    CITA_METHODS["CITA_GET_TRANSACTION"] = "cita_getTransaction";
    CITA_METHODS["ETH_GET_TRANSACTION_COUNT"] = "eth_getTransactionCount";
    CITA_METHODS["ETH_GET_CODE"] = "eth_getCode";
    CITA_METHODS["ETH_GET_ABI"] = "eth_getAbi";
    CITA_METHODS["ETH_NEW_FILTER"] = "eth_newFilter";
    CITA_METHODS["ETH_NEW_BLOCK_FILTER"] = "eth_newBlockFilter";
    CITA_METHODS["ETH_UNINSTALL_FILTER"] = "eth_uninstallFilter";
    CITA_METHODS["ETH_GET_FILTER_CHANGES"] = "eth_getFilterChanges";
    CITA_METHODS["ETH_GET_FILTER_LOGS"] = "eth_getFilterLogs";
    CITA_METHODS["ETH_GET_BALANCE"] = "eth_getBalance";
    CITA_METHODS["CITA_GET_TRANSACTION_PROOF"] = "cita_getTransactionProof";
    CITA_METHODS["METADATA"] = "cita_getMetaData";
})(CITA_METHODS = exports.CITA_METHODS || (exports.CITA_METHODS = {}));
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
            method: CITA_METHODS.NET_PEER_COUNT,
            params: [],
        });
        this.getBlockNumber = () => this.citaFetch({
            method: CITA_METHODS.CITA_BLOCK_NUMBER,
            params: [],
        });
        this.sendTransaction = (signedData) => this.citaFetch({
            method: CITA_METHODS.SEND_TRANSACTION,
            params: [signedData],
        });
        this.getBlockByHash = ({ hash, txInfo, }) => this.citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_HASH,
            params: [parser_1.hashFormatter(hash), txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getBlockByNumber = ({ quantity, txInfo, }) => this.citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_NUMBER,
            params: [parser_1.blockNumberFormatter(quantity), txInfo],
        }).then(block => {
            if (block.body) {
                return parser_1.blockParser(block);
            }
            return block;
        });
        this.getTransactionReceipt = (hash) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_TRANSACTION_RECEIPT,
            params: [parser_1.hashFormatter(hash)],
        });
        this.getLogs = ({ topics = [], fromBlock = '0x0', } = { topics: [], fromBlock: '0x0' }) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_LOGS,
            params: [
                {
                    topics,
                    fromBlock,
                },
            ],
        });
        this.ethCall = ({ from, to, data, blockNumber, }) => this.citaFetch({
            method: CITA_METHODS.ETH_CALL,
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
            method: CITA_METHODS.CITA_GET_TRANSACTION,
            params: [parser_1.hashFormatter(hash)],
        }).then(tx => parser_1.transactionParser(tx));
        this.getTransactionCount = ({ accountAddr, blockNumber, }) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_TRANSACTION_COUNT,
            params: [accountAddr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getCode = ({ contractAddr, blockNumber, }) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_CODE,
            params: [contractAddr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getAbi = ({ addr, blockNumber }) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_ABI,
            params: [addr, parser_1.blockNumberFormatter(blockNumber)],
        });
        this.getTransactionProof = (hash) => this.citaFetch({
            method: CITA_METHODS.CITA_GET_TRANSACTION_PROOF,
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
        this.metaData = ({ blockNumber }) => this.citaFetch({
            method: CITA_METHODS.METADATA,
            params: [blockNumber],
        });
        this.getBalance = ({ addr, quantity = 'latest', }) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_BALANCE,
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
const citaWeb3Plugin = ({ Web3, server }) => {
    const web3 = Web3 ? new Web3(new Web3.providers.HttpProvider(server)) : null;
    return { web3, CITA: new CITA(server) };
};
exports.default = citaWeb3Plugin;
