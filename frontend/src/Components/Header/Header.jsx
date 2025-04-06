import "../../App.css"
import "./Header.css"
import { NavLink } from "react-router-dom"; 
import logoFoot from "../../../public/FootMedia.png"
const Header = () => {
    return (
        <div className="header">
        <NavLink to="/" >
        <div className="logo-title">
        <img className="logo" src={logoFoot} alt="" />
        </div>
        </NavLink>
        
        <div className="authentification">
            <NavLink to="/login" >
            <button>Log in</button> 
            </NavLink>
            <NavLink to="/signup" >
            <button className="signup">Sign up</button>
            </NavLink>
        </div>
        </div>
    )
}

export default Header