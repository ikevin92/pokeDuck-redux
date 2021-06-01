// redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';



const Login = () => {

    // useDispatch redux
    const dispatch = useDispatch();

    // consultar state de redux
    const { loading, activo } = useSelector( state => state.usuario );

    console.log( { loading } );
    console.log( { activo } );

    // history react-router
    const history = useHistory();

    const handleLogin = () => {
        dispatch( ingresoUsuarioAccion() );
    };

    useEffect( () => {
        console.log( 'inicio login' );
        console.log( { activo } );

        if ( activo ) {
            history.push('/')
        }
    }, [activo] );

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso en Google</h3>
            <hr />
            <button
                onClick={ handleLogin }
                className="btn btn-dark"
                disabled={ loading }
            >
                Acceder

            </button>
        </div>
    );
};

export default Login;
