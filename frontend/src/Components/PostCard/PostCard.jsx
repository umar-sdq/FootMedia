import React from "react";
import "./PostCard.css";
import { FaHeart, FaComment, FaShare} from "react-icons/fa";
function PostCard({ post }) {
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
</div>

       
        <img src={post.image} alt="post" />
        <div className="post-card-content">
            <div className="icons">
            <FaHeart size={20}></FaHeart>
            <FaComment size={20}></FaComment>
            <FaShare size={20}></FaShare>
            </div>
            
            <p><strong>{post.likes?.length} likes</strong></p>
            <p><strong>{post.username}</strong> {post.caption}</p>

        </div>
      </div>
    );
  }
  
  

export default PostCard;