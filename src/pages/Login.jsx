import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "1234"){
            navigate("/home");
        } else {
            alert("Invalid username or password");
        }
    };

    return(
        <>
            <h1 className="login-title">
                Student Management System
            </h1>

            <h2 className="login-heading">
                Login
            </h2>
                
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input 
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <div className="login-info">
                <p><strong>Demo Login</strong></p>
                <p>Username: admin</p>
                <p>Password: 1234</p>
            </div>
        </>
    );
}

export default Login;