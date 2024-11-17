import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";

const Login = () => {
    /* login후에 성공 하면 채팅 화면으로, 실패하면 모달띄우기*/

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);

    const handleLogin = (id, password) => {
        console.log(password, id);

        if (id === "user" && password === "1234") {
            navigate("/chat");
        } else {
            // setShowModal(true);  왜 무한루프가 되는지 모르겠음 Too many re-renders. React limits the number of renders to prevent an infinite loop.
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
                height: "100%",
            }}
        >
            <Form
                style={
                    {
                        // width: "700px",
                    }
                }
            >
                {/* icon 추가하기 */}
                <Form.Label>ID</Form.Label>
                <Form.Control
                    type="id"
                    placeholder="Enter your ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    variant="secondary"
                    style={{
                        width: "250px",
                        opacity: "83%",
                        padding: "10px ",
                        fontSize: "20px",
                        marginTop: "20px",
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <div style={{ marginTop: "20px" }}>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    />
                </div>
            </Form>
            {/* <ModalComponent onClose={handleCloseModal} /> */}
            {/* 모달 렌더링 */}
        </div>
    );
};

export default Login;
