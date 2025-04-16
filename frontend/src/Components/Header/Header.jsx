import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import logoFoot from "../../assets/FootMedia.png";
import { NavLink } from "react-router-dom";
import { FaPlus, FaUser, FaBell } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={`header ${auth.isLoggedIn ? "connection-faite" : ""}`}>
      <NavLink to="/">
        <div className="logo-title">
          <img className="logo" src={logoFoot} alt="FootMedia" />
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
          <div className="nav-icons">
            <NavLink to="/add" title="Créer un post">
              <FaPlus className="icon" />
            </NavLink>
            <NavLink to="/profile" title="Profil">
              <FaUser className="icon" />
            </NavLink>
            <NavLink to="/notifications" title="Notifications">
              <FaBell className="icon" />
            </NavLink>
            <button className="btn-logout logout" onClick={auth.logout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
