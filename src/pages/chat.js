import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

const Chat = () => {
    //todo user name, chatting form, send btn, logout btn

    const navigate = useNavigate();
    const onLogoutSuccess = () => {
        console.log("Logout successful");
        navigate("/");
    };

    const handleLogout = () => {
        googleLogout(); // Google 세션에서 로그아웃
        onLogoutSuccess();
    };

    return (
        <div
            style={{
                // display: "flex",
                justifyContent: "center",
                marginTop: "10%",
                height: "100%",
            }}
        >
            Welcome to the Chat
            <Button
                variant="secondary"
                style={{
                    width: "100px",
                    opacity: "83%",
                    padding: "10px",
                    float: "right",
                    fontSize: "20px",
                    marginTop: "10px",
                }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            <textarea
                placeholder="Type your message here..."
                style={{
                    width: "100%",
                    height: "100px",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            ></textarea>
            <Button>
                Send
                <Image
                    src="/images/send.png"
                    alt="send"
                    style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "30px",
                    }}
                />
            </Button>
        </div>
    );
};

export default Chat;
