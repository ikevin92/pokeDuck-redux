import axios from 'axios';

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    detalle: null
};

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO';
const DETALLE_POKEMON = 'DETALLE_POKEMON';

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

        case DETALLE_POKEMON:
            return {
                ...state,
                detalle: action.payload

            };

        default:
            return {...state};
    }
}

// actions
export const detallePokemonAccion = ( url = 'https://pokeapi.co/api/v2/pokemon/1/' ) => async ( dispatch, getState ) => {

    if ( localStorage.getItem( url ) ) {

        dispatch( {
            type: DETALLE_POKEMON,
            payload: JSON.parse( localStorage.getItem( url ) )
        } );

        return;
    }


    try {
        const res = await axios.get( url );
        console.log( res.data );

        dispatch( {
            type: DETALLE_POKEMON,
            payload: res.data
        } );

        localStorage.setItem( url, JSON.stringify( res.data ) );


    } catch ( error ) {
        console.log( error );
    }

};


export const obtenerPokemonsAction = () => async ( dispatch, getState ) => {

    // console.log( getState().pokemones)
    // se obtiene del state de redux
    // const { offset } = getState().pokemones;

    if ( localStorage.getItem( 'offset=0' ) ) {
        console.log( 'datos desde el localStorage' );
        // Se envia al state el resultado de la consulta
        dispatch( {
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem( 'offset=0' ) )
        } );
        return;
    }


    try {
        console.log( 'datos desde la api' );

        const res = await axios.get( `https://pokeapi.co/api/v2/pokemon?offset=${ 0 }&limit=20` );

        console.log( res.data );


        // Se envia al state el resultado de la consulta
        dispatch( {
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        } );

        // guardar en localStorage
        localStorage.setItem( 'offset=0', JSON.stringify( res.data ) );

        console.log( 'getState', getState().pokemones );

    } catch ( error ) {
        console.log( error );
    }
};

// funcion del paginado de la siguiente
export const siguientePokemonAccion = () => async ( dispatch, getState ) => {

    // console.log( { numero } );
    // // leemos el offset
    // const { offset } = getState().pokemones;
    // const siguiente = offset + numero;

    // extrae la url de la siguiente consulta
    const { next } = getState().pokemones;

    if ( localStorage.getItem( next ) ) {
        dispatch( {
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem( next ) )
        } );
        return;
    }

    try {

        const res = await axios.get( `${ next }` );

        dispatch( {
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        } );

        // guardar en localStorage
        localStorage.setItem( next, JSON.stringify( res.data ) );

    } catch ( error ) {
        console.log( error );
    }
};


export const anteriorPokemonAccion = () => async ( dispatch, getState ) => {

    // extrae la url de la siguiente consulta
    const { previous } = getState().pokemones;

    if ( localStorage.getItem( previous ) ) {
        dispatch( {
            type: ANTERIOR_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem( previous ) )
        } );
        return;
    }

    try {
        const res = await axios.get( `${ previous }` );

        dispatch( {
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data
        } );

        // guardar en localStorage
        localStorage.setItem( previous, JSON.stringify( res.data ) );


    } catch ( error ) {
        console.log( error );
    }
};
