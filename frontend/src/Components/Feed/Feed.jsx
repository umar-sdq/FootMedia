import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import PostCard from "../PostCard/PostCard";
import "./Feed.css";

const Feed = () => {
  const auth = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false); 
  useEffect(() => {
    setLoaded(true);
    handleAfficher();
    handleFetchUsers();
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

  async function handleFetchUsers() {
    try {
      const response = await fetch("http://localhost:5001/api/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");

      const data = await response.json();
      const allUsers = data.users;

      const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 15);

      setUsers(selected);
      setSuggestionsLoaded(true); 
    } catch (err) {
      console.error("Erreur users:", err);
    }
  }

  return (
    <div className={`feed-container ${loaded ? "fade-in" : ""}`}>
      <div className="feed-main">
        <div className="liste-posts">
          {Array.isArray(userPosts) &&
            userPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      <div className="feed-sidebar">
        {suggestionsLoaded && ( 
          <>
            <h2>Suggestions</h2>
            <ul className="suggestions-list">
              {users.map((user) => (
                <li key={user._id}>
                  <div className="username-suggestion">
                    <img src={user.favoriteTeam} alt="logo" className="suggestion-logo" />
                    {user.username}
                  </div>
                  <button className="follow">suivre</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
