import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CampainCard from './CampainCard'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { getActiveCampains} from "../blockchain/functions";

const Campains = (props) => {

    const [campainsData, setcampainData] = useState(undefined)
    const [campainId, setcampainId] = useState(undefined)

    useEffect(() => {
        getActiveCampains(props.blockchainData.blockchain.selectedContract)
        .then(([array1, array2]) => {
            console.log(array1)
            console.log(array2)
             setcampainData(array1)
             setcampainId(array2)
        })
          .catch((error) => {
            console.error(error);
        })
    }, [])
    

  return (
    <>
    <Card style={{padding: '5px', margin: 'auto', textAlign: 'center',backgroundColor: '#2E3D4F', color: 'white' }}>
            <h1>Active Campains</h1>
    </Card>
        {campainsData ? (
            <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4" style={{ padding: '20px' }}>
                {(campainsData.length === 0) ? (
                        <Container style={{height: '800px',width: '100%'}}>
                            <h1>There are no active campain</h1>
                        </Container>   
                    ) : (
                        campainsData.map((campainData,index) => (
                            <Col>
                                <CampainCard  imageLink={campainData[5].replace(/"/g, "")} title={campainData[1]} daysLeft={campainData[4]._hex} campainId={parseInt(campainId[index]._hex, 16)} selectedcontract={props.blockchainData.blockchain.selectedContract} location={"campains"}/>        
                            </Col>
                        ))
                    )
                }
            </Row>
        ):(
            <Col>
                <h1>Loading...</h1>
            </Col>
        )
        }
    </>
  )
}

export default Campains