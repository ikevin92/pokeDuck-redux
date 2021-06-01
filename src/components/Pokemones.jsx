//import de hooks de redux
import { useSelector, useDispatch } from 'react-redux';
//importaciones del Duck
import { obtenerPokemonsAction, siguientePokemonAccion } from '../redux/pokeDucks';


const Pokemones = () => {

    // disparador de redux
    const dispatch = useDispatch();

    // selector para leer lo que esta en redux
    const { listPoke } = useSelector( state => state.pokemones );
    console.log( listPoke );

    // funcion de boton
    const handleClick = () => {
        dispatch( obtenerPokemonsAction() );
    };

    // funcionde siguiente paginado
    const handleSiguiente = ( value = 10 ) => {
        dispatch( siguientePokemonAccion( value ) );
    };


    return (
        <div>
            lista de pokemones
            <button onClick={ handleClick }>Get Pokemones</button>
            <button onClick={ () => handleSiguiente(20) }>Siguiente</button>

            <ul>
                {
                    listPoke.map( ( item, idx ) => (
                        <li key={ idx }>{ item.name }</li>
                    ) )
                }
            </ul>
        </div>
    );
};

export default Pokemones;
