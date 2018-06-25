import axios, { AxiosInstance } from 'axios'
import {
  toHex,
  blockNumberFormatter,
  hashFormatter,
  transactionParser,
  blockParser,
} from './utils/parser'
export * from './typings'
import {
  BlockNumber,
  IJSONRPC,
  IJSONRPCParams,
  Server,
  Result,
  JSONRPCError,
  IJSONRPCResponse,
  METHODS,
  SignedData,
  Hash,
  BlockTransactionInfo,
  Block,
  Transaction,
} from './typings'
export {
  BlockNumber,
  IJSONRPC,
  IJSONRPCParams,
  Server,
  Result,
  JSONRPCError,
  IJSONRPCResponse,
  METHODS,
  SignedData,
  Hash,
  BlockTransactionInfo,
  Block,
  Transaction,
}

export const JSONRPC = ({
  method,
  params = [],
  id = Math.round(Math.random() * 100),
}: IJSONRPCParams): IJSONRPC => ({
  jsonrpc: '2.0',
  method,
  params,
  id,
})

export class CITA {
  // public server:string

  citaFetchIns: AxiosInstance
  citaFetch: (config: IJSONRPCParams) => Promise<Result | JSONRPCError>
  constructor(server: Server) {
    this.citaFetchIns = axios.create({
      method: 'POST',
      url: server,
    })
    this.citaFetch = _params =>
      this.citaFetchIns({ data: JSONRPC(_params) })
        .then(res => {
          const { data, status } = res
          if (status !== 200) throw new Error('Error Status')
          return data
        })
        .then((data: IJSONRPCResponse) => {
          const { result = 'No Result', error } = data
          if (error) throw error
          return result
        })
        .catch(err => {
          throw err
        })
  }

  setServer = (server: string) => {
    this.citaFetchIns = axios.create({
      method: 'POST',
      url: server,
    })
  }

  netPeerCount = () =>
    this.citaFetch({
      method: METHODS.PEER_COUNT,
      params: [],
    })
  /**
   * @function getBlockNumber null
   * @returns
   */
  getBlockNumber = () =>
    this.citaFetch({
      method: METHODS.BLOCK_NUMBER,
      params: [],
    })

  sendTransaction = (signedData: SignedData) =>
    this.citaFetch({
      method: METHODS.SEND_TRANSACTION,
      params: [signedData],
    })
  getBlockByHash = ({
    hash,
    txInfo,
  }: {
    hash: Hash
    txInfo: BlockTransactionInfo
  }) =>
    this.citaFetch({
      method: METHODS.GET_BLOCK_BY_HASH,
      params: [hashFormatter(hash), !!txInfo],
    }).then(block => {
      if ((block as Block).body) {
        return blockParser(block as Block)
      }
      return block
    })
  getBlockByNumber = ({
    quantity,
    txInfo,
  }: {
    quantity: BlockNumber
    txInfo: BlockTransactionInfo
  }) =>
    this.citaFetch({
      method: METHODS.GET_BLOCK_BY_NUMBER,
      params: [blockNumberFormatter(quantity), !!txInfo],
    }).then(block => {
      if ((block as Block).body) {
        return blockParser(block as Block)
      }
      return block
    })

  getTransactionReceipt = (hash: Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_RECEIPT,
      params: [hashFormatter(hash)],
    })
  getLogs = (
    {
      topics = [],
      fromBlock = '0x0',
    }: {
      topics: Hash[]
      fromBlock: BlockNumber
    } = { topics: [], fromBlock: '0x0' },
  ) =>
    this.citaFetch({
      method: METHODS.GET_LOGS,
      params: [
        {
          topics,
          fromBlock,
        },
      ],
    })
  ethCall = ({
    from,
    to,
    data,
    blockNumber,
  }: {
    from: Hash
    to: Hash
    data: string
    blockNumber: BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.CALL,
      params: [
        {
          from,
          to,
          data,
        },
        blockNumberFormatter(blockNumber),
      ],
    })
  getTransaction = (hash: Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION,
      params: [hashFormatter(hash)],
    }).then(tx => transactionParser(tx as Transaction))
  getTransactionCount = ({
    addr,
    blockNumber,
  }: {
    addr: Hash
    blockNumber: BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_COUNT,
      params: [addr, blockNumberFormatter(blockNumber)],
    })
  getCode = ({
    contractAddr,
    blockNumber,
  }: {
    contractAddr: Hash
    blockNumber: BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.GET_CODE,
      params: [contractAddr, blockNumberFormatter(blockNumber)],
    })
  getAbi = ({ addr, blockNumber }: { addr: Hash; blockNumber: BlockNumber }) =>
    this.citaFetch({
      method: METHODS.GET_ABI,
      params: [addr, blockNumberFormatter(blockNumber)],
    })
  // TODO: newFilter
  // TODO: newBlockFilter
  // TODO: uninstallFilter
  // TODO: getFilterChanges
  // TODO: getFilterLogs
  getTransactionProof = (hash: Hash) =>
    this.citaFetch({
      method: METHODS.GET_TRANSACTION_PROOF,
      params: [hash],
    })

  /*
   * @function getBlockHistory
   * @param {object} {by: string, count: integer} - by: height, to: count of record
   * @return Blokc[]
   */
  getBlockHistory = ({
    by,
    count = 10,
  }: {
    by: BlockNumber
    count: number
  }) => {
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
    )
  }

  metadata = ({ blockNumber }: { blockNumber: Hash }) =>
    this.citaFetch({
      method: METHODS.METADATA,
      params: [blockNumber],
    })

  /**
   * @method getBalance
   * @description query token balance at address
   * @param {string} addr - account address
   * @param {string} quantity - block number
   */
  getBalance = ({
    addr,
    quantity = 'latest',
  }: {
    addr: Hash
    quantity?: BlockNumber
  }) =>
    this.citaFetch({
      method: METHODS.GET_BALANCE,
      params: [addr, blockNumberFormatter(quantity)],
    })
}

const nervosWeb3Plugin = ({ Web3, server }: { Web3?: any; server: Server }) => {
  const web3 = Web3 ? new Web3(new Web3.providers.HttpProvider(server)) : null
  return { web3, Nervos: new CITA(server) }
}

export default nervosWeb3Plugin
