import React,{useEffect, useState} from "react";
import api from './api'
import {logout,getToken} from './auth'
import {Navigate} from 'react-router-dom'


export default function WAuth({children, redirectTo}){
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        try{
            const verify = async () =>{
                
                const res = await api.get('/api/checktoken',{params:{token:getToken()}})
                console.log(res)
                if(res.status === 200){
                    setLoading(false)
                    setRedirect(false)
                }else{
                    logout()
                    setLoading(false)
                    setRedirect(true)
                }
            }

            verify()

        }catch(err){
            console.log(err)
        }

    },[])

    return loading?"Esperando...":!redirect? children : <Navigate to={redirectTo}/>
};