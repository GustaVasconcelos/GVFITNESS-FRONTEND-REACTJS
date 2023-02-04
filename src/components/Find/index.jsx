import React,{useState} from "react";
import './style.css'


import { FaEdit,FaTrashAlt, FaMoneyCheckAlt } from 'react-icons/fa' ;   
import api from "../../services/api";
import { useEffect } from "react";

import Message from "../Message";
import Input from "../Inputs";


const Find = (props) =>{

    const [edit, setEdit] = useState('box_editing')
    const [training,setTraining] = useState('')
    const [exercise, setExercise] = useState('')
    const [member, setMember] = useState('')
    const [repetitions, setRepetitions] = useState('')

    const [age,setAge] = useState('')
    const [sex,setSex] = useState('')
    const [weight,setWeight] = useState('')
    const [height,setHeight] = useState('')

    const [waist,setWaist] = useState('')
    const [hip,setHip] = useState('')
    const [abdomen,setAbdomen] = useState('')
    const [chest,setChest] = useState('')

    const [rightArm, setRightArm] = useState('')
    const [leftArm, setLeftArm] = useState('')
    const [leftForearm, setLeftForearm] = useState('')
    const [rightForearm,setRightForearm] = useState('')

    const [rightLeg, setRightLeg] = useState('')
    const [leftLeg, setLeftLeg] = useState('')
    const [leftCalf,setLeftCalf] = useState('')
    const [rightCalf,setRightCalf] = useState('')



    const [message, setMessage] = useState()

    const [user,setUser] = useState()
    const [loading,setLoading] = useState(false)


    
    let mensalidadeMesAno = props.mensalidade.split('-')

    let mensalidadeDia = mensalidadeMesAno[2].split('T')

    const getUser = async (name) =>{
        try{

            let username = name
        
            const data = {
                headers: { username: username }
            }
        
            await api.get('/api/usuario',data).then(res=>{
                
                if(res.status === 201){
                    setUser(res.data)
                    setLoading(true)
                }
                
            }).catch(err =>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }


    const addDetails = async () =>{
        try{

            if(message){
                setMessage(undefined)
            }
            const data = {
                username:props.nome,
                age:age,
                sex:sex,
                weight:weight,
                height:height,
                hip:hip,
                waist:waist,
                abdomen:abdomen,
                chest:chest,
                leftArm:leftArm,
                leftForearm:leftForearm,
                rightArm:rightArm,
                rightForearm:rightForearm,
                leftLeg:leftLeg,
                rightLeg:rightLeg,
                leftCalf:leftCalf,
                rightCalf:rightCalf
            }
            
            await api.patch('/api/adicionar_detalhe',data).then(
                res =>{
                    setMessage(res.data.msg)
                }
            ).catch(
                err =>{
                    console.log(err)
                }
            )

            setAge('')
            setSex('')
            setWeight('')
            setHeight('')
            setHip('')
            setWaist('')
            setAbdomen('')
            setChest('')
            setLeftArm('')
            setRightArm('')
            setLeftForearm('')
            setRightForearm('')
            setLeftCalf('')
            setRightCalf('')
            setLeftLeg('')
            setRightLeg('')

        }catch(err){
            console.log(err)
        }
    }
    const addExercise = async () =>{
        try{

            if(message){
                setMessage('')
            }
            const data = {
                username:props.nome,
                training:parseInt(training),
                exercise:exercise,
                member:member,
                repetitions:repetitions
            }

            console.log(data)

            await api.patch('/api/adicionar_treino',data).then(
                res =>{
                    setMessage(res.data.msg)
                }
            ).catch(
                err => console.log(err)
            )
        }catch(err){
            console.log(err)
        }
    }

    const removeExercise = async (training,id) =>{

        try{
            
            if(message){
                setMessage('')
            }
            
            const data = {
                username:props.nome,
                training:training,
                idexercise:id
            }

            await api.patch('/api/deletar_treino',data).then(
                res =>{

                    setMessage(res.data.msg)
                }
            ).catch(
                err => console.log(err)
            )

        }catch(err){
            console.log(err)
        }
    }
    const paymentMonthly = async () =>{

        try{
            const data = {
                username:props.nome
            }

            await api.post('/api/pagamento',data).then(
                res =>{

                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )

        }catch(err){
            console.log(err)
        }
    }
    const delUser = async () =>{

        try{
            const data = {
                username:props.nome
            }
            await api.post('/api/deletar_usuario',data).then(
                res =>{
                    console.log('usuário removido')
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )

            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    const showEdit = () =>{

        if(edit === 'box_editing'){
            setEdit('box_editing box_editing_show')
        }else{
            setEdit('box_editing')
        }

    }

    useEffect(() =>{
        getUser(props.nome)
    })

    return(
        <div className="find">
            
        {loading === true?(
            <>
                <div className="find_info">
                    <div className="Infos-find">
                        <h3>Nome: <span>{user.username}</span></h3>
                        <h3>Mensalidade: <span>{mensalidadeDia[0]}/{mensalidadeMesAno[1]}/{mensalidadeMesAno[0]}</span></h3>
                    </div>
                    <div className="functions">
                        <FaEdit onClick={showEdit} className="Edit"></FaEdit>

                    </div>
                </div>
                <div className="flex">
                <div className="Treino_body"> 
                    <div>
                        <h3>Ficha de treino</h3>
                    </div>
                    <div className="Exercicios_body">
                        <div className="Training">
                            <div className="Training_title">
                                <h4>Ficha 1</h4>
                            </div>
                            <div className="Training_body">
                                {user.trainingSheetOne.length === 0?(
                                    <p>Não há exércicios</p>
                                ):(
                                    
                                    <div className="Training_exercises">

                                            <div className="Column_title">
                                                <h3>Exercícios</h3>
                                                <h3>Repetições</h3>
                                                <h3>Membros</h3>
                                            </div>
                                            <div className="box_body">
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
 
                        <div className="Training">
                            <div className="Training_title">
                                <h4>Ficha 2</h4>
                            </div>
                            <div className="Training_body">
                                {user.trainingSheetTwo.length === 0?(
                                    <p>Não há exércicios</p>
                                ):(
                                    
                                    <div className="Training_exercises">

                                            <div className="Column_title">
                                                <h3>Exercícios</h3>
                                                <h3>Repetições</h3>
                                                <h3>Membros</h3>
                                            </div>
                                            <div className="box_body">
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
                            
                        <div className="Training">
                            <div className="Training_title">
                                <h4>Ficha 3</h4>
                            </div>
                            <div className="Training_body">
                                {user.trainingSheetThree.length === 0?(
                                    <p>Não há exércicios</p>
                                ):(
                                    
                                    <div className="Training_exercises">

                                            <div className="Column_title">
                                                <h3>Exercícios</h3>
                                                <h3>Repetições</h3>
                                                <h3>Membros</h3>
                                            </div>
                                            <div className="box_body">
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
                            
                        <div className="Training">
                            <div className="Training_title">
                                <h4>Ficha 4</h4>
                            </div>
                            <div className="Training_body">
                                {user.trainingSheetFour.length === 0?(
                                    <p>Não há exércicios</p>
                                ):(
                                    
                                    <div className="Training_exercises">

                                            <div className="Column_title">
                                                <h3>Exercícios</h3>
                                                <h3>Repetições</h3>
                                                <h3>Membros</h3>
                                            </div>
                                            <div className="box_body">
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

                    {user.details.length === 0?(
                        <>
                            <h3>Detalhes sem valores</h3>
                        </>
                    ):(
                        user.details.map((item) =>(
                            <div className="Details">
                                <div>
                                    <h3>Dados</h3>
                                </div>
                                <div className="Details_body">
                                    <div>
                                        <div className="Details_infos">
                                            <div>
                                                <h3>Informações adicionais</h3>
                                            </div>
                                            <p>Sexo: <span>{item.sex}</span></p>
                                            <p>Idade: <span>{item.age} </span></p>
                                            <p>Altura: <span>{item.height}</span></p>
                                            <p>Peso: <span>{item.weight} </span></p>
                                            <p>Imc: <span>{item.imc}</span></p>
                                            <p>Gordura corporal: <span>{item.bodyFat}</span></p>
                                            
                                        </div>
                                        <div className="Details_infos">
                                            <div>
                                                <h3>Tronco</h3>
                                            </div> 
                                            <p>Cintura: <span>{item.torsoMeasurements.waist}</span></p>
                                            <p>Quadril: <span>{item.torsoMeasurements.hip}</span></p>
                                            <p>Abdomen: <span>{item.torsoMeasurements.abdomen}</span></p>
                                            <p>Peitoral: <span>{item.torsoMeasurements.chest}</span></p>
                                        </div>

                                    </div>

                                    <div>
                                        <div className="Details_infos">
                                            <div>
                                                <h3>Membros superiores</h3>
                                            </div>
                                            <p>Braço direito: <span>{item.upperLimbs.rightArm}</span></p>
                                            <p>Braço esquerdo: <span>{item.upperLimbs.leftArm}</span></p>
                                            <p>Antebraço esquerdo: <span>{item.upperLimbs.leftForearm}</span></p>
                                            <p>Antebraço direito: <span>{item.upperLimbs.rightForearm}</span></p>
                                        </div>

                                        <div className="Details_infos">
                                            <div>
                                                <h3>Membros inferiores</h3>
                                            </div>
                                            <p>Perna direita: <span>{item.lowerMembers.rightLeg}</span></p>
                                            <p>Perna esquerdo: <span>{item.lowerMembers.leftLeg}</span></p>
                                            <p>Panturrilha esquerdo: <span>{item.lowerMembers.leftCalf}</span></p>
                                            <p>Panturrilha direita: <span>{item.lowerMembers.rightCalf}</span></p>
                                        </div>
                                        
                                    </div>


                                </div>
                            </div>
                        ))
                    )}
                    
                </div>
                <div className={edit}>
                <div className="box_functions">
                    <div className="functions_itens">
                        <h3>Deseja efetuar pagamento?</h3>
                        <FaMoneyCheckAlt onClick={paymentMonthly} className="payment"></FaMoneyCheckAlt>
                    </div>
                    <div className="functions_itens">
                        <h3>Deseja excluir o usuário?</h3>
                        <FaTrashAlt onClick={delUser} className="Delete"></FaTrashAlt>
                    </div>
                    <div className="functions_close">
                        <button className="close"onClick={showEdit}>x</button>
                    </div>
                </div>
                <div className="box_editing_forms">
                    <div className="box_form_trainingsheets">
                        <div className="trainingsheets_inputs">
                            <Input tipo="text" value={exercise} onChange={(e)=> setExercise(e.target.value)}placeholder="Exércicio" nome="Exércicio"></Input>
                            <Input tipo="text" onChange={(e)=> setRepetitions(e.target.value)} value={repetitions} placeholder="Repetições" nome="Repetições"></Input>
                            <Input tipo="text" value={member} onChange={(e)=> setMember(e.target.value)}placeholder="Membro" nome="Membro"></Input>
                            <select  className='input_select' name='trainingSheet' onChange={(e) => setTraining(e.target.value)}>
                                <option value="">Selecione a ficha</option>
                                <option value={1}>Ficha 1</option>
                                <option value={2}>Ficha 2</option>
                                <option value={3}>Ficha 3</option>
                                <option value={4}>Ficha 4</option>
                            </select>
                            <button onClick={addExercise}>Enviar </button>

                            {message === 'Há campos vázios!'&&<Message type='error' msg={message}></Message>}
                            {message === 'Exércicio foi adicionado!'&&<Message type='sucess' msg={message}></Message>}
                            {message === 'Exércicio foi removido!'&&<Message type='sucess' msg={message}></Message>}
                            
                        </div>

                        
                        <div className="trainingSheets">
                            {loading === true?(
                                <>
                                    <div className="TrainingSheets_box">
                                        <div className="Training_title">
                                            <h4>Ficha 1</h4>
                                        </div>
                                        <div className="Training_body">
                                            {user.trainingSheetOne.length === 0?(
                                                <p>Não há exércicios</p>
                                            ):(
                                                <div className="Training_exercises">
                                                    <div className="Column_title_trainingsheet">
                                                        <h3>Exercícios</h3>
                                                        <h3>Repetições</h3>
                                                        <h3>Membros</h3>
                                                    </div>
                                                    <div className="box_body">
                                                        {user.trainingSheetOne.map((item) =>(
                                                            <div className="Column_body_trainingsheet">
                                                                <p>{item.exercise}</p>
                                                                <p>{item.repetitions}</p>
                                                                <p>{item.member}</p>
                                                                <button onClick={() => removeExercise(1,item.idexercise)}>x</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="TrainingSheets_box">
                                        <div className="Training_title">
                                            <h4>Ficha 2</h4>
                                        </div>
                                        <div className="Training_body">
                                            {user.trainingSheetTwo.length === 0?(
                                                <p>Não há exércicios</p>
                                            ):(
                                                <div className="Training_exercises">
                                                    <div className="Column_title_trainingsheet">
                                                        <h3>Exercícios</h3>
                                                        <h3>Repetições</h3>
                                                        <h3>Membros</h3>
                                                    </div>
                                                    <div className="box_body">
                                                        {user.trainingSheetTwo.map((item) =>(
                                                            <div className="Column_body_trainingsheet">
                                                                <p>{item.exercise}</p>
                                                                <p>{item.repetitions}</p>
                                                                <p>{item.member}</p>
                                                                <button onClick={() => removeExercise(2,item.idexercise)}>x</button>
                                                            </div>
                                                            
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="TrainingSheets_box">
                                        <div className="Training_title">
                                            <h4>Ficha 3</h4>
                                        </div>
                                        <div className="Training_body">
                                            {user.trainingSheetThree.length === 0?(
                                                <p>Não há exércicios</p>
                                            ):(
                                                <div className="Training_exercises">
                                                    <div className="Column_title_trainingsheet">
                                                        <h3>Exercícios</h3>
                                                        <h3>Repetições</h3>
                                                        <h3>Membros</h3>
                                                    </div>
                                                    <div className="box_body">
                                                        {user.trainingSheetThree.map((item) =>(
                                                            <div className="Column_body_trainingsheet">
                                                                <p>{item.exercise}</p>
                                                                <p>{item.repetitions}</p>
                                                                <p>{item.member}</p>
                                                                <button onClick={() => removeExercise(3,item.idexercise)}>x</button>
                                                            </div>
                                                            
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                            )}
                                        </div>
                                    </div>
        
                                    <div className="TrainingSheets_box">
                                        <div className="Training_title">
                                            <h4>Ficha 4</h4>
                                        </div>
                                        <div className="Training_body">
                                            {user.trainingSheetFour.length === 0?(
                                                <p>Não há exércicios</p>
                                            ):(
                                                <div className="Training_exercises">
                                                    <div className="Column_title_trainingsheet">
                                                        <h3>Exercícios</h3>
                                                        <h3>Repetições</h3>
                                                        <h3>Membros</h3>
                                                    </div>
                                                    <div className="box_body">
                                                        {user.trainingSheetFour.map((item) =>(
                                                            <div className="Column_body_trainingsheet">
                                                                <p>{item.exercise}</p>
                                                                <p>{item.repetitions}</p>
                                                                <p>{item.member}</p>
                                                                <button onClick={() => removeExercise(4,item.idexercise)}>x</button>
                                                            </div>
                                                            
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                            )}
                                        </div>
                                    </div>
                                </>  
                            ):(
                                <p>Carregando</p>
                            )}                        
                        </div>

                    </div>
                    <div className="box_form_details">
                        <div className="box_form_details_body">
                            <div className="box_form_details_column">
                                <select  className='input_select' name='trainingSheet' onChange={(e) => setSex(e.target.value)}>
                                    <option value="">Selecione o sexo</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>

                                </select>
                                <Input tipo="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Idade" nome="Idade"></Input>
                                <Input tipo="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Peso(KG)" nome="Peso"></Input>
                                <Input tipo="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Altura(M)" nome="Altura"></Input>
                            </div>
                            <div className="box_form_details_column">
                                <Input tipo="text" placeholder="Cintura(CM)" value={waist} onChange={(e) => setWaist(e.target.value)} nome="Cintura"></Input>
                                <Input tipo="text" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="Quadril(CM)" nome="Quadril"></Input>
                                <Input tipo="text" value={abdomen} onChange={(e) => setAbdomen(e.target.value)} placeholder="Abdomen(CM)" nome="Abdomen"></Input>
                                <Input tipo="text" value={chest} onChange={(e) => setChest(e.target.value)} placeholder="Peitoral(CM)" nome="Peitoral"></Input>
                            </div>
                            <div className="box_form_details_column">
                                <Input tipo="text" value={rightArm} onChange={(e) => setRightArm(e.target.value)}  placeholder="Braço D(CM)" nome="Braço D"></Input>
                                <Input tipo="text" value={leftArm} onChange={(e) => setLeftArm(e.target.value)} placeholder="Braço E(CM)" nome="Braço E"></Input>
                                <Input tipo="text" value={leftForearm} onChange={(e) => setLeftForearm(e.target.value)} placeholder="Antebraço E(CM)" nome="Antebraço E"></Input>
                                <Input tipo="text" value={rightForearm} onChange={(e) => setRightForearm(e.target.value)} placeholder="Antebraço D(CM)" nome="Antebraço D"></Input>
                            </div>
                            <div className="box_form_details_column">
                                <Input tipo="text" value={rightLeg} onChange={(e) => setRightLeg(e.target.value)} placeholder="Perna D(CM)" nome="Perna D"></Input>
                                <Input tipo="text" value={leftLeg} onChange={(e) => setLeftLeg(e.target.value)} placeholder="Perna E(CM)"  nome="Perna E"></Input>
                                <Input tipo="text" value={leftCalf} onChange={(e) => setLeftCalf(e.target.value)}placeholder="Panturrilha E(CM)" nome="Pantu E"></Input>
                                <Input tipo="text" value={rightCalf} onChange={(e) => setRightCalf(e.target.value)}placeholder="Panturrilha D(CM)" nome="Pantu D"></Input>
                            </div>
                        </div>
                        <div className="box_form_details_submit">
                            <Input tipo="submit" onClick={addDetails} nome="Adicionar detalhes"></Input>
                            {message === 'detalhes foi adicionado!'&&<Message type='sucess' msg={message}></Message>}
                        </div>
                    </div>
                </div>

            </div>
        </>
        ):(
            <p>Carregando</p>
        )}
            
        </div>

    )
}

export default Find