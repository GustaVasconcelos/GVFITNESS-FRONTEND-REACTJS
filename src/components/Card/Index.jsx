import './Style.css'

const Card = (props) =>{
    let mensalidadeMesAno = props.monthlyPayment.split('-')
    
    let mensalidadeDia = mensalidadeMesAno[2].split('T')
    return(
        <div className='Card'>
            <div className='Card_infos'>
                <div className='Card_name'>
                    <h4>{props.name}</h4>
                </div>
                <div className='Card_monthly'>
                    <h5>{mensalidadeDia[0]}/{mensalidadeMesAno[1]}/{mensalidadeMesAno[0]}</h5>
                </div>
            </div>
        </div>
    )
}

export default Card