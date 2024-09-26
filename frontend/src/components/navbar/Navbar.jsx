import React from 'react'
import "./Navbar.css"
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { authAction } from '../../store';


const Navbar = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()

    const handleLogout = () => {
        sessionStorage.clear("id")
        dispatch(authAction.logout())
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="#">
                        <b><GiNotebook />&nbsp;TODO</b>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" aria-current="page" to="/about">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" aria-current="page" to="/todo">Todo</Link>
                            </li>
                            {!isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active nav-btn mx-2" aria-current="page" to="/signup">Sign up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active nav-btn mx-2" aria-current="page" to="/signin">Sign in</Link>
                                    </li>
                                </>
                            )}
                            {isLoggedIn && (
                                <>
                                    <li className="nav-item" onClick={handleLogout}>
                                        <Link className="nav-link active nav-btn mx-2" aria-current="page" to="#">Log out</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
