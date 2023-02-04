import React, { useState } from "react";
import './style.css'

import ImgRegister  from '../../../assets/IMGS/Cadastro.png'
import Input from "../../../components/Inputs";
import Message from "../../../components/Message";

import api from "../../../services/api";


const Cadastro = (props) =>{

    const [typeUser, setTypeUser] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [passwordConfirm,setPasswordConfirm] = useState()
    const [message, setMessage] = useState()

    const register = async () =>{
        
        if(message){
            setMessage(undefined)
        }
        const data = {username,password,passwordConfirm,typeUser}
        await api.post('/api/cadastro_usuario',data).then(
            res =>{
                
                if(res.status === 201){
                    setMessage(res.data.msg)
                }else{
                    setMessage(res.data.msg)
                }
            }
        ).catch(
            err =>{
                console.log(err)
            }
        )
    }

    return(
        <div className="Register_body">
            <div className="Register_form">
                <div className="Container_form">
                    <div className="Form_title">
                        

                    </div>
                    <div className="Form_body">
                        <Input tipo="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite o nome do usuário" nome="Usuário"></Input>
                        <Input tipo="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha" nome="Senha"></Input>
                        <Input tipo="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Digite a senha novamente" nome="Senha validação"></Input>
                        <select  className='input_select'name='typeUser' onChange={(e) => setTypeUser(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Admin">Admin</option>
                            <option value="Client">Client</option>
                        </select>
                        {message === "Usuário foi registrado"?(
                            <Message type='sucess' msg={message}></Message>
                        ):(
                            <Message type='error' msg={message}></Message>
                        )}
                        <button  onClick={register}className="button_register">Cadastrar</button>
                        
                    </div>
                </div>
            </div>
            <div className="Register_img">
                <img src={ImgRegister} alt="Imagem de cadastro" />
            </div>
        </div>
    )
}

export default Cadastro