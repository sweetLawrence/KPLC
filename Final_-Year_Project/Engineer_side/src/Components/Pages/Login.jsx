import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/LOGO3.png";
import LockIcon from "../../assets/icons/LockIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import "./Login.css";
import axiosInstance from "../../utils/axios";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#f5f7fa";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);


    // Check if user is already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get("/check-auth", { withCredentials: true });
                // console.log(response.data)
                if (response.status === 200) {
                    // alert(response.status)
                    localStorage.setItem("authToken", response.data.id);
                    localStorage.setItem("userRole", response.data.role);
                
                    navigate("/land");
                }
            } catch {
                console.log("User not authenticated");
            }
        };
        checkAuth();
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Please enter both email and password");
            return;
        }

        setIsLoading(true);
        try {
        

            const response = await axiosInstance.post(
               "/api/login",
                formData,
                { withCredentials: true }
            );
            console.log(response.data)
            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem("permitNumber", response.data?.permitNumber);
                localStorage.setItem("authToken", response.data.id);
                localStorage.setItem("userRole", response.data.role);
                localStorage.setItem("userName", response.data.name);
         
                navigate("/land");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Login failed. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-left">
                <div className="login-left-content">
                    <h2>Kenya Power & Lighting Company</h2>
                    <p>Apply for a permit online.</p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-hero">
                    <img src={logo} alt="KPLC logo" className="login-logo" />
                </div>

                <div className="container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h1>KPLC Permit Portal</h1>
                        <p className="login-subtitle">Sign in to access your account</p>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <EmailIcon />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <PasswordIcon />
                        </div>

                        <div className="forgot-password">
                            Forgot password? <span>Click here</span>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <div className="button-group">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? "Processing..." : "Sign In Securely"}
                            </button>
                        </div>

                        <div className="security-badge">
                            <LockIcon /> Secured by 256-bit encryption
                        </div>
                    </form>
                </div>

                <div className="login-footer">
                    &copy; 2025 Kenya Power & Lighting Company Ltd. All rights reserved.<br />
                    <a href="#">Terms of Service</a> • <a href="#">Privacy Policy</a> • <a href="#">Help Center</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
