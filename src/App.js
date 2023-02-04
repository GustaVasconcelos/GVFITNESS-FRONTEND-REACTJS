import React, {useEffect, useState} from 'react';

import { BrowserRouter as Rotas } from 'react-router-dom';
import './App.css';
import Content from './pages/Routes';
import MenuClient from './components/Nav/MenuClient';
import MenuAdmin from './components/Nav/MenuAdmin';
import Menu from './components/Nav/Menu';

import api from './services/api';
import { getIdUsuario, getNomeUsuario } from './services/auth';
import ContentAdmin from './pages/admin/ContentAdmin';
import ContentClient from './pages/client/ContentClient'


function App() {

    const [user, setUser] = useState('NotUser')
    
    const getUser = async () =>{

        let username = getNomeUsuario()
        
        if(username === null){
            setUser('NotUser')
        }else{
            const data = {
                headers: { username: getNomeUsuario() }
            }
        
            await api.get('/api/usuario',data).then(res=>{
                setUser(res.data)
                
            }).catch(err =>{
                console.log(err)
            })

        }

    }


    useEffect(() =>{
        getUser()
    },[user])


    return (
        <div className="App">
           <Rotas>  
            
                {user && user.typeUser === "Admin"&&(
                    <div>
                        <MenuAdmin></MenuAdmin>
                        <ContentAdmin></ContentAdmin>
                    </div>
                )}
                {user && user.typeUser === "Client"&&(
                    <div>
                        <MenuClient></MenuClient>
                        <ContentClient></ContentClient>
                    </div>
                )}
                {user  === 'NotUser' &&(
                    <div>
                        <Menu></Menu>
                        <Content></Content>
                    </div>
                )}
                
           </Rotas>
        </div>
    );
}

export default App;
