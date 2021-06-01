import { useSelector, useDispatch } from 'react-redux';
import {
    NavLink,
    Link,
    useHistory
} from "react-router-dom";
import { cerrarSesionAccion } from '../redux/usuarioDucks';

const Navbar = () => {

    const dispatch = useDispatch();

    // extrae el estado de la sesion
    const { activo } = useSelector( state => state.usuario );

    const history = useHistory();

    // funcion del click de cerrar la sesion
    const handleCerrarSesion = () => {
        dispatch( cerrarSesionAccion() );
        history.push( '/login' );
    };


    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKE</Link>
            <div className="d-flex">
                { activo
                    ?
                    <>
                        <NavLink to="/" className="btn btn-dark mr-2" exact>Inicio</NavLink>

                        <button
                            onClick={ handleCerrarSesion }
                            className="btn btn-dark mr-2"
                        >Cerrar Sesion
                        </button>
                    </>
                    :

                    <NavLink to="/login" className="btn btn-dark mr-2" exact>Login</NavLink>

                }





            </div>
        </div>
    );
};

export default Navbar;
