import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import './Campain.css'
import Button from 'react-bootstrap/Button'
import { donateToCampain, getAmountCollected, getCampainById, getDonators, getNoOfDonators, getStatus, releseFunds, terminateCampain } from '../blockchain/functions';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { Form, ToastContainer } from 'react-bootstrap';

const Campain = (props) => {

    const { where ,id } = useParams()

    const [data, setdata] = useState({})

    const [loading, setloading] = useState(true)

    const [amount, setamount] = useState(undefined)

    const [donators, setdonators] = useState([])

    const terminateC = () => { 
       
      terminateCampain(props.blockchainData.blockchain.selectedContract,id,amount)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    }

    

    const releseFundsC = () => { 

      releseFunds(props.blockchainData.blockchain.selectedContract,id)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

      

    }

    const donate = async (e) => { 

      e.preventDefault()
      console.log('clicked')
      await donateToCampain(props.blockchainData.blockchain.selectedContract,id,amount)
    
    }

    useEffect(() => {

        const campainData = {
            daysLeftDays: undefined,
            fundsCollected: undefined,
            target: undefined,
            noOfDonators: undefined,
            creator: undefined,
            details: undefined,
            title: undefined,
            imageLink: undefined,
            status: undefined,
            donators: []
      }


      getCampainById(props.blockchainData.blockchain.selectedContract,id)
      .then((response) => {
        console.log(response)
        const amountraw = new BigNumber(response[3]._hex)
        const amount = amountraw.toNumber()
        campainData.target = (amount / 10**10).toFixed(18);
        campainData.creator = response[0]
        campainData.title = response[1]
        campainData.details = response[2]
        campainData.imageLink = response[5].replace(/"/g, "")
        console.log(campainData.imageLink)

        const daysleft = parseInt(response[4]._hex, 16)
        console.log(daysleft)
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const targetTimestamp = daysleft
        const difference = targetTimestamp - currentTimestamp
        campainData.daysLeftDays = Math.ceil(difference / 86400)
        if(campainData.daysLeftDays <= 0){
            campainData.daysLeftDays = 0
        }
      })
      .catch((error) => {
        console.log(error)
      })

      getAmountCollected(props.blockchainData.blockchain.selectedContract,id)
      .then((response) => {
        const amountraw = new BigNumber(response._hex)
        const amount = amountraw.toNumber()
        campainData.fundsCollected = (amount / 10**10).toFixed(18);
      })
      .catch((error) => {
        console.log(error)
      })

      getNoOfDonators(props.blockchainData.blockchain.selectedContract,id)
      .then((response) => {
        campainData.noOfDonators = parseInt(response._hex,16)
      })
      .catch((error) => {
        console.log(error)
      })
 

      getDonators(props.blockchainData.blockchain.selectedContract,id)
      .then((response) => {
        console.log("donators")
        console.log(response)
        campainData.donators = response
        setdonators(response)
        console.log("campainData")
        console.log(campainData.donators)
      })
      .catch((error) => {
        console.log(error)
      })
        


      getStatus(props.blockchainData.blockchain.selectedContract,id)
      .then((result) => {
        switch (result) {
          case 0:
            campainData.status = "active"
          break;
          case 1:
            campainData.status = "completed"
          break;
          case 2:
            campainData.status = "terminated"
          break;
          case 3:
            campainData.status = "funds tracnfered"
          break;
          default:
            campainData.status = "undeclaired"
          break;
        }
      })
      .catch((error) => {
        console.log(error)
      })



      setTimeout(() => {
        setdata(campainData)
        setloading(false)
        console.log("data data")
      console.log(data.donators)
      }, 2000);



    }, [])
    

  return (
    <>
        {loading ? (
            <h1>Loading...</h1>
        ):(
            <Container>
                <Container style={{ padding: "50px 0" , outerWidth: "90%"}}>
                  <Card style={{padding: '5px', margin: 'auto', textAlign: 'center',backgroundColor: '#2E3D4F', color: 'white' }}>
                    <h1>Details of {data.title}</h1>
                  </Card>
                </Container>
                <Row md={1} lg={2}>
                    <Col sm={10}>
                        <Card>
                            <Card.Img src={`https://crowdfunding-dappcom.infura-ipfs.io/ipfs/${data.imageLink}`} />
                        </Card>
                    </Col>
                    <Row sm={1} md={3} lg={1}>
                        <Col>
                            <Card className='sideCard'>
                                <Card.Title>{data.daysLeftDays}</Card.Title>
                                <Card.Text>Days Left</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='sideCard'>
                                <Card.Title>{data.fundsCollected}</Card.Title>
                                <Card.Text>Reised of {data.target}</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='sideCard'>
                                <Card.Title>{data.noOfDonators}</Card.Title>
                                <Card.Text>Total Backers</Card.Text>
                            </Card>
                        </Col>
                    </Row>  
                </Row>
                <Row>
                    <Card className='downCard'>
                        <Card.Title>CREATOR</Card.Title>
                        <Card.Text>{data.creator}</Card.Text>
                    </Card>
                    <Card className='downCard'>
                        <Card.Title>STORY</Card.Title>
                        <Card.Text>{data.details}</Card.Text>
                    </Card>
                    <Card className='downCard'>
                        <Card.Title>Donators</Card.Title>
                        {donators.map((donator) => (
                            <Card.Text>{donator[0]}</Card.Text>
                        ))}
                        
                    </Card>
                </Row>
                {where === 'campains' ? (
                    data.daysLeftDays !== 0 && props.blockchainData.blockchain.connection === "full" ? (
                      <Form onSubmit={donate} variant="dark">
                        <Form.Group controlId="donateCampain">
                        <Form.Label>Donation form</Form.Label>
                        <Form.Control 
                          type="text"
                          placeholder='enter donation amount'
                          value={amount}
                          onChange={(e) => setamount(e.target.value)}
                        />
                        </Form.Group>
                        <Button variant='primary' type='submit'>donate</Button>
                      </Form>
                    ) : (
                      <div></div>
                    )
                ) : (
                    (data.daysLeftDays === 0 && data.status === 'active') ? (
                        <Button variant='primary' onClick={() => terminateC()}>Terminate</Button>
                    ) : (
                        (data.status === 'terminated' || data.status === 'completed') ? (
                        <Button variant='primary' onClick={() => releseFundsC()}>Relese Funds</Button>
                        ) : (
                            <div></div>
                        )
                    )
                )}
            </Container>
        )}
    </>
  )
}

export default Campain