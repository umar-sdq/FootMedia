import { useState, useEffect } from "react";
import "../SignUpForm/SignUpForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import footMedia from "../../assets/FMNoir.png";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [afficherModal, setAfficherModal] = useState(false);
  const [mdpLength, setMdpLength] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChooseClick = () => {
    setAfficherModal(true);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const entries = Object.fromEntries(fd.entries());
    const data = {
      ...entries,
      favoriteTeam: selectedTeam
    };

    if (data.password !== data["confirm-password"]) {
      setPasswordNotEqual(true);
      return;
    }

    if (data.password.length < 6) {
      setMdpLength(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setSignedUp(true);
      setMdpLength(false);
      setPasswordNotEqual(false);
      setUserExists(false);
      event.target.reset();

    } catch (err) {
      console.error(err.message);
      setUserExists(err.message);
    }
  }

  return (
    <>
      {!signedUp && (
        <div className={`connexion ${loaded ? "fade-in" : ""}`}>
          <div className="info">
            <h2>{t("welcome")}</h2>
            <h3>{t("join_community")}</h3>
            <li>{t("share_moments")}</li>
            <li>{t("comment_matches")}</li>
            <li>{t("discover_posts")}</li>
            <p>
              {t("your_team")}<br />
              {t("your_wall")}<br />
              {t("your_community")}
            </p>
          </div>
          <div className="user-pass">
            <h2>{t("register")}</h2>
            <button className="choisir" onClick={handleChooseClick}>
              {t("choose_team")}
            </button>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="username"
                  type="text"
                  placeholder={t("username")}
                  required
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder={t("password")}
                  required
                />
                {mdpLength && (
                  <div>
                    <p>{t("password_too_short")}</p>
                  </div>
                )}
                {userExists && (
                  <div className="control-error">
                    <p>{t("username_taken")}</p>
                  </div>
                )}
              </div>

              <h3>{t("confirm_password")}</h3>
              <input
                name="confirm-password"
                id="confirm-password"
                type="password"
                placeholder={t("confirm_password")}
                required
              />

              {passwordNotEqual && (
                <div className="control-error">
                  <p>{t("passwords_not_matching")}</p>
                </div>
              )}
              <div className="terms">
                <input type="checkbox" id="terms" name="terms" required />
                <p>{t("accept_terms")}</p>
              </div>
              <button type="submit" className="creer">
                {t("create_account")}
              </button>
            </form>

            <h4>{t("already_have_account")}</h4>
            <NavLink to="/login">
              <button className="connexion">{t("connect")}</button>
            </NavLink>
          </div>
        </div>
      )}

      {signedUp && (
        <div className="connexion">
          <div className="info">
            <h2>{t("welcome")}</h2>
            <h3>{t("join_community")}</h3>
            <li>{t("share_moments")}</li>
            <li>{t("comment_matches")}</li>
            <li>{t("discover_posts")}</li>
            <p>
              {t("your_team")}<br />
              {t("your_wall")}<br />
              {t("your_community")}
            </p>
          </div>
          <div className={`user-pass ${loaded ? "fade-in-bv" : ""}`}>
            <img className="logo-confirmation" src={footMedia} alt="" />
            <h2>{t("account_created")}<br />La passion commence ici.</h2>
            <NavLink to="/login">
              <button className="connexion">{t("connect")}</button>
            </NavLink>
          </div>
        </div>
      )}

      {afficherModal && (
        <div className="modal-overlay">
          <Modal
            onConfirm={() => setAfficherModal(false)}
            onCancel={() => setAfficherModal(false)}
            onSelectTeam={(logo) => setSelectedTeam(logo)}
          />
        </div>
      )}
    </>
  );
};

export default SignUpForm;
