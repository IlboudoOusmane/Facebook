import React, { useState } from 'react';
import AxiosInstance from '../composents/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import '../styles/Post.css';
import Navbar from '../composents/Navbar';
import LeftSidebar from '../composents/LeftSidebar';
import RightSidebar from '../composents/RightSidebar';

const Post = () => {
    const [content_post, setContent_Post] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();  

        const formData = new FormData();
        
        formData.append('content_post', content_post);
        
        if (image) { 
            formData.append('image', image); 
        }

        setIsLoading(true);

        try {
            const response = await AxiosInstance.post('controller/create_post.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
 
            const data = response.data;

            if (data.success) {
                navigate('/'); 
            } else {
                setMessage(data.message);  
            }
        } catch (error) {
            setMessage('Erreur lors de la publication du post'); 
        }

        setIsLoading(false); 
    };

    return (
        <div className="post-container">
            <Navbar />
            <LeftSidebar />
            <RightSidebar />
            <div className="create-post-card">
                <h2>Créer une nouvelle publication</h2>
                <form onSubmit={handlePostSubmit} className="create-post-form">
                    <textarea
                        value={content_post}
                        onChange={(e) => setContent_Post(e.target.value)}
                        placeholder="Que voulez-vous partager ?"
                        rows="5"
                        className="post-textarea"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="image-input"
                    />
                    {isLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Chargement...</span>
                        </div>
                    ) : (
                        <button type="submit" className="submit-button">Publier</button>
                    )}
                </form>
                {message && <div className="alert-message">{message}</div>}
            </div>
        </div>
    );
};

export default Post;


