"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
    CITA_METHODS["CITA_GET_TRANSACTION_PROOF"] = "cita_getTransactionProof";
})(CITA_METHODS = exports.CITA_METHODS || (exports.CITA_METHODS = {}));
const toHex = (num) => `0x${num.toString(16)}`;
const hashFormatter = (hash) => hash.startsWith('0x') ? hash : `0x${hash}`;
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
        this.getBlockByHash = ({ hash, detailed }) => this.citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_HASH,
            params: [hashFormatter(hash), detailed],
        });
        this.getBlockByNumber = ({ quantity, detailed, }) => this.citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_NUMBER,
            params: [quantity, detailed],
        });
        this.getTransactionReceipt = (hash) => this.citaFetch({
            method: CITA_METHODS.ETH_GET_TRANSACTION_RECEIPT,
            params: [hashFormatter(hash)],
        });
        this.getBlockHistory = ({ by, count = 10, }) => {
            let blockNumbers = [];
            for (let i = 0; i < count; i++) {
                blockNumbers.push(toHex(+by - i));
            }
            return Promise.all(blockNumbers.map(blockNumber => this.getBlockByNumber({ quantity: blockNumber, detailed: true })));
        };
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
            console.error(err);
            throw err;
        });
    }
}
exports.CITA = CITA;
const citaWeb3Plugin = ({ Web3, server }) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(server));
    return { web3, CITA: new CITA(server) };
};
exports.default = citaWeb3Plugin;
