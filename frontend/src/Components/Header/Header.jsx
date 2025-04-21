import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import logoFoot from "../../assets/FootMedia.png";
import { NavLink } from "react-router-dom";
import { FaPlus, FaUser, FaBell } from "react-icons/fa";
import "./Header.css";
import { useState } from "react";
import PostForm from "../PostForm/PostForm.jsx";
const Header = () => {
  const auth = useContext(AuthContext);
  const [afficherPostForm, setAfficherPostForm] = useState(false);
  const handlePostForm = () => {
    setAfficherPostForm(true);
  };
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
            <NavLink to="/add">
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
      {/* pour afficher le form en forme de modal mais pas bsn encore
  { afficherPostForm&& (
        <div className="post-overlay">
          <PostForm
            onConfirm={() => setAfficherModal(false)}
            onCancel={() => setAfficherModal(false)}
          />
        </div>
      )} 
*/}
      
    </div>
    
  );
};

export default Header;
