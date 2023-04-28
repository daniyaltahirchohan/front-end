import { SET_ACCOUNT,SET_ACCOUNT_BALANCE,ADD_CONTRACT,CONNECT_CONTRACT,SET_CONNECTION } from "../constants/ActionTypes"

const initialState = {
    account: {
        address: undefined,
        balance: undefined
    },
    contract: {
        address: undefined,
        abis: undefined
    },
    conectedContract: undefined,
    connection: "half"
}

const blockchainReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_ACCOUNT: 
            return {...state,account: {...state,account: action.payload}}
            break
        case SET_ACCOUNT_BALANCE:
            return {...state, account: {...state.account,balance: action.payload}}
            break
        case ADD_CONTRACT:
            return {...state, contracts: {...state.contract,abis: action.payload}}
            break
        case CONNECT_CONTRACT:
            return {...state, selectedContract: action.payload}
            break
        case SET_CONNECTION:
            return {...state,connection: action.payload}
            break
        default:
            return state
    }
    
}

export default blockchainReducer