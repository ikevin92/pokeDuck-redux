// react router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";


import Pokemones from './components/Pokemones';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App () {


    return (
        <Router>

            {/* Barra del Nav */ }

            <Navbar />

            <div className="container mt-3">

                <Switch>

                    <Route path="/" component={ Pokemones } />
                    <Route path="/login" component={ Login } />
                
                </Switch>

            </div>

        </Router>
    );
}

export default App;
