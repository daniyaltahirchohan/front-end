import React, { useEffect, useState } from 'react'
import { Container, Button, Card } from 'react-bootstrap';
import { myBalance, withdraw } from '../blockchain/functions'
import { BigNumber } from 'ethers'

const MyBalance = (props) => {

  const _widhdraw = () => {
    withdraw(props.blockchainData.blockchain.selectedContract)
  }

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ marginTop: '30px' }}>
          <Card style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
            <Card.Body>
              <Card.Title>Balance of {props.blockchainData.blockchain.account.account}</Card.Title>
              <Card.Text style={{ wordWrap: 'break-word' }}>{props.blockchainData.blockchain.account.balance}</Card.Text>
            </Card.Body>
          </Card>
      </div>
      <Button onClick={_widhdraw}>widhdraw</Button>
  </div>
  )
}

export default MyBalance