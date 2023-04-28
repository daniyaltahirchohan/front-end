import { connect } from "react-redux"
import Campain from "../components/Campain"

const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (Campain)