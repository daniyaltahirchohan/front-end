import { connect } from "react-redux"
import MyFundingsDetails from "../components/MyFundingsDetails";


const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (MyFundingsDetails)