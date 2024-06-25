// Home.jsx

import { useState, useEffect } from 'react';
import Ip from './IpHandle'; // Assuming Ip.jsx is in the same directory
import ErrorHandler from './ErrorHandler';
import './home.css';
import axios from 'axios';
import logo from '../assets/logo.png';

const customEncode = (string, secretKey) => {
    let result = '';
    const keyLength = secretKey.length;

    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        const keyChar = secretKey.charCodeAt(i % keyLength);

        // XOR operation to encode
        const encodedChar = String.fromCharCode(char ^ keyChar);

        result += encodedChar;
    }

    return btoa(result);
};

const generateRandomHash = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ip, setIP] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Store email, password, and IP in session storage whenever they change
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('ip', ip);
    }, [email, password, ip]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const secretKey = '?VI02X0@n';
        const encodedPassword = customEncode(password, secretKey);
        const randomHash = generateRandomHash();

        const loginData = {
            email_phone: email,
            password: encodedPassword,
            login_ip: ip,
            hash: randomHash
        };

        console.log("Login Data: ", loginData);

        try {
            const response = await axios.post('https://edu-explorer.com/api/user-login.php', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Backend Response: ", response.data);
            setResponse(response.data);
            setError(null); // Reset error state on success

        } catch (error) {
            console.error('Error sending login data: ', error);
            setResponse(null);
            setError('An error occurred while sending the login data. Please try again later.'); // Set error message
        }
    };

    return (
        <div className="App">
            <div className="login-container">
            <img src={logo} alt="Logo" className="logo" />
                <h2>Login</h2>
                <form className='form-grp' onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Ip setIP={setIP} />
                    <button type="submit">Login</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                {response && <ErrorHandler response={response} />}
            </div>
            <Footer />
        </div>
    );
};

const Footer = () => (
    <footer className="footer">
        <p></p>
    </footer>
);

export default Home;
