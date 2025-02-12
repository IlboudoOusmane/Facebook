import React, { useState } from 'react';
import '../styles/Login.css';
import {Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../composents/AxiosInterceptor';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

        setIsLoading(true);

        try {
            const response = await AxiosInstance.post('auth/login.php', userData, );

            const data = response.data;

            if (data.success) {
                localStorage.setItem('token', data.token); 
                console.log(data.token);

                navigate('/'); 
            } else {
                setMessage(data.message); 
            }
        } catch (error) {
            setMessage('Erreur lors de la connexion.'); 
        }

        setIsLoading(false);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="box">
                <h1>Login</h1>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isLoading ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button type="submit">Se connecter</button>
                )}

                <div>
                    <p>
                        <Link to="/register">inscription</Link>
                    </p>
                </div>
                {message && <div className="alert-message">{message}</div>}
            </form>
        </div>
    );
};

export default Login;



