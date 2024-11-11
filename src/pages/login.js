import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const login = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
                height: "100vh",
            }}
        >
            <Form
                style={
                    {
                        // width: "700px",
                    }
                }
            >
                <Form.Label>ID</Form.Label>
                <Form.Control type="id" placeholder="Enter your ID" />

                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Button
                    variant="secondary"
                    style={{
                        width: "250px",
                        opacity: "83%",
                        padding: "10px ",
                        fontSize: "20px",
                        marginTop: "20px",
                    }}
                >
                    Login
                </Button>
                <div>
                    <Button
                        variant="secondary"
                        style={{
                            width: "250px",
                            padding: "10px ",
                            fontSize: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <Image
                            src="../../public/image.png"
                            // roundedCircle
                            style={{
                                width: "20px",
                                marginRight: "8px",
                            }}
                        />
                        Google login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default login;
