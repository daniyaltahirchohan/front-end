import { ADD_CONTRACT, CONNECT_CONTRACT, SET_ACCOUNT_BALANCE, SET_ACCOUNT, SET_CONNECTION } from "../constants/ActionTypes"

export const setAccount =  (address) => ({type: SET_ACCOUNT,payload: address})
export const setAccountBalance = (balance) => ({type: SET_ACCOUNT_BALANCE,payload: balance})
export const addContract = (contract) => ({type: ADD_CONTRACT, payload: contract})
export const selectContract = (contract) => ({type: CONNECT_CONTRACT, payload: contract})
export const setConnection = (connectionwhich) => ({type: SET_CONNECTION, payload: connectionwhich})


