import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Feed.css";
import PostCard from "../PostCard/PostCard";

const Feed = () => {
  const auth = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setLoaded(true);
    handleAfficher();
  }, []);

  async function handleAfficher() {
    try {
      const response = await fetch("http://localhost:5001/api/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des posts");
      }

      const data = await response.json();
      setUserPosts(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des posts:", err);
    }
  }

  return (
    <div className={`feed ${loaded ? "fade-in" : ""}`}>
      <div className="liste-posts">
        {Array.isArray(userPosts) &&
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Feed;
