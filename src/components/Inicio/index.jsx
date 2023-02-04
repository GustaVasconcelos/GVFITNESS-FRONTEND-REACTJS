import './style.css'
import React,{useState} from 'react'

import Input from '../Inputs';
import ImgFundo from '../../assets/IMGS/academia-img-fundo.png'
import { Link } from 'react-router-dom';
import Message from '../Message'

import { login, setIdUsuario, setNomeUsuario } from '../../services/auth'
import api from '../../services/api'




const Inicio = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [message, setMessage] = useState()
    
    const handleSubmit = async () =>{

        try{

            if(message){
                setMessage(undefined)
            }
            const data = {
                username:username,
                password:password
            }
            await api.post('/api/login',data).then(
                response =>{
                    if(response.data.status === 1){
                        login(response.data.token)
                        setIdUsuario(response.data.id_client)
                        setNomeUsuario(response.data.username)
        
                        if(response.data.typeUser === 'Admin'){
                            window.location.href ='/Usuarios'
                        }else{
                            window.location.href ='/Exercicios'
                        }
                    }
                    else{
                        setMessage(response.data.msg)
                    }
                }
            ).catch(err =>{
                console.log(err)
            })

            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='Inicio_body'>
            <div className="Infos">
                <div className='Infos_text'>
                    <h2>Venha cuidar do seu corpo e da sua mente com a gente. A academia <span>GV</span>FITNESS tem os melhores profissionais e equipamentos para te ajudar. Venha nos fazer uma visita e veja como podemos te ajudar a cuidar de você!</h2>
                </div>
                <img src={ImgFundo} alt="" />
            </div>
            <div className="Form_login">
                <div className='form'>
                        <Input tipo="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu usuário" nome="Usuário"></Input>
                        <Input tipo="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" nome="Senha"></Input>
                        <Input tipo="submit" onClick={handleSubmit} nome="login"></Input>
                        {message&&<Message type='error' msg={message}></Message>}
                        <Link to="/Contatos">Não possui uma conta? Entre em contato com o dono para fazer seu cadastro!!</Link>
                </div>
            </div>
        </div>
    )
}

export default Inicio