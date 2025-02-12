import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/Register.css';
import AxiosInstance from '../composents/AxiosInterceptor';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [date_naissance, setDate_naissance] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            nom,
            prenom,
            date_naissance,
            email,
            password
        };

        setIsLoading(true);

        try {
            const response = await AxiosInstance.post('auth/register.php', userData, );

            const data = response.data;

            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/home');
                console.log(data.token)
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Erreur lors de l\'inscription.');
        } 
            
        setIsLoading(false);
    
    };

    return (
        <div className="container">
            <h1>Bienvenue sur Facebook</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Inscription</h2>

                <div>
                    <input
                        type="text"
                        id="nom"
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        id="prenom"
                        placeholder="Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        id="date_naissance"
                        placeholder="Date de Naissance"
                        value={date_naissance}
                        onChange={(e) => setDate_naissance(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isLoading ? (<div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>) : 
                      <button type="submit" className="submit-btn" disabled={isLoading}>S'inscrire</button>
                }

                <div>
                    <p>
                        <Link to="/login">Connexion</Link>
                    </p>
                </div>

                {message && <div className="alert-message">{message}</div>}
            </form>
        </div>
    );
};

export default Register;