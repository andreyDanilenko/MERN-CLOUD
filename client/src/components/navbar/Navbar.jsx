import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.scss'
import { logout } from '../../reducers/userReducer'

function Navbar() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <div className="container">
                <div className='navbar__header'>MERN CLOUD</div>
                {!isAuth && <div className="navbar__login"><NavLink to='/login'>Войти</NavLink> </div>}
                {!isAuth && <div className="navbar__registration"><NavLink to='/registration'>Регистрация</NavLink> </div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Выйти</div>}
            </div>
        </div>
    )
}

export default Navbar
