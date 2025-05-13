import "../PostForm/PostForm.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import supabase from "../../../../backend/util/supabase.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PostForm = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [afficherInfoPost, setAfficherInfoPost] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  function getFile(event) {
    setFile(event.target.files[0]);
    setFilePreview(URL.createObjectURL(event.target.files[0]));
  }

  function resetFile() {
    setFile(null);
    setAfficherInfoPost(false);
  }

  function handleNext() {
    setAfficherInfoPost(true);
  }

  async function handleCreate() {
    try {
      setIsLoading(true);
      const fileName = Date.now() + "_" + file.name;
      const upload = await supabase.storage.from("photo-posts").upload(fileName, file);
      if (upload.error) {
        throw new Error("Erreur lors de l'upload de l'image");
      }
      const imageUrl = supabase.storage.from("photo-posts").getPublicUrl(fileName).data.publicUrl;

      const response = await fetch("http://localhost:5001/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          userId: auth.userData.userId,
          caption: document.getElementById("caption").value,
          location: document.getElementById("location").value,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du post");
      }

      console.log(t("post_success"));
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la création du post:", err);
    } finally {
      setIsLoading(false);
    }
  }

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
      <div className="post-container">
        <div className={`post-form ${loaded ? "fade-in" : ""} ${afficherInfoPost ? "form-side" : ""}`}>
          {!file && (
            <label className="upload-file">
              {t("upload")}
              <input type="file" accept="image/*,video/*" onChange={getFile} />
            </label>
          )}

          {file && (
            <>
              <img src={filePreview} alt="preview" className="image-prev" />
              <div className="action-buttons">
                {!afficherInfoPost && (
                  <button className="btn-next" onClick={handleNext}>
                    {t("next")}
                  </button>
                )}
                <button className="btn-cancel" onClick={resetFile}>
                  {t("cancel")}
                </button>
              </div>
            </>
          )}
        </div>

        {afficherInfoPost && (
          <div className={`info-post ${loaded ? "fade-in-post" : ""}`}>
            <p>{auth.userData.username}</p>
            <img className="logo-confirmation" src={auth.userData.favoriteTeam} alt="Favorite team" />
            <h2>{t("share_moments")}</h2>
            <input type="text" id="caption" placeholder={t("caption")} />
            <input type="text" id="location" placeholder={t("location")} />
            <p className="slogan">Ton souvenir. Ta voix. Ta communauté.</p>
            {isLoading && <div className="spinner"></div>}
            <button className="btn-publier" onClick={handleCreate}>
              {t("post_now")}
            </button>
            <button onClick={handleAfficher}>{t("my_posts")}</button>

            {userPosts.length > 0 && (
              <div className="posts-liste">
                <h3>{t("my_posts")} :</h3>
                <ul>
                  {userPosts.map((post) => (
                    <li key={post.id}>
                      {post.caption} - {post.location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostForm;
