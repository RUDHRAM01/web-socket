import { Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import Img from "../assests/search.gif"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function CreateAccount() {
    const navigate = useNavigate()
    const [config, setConfig] = useState({
        name : "",
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            axios.post("http://localhost:4000/api/users/register", config)
            toast.success("Account Created", {
                position: "top-center",
                duration: 4000,
            });
            navigate("/login")
        }catch(err){
            toast.error(err.response.data.msg, {
                position: "top-center",
                duration: 4000,
            });
        }
    };


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh', width: '100%', flexDirection: 'column', gap: '32px' }}>
            <Paper elevation={2} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "60vh", width: "100%", maxWidth: "40vw" }}>
                <img src={Img} alt="" style={{ height: "80px" }} />
                <Typography variant="h4" style={{ padding: "16px" }}>Create Account</Typography>
                <form onSubmit={handleLogin} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', gap: '8px' }}>
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            name: e.target.value
                        }));
                    }
                    }
                        value={config.name}
                        type="text" placeholder="Name" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            email: e.target.value
                        }));
                    }}
                        value={config.email}
                        type="email" placeholder="Email" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            password: e.target.value
                        }));
                    }}
                        value={config.password}
                        type="password" placeholder="Password" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />

                    {/* Add the ReCAPTCHA component */}
                    {/* <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleCaptchaChange} /> */}

                    <button type="submit" style={{ height: "40px", backgroundColor: "#2fda24", width: "80%", maxWidth: "30vh", color: "white" }}>Let's Go</button>
                </form>
                <button style={{padding:"8px"}} onClick={()=>navigate("/login")}>Already have an account?</button>
            </Paper>
        </div>
    );
}

export default CreateAccount;
