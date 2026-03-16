import { useNavigate } from "react-router-dom";

function BotonVolver(){

const navigate = useNavigate()

    return(
        <button
        className="btn-volver"
        onClick={()=>navigate("/admin")}
        >
         Ir al panel principal
        </button>
    )

}

export default BotonVolver