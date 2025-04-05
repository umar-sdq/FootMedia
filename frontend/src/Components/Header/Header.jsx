import "../../App.css"
import "./Header.css"
import { NavLink } from "react-router-dom"; 
const Header = () => {
    return (
        <div className="header">

        <div className="logo-title">
        <h2 className="title">FootMedia</h2>
        </div>
        
        <div className="authentification">
            <NavLink to="/login" >
            <button>Log in</button>
            </NavLink>
            <button>Sign up</button>
        </div>
        </div>
    )
}

export default Header