/* aqui ficará todos os links criados para a barra lateral */
import { faUser, faHome, faList, faLock } from '@fortawesome/free-solid-svg-icons'
const MenuItens = [
    { icon: faHome, path:'/' },
    { icon: faUser, path:'/users' },
    { icon: faList, path:'/list' },
    { icon: faLock, path:'/logout' },
]
export default MenuItens