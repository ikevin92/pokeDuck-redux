import axios from 'axios';

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
};

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO';

// reducer
export default function pokeReducer ( state = dataInicial, action ) {

    switch ( action.type ) {

        case OBTENER_POKEMONES_EXITO:
        case SIGUIENTE_POKEMONES_EXITO:
        case ANTERIOR_POKEMONES_EXITO:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

// actions
export const obtenerPokemonsAction = () => async ( dispatch, getState ) => {

    // console.log( getState().pokemones)
    // se obtiene del state de redux
    // const { offset } = getState().pokemones;


    try {

        const res = await axios.get( `https://pokeapi.co/api/v2/pokemon?offset=${ 0 }&limit=20` );

        console.log( res.data );

        // Se envia al state el resultado de la consulta
        dispatch( {
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        } );

        console.log( 'getState', getState().pokemones );

    } catch ( error ) {
        console.log( error );
    }
};

// funcion del paginado de la siguiente
export const siguientePokemonAccion = (  ) => async ( dispatch, getState ) => {

    // console.log( { numero } );
    // // leemos el offset
    // const { offset } = getState().pokemones;
    // const siguiente = offset + numero;

    // extrae la url de la siguiente consulta
    const { next } = getState().pokemones;

    try {

        const res = await axios.get( `${ next }` );

        dispatch( {
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        } );

    } catch ( error ) {
        console.log( error );
    }
};


export const anteriorPokemonAccion = (  ) => async ( dispatch, getState ) => {



    // extrae la url de la siguiente consulta
    const { previous } = getState().pokemones;

    try {

        const res = await axios.get( `${ previous }` );

        dispatch( {
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data
        } );

    } catch ( error ) {
        console.log( error );
    }
};
