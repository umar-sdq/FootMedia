import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import logoFoot from "../../assets/FootMedia.png";
import { NavLink } from "react-router-dom";
import { FaPlus, FaUser, FaBell } from "react-icons/fa";
import "./Header.css";
import PostForm from "../PostForm/PostForm.jsx";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const auth = useContext(AuthContext);
  const [afficherPostForm, setAfficherPostForm] = useState(false);

  useEffect(() => {}, [auth.userData]);

  const handlePostForm = () => {
    setAfficherPostForm(true);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`header ${auth.isLoggedIn ? "connection-faite" : ""}`}>
      <NavLink to="/">
        <div className="logo-title">
          <img className="logo" src={logoFoot} alt="FootMedia" />
        </div>
      </NavLink>

      <div className="language-switch">
        <button onClick={() => changeLanguage("fr")}>FR</button>
        <button onClick={() => changeLanguage("en")}>EN</button>
      </div>

      <div className="authentification">
        {!auth.isLoggedIn && (
          <>
            <NavLink to="/login">
              <button className="btn-login">{t("login")}</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="btn-signup signup">{t("register")}</button>
            </NavLink>
          </>
        )}

        {auth.isLoggedIn && (
          <div className="nav-icons">
            {auth.userData?.favoriteTeam && (
              <img
                src={auth.userData.favoriteTeam}
                alt="Favorite team"
                className="team-logo"
              />
            )}

            <NavLink to="/add">
              <FaPlus className="icon" />
            </NavLink>
            <NavLink to="/profile" title="Profil">
              <FaUser className="icon" />
            </NavLink>
            <NavLink to="/notifications" title="Notifications">
              <FaBell className="icon" />
            </NavLink>
            <button className="btn-logout logout" onClick={auth.logout}>
              {t("logout")}
            </button>
          </div>
        )}
      </div>

      {/* pour afficher le form modal plus tard */}
      {/* 
      {afficherPostForm && (
        <div className="post-overlay">
          <PostForm
            onConfirm={() => setAfficherPostForm(false)}
            onCancel={() => setAfficherPostForm(false)}
          />
        </div>
      )} 
      */}
    </div>
  );
};

export default Header;
