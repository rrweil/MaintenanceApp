import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuthContext();
    const isLoggedIn = !!user;
    let isAdmin = false;

    if (user != null){
    isAdmin = user.role == 'Admin';
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">Maintenance Form</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                                {!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/allTickets" className='nav-link text-light'>All Tickets</Link></li>
                                    <li className="nav-item"><Link to="/signup" className='nav-link text-light'>Signup</Link></li>
                                    <li className="nav-item"><Link to="/login" className='nav-link text-light'>Login</Link></li>
                                </>}
                                {isLoggedIn && <>
                                    <li className="nav-item"><Link to="/newTicket" className='nav-link text-light'>New Ticket</Link></li>
                                    <li className="nav-item"><Link to="/allTickets" className='nav-link text-light'>All Tickets</Link></li>                                
                                    <li className="nav-item"><Link to="/logout" className='nav-link text-light'>Logout</Link></li>
                                </>}
                                {isAdmin && <>
                                    <li className="nav-item"><Link to="/adminsettings" className='nav-link text-light'>Admin Settings</Link></li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>
        </div>
    )
}

export default Layout;