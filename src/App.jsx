
import { Provider } from 'react-redux';
// redux store
import generateStore from './redux/store';

import Pokemones from './components/Pokemones';

function App () {

    // inicializamos del store de redux
    const store = generateStore();

    return (
        <Provider store={ store } >
            <Pokemones />
        </Provider>
    );
}

export default App;
