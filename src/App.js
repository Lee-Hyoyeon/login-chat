import Login from "./pages/login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../src/pages/chat.js";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
