import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './navbar/Navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './app.scss'
import Registration from './authorization/Registration'
import Login from './authorization/Login'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth &&
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/registration" component={Registration}></Route>
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App


