//import de hooks de redux
import { useSelector, useDispatch } from 'react-redux';
//importaciones del Duck
import { anteriorPokemonAccion, detallePokemonAccion, obtenerPokemonsAction, siguientePokemonAccion } from '../redux/pokeDucks';
import PokeDetail from './PokeDetail';


const Pokemones = () => {

    // disparador de redux
    const dispatch = useDispatch();

    // selector para leer lo que esta en redux
    const { results, next, previous, detalle } = useSelector( state => state.pokemones );



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

    const handleDetail = ( url ) => {
        console.log( url );
        dispatch( detallePokemonAccion( url ) );
    };


    return (

        <div className="row container">

            <div className="col-md-6">


                <h3>Lista de pokemones
                </h3>
                <br />

                <div className="d-flex justify-content-between">
                    {
                        results.length < 1 &&
                        <button onClick={ handleClick } className="btn btn-dark">Get Pokemones</button>
                    }
                    {
                        next &&
                        <button className="btn btn-dark" onClick={ handleSiguiente }>Siguiente</button>
                    }
                    {
                        previous &&
                        <button className="btn btn-dark" onClick={ handleAnterior }>Anterior</button>
                    }
                </div>

                <ul className="list-group mt-3">
                    {
                        results.map( ( item, idx ) => (
                            <li key={ idx } className="list-group-item text-uppercase" >
                                { item.name }
                                <button onClick={ () => handleDetail( item.url ) } className="btn btn-dark btn-sm float-right" >Info</button>
                            </li>
                        ) )
                    }
                </ul>

            </div>


            {/* detalle de pokemones */ }

            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                { detalle &&
                    <PokeDetail />
                }

            </div>


        </div>
    );
};

export default Pokemones;
