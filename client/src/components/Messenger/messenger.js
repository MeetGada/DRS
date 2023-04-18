import './messenger.css';
import { useState, useEffect, useRef, useContext } from "react";
import { Conversation } from "./conversations/conversations";
import { Message } from './messages/messages';
import { ChatOnline } from './chatOnline/chatOnline';
import DashNav from '../UserDashboard/DashNav';
import Sidebar from '../UserDashboard/Sidebar';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

export const Messenger = ({ userAccount, user }) => {
    // const [user, setLoginUser] = useState({})

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [frndData, setFrndData] = useState(null)
    const socket = useRef()
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const scrollRef = useRef();
    const id = localStorage.getItem("id");
    const backEnd = "http://127.0.0.1:9002";
    
    const location = useLocation()
    

    useEffect(() => { 
        const getConvId = async() => {
            console.log(location)
            const stateData = await location.state;
            console.log(stateData)
            if(stateData) {
                setCurrentChat(stateData)
            }
        }
        getConvId()
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    }, [id])

    useEffect(() => {
        const getConversations = async () => {
            try {
                // console.log(id)
                await fetch(`${backEnd}/api/startConversation/${id}`).then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        // setConversations(res.json())
                        setConversations(data)
                    })
            } catch (err) {
                console.log(err)
            }
        };
        getConversations()
    }, [id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const conv_id = await currentChat._id
                const res = await axios.get(`${backEnd}/api/messages/${conv_id}`)
                setMessages(res.data)
                const friendId = currentChat.members.find((m) => m !== id);
                const userRes = await axios.get(`${backEnd}/user/${friendId}`)
                setFrndData(userRes.data.name)
                // console.log(userRes.data.name)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
        console.log(frndData)
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    console.log(messages)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== id)

        console.log(`Receiver's Id${receiverId}`)
        socket.current.emit("sendMessage", {
            senderId: id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post(`${backEnd}/api/messages/`, message)
            setMessages([...messages, res.data])
            setNewMessage("")
            // document.getElementById("txtArea").value = ""
            // console.log(document.getElementById("txtArea").value)
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(conversations)
    // console.log(currentChat)

    return (
        <>
            <DashNav sidebar={sidebar} showSidebar={showSidebar} userAccount={userAccount} user={user} />
            <Sidebar sideNav={sidebar} />
            {/* <div className = "messenger"> */}
            <div id="content" className={sidebar ? 'page-content p-5 active' : 'page-content p-5'}>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Friends" className="chatMenuInput" />
                        {console.log(conversations)}
                        {conversations.map((c, i) => (
                            <div onClick={() => setCurrentChat(c)} key = {i}>
                                <Conversation conversation={c} currUser={id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ?
                            <> <div className = "chatTitle" >
                                    <span className = "conversationName active">{frndData ? frndData : "User"}</span>
                                </div>
                                <div className="chatBoxTop">
                                    {messages.map((m,i) => (
                                        <div ref={scrollRef} key={i}>
                                            <Message message={m} own={m.sender === id} />
                                        </div>
                                    ))}

                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput" placeholder="Write Your Message Here.."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                        id="txtArea"
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div> </> :
                            <span className='noConvText'>Open a conversation to start a chat</span>}
                    </div>
                </div>
            </div>
        </>
    )
}