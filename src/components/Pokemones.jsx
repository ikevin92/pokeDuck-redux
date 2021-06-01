//import de hooks de redux
import { useSelector, useDispatch } from 'react-redux';
//importaciones del Duck
import { anteriorPokemonAccion, obtenerPokemonsAction, siguientePokemonAccion } from '../redux/pokeDucks';


const Pokemones = () => {

    // disparador de redux
    const dispatch = useDispatch();

    // selector para leer lo que esta en redux
    const { results, next, previous } = useSelector( state => state.pokemones );

    // console.log( results );

    // funcion de boton
    const handleClick = () => {
        dispatch( obtenerPokemonsAction() );
    };

    // funcionde  paginado
    const handleSiguiente = () => {
        dispatch( siguientePokemonAccion() );
    };

    const handleAnterior = () => {
        dispatch( anteriorPokemonAccion() );
    };


    return (

        <div>
            lista de pokemones
            {
                results.length < 1 &&
                <button onClick={ handleClick }>Get Pokemones</button>
            }
            {
                next &&
                <button onClick={ handleSiguiente }>Siguiente</button>
            }
            {
                previous &&
                <button onClick={ handleAnterior }>Anterior</button>
            }

            <ul>
                {
                    results.map( ( item, idx ) => (
                        <li key={ idx }>{ item.name }</li>
                    ) )
                }
            </ul>
        </div>
    );
};

export default Pokemones;
