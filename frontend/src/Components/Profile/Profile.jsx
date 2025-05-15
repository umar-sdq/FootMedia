import { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { AuthContext } from "../AuthContext/AuthContext";
import PostCard from "../PostCard/PostCard";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");

  useEffect(() => {
    setLoaded(true);
    if (auth.userData) {
      setUpdatedUsername(auth.userData.username);
      setUpdatedBio(auth.userData.biographie || "");
    }
    handleAfficher();
  }, [auth.userData]);

  const handleRemove = (id) => {
    setUserPosts((prev) => prev.filter((p) => p._id !== id));
  };

  async function handleAfficher() {
    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/user/${auth.userData.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Erreur lors de la récupération des posts");
      const data = await response.json();
      setUserPosts(data.posts);
    } catch (err) {
      console.error("Erreur lors de la récupération des posts:", err);
    }
  }

  const handleUpdateUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${auth.userData.userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: updatedUsername,
          biographie: updatedBio,
        }),
      });

      if (!response.ok) throw new Error("Échec de la mise à jour");

      const data = await response.json();

      auth.login({
        ...auth.userData,
        username: data.user.username,
        biographie: data.user.biographie,
      });

      setEditMode(false);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  return (
    <>
      <div className={`profile ${loaded ? "fade-in" : ""}`}>
        {auth.userData ? (
          <>
            <div className="profile-header">
              <img src={auth.userData.favoriteTeam} alt="Team" />
              <p><strong>{auth.userData.username}</strong></p>
              <p><strong>{auth.userData.followers?.length || 0}</strong> {t("followers")}</p>
              <p><strong>{auth.userData.following?.length || 0}</strong> {t("following")}</p>
            </div>

            <p>{auth.userData.biographie}</p>

            <div className="boutons">
              <button className="modifier-btn" onClick={() => setEditMode(true)}>{t("edit_account")}</button>
            </div>

            <div className="profile-posts">
              {Array.isArray(userPosts) &&
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onDelete={() => handleRemove(post._id)}
                    isProfile={true}
                  />
                ))}
            </div>
          </>
        ) : (
          <p>{t("login_to_view_profile")}</p>
        )}
      </div>

      {editMode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t("edit_profile")}</h3>
            <input
              type="text"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              placeholder={t("username")}
            />
            <textarea
              value={updatedBio}
              onChange={(e) => setUpdatedBio(e.target.value)}
              placeholder={t("bio")}
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateUserInfo}>{t("save")}</button>
              <button onClick={() => setEditMode(false)}>{t("cancel")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
