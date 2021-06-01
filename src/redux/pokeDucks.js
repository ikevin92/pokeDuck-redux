import axios from 'axios';

// constantes
const dataInicial = {
    listPoke: [],
    offset: 0
};

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';

// reducer
export default function pokeReducer ( state = dataInicial, action ) {

    switch ( action.type ) {
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state,
                listPoke: action.payload
            };
        case SIGUIENTE_POKEMONES_EXITO:
            return {
                ...state,
                listPoke: action.payload.listPoke,
                offset: action.payload.offset
            };
        default:
            return state;
    }
}

// actions
export const obtenerPokemonsAction = () => async ( dispatch, getState ) => {

    // console.log( getState().pokemones)
    // se obtiene del state de redux
    const { offset } = getState().pokemones;


    try {

        const res = await axios.get( `https://pokeapi.co/api/v2/pokemon?offset=${ offset }&limit=20` );

        // Se envia al state el resultado de la consulta
        dispatch( {
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        } );

        console.log( 'getState', getState().pokemones );

    } catch ( error ) {
        console.log( error );
    }
};

// funcion del paginado de la siguiente
export const siguientePokemonAccion = ( numero ) => async ( dispatch, getState ) => {

    console.log( { numero } );
    // leemos el offset
    const { offset } = getState().pokemones;
    const siguiente = offset + numero;


    try {

        const res = await axios.get( `https://pokeapi.co/api/v2/pokemon?offset=${ offset }&limit=20` );

        dispatch( {
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: {
                listPoke: res.data.results,
                offset: siguiente
            }
        } );

    } catch ( error ) {
        console.log( error );
    }
};
