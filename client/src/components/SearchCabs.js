import React,{useState, useContext, useEffect } from 'react';
import { Table, Container, Form, Col, Row, Button, Card } from 'react-bootstrap';
import './UserDashboard/AvailableRides.css'
import contractContext from '../utils/contractContext';
import background from '../img/search_cab_background.avif'

function cardDetails({availableRides}) {
    return (
      <Card className="text-center" style={{ width: '18rem' }}>
        <Card.Header>Available</Card.Header>
        <Card.Body>
          <Card.Title>Ride Details</Card.Title>
          <Card.Text>
          {availableRides.length>0 ? availableRides.map((item, index) => {
            return (
                <div>
                    <p>Pick Up : {item[3]}</p>
                    <p>Destination : {item[4]}</p>
                    <p>Date : {item[9]}</p>
                    <p>Time : {item[10]}</p>
                </div>
            );
        }) : null}
          </Card.Text>
          <Button variant="primary">Chat With Driver</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    );
  }

function SearchCabs(){
    
    const { listAvailableRides,availableRides } = useContext(contractContext);
    const [rideCount, setRideCount]=useState(null)
    const [getride,setride]=useState(false)

    const getAvailableRides = () => {
        setride(true)
        console.log(getride)
        listAvailableRides()
        if(availableRides){
            console.log(availableRides[0])
            const ride=availableRides[0]
        //   console.log(Object.values(ride)[0]);
                    
        }
    }
    useEffect(()=>{
        listAvailableRides()
    },[]);

    return (
        <div style = 
        {{ 
            backgroundColor:"white",
            height: '100vh', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color:"#FFFFFF",
            paddingTop:"150px"
        }}>
            <Container>
                <Row>
                    <Col xs={12} lg={5} className="top-heading text-center align-items-center justify-content-center">
                        <div style={{backgroundColor:"#FFFFFF",color:"black",borderRadius:"3px"}} className="text-center align-items-center justify-content-center p-4">
                            <b style={{color:"black",fontWeight:"700",fontSize:"17"}}>Book a city taxi to your destination in town</b>
                            <br />
                                <button onClick={()=>{getAvailableRides()}} className="login-submit" style={{margin:"20px 0 20px 0",border:"1px solid #ff9b23"}}>
                                    Available Rides
                                </button>
                        </div> 
                    </Col>
                    <Col xs={12} lg={7} className="text-center">
                        <div>
                        
                        {getride && availableRides.length > 0?
                        cardDetails({availableRides})
                        : null }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchCabs;