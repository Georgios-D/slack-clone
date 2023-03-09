import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Channel from "./views/Channel";

function App() {
    const [name, setName] = useState("");

    return (
        <div className="main-container">
            {name ? (
                <>
                    <Sidebar />
                    <Routes>
                        <Route
                            path="/"
                            element={<div className="chat-section"></div>}
                        />
                        <Route path="/:id" element={<Channel />} />
                    </Routes>
                </>
            ) : (
                <div>
                    <h1>Welcome!</h1>
                    <button onClick={() => setName("Georgios")}>
                        Log In as User
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
