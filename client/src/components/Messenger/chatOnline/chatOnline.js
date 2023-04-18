import "./chatOnline.css"

export const ChatOnline = () => {
    return(
        <div className = "chatOnline">
            <div className = "chatOnlineFriend">
                <div className = "chatOnlineImgConatiner">
                    <img className = "chatOnlineImg" alt = "img"
                        src = "https://as1.ftcdn.net/v2/jpg/05/17/79/88/1000_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
                    />

                    <div className = "chatOnlineBadge"></div>
                </div>
                <span className = "chatOnlineName">Shinchan</span>
            </div>
        </div>
    )
}