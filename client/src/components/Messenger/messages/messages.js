import "./messages.css";
import {format} from 'timeago.js'

export function Message({message, own}) {
    return (
        <div className = {own ? "message own" : "message"}>
            <div className = "messageTop">
                <img className = "messageImg" alt = "img"
                    src = "https://as1.ftcdn.net/v2/jpg/05/17/79/88/1000_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className = "messageBottom">{format(message.createdAt, "en-IN")}.</div>
        </div>
    )
}