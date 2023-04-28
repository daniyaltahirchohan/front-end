import React,{useEffect, useState} from 'react'
import { Helmet } from 'react-helmet';
import { Container, Form, Button, Card } from 'react-bootstrap'
import './CreateCampain.css'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { createCampain } from "../blockchain/functions"
import Alert from 'react-bootstrap/Alert'
//import { btoa } from 'btoa';
//import { Blob } from 'blob';


const CreateCampain = (props) => {

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [target, settarget] = useState(0)
    const [deadline2, setdeadline2] = useState(0)
    const [deadline, setdeadline] = useState(0)
    const [image, setimage] = useState(undefined)
    const [imageURL, setimageURL] = useState(undefined)
    const [destinationNGO, setdestinationNGO] = useState("")
    const [objholder, setobjholder] = useState(undefined)
    const [creating, setcreating] = useState(false);
    const [created, setcreated] = useState(false)

    const projectId = process.env.REACT_APP_IPFS_PROJECT_ID
    const projectSecret = process.env.REACT_APP_IPFS_API_SECRET
    const authorization = "Basic " + btoa(projectId + ":" + projectSecret)

    const ipfs = ipfsHttpClient({
        url: process.env.REACT_APP_IPFS_ENDPOINT,
        headers:{
            authorization
        }
    })

  
    

    const handleSubmit = async (e) => {

        e.preventDefault()

        setcreating(true)

        console.log(`title: ${title}`)
        console.log(`description: ${description}`)
        console.log(`target: ${target}`)
        console.log(`deadline: ${deadline}`)
        console.log(`image: ${image}`)
        console.log(`destinationNGO ${destinationNGO}`)

        const result = await ipfs.add(image)

        setimageURL(JSON.stringify(result.path))

        setTimeout(() => {
            if(imageURL === undefined){ 
                console.log("image not found")
            } else {
                createCampain(props.blockchainData.blockchain.selectedContract,title,description,target,deadline,imageURL,destinationNGO)
            }
        }, 5000);

        setcreating(false)
        setcreated(true)


    }

    useEffect(() => {
      console.log(imageURL)
    }, imageURL)
    

  return (
    <>
      <Helmet>
        <title>Create Campaign</title>
      </Helmet>
      <Container style={{ marginTop: '30px' }}>
        <Card style={{padding: '5px', margin: 'auto', textAlign: 'center',backgroundColor: '#2E3D4F', color: 'white' }}>
            <h1>Create Campaign</h1>
        </Card>
      </Container>
      {props.blockchainData.blockchain.connection === 'full' ? (
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="target">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Target"
                value={target}
                onChange={(e) => settarget(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Deadline"
                value={deadline2}
                onChange={(e) => {
                  setdeadline2(e.target.value);
                  setdeadline(parseInt(new Date(e.target.value).getTime() / 1000));
                }}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                accept="image/*"
                type="file"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="destinationNGO">
              <Form.Label>Destination NGO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Destination NGO"
                value={destinationNGO}
                onChange={(e) => setdestinationNGO(e.target.value)}
              />
            </Form.Group>
            <div className="text-center" style={{margin: '20px'}}>
              <Button variant="primary" type="submit" className="submitButton">
                Create
              </Button>
              <Alert show={creating} variant={'dark'}>
                Creating Campain Kindly wait. It can take some time.
              </Alert>
              <Alert show={created} variant={'dark'}>
                Campain created successfully.
              </Alert>
            </div>
          </Form>
        </div>
      ) : (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '800px' }}>
          <h1>Connect Wallet to create campaign</h1>
        </Container>
      )}
    </>
  )
}

export default CreateCampain