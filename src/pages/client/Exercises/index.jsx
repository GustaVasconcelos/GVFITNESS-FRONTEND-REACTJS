import React, { useState } from "react";
import { useEffect } from "react";

import './style.css'

import api from "../../../services/api";

import { getNomeUsuario } from "../../../services/auth";

const Exercise = () => {

    const [user,setUser] = useState()
    const [loading,setLoading] = useState(false)

    const getUser = async (name) =>{
        try{

            let username = name
        
            const data = {
                headers: { username: username }
            }
        
            await api.get('/api/usuario',data).then(res=>{
                
                setUser(res.data)
                setLoading(true)

            }).catch(err =>{
                console.log(err)
            })

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getUser(getNomeUsuario())
    },[user])

    return (
        <div>
            {loading === true?(
                <div className="Exercise_body">
                    <div className="Exercise_row">
                        <div className="Exercise_trainingsheets">
                            <div className="Exercise_training_box">
                                <div className="Exercise_training_title">
                                    <h4>Ficha 1</h4>
                                </div>
                                <div className="Exercise_training_body">
                                    {user.trainingSheetOne.length === 0?(
                                        <h3>Não há exércicios</h3>
                                    ):(
                                        
                                        <div className="Exercise_training_exercises">

                                                <div className="Exercise_training_column_title">
                                                    <h3>Exercícios</h3>
                                                    <h3>Repetições</h3>
                                                    <h3>Membros</h3>
                                                </div>
                                                <div className="Exercise_training_column_body">
                                                    {user.trainingSheetOne.map((item) =>(
                                                        <div className="Column_body">
                                                            <p>{item.exercise}</p>
                                                            <p>{item.repetitions}</p>
                                                            <p>{item.member}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                        </div>
                                        
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Exercise_row">
                    <div className="Exercise_trainingsheets">
                            <div className="Exercise_training_box">
                                <div className="Exercise_training_title">
                                    <h4>Ficha 2</h4>
                                </div>
                                <div className="Exercise_training_body">
                                    {user.trainingSheetTwo.length === 0?(
                                        <h3>Não há exércicios</h3>
                                    ):(
                                        
                                        <div className="Exercise_training_exercises">

                                                <div className="Exercise_training_column_title">
                                                    <h3>Exercícios</h3>
                                                    <h3>Repetições</h3>
                                                    <h3>Membros</h3>
                                                </div>
                                                <div className="Exercise_training_column_body">
                                                    {user.trainingSheetTwo.map((item) =>(
                                                        <div className="Column_body">
                                                            <p>{item.exercise}</p>
                                                            <p>{item.repetitions}</p>
                                                            <p>{item.member}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                        </div>
                                        
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Exercise_row">
                        <div className="Exercise_trainingsheets">
                            <div className="Exercise_training_box">
                                <div className="Exercise_training_title">
                                    <h4>Ficha 3</h4>
                                </div>
                                <div className="Exercise_training_body">
                                    {user.trainingSheetThree.length === 0?(
                                        <h3>Não há exércicios</h3>
                                    ):(
                                        
                                        <div className="Exercise_training_exercises">

                                                <div className="Exercise_training_column_title">
                                                    <h3>Exercícios</h3>
                                                    <h3>Repetições</h3>
                                                    <h3>Membros</h3>
                                                </div>
                                                <div className="Exercise_training_column_body">
                                                    {user.trainingSheetThree.map((item) =>(
                                                        <div className="Column_body">
                                                            <p>{item.exercise}</p>
                                                            <p>{item.repetitions}</p>
                                                            <p>{item.member}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                        </div>
                                        
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Exercise_row">
                        <div className="Exercise_trainingsheets">
                            <div className="Exercise_training_box">
                                <div className="Exercise_training_title">
                                    <h4>Ficha 4</h4>
                                </div>
                                <div className="Exercise_training_body">
                                    {user.trainingSheetFour.length === 0?(
                                        <h3>Não há exércicios</h3>
                                    ):(
                                        
                                        <div className="Exercise_training_exercises">

                                                <div className="Exercise_training_column_title">
                                                    <h3>Exercícios</h3>
                                                    <h3>Repetições</h3>
                                                    <h3>Membros</h3>
                                                </div>
                                                <div className="Exercise_training_column_body">
                                                    {user.trainingSheetFour.map((item) =>(
                                                        <div className="Column_body">
                                                            <p>{item.exercise}</p>
                                                            <p>{item.repetitions}</p>
                                                            <p>{item.member}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                        </div>
                                        
                                    )}
                                </div>
                            </div>
                        </div>                            
                    </div>

                </div>
            ):(
                <p>Carregando</p>
            )}
        </div>
    )
}

export default Exercise