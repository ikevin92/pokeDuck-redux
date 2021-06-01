import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

// importamos los reducers
import pokeReducer from './pokeDucks';
import usuarioReducer, { leerUsuarioActivoAccion } from './usuarioDucks';

// se incluyen los reducers
const rootReducer = combineReducers( {
    pokemones: pokeReducer,
    usuario: usuarioReducer
} );

// nunca se modifica
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore () {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) );
    // ejecucion de leer el usuario 
    leerUsuarioActivoAccion()( store.dispatch );
    return store;
}