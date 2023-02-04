import './style.css'
const Input = (props) =>{

    if(props.tipo === "submit"){
        return(
            <input className='submit' type="submit" onClick={props.onClick}value={props.nome}/>
        )
    }else if(props.tipo === "password"){
        return(

            <div className="inputBox">
                <input value={props.value} onChange={props.onChange} type="password" placeholder={props.placeholder}/>
                <span>{props.nome}</span>
            </div>

        )
    }else if(props.tipo === "text"){
        return(
            <div className="inputBox">
                <input value={props.value} onChange={props.onChange}type="text" placeholder={props.placeholder}/>
                <span>{props.nome}</span>
            </div>
        )
    }
}

export default Input