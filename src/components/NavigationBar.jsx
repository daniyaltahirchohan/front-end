import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Button, Dropdown, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './NavigationBar.css'
import { connectWeb3, connectWeb3half } from '../blockchain/connect';
import { myBalance } from "../blockchain/functions";
import BigNumber from 'bignumber.js';

const NavigationBar = (props) => {

  console.log(props.blockchainData)

  const [showMenu, setShowMenu] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [blockchainData, setblockchainData] = useState(undefined)
  const [myBalanceAmount, setmyBalanceAmount] = useState(0)
  const [loading, setloading] = useState(false)

  const handleConnect = () => {
    setWalletAddress('0x1234567890abcdef')
  }

  const handleDisconnect = () => {
    setWalletAddress('')
  }

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }


  const connectBlockchain = async () => {

    setloading(true)
    connectWeb3(props.addSetAccountHandler, props.addContractHandler, props.addSelectContractHandler,props.addConnection,props.addAccountBalanceHandler)
    
  }

  useEffect(() => {

    if(props.blockchainData.blockchain.account.account !== undefined){
      setWalletAddress(props.blockchainData.blockchain.account.account)
      setmyBalanceAmount(props.blockchainData.blockchain.account.balance)
      setloading(false)
    }
      
  }, [props])

  useEffect(() => {
    
    setTimeout(() => {
      connectWeb3half( props.addContractHandler, props.addSelectContractHandler,props.addConnection)
    }, 200)

  }, [])
  

  

  
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle onClick={handleMenuClick} aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/campains">Campaigns</Nav.Link>
          <Nav.Link as={Link} to="/createcampain">Create Campaign</Nav.Link>
        </Nav>
        <Nav>
          {loading? (
            <Button variant="primary" className='navButtonPrimum'>Loading...</Button>
          ) : (
            walletAddress ? (
              <Dropdown>
                <Dropdown.Toggle style={{backgroundColor: '#2E3D4F', color: 'white', border: 'none'}}>
                  <i className="fas fa-user-circle"></i> {props.blockchainData.blockchain.account.account.substring(0, 7) + "..."}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{backgroundColor: '#2E3D4F', margin: '0px 0px 0px -24px'}}>
                  <Dropdown.Item as={Link} to="/mybalance" style={{color: 'black', padding: '4px'}}>
                    <Card>
                      <Card.Title>
                        Balance
                      </Card.Title>
                      <Card.Text style={{textAlign: 'center'}}>
                        {myBalanceAmount}
                      </Card.Text>
                    </Card>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mycampains" style={{color: 'white'}}>My Campaigns</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mydonations" style={{color: 'white'}}>My Donations</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          ) : (
            <Button className='navButtonPrimum' variant="primary" onClick={connectBlockchain}>
              Connect
            </Button>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar