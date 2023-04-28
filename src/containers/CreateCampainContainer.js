import { connect } from "react-redux";
import CreateCampain from '../components/CreateCampain'

const mapStateToProps = state => ({
    blockchainData: state
})

export default connect(mapStateToProps) (CreateCampain)