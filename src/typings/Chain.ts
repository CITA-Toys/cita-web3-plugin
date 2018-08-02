import { BasicTypes } from './basicTypes'

export type BasicInfo =
  | string
  | {
      from: BasicTypes.Hash
      to: BasicTypes.Hash
      value: string
      data: string
    }

export namespace Chain {
  export interface TransactionInBlock {
    hash: BasicTypes.Hash
    content: BasicTypes.TransactionContent
    basicInfo?: BasicInfo
  }
  export interface Transaction extends TransactionInBlock {
    blockNumber: BasicTypes.BlockNumber
    blockHash: BasicTypes.Hash
    index: string
  }
  export interface BlockHeader {
    timestamp: number
    prevHash: BasicTypes.Hash
    number: string
    gasUsed: string
    proposer: BasicTypes.Hash
    receiptsRoot: BasicTypes.Hash
    stateRoot: BasicTypes.Hash
    transactionsRoot: BasicTypes.Hash
    proof: {
      Tendermint: {
        proposal: BasicTypes.Hash
        height: number
        round: number
        commits: {
          [hash: string]: BasicTypes.Hash
        }
      }
    }
  }
  export interface Block<T> {
    version: number
    hash: BasicTypes.Hash
    header: BlockHeader
    stateRoot: BasicTypes.Hash
    transactionsRoot: BasicTypes.Hash
    receiptsRoot: BasicTypes.Hash
    gasUsed: string
    number: string
    proposer: BasicTypes.Hash
    body: {
      transactions: T[]
    }
  }
  export interface TransactionReceipt {
    transactionHash: BasicTypes.Hash
    transactionIndex: string
    blockHash: BasicTypes.Hash
    blockNumber: string
    cumulativeGasUsed: string
    gasUsed: string
    contractAddress: BasicTypes.Hash | null
    logs: Log[]
    root: BasicTypes.Hash
    errorMessage: string
  }

  export interface Log {
    address: BasicTypes.Hash
    topics: BasicTypes.Hash[]
    data: string
    blockHash: BasicTypes.Hash
    blockNumber: string
    transactionHash: BasicTypes.Hash
    transactionIndex: string
    logIndex: string
    transactionLogIndex: string
  }

  export interface MetaData {
    chainId: number
    chainName: string
    operator: string
    website: string
    genesisTimestamp: number
    validators: BasicTypes.Hash[]
    blockInterval: number
    tokenName: string
    tokenSymbol: string
    tokenAvatar: string
  }
}
