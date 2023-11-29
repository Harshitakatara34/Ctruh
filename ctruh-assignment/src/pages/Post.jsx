import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../stylesheet/PostList.module.css";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import CreatePost from "../components/CreatePost";
import { Box } from "@chakra-ui/react";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error");

        setLoading(false);
      });
  }, []);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    );

    setPosts(updatedPosts);
  };

  const likedPosts = posts.filter((post) => post.liked);

  const handleDelete = async (postId) => {
    try {
      await axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => {
          alert("Post  Deleted!");
          setPosts(posts.filter((post) => post.id !== postId));
        });
      console.log("Deleted post:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Box backgroundColor="teal" height={"auto"} width={"100%"} margin={"0"}>
        <h1
          style={{
            margin: 0,
            padding: 0,
            cursor: "pointer",
            color: "white", // Add cursor style for click indication
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Posts
        </h1>
      </Box>

      <div
        style={{
          display: "flex",
          width: "600px",
          justifyContent: "space-around",
          margin: "auto",
        }}
      >
        <button
          style={{
            width: "200px",
            borderStyle: "none",
            background: "teal",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "16px",
            marginBottom: "30px",
            marginTop: "20px",
          }}
          onClick={() => {
            setPosts(likedPosts);
          }}
        >
          Filter Liked Posts
        </button>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            marginLeft: "10px",
            width: "200px",
            fontWeight: "600",
            fontSize: "16px",
            borderStyle: "none",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            background: "teal",
            marginBottom: "30px",
            marginTop: "20px",
          }}
        >
          Add New
        </button>
      </div>

      <CreatePost
        posts={posts}
        setPosts={setPosts}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div className={styles.postlist}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postcard}>
            <Link to={`/post/${post.id}`} className={styles.linkClass}>
              <>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </>
            </Link>
            <button
              onClick={() => handleLike(post.id)}
              style={{
                background: "teal",
                borderStyle: "none",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px",
                width: "90px",
                fontWeight: "600",
                marginRight: "10px",
              }}
            >
              {post.liked ? " 👎🏻" : " 👍🏻"}
            </button>

            <button
              onClick={() => {
                handleDelete(post.id);
              }}
              style={{
                width: "90px",
                borderStyle: "none",
                fontSize: "14px",
                background: "teal",
                padding: "10px",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
