import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
const Profile = () => {
    const auth = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
        handleAfficher();
    }, [auth.userData]);
    async function handleAfficher() {
        try {
          const response = await fetch(`http://localhost:5001/api/posts/user/${auth.userData.userId}`, {
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
          setUserPosts(data.posts); 
        } catch (err) {
          console.error("Erreur lors de la récupération des posts:", err);
        }
      }
    return (
        <>
          <div className="profile">
            {auth.userData ? (
              <>
                <h1>profile, Hello {auth.userData.username}</h1>
                <p>Abonnées: {auth.userData.followers?.length || 0}</p>
                <p>Abonnements: {auth.userData.following?.length || 0}</p>
                <p>biographie {auth.userData.biographie}</p>
                <ul>
                  {userPosts.map((post) => (
                    <li key={post.id}>
                      {post.caption} - {post.location}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Veuillez vous connecter pour voir votre profil.</p>
            )}
            
          </div>
        </>
      );
      
}

export default Profile;