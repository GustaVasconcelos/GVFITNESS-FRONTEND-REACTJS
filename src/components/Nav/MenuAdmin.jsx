import './Menu.css'
import React,{useState} from 'react'

import { Link } from 'react-router-dom'
import api from '../../services/api'
import { getToken, logout } from '../../services/auth'
const MenuAdmin = () => {
    
    const [active,setActive] = useState("nav_menu")
    const [toggleIcon, setToggleIcon] = useState("nav_toggler")


    const navToggle = () =>{
        active === 'nav_menu'? setActive('nav_menu nav_active')
        :setActive('nav_menu')

        toggleIcon === "nav_toggler"?setToggleIcon('nav_toggler toggle')
        :setToggleIcon('nav_toggler')
    }

    
    const endSession = async () =>{
        try{
            const data ={
                headers:{
                    token:getToken()
                }
            }
            console.log(data)
            const response = await api.get('api/destroytoken',data)

            if(response.status === 200){
                logout()
                window.location.href = '/'
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <nav className='nav'>
            <h1 className="nav_logo"><span>GV</span>FITNESS</h1>
            <ul className={active}>
                <li className='nav_item'><Link to='/Usuarios'className='nav_link'>Usuarios</Link></li>
                <li className='nav_item'><Link to='/Cadastro'className='nav_link'>Cadastro</Link></li>
                <button onClick={endSession} className='nav_logout'>Desconectar</button>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
    
}

export default MenuAdmin