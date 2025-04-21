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
  }
  function handleNext() {
    setAfficherInfoPost(true)
  }

  return (
    <div className="post-container">
      <div className={`post-form ${loaded ? "fade-in" : ""}`}>
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
              <button className="btn-next" onClick={handleNext}>Suivant</button>
              <button className="btn-cancel" onClick={resetFile}>Annuler</button>
            </div>
          </>
        )}
      </div>
  
      {afficherInfoPost && (
        <div className="info-post">
          <p>test</p>
        </div>
      )}
    </div>
  );
};
export default PostForm;
