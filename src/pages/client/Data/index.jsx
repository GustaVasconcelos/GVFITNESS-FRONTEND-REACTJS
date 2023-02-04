import React,{useState,useEffect} from "react";

import { getNomeUsuario } from "../../../services/auth";

import api from "../../../services/api";

import magro from '../../../assets/IMGS/magro.png'
import normal from '../../../assets/IMGS/normal.png'
import acimadopeso from '../../../assets/IMGS/acimadopeso.png'
import obeso from '../../../assets/IMGS/obeso.png'
import obesidade from '../../../assets/IMGS/obesidade.png'
import imc from '../../../assets/IMGS/imc.png'
import superiores from '../../../assets/IMGS/superiores.png'
import tronco from '../../../assets/IMGS/tronco.png'
import inferiores from '../../../assets/IMGS/Inferiores.png'

import { FaUser,FaDollarSign,FaVenusMars,FaBirthdayCake,FaWeight,FaRulerVertical } from 'react-icons/fa' ;   

import './style.css'



const Data = () => {
    let mensalidadeMesAno;
    let mensalidadeDia
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

    if(loading === true){
        mensalidadeMesAno = user.monthlyPayment.split('-')

        mensalidadeDia = mensalidadeMesAno[2].split('T')
    }




    return (
        <div className="Data_body">
            {loading === true?(
                <div className="Data_body_flex">
                    <div className="Data_body_details_data">
                        <div className="Data_body_details_data_box">
                            <div className="Data_body_details_data_box_itens">
                                <div className="Data_body_details_data_box_itens_svg">
                                    <FaUser></FaUser>
                                </div>
                                <div className="Data_body_details_data_box_itens_width">
                                    <h3>Usuário: <span>{user.username}</span></h3>
                                </div>
                                
                            </div>
                            {user.details.map((item) =>(
                                <>
                                    <div className="Data_body_details_data_box_itens">
                                        <div className="Data_body_details_data_box_itens_svg">
                                            <FaVenusMars/>
                                        </div>
                                        <div className="Data_body_details_data_box_itens_width">
                                            {item.sex === 'F'&&(
                                                
                                                <h3>Sexo: <span>Feminino</span> </h3>
                                                
                                            )}

                                            {item.sex === 'M'&&(
                                                
                                                <h3>Sexo: <span>Masculino</span> </h3>
                                                
                                                )}

                                            {item.sex === 'Sem valores'&&(
                                                <h3>Sexo: <span>{item.sex}</span> </h3>
                                            )}
                                        </div>
                                        
                                    </div>
                                    <div className="Data_body_details_data_box_itens">
                                        <div className="Data_body_details_data_box_itens_svg">
                                            <FaBirthdayCake/>
                                        </div>
                                        <div className="Data_body_details_data_box_itens_width">
                                            {item.age !== 'Sem valores'?(
                                                <h3>Idade: <span>{item.age} Anos</span></h3>
                                            ):(
                                                <h3>Idade: <span>{item.age}</span></h3>
                                            )}
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="Data_body_details_data_box_itens">
                                        <div className="Data_body_details_data_box_itens_svg">
                                            <FaDollarSign/>
                                        </div>
                                        <div className="Data_body_details_data_box_itens_width">
                                            <h3>Mensalidade: <span>{mensalidadeDia[0]}/{mensalidadeMesAno[1]}/{mensalidadeMesAno[0]}</span></h3>
                                        </div>
                                    </div>
                                    <div className="Data_body_details_data_box_itens">
                                        <div className="Data_body_details_data_box_itens_svg">
                                            <FaWeight/>
                                        </div>
                                        <div className="Data_body_details_data_box_itens_width">
                                            {item.weight !== 'Sem valores'?(
                                                <h3>Peso: <span>{item.weight} Kg</span></h3>
                                            ):(
                                                <h3>Peso: <span>{item.weight}</span></h3>
                                            )}
                                        </div>
                                    </div>
                                    <div className="Data_body_details_data_box_itens">
                                        <div className="Data_body_details_data_box_itens_svg">
                                            <FaRulerVertical/>
                                        </div>
                                        <div className="Data_body_details_data_box_itens_width">
                                            {item.height !== 'Sem valores'?(
                                                <h3>Altura: <span>{item.height} M</span></h3>
                                            ):(
                                                <h3>Altura: <span>{item.height}</span></h3>
                                            )}
                                        </div>
                                    </div>


                                </>
                            ))}
                        </div>
                        <div className="Data_body_details_data_imc">
                            <div className="Data_body_details_data_imc_infos">
                                {user.details.map((item) =>(

                                    <>
                                        {item.imc !== 'Sem valores'?(
                                            <h3>Imc: <span>{item.imc} Kg/m2</span></h3>
                                            ):(
                                            <h3>Imc: <span>{item.imc}</span></h3>
                                            ) 
                                        }
                                        {item.imc <= 18.4 &&

                                            <>
                                                <h3>Tipo: Abaixo do peso</h3>
                                                <h3>O que pode acontecer?</h3>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Fadiga</p>
                                                    <p>Estresse</p>
                                                    <p>Ansiedade</p>
                                                </div>
                                            </>

                                    }
                                        {item.imc >= 18.5 && item.imc <= 24.9 &&
                                            <>
                                                <div className="Data_details_imc_detailsbox_boxitens">
                                                    <h3>Tipo: Normal</h3>
                                                    <h3>O que pode acontecer?</h3>
                                                </div>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Menor o risco de doenças cardiacas e Vasculares</p>
                                                </div>
                                            </>
                                        }

                                        {item.imc >= 25 && item.imc <= 29.9&&
                                            <>
                                                <h3>Tipo: Acima do peso</h3>
                                                <h3>O que pode acontecer?</h3>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Fadiga</p>
                                                    <p>Má circulação</p>
                                                    <p>Varizes</p>
                                                </div>

                                            </>
                                        }

                                        {item.imc >= 30 && item.imc <= 34.9&&
                                            <>
                                                <h3>Tipo: Obesidade 1</h3>
                                                <h3>O que pode acontecer?</h3>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Diabetes</p>
                                                    <p>Angina</p>
                                                    <p>Infarto</p>
                                                    <p>Aterosclerose</p>
                                                </div>
                                            </>
                                        }
                                        {item.imc >= 35 && item.imc <= 39.9&&
                                            <>
                                                <h3>Tipo: Obesidade 2</h3>
                                                <h3>O que pode acontecer?</h3>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Apeneia do sono</p>
                                                    <p>Falta de ar</p>
                                                </div>
                                            </>
                                        }
                                        {item.imc >= 40&&
                                            <div className="Data_details_imc_detailsbox">
                                                <h3>Tipo: Obesidade 3</h3>
                                            
                                                <h3>O que pode acontecer?</h3>
                                                <div className="Data_details_imc_detailsbox_itens">
                                                    <p>Refluxo</p>
                                                    <p>Dificuldade p/ se mover</p>
                                                    <p>Escaras</p>
                                                    <p>Diabetes</p>
                                                    <p>Infarto</p>
                                                    <p>Avc</p>
                                                </div>
                                            </div>
                                        }
                                    </>
                                ))}                       
                            </div>
                            <div className="Data_body_details_data_imc_img">
                            {user.details.map((item) =>(
                                <>
                                    {item.imc === 'Sem valores'&&
                                        <img className="imc_img"src={imc}></img>
                                    }
                                    {item.imc <= 18.4 &&
                                        <img src={magro}></img>
                                    }
                                    {item.imc >= 18.5 && item.imc <= 24.9&&
                                        <img src={normal}></img>
                                    }
                                    {item.imc >= 25 && item.imc <= 29.9&&
                                        <img src={acimadopeso}></img>
                                    }

                                    {item.imc >= 30 && item.imc <= 34.9&&
                                        <img src={obeso}></img>
                                    }

                                    {item.imc >= 35 && item.imc <= 39.9&&
                                        <img src={obesidade}></img>
                                    }

                                    {item.imc >= 40&&
                                        <img src={obesidade}></img>
                                    }
                                </>
                                
                            ))}
                                
                            </div>
                        </div>
                    </div>
                    <div className="Data_body_details_data_members">
                        {user.details.map((item) =>(
                            <div className="Data_details_members_body">
                                <div className="Data_details_members_box">
                                    <div className="Data_details_members_box_title">
                                        <h3>Membros superiores</h3>
                                    </div> 
                                    <div className="Data_details_members_box_body">
                                        <div className="Data_details_members_box_body_itens">
                                            {item.upperLimbs.rightArm !== 'Sem valores'?(
                                                    <h3>Braço D: <span>{item.upperLimbs.rightArm} Cm</span></h3>
                                                ):(
                                                    <h3>Braço D: <span>{item.upperLimbs.rightArm}</span></h3>
                                            )}
                                            {item.upperLimbs.leftArm !== 'Sem valores'?(
                                                    <h3>Braço E: <span>{item.upperLimbs.leftArm} Cm</span></h3>
                                                ):(
                                                    <h3>Braço E: <span>{item.upperLimbs.leftArm}</span></h3>
                                            )}
                                            {item.upperLimbs.leftForearm !== 'Sem valores'?(
                                                    <h3>Antebraço E: <span>{item.upperLimbs.leftForearm} Cm</span></h3>
                                                ):(
                                                    <h3>Antebraço E: <span>{item.upperLimbs.leftForearm}</span></h3>
                                            )}
                                            {item.upperLimbs.rightForearm !== 'Sem valores'?(
                                                    <h3>Antebraço D: <span>{item.upperLimbs.rightForearm} Cm</span></h3>
                                                ):(
                                                    <h3>Antebraço D: <span>{item.upperLimbs.rightForearm}</span></h3>
                                            )}
                                        </div>
                                        <div className="Data_details_members_box_body_itens">
                                            <img src={superiores}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="Data_details_members_box">
                                    <div className="Data_details_members_box_title">
                                        <h3>Tronco</h3>
                                    </div> 
                                    <div className="Data_details_members_box_body">
                                        <div className="Data_details_members_box_body_itens">
                                            {item.torsoMeasurements.waist !== 'Sem valores'?(
                                                <h3>Cintura: <span>{item.torsoMeasurements.waist} Cm</span></h3>
                                                ):(
                                                <h3>Cintura: <span>{item.torsoMeasurements.waist}</span></h3>
                                             )}
                                            {item.torsoMeasurements.hip !== 'Sem valores'?(
                                                <h3>Quadril: <span>{item.torsoMeasurements.hip} Cm</span></h3>
                                                ):(
                                                <h3>Quadril: <span>{item.torsoMeasurements.hip}</span></h3>
                                             )}
                                            {item.torsoMeasurements.abdomen !== 'Sem valores'?(
                                                <h3>Abdomen: <span>{item.torsoMeasurements.abdomen} Cm</span></h3>
                                                 ):(
                                                <h3>Abdomen: <span>{item.torsoMeasurements.abdomen}</span></h3>
                                             )}
                                            {item.torsoMeasurements.chest !== 'Sem valores'?(
                                                <h3>Peitoral: <span>{item.torsoMeasurements.chest} Cm</span></h3>
                                                 ):(
                                                <h3>Peitoral: <span>{item.torsoMeasurements.chest}</span></h3>
                                            )}
                                        </div>
                                        <div className="Data_details_members_box_body_itens">
                                            <img src={tronco}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="Data_details_members_box">
                                    <div className="Data_details_members_box_title">
                                        <h3>Membros Inferiores</h3>
                                    </div> 
                                    <div className="Data_details_members_box_body">
                                        <div className="Data_details_members_box_body_itens">
                                            {item.lowerMembers.rightLeg !== 'Sem valores'?(
                                                <h3>Perna D: <span>{item.lowerMembers.rightLeg} Cm</span></h3>
                                                 ):(
                                                <h3>Perna D: <span>{item.lowerMembers.rightLeg}</span></h3>
                                             )}
                                             {item.lowerMembers.leftLeg !== 'Sem valores'?(
                                                <h3>Perna E: <span>{item.lowerMembers.leftLeg} Cm</span></h3>
                                                 ):(
                                                <h3>Perna E: <span>{item.lowerMembers.leftLeg}</span></h3>
                                             )}
                                             {item.lowerMembers.leftCalf !== 'Sem valores'?(
                                                <h3>Panturrilha E: <span>{item.lowerMembers.leftCalf} Cm</span></h3>
                                                 ):(
                                                <h3>Panturrilha E: <span>{item.lowerMembers.leftCalf}</span></h3>
                                             )}
                                             {item.lowerMembers.rightCalf !== 'Sem valores'?(
                                                <h3>Panturrilha D: <span>{item.lowerMembers.rightCalf} Cm</span></h3>
                                                 ):(
                                                <h3>Panturrilha D: <span>{item.lowerMembers.rightCalf}</span></h3>
                                             )}
                                        </div>
                                        <div className="Data_details_members_box_body_itens">
                                            <img src={inferiores}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                // <div className="Data_body_width">
                //     <div className="Data_details">
                //         <div className="Data_details_valors">
                //             <div className="Data_details_title">
                //                 <h3>Dados</h3>
                //             </div>
                //             {user.details.map((item) =>(
                //                 <>  
                //                     <div className="Data_details_valors_box">
                //                         <div className="Data_details_valors_column">
                //                             <h3>Nome: <span>{user.username}</span></h3>
                //                             {item.sex === 'F'&&(
                //                                 <h3>Sexo: <span>Feminino</span> </h3>
                //                             )}

                //                             {item.sex === 'M'&&(
                //                                 <h3>Sexo: <span>Masculino</span> </h3>
                //                             )}

                //                             {item.sex === 'Sem valores'&&(
                //                                 <h3>Sexo: <span>{item.sex}</span> </h3>
                //                             )}
                                            
                //                             {item.sex !== 'Sem valores'?(
                //                                 <h3>Idade: <span>{item.age} Anos</span></h3>
                //                             ):(
                //                                 <h3>Idade: <span>{item.age}</span></h3>
                //                             )}
                                            
                //                         </div>
                //                         <div className="Data_details_valors_column">
                                            
                //                             {item.height !== 'Sem valores'?(
                //                                 <h3>Altura: <span>{item.height} Metros</span></h3>
                //                             ):(
                //                                 <h3>Altura: <span>{item.height}</span></h3>
                //                             )}
                //                             {item.weight !== 'Sem valores'?(
                //                                 <h3>Peso: <span>{item.weight} Kilos</span></h3>
                //                             ):(
                //                                 <h3>Peso: <span>{item.weight}</span></h3>
                //                             )}
                //                             {item.bodyFat !== 'Sem valores'?(
                //                                 <h3>Gordura Corporal: <span>{item.bodyFat}%</span></h3>
                //                             ):(
                //                                 <h3>Gordura Corporal: <span>{item.bodyFat}</span></h3>
                //                             )}
                                            
                //                         </div>
                                        
                //                     </div>
                //                 </>
                //             ))}
                //         </div>
                //     </div>
                //     <div className="Data_details">
                //         {user.details.map((item) =>(
                //             <div className="Data_details_imc">
                //                 <div className="Data_details_imc_infos">

                //                     {item.imc !== 'Sem valores'?(
                //                         <h3>Imc: <span>{item.imc} Kg/m2</span></h3>
                //                         ):(
                //                             <h3>Imc: <span>{item.imc}</span></h3>
                //                         ) 
                //                     }


                //                 <div className="Data_details_imc_img">
                //                     {item.imc === 'Sem valores'&&
                //                         <img className="imc_img"src={imc}></img>
                //                     }
                //                     {item.imc <= 18.4 &&
                //                         <>
                //                             <img src={magro}></img>

                //                         </>
                //                     }
                //                     {item.imc >= 18.5 && item.imc <= 24.9&&
                //                         <>
                //                             <img src={normal}></img>
                //                         </>
                //                     }
                //                     {item.imc >= 25 && item.imc <= 29.9&&
                //                         <img src={acimadopeso}></img>
                //                     }

                //                     {item.imc >= 30 && item.imc <= 34.9&&
                //                         <img src={obeso}></img>
                //                     }

                //                     {item.imc >= 35 && item.imc <= 39.9&&
                //                         <img src={obesidade}></img>
                //                     }

                //                     {item.imc >= 40&&
                //                         <img src={obesidade}></img>
                //                     }

                //                 </div>
                                

                //             </div>
                //         ))}
                //     </div>
                //     <div className="Data_details_members">
                //         <div className="Data_details_members_title">
                //             <h3>Membros</h3>
                //         </div>
                //         <div className="Data_details_members_body">
                        
                //             {user.details.map((item) =>(
                //                 <>
                //                     <div className="Data_details_members_body_column">
                //                         <div className="Data_details_members_body_column_title">
                //                             <h3>Tronco</h3>
                //                         </div> 
                //                         <div className="Data_details_members_body_column_body">
                //                             {item.torsoMeasurements.waist !== 'Sem valores'?(
                //                                     <h3>Cintura: <span>{item.torsoMeasurements.waist} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Cintura: <span>{item.torsoMeasurements.waist}</span></h3>
                //                             )}
                //                             {item.torsoMeasurements.hip !== 'Sem valores'?(
                //                                     <h3>Quadril: <span>{item.torsoMeasurements.hip} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Quadril: <span>{item.torsoMeasurements.hip}</span></h3>
                //                             )}
                //                             {item.torsoMeasurements.abdomen !== 'Sem valores'?(
                //                                     <h3>Abdomen: <span>{item.torsoMeasurements.abdomen} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Abdomen: <span>{item.torsoMeasurements.abdomen}</span></h3>
                //                             )}
                //                             {item.torsoMeasurements.chest !== 'Sem valores'?(
                //                                     <h3>Peitoral: <span>{item.torsoMeasurements.chest} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Peitoral: <span>{item.torsoMeasurements.chest}</span></h3>
                //                             )}
                //                         </div>

                //                     </div>
                //                     <div className="Data_details_members_body_column">
                //                         <div className="Data_details_members_body_column_title">
                //                             <h3>Membros superiores</h3>
                //                         </div> 
                //                         <div className="Data_details_members_body_column_body">
                //                             {item.upperLimbs.rightArm !== 'Sem valores'?(
                //                                     <h3>Braço D: <span>{item.upperLimbs.rightArm} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Braço D: <span>{item.upperLimbs.rightArm}</span></h3>
                //                             )}
                //                             {item.upperLimbs.leftArm !== 'Sem valores'?(
                //                                     <h3>Braço E: <span>{item.upperLimbs.leftArm} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Braço E: <span>{item.upperLimbs.leftArm}</span></h3>
                //                             )}
                //                             {item.upperLimbs.leftForearm !== 'Sem valores'?(
                //                                     <h3>Antebraço E: <span>{item.upperLimbs.leftForearm} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Antebraço E: <span>{item.upperLimbs.leftForearm}</span></h3>
                //                             )}
                //                             {item.upperLimbs.rightForearm !== 'Sem valores'?(
                //                                     <h3>Antebraço D: <span>{item.upperLimbs.rightForearm} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Antebraço D: <span>{item.upperLimbs.rightForearm}</span></h3>
                //                             )}
                //                         </div>
                //                     </div>
                //                     <div className="Data_details_members_body_column">
                //                         <div className="Data_details_members_body_column_title">
                //                             <h3>Membros Inferiores</h3>
                //                         </div> 
                //                         <div className="Data_details_members_body_column_body">
                //                             {item.lowerMembers.rightLeg !== 'Sem valores'?(
                //                                     <h3>Perna D: <span>{item.lowerMembers.rightLeg} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Perna D: <span>{item.lowerMembers.rightLeg}</span></h3>
                //                             )}
                //                             {item.lowerMembers.leftLeg !== 'Sem valores'?(
                //                                     <h3>Perna E: <span>{item.lowerMembers.leftLeg} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Perna E: <span>{item.lowerMembers.leftLeg}</span></h3>
                //                             )}
                //                             {item.lowerMembers.leftCalf !== 'Sem valores'?(
                //                                     <h3>Panturrilha E: <span>{item.lowerMembers.leftCalf} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Panturrilha E: <span>{item.lowerMembers.leftCalf}</span></h3>
                //                             )}
                //                             {item.lowerMembers.rightCalf !== 'Sem valores'?(
                //                                     <h3>Panturrilha D: <span>{item.lowerMembers.rightCalf} Cm</span></h3>
                //                                 ):(
                //                                     <h3>Panturrilha D: <span>{item.lowerMembers.rightCalf}</span></h3>
                //                             )}
                //                         </div>
                //                     </div>
                //                 </>
                //             ))}
                            


                //         </div>
                //     </div>
                // </div>
            ):(
                <p>Carregando</p>
            )}

        </div>
    )
}

export default Data