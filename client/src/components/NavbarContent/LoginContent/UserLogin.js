import React, {createContext, useState} from "react";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Form, Col, Row } from 'react-bootstrap';
import '../../NavbarContent/Login.css';
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom"
import axios  from "axios";


let loginUser = null

export default function DriverRiderLogin(props) {  

    const navigate=useNavigate();    
    // usetstate for storing and retrieving wallet details
    // const [data, setdata] = useState({
    //     address: "",
    //     balance: null,
    // });
    
    const [ user, setUser] = useState({
        mobile_no:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            alert(res.data.message)
            // alert(res.data.user)
            setUser({ mobile_no:"", password:""})

            props.setLoginUser(res.data.user)
            
            props.onHide()
            if (res.data.user){
            // onLogin()
                console.log(res.data.user)
                localStorage.setItem('mobile_no', res.data.user.mobile_no);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('id', res.data.user._id);
                localStorage.setItem('name', res.data.user.name);
                // const loggedInUser = createContext(res.data.user)
                loginUser = res.data.user
                navigate('/userDashboard')
            }
        })
    }
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="loginHeader" closeButton closeVariant="white">
                <Modal.Title className="loginTitle" id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Mobile No.
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" placeholder="Eg. +12345678" name="mobile_no" value={user.mobile_no} onChange={ handleChange } required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="login-submit" onClick={()=>login()}>Login</Button>
                <Button className="login-cancel" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

// console.log(loginUser)
export const loggedInUser = createContext(loginUser)
// export default { DriverRiderLogin, loggedInUser};
// export default DriverRiderLogin;