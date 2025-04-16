import { useState } from "react";
import "./UploadImage.css"; 

function UploadImage() {
  const [file, setFile] = useState(null);

  function getFile(event) {
    const selectedFile = URL.createObjectURL(event.target.files[0]);
    setFile(selectedFile);
  }

  return (
    <div>
      <label className="upload-file">
        Choisir une photo ou vidéo
        <input type="file" accept="image/*,video/*" onChange={getFile} />
      </label>

      {file && <img src={file} alt="preview" />}
    </div>
  );
}

export default UploadImage;
