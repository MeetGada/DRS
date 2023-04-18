import { useEffect, useState } from "react"
import "./conversations.css"

export const Conversation = ({conversation, currUser}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currUser);
        const getUser = async () => {
            try {
                await fetch(`http://127.0.0.1:9002/user/${friendId}`)
                .then((res) => res.json())
                .then(async(data) => {
                    const item = await data
                    // setUser(data)
                    // console.log(item)
                    setUser(item)
                })
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currUser, conversation]);

    // console.log(user)

    return (
        <div className = "conversation" >
            <img 
            className = "conversationImg" alt = "img"
            src="https://as1.ftcdn.net/v2/jpg/05/17/79/88/1000_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" 
            />
            <span className = "conversationName">{user ? user.name : "User"}</span>
        </div>
    )
}