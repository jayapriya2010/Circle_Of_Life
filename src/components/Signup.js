import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (typeof onSignup === "function") {
            onSignup(email, password);
            navigate("/login");
        } else {
            console.error("onSignup is not a function");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Signup</h2>
                <form onSubmit={handleSignup} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Signup
                    </button>
                </form>
                <p style={styles.link}>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f7fc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formContainer: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "1rem",
        color: "#333",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    input: {
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid #ddd",
        borderRadius: "5px",
        outline: "none",
        transition: "0.3s",
    },
    button: {
        padding: "0.75rem",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#28a745",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
    link: {
        marginTop: "1rem",
        fontSize: "0.9rem",
        color: "#007bff",
        textAlign: "center",
    },
};

export default Signup;
