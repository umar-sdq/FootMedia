import React, { useState, useContext } from "react";
import "./PostCard.css";
import { FaHeart, FaComment, FaShare, FaEllipsisH } from "react-icons/fa";
import { AuthContext } from "../AuthContext/AuthContext";

function PostCard({ post, onDelete }) {
  const auth = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async () => {
    console.log("POST ID =", post.id);
    try {
      
      const response = await fetch(`http://localhost:5001/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du post");
      }

      console.log("Post supprimé");
      if (onDelete) onDelete(); 

    } catch (err) {
      console.error("Erreur delete:", err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card-top">
        {post.favoriteTeam && (
          <img
            src={post.favoriteTeam}
            alt="favorite team"
            className="post-team-logo"
          />
        )}
        <div className="post-info-texts">
          <div className="username">{post.username}</div>
          <div className="location">{post.location}</div>
        </div>
        <div className="post-options">
          <button className="dots-button" onClick={() => setShowOptions(!showOptions)}>
            <FaEllipsisH />
          </button>
          {showOptions && (
            <div className="dropdown-options">
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>

      <img src={post.image} alt="post" />
      <div className="post-card-content">
        <div className="icons">
          <FaHeart size={20} />
          <FaComment size={20} />
          <FaShare size={20} />
        </div>
        <p><strong>{post.likes?.length} likes</strong></p>
        <p><strong>{post.username}</strong> {post.caption}</p>
      </div>
    </div>
  );
}

export default PostCard;
