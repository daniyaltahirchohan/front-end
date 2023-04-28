import { connect } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import { setAccount, setAccountBalance, addContract, selectContract, setConnection } from "../store/actions/blockchainActions";

const mapStateToProps = state => ({
    blockchainData: state
})

const mapDispatchToProps = dispatch => ({
    addSetAccountHandler: data => dispatch(setAccount(data)),
    addAccountBalanceHandler: data => dispatch(setAccountBalance(data)),
    addContractHandler: data => dispatch(addContract(data)),
    addSelectContractHandler: data => dispatch(selectContract(data)),
    addConnection: data => dispatch(setConnection(data))
})


export default connect(mapStateToProps,mapDispatchToProps) (NavigationBar)