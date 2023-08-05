
import React, { createContext, useContext, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");

        if (storedData) {
            const user = storedData;
            //if data is object then do not parse it
            if (typeof user === "object") {
                setUser(user);
            } else {
                setUser(JSON.parse(user));
            }
            navigate("/chat");
        } else {
            <div className=""></div>
            navigate("/signIn");
        }
    }, [navigate]);
    return (
        <ChatContext.Provider
            value={
                {
                    user,
                    setUser,
                }
            }
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
