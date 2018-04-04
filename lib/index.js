"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
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
exports.JSONRPC = function (_a) {
    var method = _a.method, _b = _a.params, params = _b === void 0 ? [] : _b, _c = _a.id, id = _c === void 0 ? Math.round(Math.random() * 100) : _c;
    return ({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1 || id,
    });
};
var CITA = (function () {
    function CITA(server) {
        var _this = this;
        this.netPeerCount = function () {
            return _this.citaFetch({
                method: CITA_METHODS.NET_PEER_COUNT,
                params: [],
            });
        };
        this.getBlockNumber = function () {
            return _this.citaFetch({
                method: CITA_METHODS.CITA_BLOCK_NUMBER,
                params: [],
            });
        };
        this.sendTransaction = function (signedData) {
            return _this.citaFetch({
                method: CITA_METHODS.SEND_TRANSACTION,
                params: [signedData],
            });
        };
        this.getBlockByHash = function (_a) {
            var hash = _a.hash, detailed = _a.detailed;
            return _this.citaFetch({
                method: CITA_METHODS.GET_BLOCK_BY_HASH,
                params: [hash, detailed],
            });
        };
        this.getBlockByNumber = function (_a) {
            var quantity = _a.quantity, detailed = _a.detailed;
            return _this.citaFetch({
                method: CITA_METHODS.GET_BLOCK_BY_NUMBER,
                params: [quantity, detailed],
            });
        };
        this.getTransactionReceipt = function (hash) {
            return _this.citaFetch({
                method: CITA_METHODS.ETH_GET_TRANSACTION_RECEIPT,
                params: [hash],
            });
        };
        this.citaFetchIns = axios_1.default.create({
            url: server,
        });
        this.citaFetch = function (_params) {
            return _this.citaFetchIns
                .post(server, exports.JSONRPC(_params))
                .then(function (res) {
                var data = res.data, status = res.status;
                if (status !== 200)
                    throw new Error('Error Status');
                return data;
            })
                .then(function (data) {
                var _a = data.result, result = _a === void 0 ? 'No Result' : _a, error = data.error;
                if (error)
                    throw error;
                return result;
            })
                .catch(function (err) {
                console.error(err);
                throw err;
            });
        };
    }
    return CITA;
}());
exports.CITA = CITA;
var citaWeb3Plugin = function (_a) {
    var web3 = _a.web3, server = _a.server;
    return { web3: web3, CITA: new CITA(server) };
};
exports.default = citaWeb3Plugin;
