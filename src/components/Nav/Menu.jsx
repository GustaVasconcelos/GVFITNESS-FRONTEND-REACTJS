import './Menu.css'
import React,{useState} from 'react'

import { Link } from 'react-router-dom'

import api from '../../services/api'

const Menu = () => {
    
    const [active,setActive] = useState("nav_menu")
    const [toggleIcon, setToggleIcon] = useState("nav_toggler")


    const navToggle = () =>{
        active === 'nav_menu'? setActive('nav_menu nav_active')
        :setActive('nav_menu')

        toggleIcon === "nav_toggler"?setToggleIcon('nav_toggler toggle')
        :setToggleIcon('nav_toggler')
    }

    return (
        <nav className='nav'>
            <h1 className="nav_logo"><span>GV</span>FITNESS</h1>
            
            <ul className={active}>
                <li className='nav_item'><Link to='/' className='nav_link'>Incio</Link></li>
                <li className='nav_item'><Link to='/Contatos' className='nav_link'>Contatos</Link></li>
            </ul>

            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
    
}

export default Menu