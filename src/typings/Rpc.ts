import { METHODS } from './index'
import { BasicTypes } from './BasicTypes'
import { Chain } from './Chain'

export type RPCParam = any
export namespace RpcRequest {
  export interface Params {
    method: METHODS
    params: RPCParam[]
    id?: BasicTypes.ID
  }
  export interface Request extends Params {
    jsonrpc: '2.0'
    id: BasicTypes.ID
  }
}

export namespace RpcResult {
  export interface JSONRPC {
    id: BasicTypes.ID
    jsonrpc: BasicTypes.JSONRPC_VERSION
    error?: {
      code: BasicTypes.ErrorCode
      message: BasicTypes.ErrorMessage
    }
  }
  export type PeerCount = string

  export type BlockNumber = BasicTypes.BlockNumber

  export type BlockByHash = Chain.Block<Chain.TransactionInBlock>
  export type BlockByNumber = Chain.Block<Chain.TransactionInBlock>
  export type TransactionReceipt = Chain.TransactionReceipt
  export interface sendRawTransaction {
    hash: BasicTypes.Hash
    status: string
  }

  export type Logs = Chain.Log[]
  export type Transaction = Chain.Transaction

  export type TransactionCount = string

  export type Code = string
  export type Abi = string

  export type Balance = string

  export type newFilter = string

  export type newBlockFilter = string

  export type uninstallFilter = boolean

  export type FilterChanges = Chain.Log[]

  export type FilterLogs = Chain.Log[]

  export type TransactionProof = BasicTypes.Hash

  export type MetaData = Chain.MetaData

  export interface Error {
    code: BasicTypes.ErrorCode
    message: BasicTypes.ErrorMessage
  }

  export type Result =
    | PeerCount
    | BlockNumber
    | BlockByHash
    | BlockByNumber
    | TransactionReceipt
    | sendRawTransaction
    | Logs
    | Transaction
    | TransactionCount
    | Code
    | Abi
    | Balance
    | newFilter
    | newBlockFilter
    | uninstallFilter
    | FilterChanges
    | FilterLogs
    | TransactionProof
    | MetaData
  export interface Response extends JSONRPC {
    result: Result
    error: Error
  }
}
