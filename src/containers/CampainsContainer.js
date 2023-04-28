import { connect } from "react-redux"
import Campains from "../components/Campains"

const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (Campains)

