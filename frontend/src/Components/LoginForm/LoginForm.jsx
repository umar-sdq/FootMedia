import { useState } from "react";
import "../SignUpForm/SignUpForm.css";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";
import FootMedia from "../../assets/FMNoir.png";

const LoginForm = () => {
  const [invalidEntries, setinvalidEntries] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Invalid login credentials");
      }
      console.log("Connecté !", result);
      setinvalidEntries(false); // Réinitialise l'état si la connexion réussit
    } catch (err) {
      console.error(err);
      setinvalidEntries(true); // Définit l'état sur true si les entrées sont invalides
    }
    event.target.reset();
  }

  return (
    <>
      <div className="connexion">
        <div className="info">
          <h2>Restez connecté.</h2>
          <h3>Rejoignez des milliers de fans passionnés</h3>
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
          <div className="logo-noir">
            <img src={FootMedia} alt="" />
          </div>
          <h2>Connexion de compte</h2>
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
            </div>
            {invalidEntries && (
              <div className="control-error">
                <p>*Identifiants invalides, veuillez réessayer.</p>
              </div>
            )}
            <button type="submit" className="creer">
              Se Connecter
            </button>
            <h4>Pas de compte?</h4>
            <NavLink to="/signup">
              <button className="creer">Créer un compte</button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;