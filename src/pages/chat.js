import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { Button, Image } from "react-bootstrap";

const Chat = () => {
    const [username, setUserName] = useState();
    const [message, setMessage] = useState("");
    const [serverMessage, setServerMessage] = useState("");

    useEffect(() => {
        // 웹소켓 연결
        const socket = new WebSocket("ws://localhost:3001"); // 서버와 동일한 포트 사용

        // 서버로부터 메시지 받기
        socket.onmessage = (event) => {
            setServerMessage(event.data);
        };

        // 연결 종료 시 클린업
        return () => socket.close();
    }, []);

    // 쿠키에서 엑세스 토큰 받아서 유저이름 받아옴
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // 엑세스토큰 뽑아내기
                const accessToken = document.cookie.match(
                    /(?:^|;)\s*access_token=([^;]+)/
                );

                // 엑세스토큰이 없으면 바로 리턴
                if (!accessToken || !accessToken[1]) {
                    console.error("엑세스토큰이 없습니다.");
                    return;
                }
                const response = await fetch(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken[1]}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("사용자 정보 요청 실패");
                }
                // 응답 데이터 받기
                const data = await response.json();
                console.log("User Name:", data.name);
                setUserName(data.name); //user name setting
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        googleLogout(); // Google 세션에서 로그아웃
    };

    const sendMessage = () => {
        const socket = new WebSocket("ws://localhost:3001");
        socket.onopen = () => {
            socket.send(message); // 서버로 메시지 전송
        };
    };

    return (
        <div>
            <h1>Chating </h1>
            <Button
                variant="secondary"
                style={{
                    width: "100px",
                    opacity: "83%",
                    padding: "2px",
                    float: "right",
                    fontSize: "13px",
                    marginTop: "10px",
                }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            {username}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {/* <button onClick={sendMessage}>메시지 보내기</button> */}
            <Button onClick={sendMessage}>
                <Image
                    src="/images/send.png"
                    alt="send"
                    style={{
                        width: "30px",
                        height: "30px",
                    }}
                />
            </Button>
            <p>서버에서 받은 메시지: {serverMessage}</p>
        </div>
    );
};

// return (
//     <div
//         style={{
//             backgroundColor: "skyblue",
//             // display: "flex",
//             justifyContent: "center",
//             marginTop: "10%",
//             // height: "100%",
//         }}
//     >
//         Welcome to the Chat
//         <Button
//             variant="secondary"
//             style={{
//                 width: "100px",
//                 opacity: "83%",
//                 padding: "2px",
//                 float: "right",
//                 fontSize: "13px",
//                 marginTop: "10px",
//             }}
//             onClick={handleLogout}
//         >
//             Logout
//         </Button>
//         <span style={{ float: "right" }}>{username}</span>
//         <form
//             style={{
//                 justifyContent: "center",
//                 width: "500px",
//                 height: "800px",
//                 backgroundColor: "pink",
//             }}
//         >
//             afasfd
//         </form>
//         <Button>
//             <Image
//                 src="/images/send.png"
//                 alt="send"
//                 style={{
//                     width: "30px",
//                     height: "30px",
//                 }}
//             />
//         </Button>
//     </div>
// );
// };

export default Chat;
