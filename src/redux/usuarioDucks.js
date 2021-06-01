
//firebase imports
import { auth, firebase } from '../firebase';

// constantes data inicial
const dataInicial = {
    loading: false,
    activo: false,
    user: {}
};

//types
const LOADING = 'LOADING';
const USUARIO_ERROR = 'USUARIO_ERROR';
const USUARIO_EXITO = 'USUARIO_EXITO';
const CERRAR_SESION = 'CERRAR_SESION';



//reducer
export default function usuarioReducer ( state = dataInicial, action ) {

    switch ( action.type ) {
        case LOADING:
            return {
                ...state,
                loading: true
            };

        case CERRAR_SESION:
        case USUARIO_ERROR:
            return { ...dataInicial };

        case USUARIO_EXITO:
            return {
                ...state,
                loading: false,
                user: action.payload,
                activo: true
            };
        default:
            return { ...state };
    }
}

//action
// se usa cuando se presiona el boton de acceder por google
export const ingresoUsuarioAccion = () => async ( dispatch ) => {

    dispatch( {
        type: LOADING
    } );

    try {
        // se llama el provider de firebase
        const provider = new firebase.auth.GoogleAuthProvider();

        // respuesta del pop-pup
        const res = await auth.signInWithPopup( provider );
        console.log( res );

        // se pasa al reducer
        dispatch( {
            type: USUARIO_EXITO,
            payload: {
                user: {
                    uid: res.user.uid,
                    email: res.user.email,
                    img: res.user.photoURL,
                    name: res.user.displayName,
                }
            }
        } );

        // se guarda en el localstorage
        localStorage.setItem( 'usuario', JSON.stringify( {
            uid: res.user.uid,
            email: res.user.email,
            img: res.user.photoURL,
            name: res.user.displayName,
        } ) );

    } catch ( error ) {
        console.log( error );
        dispatch( {
            type: USUARIO_ERROR
        } );
    }
};


export const leerUsuarioActivoAccion = () => ( dispatch ) => {

    // validar localstorage
    if ( localStorage.getItem( 'usuario' ) ) {

        dispatch( {
            type: USUARIO_EXITO,
            payload: {
                user: JSON.parse( localStorage.getItem( 'usuario' ) )
            }
        } );

    }

};


export const cerrarSesionAccion = () => ( dispatch ) => {
    //funcion de firebase
    auth.signOut();

    dispatch( {
        type: CERRAR_SESION
    } );

    // borrar del local storage
    localStorage.removeItem( 'usuario' );

};
