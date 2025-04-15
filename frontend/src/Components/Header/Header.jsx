import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import logoFoot from "../../assets/FootMedia.png";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);

  return (

    <div className={`header ${auth.isLoggedIn ? "connection-faite" : ""}`}>
    <NavLink to="/">
      <div className="logo-title">
        <img className="logo" src={logoFoot} alt="" />
      </div>
    </NavLink>
  
    <div className="authentification">
      {!auth.isLoggedIn && (
        <>
          <NavLink to="/login">
            <button className="btn-login">Log in</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="btn-signup signup">Sign up</button>
          </NavLink>
        </>
      )}
  
      {auth.isLoggedIn && (
        <div className="connexion-faite">
          <button className="btn-logout logout" onClick={auth.logout}>Log out</button>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Header;
