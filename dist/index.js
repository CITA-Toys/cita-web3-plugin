"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
})(CITA_METHODS || (CITA_METHODS = {}));
var JSONRPC = function (_a) {
    var method = _a.method, params = _a.params, id = _a.id;
    return ({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: id,
    });
};
var CITA_SERVER = process.env.CITA_SERVER;
var citaFetchIns = axios_1.default.create({
    baseURL: window.localStorage.getItem('cita_server') || CITA_SERVER,
    method: 'POST',
    timeout: 5000,
});
var citaFetch = function (_a) {
    var method = _a.method, params = _a.params;
    return citaFetchIns({
        data: JSONRPC({
            method: method,
            params: params,
            id: 1,
        }),
    })
        .then(function (res) {
        var data = res.data, status = res.status;
        if (status !== 200)
            throw new Error('Error Status');
        return data;
    })
        .then(function (data) {
        var result = data.result, error = data.error;
        if (error)
            throw error;
        return result;
    })
        .catch(function (err) {
        console.error(err);
        throw err;
    });
};
var CITA = (function () {
    function CITA() {
    }
    CITA.postId = 0;
    CITA.netPeerCount = function () {
        return citaFetch({
            method: CITA_METHODS.NET_PEER_COUNT,
            params: [],
            id: 1,
        });
    };
    CITA.getBlockNumber = function () {
        return citaFetch({
            method: CITA_METHODS.CITA_BLOCK_NUMBER,
            params: [],
            id: 1,
        });
    };
    CITA.sendTransaction = function (signedData) {
        return citaFetch({
            method: CITA_METHODS.SEND_TRANSACTION,
            params: [signedData],
            id: 1,
        });
    };
    CITA.getBlockByHash = function (_a) {
        var hash = _a.hash, detailed = _a.detailed;
        return citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_HASH,
            params: [hash, detailed],
            id: 1,
        });
    };
    CITA.getBlockByNumber = function (_a) {
        var quantity = _a.quantity, detailed = _a.detailed;
        return citaFetch({
            method: CITA_METHODS.GET_BLOCK_BY_NUMBER,
            params: [quantity, detailed],
            id: 1,
        });
    };
    CITA.getTransactionReceipt = function (hash) {
        return citaFetch({
            method: CITA_METHODS.ETH_GET_TRANSACTION_RECEIPT,
            params: [hash],
            id: 1,
        });
    };
    return CITA;
}());
exports.default = (function (web3) {
    if (typeof web3 !== 'undefined') {
        return __assign({}, web3, { CITA: CITA });
    }
    return { CITA: CITA };
});
