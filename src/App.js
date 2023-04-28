import './App.css'
import { connectWeb3 } from './blockchain/connect'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBarContainer from './containers/NavigationBarContainer'
import Home from './components/Home'
import Footer from './components/Footer'
import CreateCampainContainer from './containers/CreateCampainContainer'
import CampainsContainer from './containers/CampainsContainer'
import MyCampainsContainer from './containers/MyCampainsContainer'
import CampainContainer from './containers/CampainContainer'
import MyFundingsDetailsContainer from './containers/MyFundingsDetailsContainer'
import MyBalanceContainer from './containers/MyBalanceContainer'

function App() {
  const [blockchainData, setBlockchainData] = useState(undefined)

  const connectBlockchain = () => {
    connectWeb3(setBlockchainData)
  }

  useEffect(() => {
    console.log(blockchainData)
  }, [blockchainData])

  return (
    <div className="App">
      <NavigationBarContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/campains" element={<CampainsContainer />} />
        <Route path="/createcampain" element={<CreateCampainContainer />} />
        <Route path="/mybalance" element={<MyBalanceContainer />} />
        <Route path="/mycampains" element={<MyCampainsContainer />} />
        <Route path="/mydonations" element={<MyFundingsDetailsContainer />} />
        <Route path="/campain/:where/:id" element={<CampainContainer />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
