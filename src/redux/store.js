import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

// importamos los reducers
import pokeReducer from './pokeDucks';

// se incluyen los reducers
const rootReducer = combineReducers( {
    pokemones: pokeReducer
} );

// nunca se modifica
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore () {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) );
    return store;
}