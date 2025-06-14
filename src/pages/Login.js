import React, { useState } from 'react';
import '../styles/Login.css';
import {Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../composents/AxiosInterceptor';

const Login = () => {
    const [email, setEmail] = useState(''); // State pour l'email de l'utilisateur
    const [password, setPassword] = useState(''); // State pour le mot de passe de l'utilisateur
    const [message, setMessage] = useState(''); // State pour afficher les messages à l’utilisateur
    const navigate = useNavigate(); // Hook pour la navigation
    const [isLoading, setIsLoading] = useState(false); // State pour gérer le chargement

    const handleSubmit = async (e) => { 
        e.preventDefault(); // Empêche le rechargement de la page

        const userData = {
            email: email, // Récupère l'email de l'utilisateur
            password: password // Récupère le mot de passe de l'utilisateur
        };

        setIsLoading(true); // Active l’indicateur de chargement

        try {
            const response = await AxiosInstance.post('auth/login.php', userData, ); // Envoie les données au backend

            const data = response.data; // Récupère la réponse

            if (data.success) { 
                localStorage.setItem('token', data.token); // Stocke le token dans le localStorage
                console.log(data.token); // Affiche le token dans la console

                navigate('/'); // Redirige vers la page d'accueil
            } else {
                setMessage(data.message); // Affiche le message d'erreur 
            }
        } catch (error) {
            setMessage('Erreur lors de la connexion.'); // Affiche une erreur générique
        }

        setIsLoading(false); // Désactive l’indicateur de chargement
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
