import React, { useState } from "react";
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const sendEmail = (event) => {
        setEmail(event.target.value);
    };

    const sendPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const loginSuccessful = (email === 'user@example.com' && password === 'password');

        if (loginSuccessful) {
            alert('Login Successful');
            setLoggedIn(true);
        } else {
            alert('Login Failed');
        }
    };

    if (loggedIn) {
        
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={sendEmail} />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={sendPassword} />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
