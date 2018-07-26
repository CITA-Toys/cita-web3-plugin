import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { toHex, blockNumberFormatter, hashFormatter, transactionParser, blockParser } from './utils/parser'
export { BasicTypes, RpcRequest, RpcResult, Chain, METHODS, BlockTransactionInfo } from './typings'

import { BasicTypes, RpcRequest, RpcResult, METHODS, Chain, BlockTransactionInfo } from './typings'
export const JSONRPC = ({
  method,
  params = [],
  id = Math.round(Math.random() * 100),
}: RpcRequest.Params): RpcRequest.Request => ({
  jsonrpc: '2.0',
  method,
  params,
  id,
})

export class Nervos {
  public server: string
  public citaFetchIns: AxiosInstance
  public citaFetch: (config: RpcRequest.Params) => Promise<RpcResult.Result>
  public constructor(server: string) {
    this.server = server
    this.citaFetchIns = axios.create({
      method: 'POST',
      url: this.server,
    })
    this.citaFetch = _params =>
      this.citaFetchIns({
        data: JSONRPC(_params),
      })
        .then((res: AxiosResponse) => {
          const { data, status } = res
          if (status !== 200) throw new Error('Error Status')
          if (data.error) {
            throw new Error(data.error)
          }
          return data.result
        })
        .catch(err => {
          throw err
        })
  }

  public setServer = (server: string) => {
    this.server = server
    this.citaFetchIns = axios.create({
      method: 'POST',
      url: this.server,
    })
  }

  public netPeerCount = () =>
    this.citaFetch({
      method: METHODS.PEER_COUNT,
      params: [],
    }) as Promise<RpcResult.PeerCount>
  /**
   * @function getBlockNumber null
   * @returns
   */
  public getBlockNumber = () =>
    this.citaFetch({
      method: METHODS.BLOCK_NUMBER,
      params: [],
    }) as Promise<RpcResult.BlockNumber>

  public sendSignedTransaction = (signedData: string) =>
    this.citaFetch({
      method: METHODS.SEND_RAW_TRANSACTION,
      params: [signedData],
    }) as Promise<RpcResult.sendRawTransaction>
  // TODO: Parsed Block Type
  public getBlockByHash = ({ hash, txInfo }: { hash: BasicTypes.Hash; txInfo: BlockTransactionInfo }) =>
    this.citaFetch({
      method: METHODS.GET_BLOCK_BY_HASH,
      params: [hashFormatter(hash), !!txInfo],
    }).then(block => {
      if ((block as RpcResult.BlockByHash).body) {
        return blockParser(block as RpcResult.BlockByHash)
      }
      return block
    })
  // TODO: Parsed Block Type
  public getBlockByNumber = ({
    quantity,
    txInfo,
  }: {
    quantity: BasicTypes.BlockNumber
    txInfo: BlockTransactionInfo
  }) =>
    this.citaFetch({
      method: METHODS.GET_BLOCK_BY_NUMBER,
      params: [blockNumberFormatter(quantity), !!txInfo],
    }).then(block => {
      if ((block as RpcResult.BlockByNumber).body) {
        return blockParser(block as RpcResult.BlockByNumber)
      }
      return block
    })

  public getTransactionReceipt = (hash: BasicTypes.Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_RECEIPT,
      params: [hashFormatter(hash)],
    }) as Promise<RpcResult.TransactionReceipt>
  public getLogs = (
    { topics = [], fromBlock = '0x0' }: { topics: BasicTypes.Hash[]; fromBlock: BasicTypes.BlockNumber } = {
      topics: [],
      fromBlock: '0x0',
    },
  ) =>
    this.citaFetch({
      method: METHODS.GET_LOGS,
      params: [
        {
          topics,
          fromBlock,
        },
      ],
    }) as Promise<RpcResult.Logs>
  public ethCall = ({
    callObject,
    blockNumber,
  }: {
    callObject: {
      from?: BasicTypes.Hash
      to: BasicTypes.Hash
      data: string
    }
    blockNumber: BasicTypes.BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.CALL,
      params: [callObject, blockNumberFormatter(blockNumber)],
    })
  //TODO: Parsed Transaction
  public getTransaction = (hash: BasicTypes.Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION,
      params: [hashFormatter(hash)],
    }).then(tx => transactionParser(tx as RpcResult.Transaction))
  public getTransactionCount = ({
    addr,
    blockNumber,
  }: {
    addr: BasicTypes.Hash
    blockNumber: BasicTypes.BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_COUNT,
      params: [addr, blockNumberFormatter(blockNumber)],
    }) as Promise<RpcResult.TransactionCount>
  public getCode = ({
    contractAddr,
    blockNumber,
  }: {
    contractAddr: BasicTypes.Hash
    blockNumber: BasicTypes.BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.GET_CODE,
      params: [contractAddr, blockNumberFormatter(blockNumber)],
    }) as Promise<RpcResult.Code>
  public getAbi = ({ addr, blockNumber }: { addr: BasicTypes.Hash; blockNumber: BasicTypes.BlockNumber }) =>
    this.citaFetch({
      method: METHODS.GET_ABI,
      params: [addr, blockNumberFormatter(blockNumber)],
    }) as Promise<RpcResult.Abi>
  public getTransactionProof = (hash: BasicTypes.Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_PROOF,
      params: [hash],
    }) as Promise<RpcResult.TransactionProof>

  /*
   * @function getBlockHistory
   * @param {object} {by: string, count: integer} - by: height, to: count of record
   * @return Blokc[]
   */
  public getBlockHistory = ({ by, count = 10 }: { by: BasicTypes.BlockNumber; count: number }) => {
    let blockNumbers = []
    for (let i = 0; i < count; i++) {
      blockNumbers.push(toHex(+by - i))
    }
    return Promise.all(
      blockNumbers.map(blockNumber =>
        this.getBlockByNumber({
          quantity: blockNumber,
          txInfo: BlockTransactionInfo.Detail,
        }),
      ),
    ) as Promise<RpcResult.BlockByNumber[]>
  }

  public metadata = ({ blockNumber = 'latest' }: { blockNumber: BasicTypes.Hash }) =>
    this.citaFetch({
      method: METHODS.METADATA,
      params: [blockNumber],
    }) as Promise<RpcResult.MetaData>

  /**
   * @method getBalance
   * @description query token balance at address
   * @param {string} addr - account address
   * @param {string} quantity - block number
   */
  public getBalance = ({ addr, quantity = 'latest' }: { addr: BasicTypes.Hash; quantity?: BasicTypes.BlockNumber }) =>
    this.citaFetch({
      method: METHODS.GET_BALANCE,
      params: [addr, blockNumberFormatter(quantity)],
    }) as Promise<RpcResult.Balance>

  /**
   * @method newFilter
   * @desc create new filter
   * @param {Array<topic>} topics
   * @return {string} filterId
   */
  public newFilter = (topics: string[]) =>
    this.citaFetch({
      method: METHODS.NEW_FILTER,
      params: [{ topics }],
    }) as Promise<RpcResult.newFilter>

  /**
   * @method newBlockFilter
   * @desc create new block filter
   * @param None
   * @return {string} filterId
   */
  public newBlockFilter = () =>
    this.citaFetch({
      method: METHODS.NEW_BLOCK_FILTER,
      params: [],
    }) as Promise<RpcResult.newBlockFilter>

  /**
   * @method uninstallFilter
   * @desc uninstall filter
   * @param {string} filterId
   * @return {boolean} success
   */
  public uninstallFilter = (filterId: string) =>
    this.citaFetch({
      method: METHODS.UNINSTALL_FILTER,
      params: [filterId],
    }) as Promise<RpcResult.uninstallFilter>

  /**
   * @method getFilterChanges
   * @desc get filter changes
   * @param {string} filterId
   * @return {Array<Result>} logArray
   */
  public getFilterChanges = (filterId: string) =>
    this.citaFetch({
      method: METHODS.GET_FILTER_CHANGES,
      params: [filterId],
    }) as Promise<RpcResult.FilterChanges>

  public getFilterLogs = this.getFilterChanges
}

const nervosWeb3Plugin = ({ Web3, server }: { Web3?: any; server: string }) => {
  const web3 = Web3 ? new Web3(new Web3.providers.HttpProvider(server)) : null
  return { web3, Nervos: new Nervos(server) }
}

export default nervosWeb3Plugin
