import "../../App.css"
import "./Header.css"
const Header = () => {
    return (
        <div className="header">

        <div className="logo-title">
        <h2 className="title">FootMedia</h2>
        </div>
        
        <div className="authentification">
            <button>Log in</button>
            <button>Sign up</button>
        </div>
        </div>
    )
}

export default Header