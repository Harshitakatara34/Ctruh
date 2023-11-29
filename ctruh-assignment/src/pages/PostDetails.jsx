import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error( error);
        setError("Error");
        setLoading(false);
      });
  };






  const getPost = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error");
        setLoading(false);
      });
  };

 

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  return (
    <div style={{ margin: "auto", width: "90%", textAlign: "center" }}>
      <div>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h1
            style={{
              textAlign: "left",
              marginLeft: "10px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ⬅️ Go back
          </h1>
        </Link>
        <h2
          style={{ marginTop: "10px", fontSize: "24px", marginBottom: "20px" }}
        >
          Post Detail
        </h2>
      </div>

      {post ? (
        <>
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
              {post.title}
            </h2>
            <p style={{ fontSize: "20px" }}>{post.body}</p>
            <hr />
          </div>
          <div className="comments-container" style={{ marginTop: "20px" }}>
            <h4
              style={{
                textAlign: "left",
                marginLeft: "10px",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Comments:
            </h4>
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="comment"
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "flex-start",
                  marginLeft: "10px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h4 style={{ fontSize: "16px" }}>
                    {comment.email.split("@")[0]}
                  </h4>
                </div>
                <div
                  className="comment-details"
                  style={{ textAlign: "left", marginLeft: "10px" }}
                >
                  <h4 style={{ fontSize: "18px" }}>{comment.name}</h4>
                  <p
                    style={{
                      color: "grey",
                      fontSize: "20px",
                      lineHeight: "20px",
                    }}
                  >
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetails;
