import { useState } from "react";
import "../SignUpForm/SignUpForm.css";
import { NavLink } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import footMedia from "../../assets/FMNoir.png";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [afficherModal, setAfficherModal] = useState(false);
  const [mdpLength, setMdpLength] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

   const handleChooseClick = () => {
    setAfficherModal(true);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data["confirm-password"]) {
      setPasswordNotEqual(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    }
    if (data.password.length < 6) {
      setMdpLength(true);
      return;
    }
    setSignedUp(true);
    setMdpLength(false);
    setPasswordNotEqual(false);
    console.log(data);
    event.target.reset();
  }

  return (
    <>
    {!signedUp && (
     <div className={`connexion ${loaded ? "fade-in" : ""}`}>
         <div className="info">
          <h2>Restez connecté.</h2>
          <h3>Rejoignez des milliers de fans passionnés </h3>
          <li>Partagez vos moments préférés</li>
          <li>Commentez les matchs</li>
          <li>découvrez les posts des supporters du monde entier</li>
          <p>
            Votre équipe. <br />
            Votre mur. <br />
            Votre communauté.
          </p>
        </div>
        <div className="user-pass">
          <h2>Création de compte</h2>
          <button className="choisir" onClick={handleChooseClick}>
            Choisissez votre equipe préférée
          </button>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
              />
              {mdpLength && (
                <div>
                  <p>*Le mot de passe doit contenir au moins 6 caractères</p>
                </div>
              )}
            </div>

            <h3>Confirmation de mot de passe</h3>
            <input
              name="confirm-password"
              id="confirm-password"
              type="password"
              placeholder="Confirmez votre mot de passe"
              required
            />

            {passwordNotEqual && (
              <div className="control-error">
                <p>*Les mots de passe doivent être identiques</p>
              </div>
            )}
            <div className="terms">
              <input type="checkbox" id="terms" name="terms" required />
              <p>J'accepte les termes et conditions FootMedia</p>
            </div>
            <button type="submit" className="creer">
              Créer un compte
            </button>
          </form>

          <h4>Déja un compte?</h4>
          <NavLink to="/login">
            <button className="connexion">Connectez vous</button>
          </NavLink>
        </div>
          
        </div>
      )}
    {signedUp && (
        <div className="connexion">
        <div className="info">
         <h2>Restez connecté.</h2>
         <h3>Rejoignez des milliers de fans passionnés </h3>
         <li>Partagez vos moments préférés</li>
         <li>Commentez les matchs</li>
         <li>découvrez les posts des supporters du monde entier</li>
         <p>
           Votre équipe. <br />
           Votre mur. <br />
           Votre communauté.
         </p>
       </div>
       <div className={`user-pass ${loaded ? "fade-in-bv" : ""}`}>
         
        <img className="logo-confirmation" src={footMedia} alt="" />
         <h2>Bienvenue sur FootMedia. <br />
         La passion commence ici.</h2>
         <NavLink to="/login">
           <button className="connexion">Connectez vous</button>
         </NavLink>
       </div>
         
       </div>
      )}
        
      {afficherModal && (
        <div className="modal-overlay">
          <Modal
            onConfirm={() => setAfficherModal(false)}
            onCancel={() => setAfficherModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default SignUpForm;
