import React, { useState, useEffect, useRef } from 'react';
import AxiosInstance from '../composents/AxiosInterceptor'; 
import Navbar from '../composents/Navbar'; 
import '../styles/Profile.css'; 

const Profile = () => {
    
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [photoProfile, setPhotoProfile] = useState('');
    const fileInputRef = useRef(null);    // fileInputRef est utiliser pour accéder aux fichiers sélection 

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {

                const response = await AxiosInstance.get('controller/get_user.php');

                if (response.data.success) {
                    setUser(response.data.user);
                    setPosts(response.data.posts);
                    setPhotoProfile(response.data.user.photo_profile);
                } else {
                    setMessage('Erreur de récupération du profil');
                }
            } catch (err) {
                setMessage('Une erreur s\'est produite');
            }
            setLoading(false);
        };

        fetchUserProfile(); 
    }, []);

    
    const FileInput = () => {  // Fonction  pour sélectionner un fichier
        fileInputRef.current.click(); 
    };

    const handleProfilePhoto = async (e) => {
        const photo = e.target.files[0]; // récupère le fichier sélectionné par l'utilisateur
       
        const formData = new FormData();
        formData.append('photo_profile', photo);

        try {
            const response = await AxiosInstance.post('controller/profile.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setPhotoProfile(response.data.photo_profile);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('Erreur lors du téléchargement.');
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar-container" onClick={FileInput}>
                        <img 
                            src={photoProfile ? `http://localhost:8000/photo_profile/${photoProfile}` : 'default-avatar.png'} 
                            alt={`${user.nom}`} 
                            className="profile-avatar"
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleProfilePhoto} 
                        />
                    </div>
                    <div className="profile-info">
                        <h2>{user.nom} {user.prenom}</h2>
                    </div>
                </div>
                <div className="profile-posts">
                    {posts ? (
                        posts.map(post => (
                            <div key={post.id} className="post">
                                <div className="post-header">
                                    <h3>{post.nom} {post.prenom}</h3> 
                                    <span className="post-date">
                                        {new Date(post.created_at).toLocaleString()} 
                                    </span>
                                </div>
                                <p>{post.content_post}</p>
                                {post.image && 
                                    <img src={`http://localhost:8000/publication_photo/${post.image}`} 
                                    alt="Publication" 
                                    />
                                }
                                <div className="post-actions">
                                    <button className="like-button">J'aime</button>
                                    <button className="comment-button">Commenter</button>
                                    <button className="share-button">Partager</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune publication.</p> 
                    )}
                </div>
                {message && <div className="alert alert-info">{message}</div>}
            </div>
        </div>
    );
};

export default Profile;
