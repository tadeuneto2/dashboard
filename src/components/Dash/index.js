import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import user from '../../images/user.jpeg'

import LateralMenu from '../Lateral-menu/Index'
import Principal from './Principal/Index'
import ListaProdutos from './Produtos/index'

const Authenticate = false;
const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest}
        render={ props =>  Authenticate ? (<Component {...props} />):( <Redirect to={{pathname:'/', state:{from:props.location}}} />) }
    />
}

const RouteTeste = (props) => (
    <div>
        <h1>Rota Privada</h1>
    </div>
)

function Dashboard() {
    return (
        <section className='container'>
            <section className='asideMenu'>
                <LateralMenu />
            </section>
            <nav className='navbar'>
                <div>
                    <h1>Dashboard - <small>ReactJS</small> </h1>
                </div>
                <div className='navbarRight'>
                    <img src={user} alt='User system' />
                </div>
            </nav>
            <section className='content'>
                <Switch>
                    <Route path='/' exact component={Principal} />
                    <Route path='/users' exact render={() => <h1>User</h1>} />
                    <Route path='/list' exact component={ListaProdutos} />
                    <Route path='/logout' exact render={() => <h1>Logout</h1>} />
                    <PrivateRoute path='/private' component={RouteTeste} />
                </Switch>
            </section>
        </section>
    )
}

export default Dashboard;