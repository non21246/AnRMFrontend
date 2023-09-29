import React, { useState } from "react";
import './FormStyles.css';

function FromSend(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [showPassword, setShowPassword] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendFirstName = (event) => {
        setFirstName(event.target.value)
    };

    const sendLastName = (event) => {
        setLastName(event.target.value)
    };

    const sendEmail = (event) => {
        setEmail(event.target.value)
    };

    const sendPassword = (event) => {
        setPassword(event.target.value)
    };

    const Submit = (event) => {
        event.preventDefault();

        let isError = false;

        if (firstName.length < 2) {
          alert('Error Your First Name is less than 2 letters.');
          isError = true;
        }
    
        if (lastName.length < 2) {
          alert('Error Your Last Name is less than 2 letters.');
          isError = true;
        }

        if (!emailPattern.test(email)) {
            alert('Error Please enter a valid email address.');
            isError = true;
          }
    
        if (password.length < 6) {
          alert('Error Password is less than 6 letters.');
          isError = true;
        }

        if (!isError) {
            console.log('First name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Email:', email);
            console.log('Password:', password);
            alert('Registration Successful');
        }
};

return (
    <div className='form-container'>
        <form onSubmit={Submit}>
        <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={sendFirstName}></input>
        </div>

        <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={sendLastName}></input>
        </div>

        <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={sendEmail}></input>
        </div>

        <div className="form-group">
            <label>Password:</label>
        <input type={showPassword ? 'text' : 'password'}id="password"value={password}onChange={sendPassword}/>
        <label>
        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>{showPassword ? 'Hide' : 'Show'} Password </label>
      </div>

        <div className="form-group">
        <button onClick={Submit}>Register</button>
        </div>
        </form>
    </div>
);
};

export default FromSend;