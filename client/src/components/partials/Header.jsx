// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const[user, setUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user){
            setUser(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    }
    return (
        <header>
            <nav
                className='navbar navbar-expand-lg bg-primary'
                data-bs-theme='dark'
            >
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>
                        Todo App
                    </a>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarColor01'
                        aria-controls='navbarColor01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarColor01'
                    >
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link active' to='/'>
                                    Home
                                    <span className='visually-hidden'>
                                        (current)
                                    </span>
                                </Link>
                            </li>
                            {!user && (
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>
                                        Login
                                    </Link>
                                </li>
                            )}
                            <li className='nav-item'>
                                <Link className='nav-link' to='/register'>
                                    Register
                                </Link>
                            </li>
                            {user && (
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            )}
                            <li className='nav-item dropdown'>
                                <Link
                                    className='nav-link dropdown-toggle'
                                    data-bs-toggle='dropdown'
                                    to='/'
                                    role='button'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    Dropdown
                                </Link>
                                <div className='dropdown-menu'>
                                    <Link className='dropdown-item' to='/'>
                                        Action
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Another action
                                    </Link>
                                    <Link className='dropdown-item' to='/'>
                                        Something else here
                                    </Link>
                                    <div className='dropdown-divider'></div>
                                    <Link className='dropdown-item' to='/'>
                                        Separated link
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;