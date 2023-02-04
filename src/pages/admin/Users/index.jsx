import './style.css'
import React,{useEffect, useState} from 'react'

import api from '../../../services/api'


import Input from '../../../components/Inputs'


import Find from '../../../components/Find'
import Card from '../../../components/Card/Index'
import Message from '../../../components/Message'
import FindImg from '../../../assets/IMGS/find.png'


const Usuarios = () => {

    const [usuarios, setUsuarios] = useState()
    const [loading,setLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)
    const [find, setFind] = useState('')
    const [user,setUser] = useState()
    const [message, setMessage] = useState()



    const getUsers = async () =>{
        try{
            
            await api.get('api/usuarios')
            .then(res =>{
                setUsuarios(res.data)
                setLoading(true)
            }).catch(err =>{
                console.log(err)
            })
    
            

        }catch(err){
            console.log(err)
        }
    }

    const getUser = async () =>{
        try{

            
            setLoadingUser(false)

            if(message){
                setMessage(undefined)
            }
            
            let username = find
        

            const data = {
                headers: { username: username }
            }
            
            await api.get('/api/usuario',data).then(res=>{

                
                if(res.status === 201){
                    setUser(res.data)
                    setLoadingUser(true)
                }

                if(res.data.status === 2){
                    setUser(undefined)
                    setMessage(res.data.msg)
                    setLoadingUser(false)
                }
                

            }).catch(err =>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getUsers()
    })

    return (
        <div className='Usuarios'>
            <div className='Usuario_find'>
                <div className='Buttons'>
                    <div className='buttons_box'>
                        <Input tipo="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Digite o nome do usuário" nome="Usuário"></Input>
                        <Input onClick={getUser}tipo="submit" nome="Pesquisar"></Input>
                    </div>
                    <div className='message_box'>
                        {message&&<Message type='error' msg={message}></Message>}
                    </div>
                </div>
                <div className='Usuario_pesquisa'>

                    {user ?(
                        
                            <>
                                {loadingUser === true?(
                                    <>
                                        <Find nome={user.username} mensalidade={user.monthlyPayment} treino1={user.trainingSheetOne} treino2={user.trainingSheetTwo} treino3={user.trainingSheetThree} treino4={user.trainingSheetFour}detalhes={user.details}></Find>
                                    </>
                                ):(
                                    <p>Carregando..</p>
                                )}

                            </>

                    ):(
                        <img src={FindImg} className='Find_img' alt="Esperando valores" />
                    )}
                </div>
            </div>


            <div className='Usuarios_card'>
                    <div className='Usuarios_infos'>
                        <h3>Usuários</h3>
                        <h3>Mensalidades</h3>
                    </div>
                <div className='Usuarios_body'>

                    {loading === true?(
                        usuarios.map((item) =>(
                            <Card name={item.username} monthlyPayment={item.monthlyPayment}></Card>
                        ))
                    ):(
                        <p>Carregando...</p>
                    )}

                </div>
            </div>

        </div>


    )
}

export default Usuarios