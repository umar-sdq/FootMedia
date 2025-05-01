import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Feed.css";

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
      const response = await fetch("http://localhost:5001/api/posts/",{
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
    <>

      <div className={`feed ${loaded ? "fade-in" : ""}`}>
        <h1>Feed</h1> 

        <ul>
  {Array.isArray(userPosts) && userPosts.map((post) => (
    <li key={post.id}>
      {post.caption} - {post.location}
    </li>
  ))}
</ul>

       
      </div>
    </>
  );
};

export default Feed;
