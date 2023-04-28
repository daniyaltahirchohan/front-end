import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Card } from 'react-bootstrap'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import banner1 from '../image/banner1.jpeg'
import banner2 from '../image/banner2.jpeg'
import banner3 from '../image/banner3.jpeg'
import ngo1 from '../image/ngo1.jpg'
import ngo2 from '../image/ngo2.png'
import ngo3 from '../image/ngo3.png'
import ngo4 from '../image/ngo4.jpeg'
import ngo5 from '../image/ngo5.png'
import ngo6 from '../image/ngo6.png'
import './Home.css';


const Home = () => {

  function SplideSlider({ options, slides }) {
    return (
      <Splide options={options}>
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            <img src={slide.image} alt={slide.alt} />
          </SplideSlide>
        ))}
      </Splide>
    );
  }
  
  const options = {
    type: 'loop',
    drag: 'free',
    perPage: 3,
    pagination: false,
    arrows: false,
  };
    

  return (
    <>  
      <div className='sliderBanner'>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={banner1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={banner2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={banner3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
        <div className="ngosContainer">
          <h1>NGOS</h1>
          <Splide options={options}>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo1} alt="Slide 1" />
              </Card>
            </SplideSlide>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo2} alt="Slide 2" />
              </Card>
            </SplideSlide>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo3} alt="Slide 3" />
              </Card>
            </SplideSlide>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo4} alt="Slide 4" />
              </Card>
            </SplideSlide>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo5} alt="Slide 5" />
              </Card>
            </SplideSlide>
            <SplideSlide className='sliderImage'>
              <Card style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
                <img src={ngo6} alt="Slide 6d" />
              </Card>
            </SplideSlide>
          </Splide>
        </div>
      <div className='about' style={{padding: "10px", marginBottom: "50px"}}>
        <Card>
          <Card.Title>About Us</Card.Title>
          <Card.Text>
          Our crowdfunding dapp on Ethereum provides a platform for people in Pakistan to launch campaigns and raise funds for various causes. During times of crisis, such as natural disasters, our platform becomes a vital tool for individuals and organizations to gather support and provide relief efforts. In addition to crisis relief, our platform also helps the poor and underprivileged, allowing them to raise funds for basic needs like food, clothing, and shelter. During Ramadan, the platform sees a surge in charitable giving, as people use the platform to make donations and support various causes. With a focus on transparency and security through blockchain technology, our platform provides a means for people to come together and support each other in times of need, helping to build a more compassionate and united society. Overall, our crowdfunding dapp on Ethereum serves as a powerful tool for people to make a positive impact on their communities and make a difference in the lives of those around them.
          </Card.Text>
        </Card>
      </div>
      <div className='contact' style={{padding: "10px", marginBottom: "200px"}}>
      <Card style={{padding: "50px", marginBottom: "10px"}}> 
          <Card.Title>Contact Us</Card.Title>
          <Card.Text>
            If you have any questions, concerns, or just want to say hello, feel free to reach out to us using the following methods:

            <br />Email: contact@dappcrowdfunding.com
            <br /> Phone: +1 (555) 123-4567
            <br />Address: 123 Main Street, Suite 456, Anytown, USA 12345
          </Card.Text>
      </Card>
      <Card style={{padding: "50px", marginBottom: "10px"}}>
          <Card.Title>Join Us for Crowdfunding DApp</Card.Title>
          <Card.Text>
          Interested in joining our crowdfunding community? Here's how:

            Visit our website at www.dappcrowdfunding.com
            Click on the "Sign Up" button in the top right corner of the homepage
            Fill out the required information to create your account
            Explore the various crowdfunding campaigns available on the platform
            Contribute to campaigns that align with your values and interests
            Share your favorite campaigns with your friends and family to help spread the word
          </Card.Text>
      </Card>
      </div>
    </>
  )
}

export default Home