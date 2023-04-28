import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { getStatus } from '../blockchain/functions'

const CampainCard = (props) => {

  console.log(props.imageLink)
  console.log(props.title)
  console.log(props.daysLeft)
  console.log(props.campainId)

  const [data, setdata] = useState({})
  const [loading, setloading] = useState(true)


  useEffect(() => {

    const campainCardData = {
      imageLink: undefined,
      title: undefined,
      daysLeft: undefined,
      campainId: undefined,
      status: undefined,
    }



    const daysleft = parseInt(props.daysLeft, 16)
    console.log(daysleft)
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const targetTimestamp = daysleft
    const difference = targetTimestamp - currentTimestamp
    const daysLeftDays = Math.ceil(difference / 86400)

    campainCardData.daysLeft = daysLeftDays


    if(daysLeftDays <= 0){
      campainCardData.daysLeft = 0
    } else {
      campainCardData.daysLeft = daysLeftDays
    }
    
    campainCardData.imageLink = props.imageLink

    campainCardData.title = props.title

    campainCardData.campainId = props.campainId

      getStatus(props.selectedcontract,props.campainId)
      .then((result) => {
        switch (result) {
          case 0:
            campainCardData.status = "active"
          break;
          case 1:
            campainCardData.status = "completed"
          break;
          case 2:
            campainCardData.status = "terminated"
          break;
          case 3:
            campainCardData.status = "funds tracnfered"
          break;
          default:
            campainCardData.status = "undeclaired"
          break;
        }
      })
      .catch((error) => {
        console.log(error)
      })

      setTimeout(() => {
        setdata(campainCardData)
        setloading(false)
      }, 2000)

  }, [])
  

  
  
  return (
    <>
    {loading ?(
      <h1>Loading...</h1>
    ) : (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://crowdfunding-dappcom.infura-ipfs.io/ipfs/${data.imageLink}`} />
      <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{`Days Left: ${data.daysLeft}`}</Card.Text>
          <Card.Text>{`status: ${data.status}`}</Card.Text>
          <Button variant="primary" as={ Link } to={`/campain/${props.location}/${data.campainId}`}>Details</Button>
      </Card.Body>
      </Card>
    )}
    </>
  )
}

export default CampainCard