declare enum CITA_METHODS {
  NET_PEER_COUNT = 'net_peerCount',
  CITA_BLOCK_NUMBER = 'cita_blockNumber',
  SEND_TRANSACTION = 'cita_sendTransaction',
  GET_BLOCK_BY_HASH = 'cita_getBlockByHash',
  GET_BLOCK_BY_NUMBER = 'cita_getBlockByNumber',
  ETH_GET_TRANSACTION_RECEIPT = 'eth_getTransactionReceipt',
  ETH_GET_LOGS = 'eth_getLogs',
  ETH_CALL = 'eth_call',
  CITA_GET_TRANSACTION = 'cita_getTransaction',
  ETH_GET_TRANSACTION_COUNT = 'eth_getTransactionCount',
  ETH_GET_CODE = 'eth_getCode',
  ETH_GET_ABI = 'eth_getAbi',
  ETH_NEW_FILTER = 'eth_newFilter',
  ETH_NEW_BLOCK_FILTER = 'eth_newBlockFilter',
  ETH_UNINSTALL_FILTER = 'eth_uninstallFilter',
  ETH_GET_FILTER_CHANGES = 'eth_getFilterChanges',
  ETH_GET_FILTER_LOGS = 'eth_getFilterLogs',
  CITA_GET_TRANSACTION_PROOF = 'cita_getTransactionProof',
}

declare type RPCParam = string | number | boolean
declare type SignedData = string
declare type Hash = string
declare type Detailed = boolean
declare type BlockNumber = string
declare type ID = number
declare type Server = string

declare type Result = string | object
declare interface JSONRPCError {
  code: string
  message: string
}
declare interface IJSONRPCParams {
  method: CITA_METHODS
  params: RPCParam[]
  id?: ID
}
declare interface IJSONRPC {
  jsonrpc: string
  method: CITA_METHODS | string
  params: RPCParam[]
  id: ID
}

declare interface IJSONRPCResponse {
  jsonrpc: string
  id: ID
  error?: JSONRPCError
  result?: Result
}
