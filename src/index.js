import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

//redux
import { Provider } from 'react-redux';
// redux store
import generateStore from './redux/store';


// inicializamos del store de redux
const store = generateStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store } >
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById( 'root' )
);

