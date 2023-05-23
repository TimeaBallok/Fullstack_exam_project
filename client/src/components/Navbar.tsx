import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import "./navbar.css"
import AuthContext from "../context/authContext";
import login from "../assets/login.png";

function Navbar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login', {replace: true});
    };

    return (
        <header className="navbar">
            <div className="nav-logo">
                <h1><NavLink to="/">Events</NavLink></h1>
            </div>
            <div className="nav-items">

                    <ul>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        {auth.token && (
                            <React.Fragment>
                        <li>
                            <NavLink to="/myevents">My events</NavLink>
                        </li>
                        <li>
                            <NavLink to="/bookings">Bookings</NavLink>
                        </li>
                            </React.Fragment>
                        )}
                    </ul>



            </div>
            <div className="nav-login">
                <div className="login-logo">
                    {!auth.token && (
                        <img src={login}/>
                    )}
                </div>
                {!auth.token && (
                    <React.Fragment>
                        <NavLink to="login">Login/Sign Up</NavLink>
                    </React.Fragment>
                )}

                {auth.token && (
                    <button className="btn-logout" onClick={handleLogout}>LOG OUT</button>
                )}

            </div>

        </header>
    );
}

export default Navbar;