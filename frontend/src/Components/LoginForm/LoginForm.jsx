import { useState } from "react";
import "../SignUpForm/SignUpForm.css"
import { NavLink } from "react-router-dom";
import "./LoginForm.css"
import FootMedia from "../../assets/FMNoir.png"
const LoginForm = () => {
    
    const [passwordNotEqual, setPasswordNotEqual] = useState(false);

    function handleSubmit(event) {
      event.preventDefault();
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
  
      if (data.password !== data["confirm-password"]) {
        setPasswordNotEqual(true);
        return;
      }
      setPasswordNotEqual(false);
      console.log(data); 
      event.target.reset(); 
    }
  
    return (
      <>
        <div className="connexion">
          <div className="info">
          <h2>Restez connecté.</h2>
          <h3>Rejoignez des milliers de fans passionnés  </h3>
          <li>Partagez vos moments préférés</li>
          <li>Commentez les matchs</li>
          <li>découvrez les posts des supporters du monde entier</li>
          <p>
Votre équipe. <br />Votre mur. <br />Votre communauté.
</p>
          </div>
            <div className="user-pass">
                <div className="logo-noir">
                <img src={FootMedia} alt="" />
                </div>
          <h2>Connexion de compte</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input name="utilisateur" type="text" placeholder="Nom d'utilisateur" required
            />
            </div>
            <div>
              <input name="password" type="password" placeholder="Mot de passe" required

            /></div>
            <button type="submit" className="creer">Se Connecter</button>
            <h4>Pas de compte?</h4>
            <NavLink to="/signup">
            <button type="submit" className="creer">Creer un compte</button>
            </NavLink>

          </form>
          </div>
        </div>
      </>
    );
}

export default LoginForm;