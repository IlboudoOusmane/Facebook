import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const [isProfile, setProfile] = useState(false);

    const handleProfile = () => {
        setProfile(!isProfile); 
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link id="fb">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                    </li>

                    <li>
                        <button id="search_btn" className="tooltip" data-tooltip="Search">
                            <i className="fas fa-search"></i>
                        </button>
                    </li>

                    <li id="space2"></li>

                    <li>
                        <NavLink to="/" className="tooltip" data-tooltip="Acceuil" id="home" activeClassName="active">
                            <i className="fas fa-home"></i>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/invitation" className="tooltip" data-tooltip="Amis" id="friend" activeClassName="active">
                            <i className="fas fa-user-friends"></i>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/create-post" className="tooltip" data-tooltip="Publication" id="btn_create_post" activeClassName="active">
                            <i className="fas fa-pencil-alt"></i> 
                        </NavLink>
                    </li>                  

                    <li id="space1"></li>

                    <li>
                        <button className="tooltip" data-tooltip="Message" id="btn_msg">
                            <i className="fab fa-facebook-messenger"></i>
                        </button>
                    </li>

                    <li>
                        <button className="tooltip" data-tooltip="Notification" id="btn_bell">
                            <i className="fas fa-bell"></i>
                        </button>
                    </li>

                    <li>
                        <button className="tooltip" data-tooltip="Profile" id="btn_profile" onClick={handleProfile}>
                            <i className="fas fa-user"></i>
                        </button>

                        {isProfile && (
                            <div className="profile-tooltip">
                                {token ? (
                                    <NavLink to="/logout" className="tooltip" data-tooltip="Logout" activeClassName="active">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>se déconnecter</span>
                                    </NavLink>
                                ) : (
                                    <NavLink to="/register" className="tooltip" data-tooltip="Register" activeClassName="active">
                                        <i className="fas fa-user-plus"></i>
                                    </NavLink>
                                )}
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
