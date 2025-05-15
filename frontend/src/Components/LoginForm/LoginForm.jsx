import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";
import "./LoginForm.css";
import FootMedia from "../../assets/FMNoir.png";
import { AuthContext } from "../AuthContext/AuthContext";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const navigate = useNavigate();
  const [validEntries, setvalidEntries] = useState(false);
  const [invalidEntries, setinvalidEntries] = useState(false);
  const auth = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
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

      auth.login({
        userId: result.userId,
        username: result.username,
        token: result.token,
        favoriteTeam: result.favoriteTeam,
      });
      navigate("/");
      setvalidEntries(true);
      setinvalidEntries(false);
    } catch (err) {
      console.error(err);
      setinvalidEntries(true);
      setvalidEntries(false);
    }

    event.target.reset();
  }

  return (
    <>
      <div className={`connexion ${loaded ? "fade-in" : ""}`}>
        <div className="info">
          <h2>{t("welcome")}</h2>
          <h3>{t("join_community")}</h3>
          <li>{t("share_moments")}</li>
          <li>{t("comment_matches")}</li>
          <li>{t("discover_posts")}</li>
          <p>
            {t("your_team")} <br />
            {t("your_wall")} <br />
            {t("your_community")}
          </p>
        </div>
        <div className="user-pass">
          <div className="logo-noir">
            <img src={FootMedia} alt="" />
          </div>
          <h2>{t("login")}</h2>
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
            </div>
            {invalidEntries && (
              <div className="control-error">
                <p>{t("invalid_login")}</p>
              </div>
            )}
            {validEntries && (
              <div className="control-valid">
                <p>{t("success_login")}</p>
              </div>
            )}
            <button type="submit" className="creer">
              {t("connect")}
            </button>
            <h4>{t("no_account")}</h4>
            <NavLink to="/signup">
              <button className="creer">{t("create_account")}</button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
