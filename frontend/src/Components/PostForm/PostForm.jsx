import "../PostForm/PostForm.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";

const PostForm = () => {
  const auth = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [afficherInfoPost, setAfficherInfoPost] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  function getFile(event) {
    const selectedFile = URL.createObjectURL(event.target.files[0]);
    setFile(selectedFile);
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
          image: file,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du post");
      }

      console.log("Post créé avec succès !");
      console.log(body)
    } catch (err) {
      console.error(" Erreur lors de la création du post:", err);
    }
  }

  return (
    <>
      <div className="post-container">
        <div className={`post-form ${loaded ? "fade-in" : ""} ${afficherInfoPost ? "form-side" : ""}`}>
          {!file && (
            <label className="upload-file">
              Choisir une photo ou vidéo
              <input type="file" accept="image/*,video/*" onChange={getFile} />
            </label>
          )}

          {file && (
            <>
              <img src={file} alt="preview" className="image-prev" />
              <div className="action-buttons">
                {!afficherInfoPost && (
                  <button className="btn-next" onClick={handleNext}>Suivant</button>
                )}
                <button className="btn-cancel" onClick={resetFile}>Annuler</button>
              </div>
            </>
          )}
        </div>

        {afficherInfoPost && (
          <div className={`info-post ${loaded ? "fade-in-post" : ""}`}>
            <p>{auth.userData.username}</p>
            <img className="logo-confirmation" src={auth.userData.favoriteTeam} alt="Favorite team" />
            <h2>Partage ton moment</h2>
            <input type="text" id="caption" placeholder="Légende" />
            <input type="text" id="location" placeholder="Ajouter la location" />
            <p className="slogan">Ton souvenir. Ta voix. Ta communauté.</p>
            <button className="btn-publier" onClick={handleCreate}>Publier</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostForm;
