import { ethers,Signer } from 'ethers'
import { BigNumber } from 'ethers'
import store from '../store'
//import { addContract, selectContract, setAccount, setAccountBalance } from '../store/actions/blockchainActions'
import Croudfunding from './abis/CrowdfundingPakistan.json'

function etherToWei(ether) {
    const weiPerEther = 1000000000000000000;
    console.log(Math.floor(ether * weiPerEther))
    return Math.floor(ether * weiPerEther);
}

const convertValue = (_amount) => { 
      const amountraw = BigNumber.from(_amount)
      const amount = amountraw.toNumber()
      return (amount / 10**10).toFixed(18)
}


export const connectWeb3 = async (_addSetAccountHandler, _addContractHandler, _addSelectContractHandler, _addConection, _addBalance,contractAbi = Croudfunding) => {

    const connectionString = {
        provider: undefined,
        signer: undefined,
        contract: undefined,
        contractWithSigner: undefined,
        account:{
            address: undefined,
            balance: undefined
        },
        connection: "full"
    }

     if(window.ethereum){

        connectionString.provider = new ethers.providers.Web3Provider(window.ethereum)

        connectionString.signer = await connectionString.provider.getSigner()

        connectionString.account.address = await connectionString.provider.send("eth_requestAccounts",[])
        connectionString.account.address = await connectionString.provider.getBalance("ethers.eth")
        connectionString.signer.getAddress()
        .then((response) => {
            connectionString.account.address = response
            _addSetAccountHandler(response)
            console.log(connectionString.account.address)
        })
        .catch((error) => {
            console.log(error)
        })



        connectionString.contract = new ethers.Contract(contractAbi.address,contractAbi.abi,connectionString.signer)
        _addContractHandler(connectionString.contract)
        connectionString.contractWithSigner = connectionString.contract
        connectionString.contractWithSigner.connect(connectionString.signer)

        _addSelectContractHandler(connectionString.contractWithSigner)

        connectionString.contractWithSigner.myBalance()
        .then((responer) => { 
            _addBalance(etherToWei(convertValue(responer._hex)))
        })


        _addConection("full")

        

    } else {
        alert("Found no wallet do install one and try again.")
    }
    
}

export const connectWeb3half = async (_addContractHandler, _addSelectContractHandler, _addConection, contractAbi = Croudfunding) => {

    const connectionString = {
        provider: undefined,
        signer: undefined,
        contract: undefined,
        contractWithSigner: undefined,
        account:{
            address: undefined,
            balance: undefined
        },
        connection: "half"
    }

     if(window.ethereum){

        connectionString.provider = new ethers.providers.Web3Provider(window.ethereum)

        connectionString.contract = new ethers.Contract(contractAbi.address,contractAbi.abi,connectionString.provider)
        _addContractHandler(connectionString.contract)
        connectionString.contractWithSigner = connectionString.contract

        _addSelectContractHandler(connectionString.contractWithSigner)

        _addConection("half")

        

    } else {
        alert("Found no wallet do install one and try again.")
    }
    
}