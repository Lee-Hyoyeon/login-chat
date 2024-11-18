import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal"; // 모달 컴포넌트

const Login = () => {
    const [id, setId] = useState(""); // 사용자 입력 ID
    const [password, setPassword] = useState(""); // 사용자 입력 비밀번호
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);

    // 로그인 처리 함수
    const handleLogin = () => {
        console.log("입력된 ID:", id);
        console.log("입력된 Password:", password);

        if (id === "user" && password === "1234") {
            navigate("/chat"); // 성공 시 채팅 화면으로 이동
        } else {
            setShowModal(true); // 실패 시 모달 표시
        }
    };

    // Google 로그인 성공 처리
    const handleGoogleLoginSuccess = (credentialResponse) => {
        const googleToken = credentialResponse.credential;
        console.log("Google Token: ", googleToken); // Google Token 출력

        // 토큰을 서버로 전송하거나 클라이언트에서 사용
        // 예시: 서버에 토큰을 보내는 코드
        // fetch('/your-backend-api', { method: 'POST', body: JSON.stringify({ token: googleToken }) });

        navigate("/chat"); // Google 로그인 성공 시 채팅 화면으로 이동
    };

    // Google 로그인 실패 처리
    const handleGoogleLoginError = () => {
        console.log("Google Login Failed");
        setShowModal(true); // 실패 시 모달 표시
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
            <Form>
                <Form.Label>ID</Form.Label>
                <Form.Control
                    type="text"
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
                        padding: "10px",
                        fontSize: "20px",
                        marginTop: "20px",
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                {/* Google Login 버튼 */}
                <div style={{ marginTop: "20px" }}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />
                </div>
            </Form>

            {/* 실패 시 모달 표시 */}
            {showModal && (
                <ModalComponent
                    show={showModal}
                    onClose={handleCloseModal}
                    title="Login Failed"
                    message="Invalid credentials. Please try again."
                />
            )}
        </div>
    );
};

export default Login;
