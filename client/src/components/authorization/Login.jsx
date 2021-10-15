import React, { useState } from 'react'
import Input from '../../utils/input/Input'
import './authorization.scss'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="authorization">
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
            <button className="authorization__btn">Войти</button>
        </div>
    )
}

export default Login
