import { useNavigate } from "react-router-dom";

function BotonInicio(){

const navigate = useNavigate()

    return(
        <button
        className="btn-volver"
        onClick={()=>navigate("/Cliente")}
        >
         Ir al panel principal
        </button>
    )

}

export default BotonInicio