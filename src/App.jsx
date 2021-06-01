import { useEffect, useState } from 'react';
// react router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
// importamos firebase
// Firebase
import { auth } from './firebase';

import Pokemones from './components/Pokemones';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App () {

    // Firebase
    const [ firebaseUser, setFirebaseUser ] = useState( false );

    useEffect( () => {
        // siempre se crea una funcio
        const fetchUser = () => {
            auth.onAuthStateChanged( user => {
                console.log( user );
                if ( user ) {
                    setFirebaseUser( user );
                } else {
                    setFirebaseUser( null );
                }
            } );
        };
        fetchUser();
    }, [] );

    // validacion para ruta privada
    const RutaPrivada = ( { component, path, ...rest } ) => {

        if ( localStorage.getItem( 'usuario' ) ) {

            const usuarioStorage = JSON.parse( localStorage.getItem( 'usuario' ) );

            // compara si el usuario de firebase y el del localstorage son iguales
            if ( usuarioStorage.uid === firebaseUser.uid ) {
                console.log('son iguales');
                return <Route component={ component } path={ path } { ...rest } />;
            } else {
                console.log('no existe');
                <Redirect to='/login' { ...rest } />;

            }

        } else {
            <Redirect to='/login' { ...rest } />;

        }
    };


    return firebaseUser !== false ? (
        <Router>

            {/* Barra del Nav */ }

            <Navbar />

            <div className="container mt-3">

                <Switch>

                    <RutaPrivada exact path="/" component={ Pokemones } />
                    <Route exact path="/login" component={ Login } />

                </Switch>

            </div>

        </Router>
    ) :
        ( <div>Cargando...</div> );

}

export default App;
