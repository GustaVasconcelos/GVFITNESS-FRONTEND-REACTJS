import React from "react";
import { Link } from "react-router-dom";
import './style.css'

import instagram from '../../assets/IMGS/instagram.png'
import linkedin from '../../assets/IMGS/linkedin.png'

const Contatos = () =>{
    return (
        <div className="Contatos_body">
            <div className="Contatos_itens">
                <div className="item">
                    <img src={instagram} alt="instagram" />
                    <h3><a href='https://www.instagram.com/v4sc__/' target="_blank">V4sc__</a></h3>
                </div>
                <div className="item">
                    <img src={linkedin} alt="linkedin" />
                    <h3><a href='https://www.linkedin.com/in/gustavo-vasconcelos-6684a9259/' target="_blank">Gustavo Vasconcelos</a></h3>
                </div>                  
        
            </div>
        </div>
    )
}

export default Contatos