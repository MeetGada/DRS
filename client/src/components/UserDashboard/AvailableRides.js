import React,{ useState, useContext , useEffect, createContext} from 'react';
import { Table, Button, Card } from 'react-bootstrap';
// import { useNavigate, redirect } from "react-router-dom";
import DashNav from './DashNav';
import Sidebar from './Sidebar';
import './AvailableRides.css';
import contractContext from '../../utils/contractContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const converseContext = createContext({})

function AvailableRides({userAccount, user}){
    const navigate = useNavigate()

    const {currentAccount,listMyRides,connectWalletHandler,otherRides,joinRide} = useContext(contractContext);
    connectWalletHandler() 

    
    useEffect(async()=>{
      await listMyRides(currentAccount)
    },[]);
      
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    //manage state of join ride button
    const [joinRideState, setJoinRideState] = useState(null);

    //handleRide() will be called after joining the ride
    const handleRide = (e,id,rideCost) => {
        setJoinRideState(id);
        joinRide(Number(id),rideCost)

       // called by passenger to send request to join ride
        console.log("joinRide() called for ride:",id);
    }
    

    const handleChat = async(walletAdrs) => {
        // e.preventDefault()
        try {
            const rideDetails = await axios.get(`http://localhost:9002/api/ride/${walletAdrs.toLowerCase()}`)
            // console.log(otherRides)
            console.log(rideDetails.data)
            // console.log()
            const converseData = {
                senderId: localStorage.getItem("id"),
                receiverId: rideDetails.data[0].userId
            }
            const startConversation = await axios.post(`http://localhost:9002/api/startConversation/`, converseData)
            
            console.log(startConversation)
            console.log(startConversation.data)
            navigate("/messenger",{state:startConversation.data})
            // console.log(value)
          } catch(err) {
            console.log(err)
        }
        console.log("Chat Clicked")
    }
    return(
        <div>
            <DashNav sidebar={sidebar} showSidebar={showSidebar} userAccount={userAccount} user={user}/>
            <Sidebar sideNav={sidebar} />
            <div id="availableRidesContent" className={ sidebar ? 'availableRidesContent p-5 active' : 'availableRidesContent p-5'}>
                <h1 className="rideTitle">Available Rides</h1>
                {otherRides ? otherRides.map((item, index) => {
                    // {console.log(item)}
                    return (
                        <Card className="text-center mb-3" style={{ width: '75%' }}>
                            <Card.Header>{item[0]}</Card.Header>
                            <Card.Body>
                                <Card.Title>Ride Details</Card.Title>
                                <Card.Text>
                                    <div>
                                        {/* <p>Username : {item[0]}</p> */}
                                        <p>Pick Up : {item[3]}</p>
                                        <p>Destination : {item[4]}</p>
                                        <p>Cost (₹) : {item[1]}</p>
                                        <p>Ride Date : {item[9]}</p>
                                        <p>Ride Time : {item[10]}</p>
                                    </div>
                                </Card.Text>
                                <Button variant="outline-primary" onClick={() => handleChat(item[0])}>Chat With Driver</Button><br/><br/>
                                { joinRideState!=item[11] ? <Button  variant="outline-dark" onClick = {e=> handleRide(e,item[11],item[1]) }>Join Ride</Button> : <span className="requested">Requested</span> }
                            </Card.Body>
                            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                        </Card>
                    );
                }) : null }
            </div>
        </div>
    );
}

export default AvailableRides;