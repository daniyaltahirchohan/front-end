import { connect } from "react-redux"
import MyBalance from "../components/MyBalance"

const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (MyBalance)