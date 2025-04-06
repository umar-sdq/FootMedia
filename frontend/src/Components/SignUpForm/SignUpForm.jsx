import { useState } from "react";
import "../SignUpForm/SignUpForm.css"
const SignUpForm = () => {
    
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
            <h1>asidslakd</h1>
            <div className="user-pass">
          <h2>Création de compte</h2>
          <h3>Choisissez votre equipe préférée</h3>
          <form onSubmit={handleSubmit}>
            <h3>Nom d'utilisateur</h3>
            <input name="utilisateur" type="text" placeholder="Entrez votre nom" required
            />
            <h3>Mot de passe</h3>
            <input name="password" type="password" placeholder="Entrez votre mot de passe" required
            />
            <h3>Confirmation de mot de passe</h3>
            <input name="confirm-password"id="confirm-password" type="password" placeholder="Confirmez votre mot de passe"required
            />

            {passwordNotEqual && (
              <div className="control-error">
                <p>*Les mots de passe doivent être identiques</p>
              </div>
            )}
            <button type="submit">Créer un compte</button>
            
          </form>
          </div>
        </div>
      </>
    );
}

export default SignUpForm;