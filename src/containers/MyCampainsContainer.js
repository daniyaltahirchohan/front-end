import { connect } from "react-redux";
import MyCampains from '../components/MyCampains'

const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (MyCampains)