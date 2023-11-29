import React, { useState } from 'react';
import axios from 'axios';
import styles from "../stylesheet/CreatePost.module.css"

const CreatePost = ({ posts, setPosts, modalOpen, setModalOpen }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title,
                body,
                userId: 1,
            });
            console.log('Created post:', response.data);
            let updatedPosts = [...posts, response.data]
            updatedPosts = updatedPosts.reverse()
            setPosts(updatedPosts)
            setBody("")
            setTitle("")
            setModalOpen(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className={styles.container}>
            {modalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <span className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <h2>Create New Post</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                            <div className={styles.buttonContainer}>
                                <button type="submit">Create Post</button>
                                <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
