import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import menuItens from './MenuItens'

//componete itens do menu
const MenuLink = ({ iconMenu, path }) => {
    return <li>
        <Link to={path}>
            <FontAwesomeIcon icon={iconMenu} />
        </Link>
    </li>
}

// menu lateral
function LateralMenu() {
    return (
        <div>
            <ul>
                {menuItens.map((item) => <MenuLink iconMenu={item.icon} path={item.path} />)}
            </ul>
        </div>
    )
}

export default LateralMenu