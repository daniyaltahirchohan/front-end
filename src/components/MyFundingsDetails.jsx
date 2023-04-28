import React, { useEffect, useState } from 'react'
import { Container, Table, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { myFundingDetails } from '../blockchain/functions'
import BigNumber from 'bignumber.js'

const MyFundingsDetails = (props) => {

    const [fundingsDetails, setfundingsDetails] = useState([])
    const [loading, setloading] = useState(true)


    function etherToWei(ether) {
        const weiPerEther = 1000000000000000000;
        return Math.floor(ether * weiPerEther);
    }


    useEffect(() => {
       myFundingDetails(props.blockchainData.blockchain.selectedContract)
        .then((response) => {
            let fundings = []
            for(let i=0;i < response[0].length;i++){

                const id = parseInt(response[0][i]._hex,16)
                console.log(id)
                const amountraw = new BigNumber(response[1][i]._hex)
                const amount = amountraw.toNumber()
                const fundingAmount = (amount / 10**10).toFixed(18)
                console.log(fundingAmount)

                if(etherToWei(fundingAmount) !== 0){

                    const singleFunds =  {
                        id: id,
                        funding: fundingAmount
                    }

                    fundings.push(singleFunds)
                }

                console.log(fundingsDetails)

            }
            setfundingsDetails(fundings)
            setloading(false)
            console.log(fundingsDetails)
      })
      .catch((error) => {
        console.log(error)
      })
      
    }, [])
    

  return (
    <>
        <Helmet>my funding details</Helmet>
        <Card style={{padding: '5px', margin: 'auto', textAlign: 'center',backgroundColor: '#2E3D4F', color: 'white' }}>
            <h1>My Funding Details</h1>
        </Card>
        {loading ? (
                <Container><h1>Loading...</h1></Container>
        ) : (
        <>
        {(fundingsDetails === []) ? (
        <Container style={{padding: "10px", marginBottom: "200px"}}>
        <Table striped bordered hover>
            <thead className='thead-dark'>
                <tr>
                    <th>id</th>
                    <th>funding</th>
                </tr>
            </thead>
            <tbody>
                    {fundingsDetails.map((funding) => (
                        <tr key={funding.id}>
                            <td>{funding.id}</td>
                            <td>{funding.funding}</td>
                        </tr>
                    ))
                    }
            </tbody>
        </Table>
        </Container>
        ) : (
            <Container style={{height: '800px',width: '100%'}}>
                    <h1>You have not donated to any campain</h1>
            </Container> 
        )}
        </>
        )}
    </>
  )
}

export default MyFundingsDetails