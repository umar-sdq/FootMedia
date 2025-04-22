import "../PostForm/PostForm.css";
import { useState, useEffect } from "react";

const PostForm = () => {
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
    setAfficherInfoPost(true)
  }

  return (
    <div className="post-container">
    <div className={`post-form ${loaded ? "fade-in" : ""} ${afficherInfoPost ? "form-side" : ""}`}>
        {!file && (
          <label className="upload-file">
            Choisir une photo ou vidéo
            <input type="file" accept="image/*,video/*" onChange={getFile} />
          </label>
        )}
  
        {file &&  (
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
        <h2>Partage ton moment</h2>
    
       <p>Légende</p>
        <input type="text" id="caption" placeholder="Écris une légende..." />
    
        <label htmlFor="location">Lieu</label>
        <input type="text" id="location" placeholder="Où a été pris ce moment ?" />
    
        <p className="slogan">⚽ Ton souvenir. Ta voix. Ta communauté.</p>
      </div>
    )}
    
    </div>
  );
};
export default PostForm;
