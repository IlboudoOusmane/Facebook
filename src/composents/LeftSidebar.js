import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LeftSidebar.css'; 

const LeftSidebar = () => {
    return (
        <div className="sidebar-left">
            <ul className="sidebar-nav">
                <li>
                    <Link to="/profile" className="sidebar">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/groups" className="sidebar">
                        <i className="fas fa-users"></i>
                        <span>Groupes</span>
                    </Link>
                </li>
                
                <li>
                    <Link to="/events" className="sidebar">
                        <i className="fas fa-calendar-day"></i>
                        <span>Événements</span>
                    </Link>
                </li>

                
            </ul>
 
        </div>
    );
};

export default LeftSidebar;

