import React, { useState, useEffect } from 'react';
import AxiosInstance from '../composents/AxiosInterceptor';
import '../styles/PostList.css';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');

    const getPosts = async () => {
        try {
            const response = await AxiosInstance.get('controller/get_post.php');
            if (response.data && response.data.posts) {
                setPosts(response.data.posts);
                console.log(response.data)
            } else {
                setMessage('Aucun post disponible.');
            }
        } catch (error) {
            setMessage('Erreur lors de la récupération des posts.');
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="posts-list-container">
            {message && <div className="alert alert-info">{message}</div>}
            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <h3>{post.nom} {post.prenom}</h3>
                                <span className="post-date">
                                    {new Date(post.created_at).toLocaleString()}
                                </span>
                            </div>
                            {post.content_post && <p className="post-text">{post.content_post}</p>}
                            {post.image && (
                                <div className="post-image-container">
                                    <img
                                        src={`http://localhost:8000/publication_photo/${post.image}`}
                                        alt="Post"
                                        className="post-image"
                                    />
                                </div>
                            )}
                            <div className="post-actions">
                                <button className="like-button">J'aime</button>
                                <button className="comment-button">Commenter</button>
                                <button className="share-button">Partager</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun post disponible.</p>
                )}
            </div>
        </div>
    );
};

export default PostsList;









