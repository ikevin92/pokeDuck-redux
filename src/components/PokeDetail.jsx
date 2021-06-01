import { useSelector } from 'react-redux';

const PokeDetail = () => {

    const { detalle } = useSelector( state => state.pokemones );

    // console.log( detalle.name );

    return (
        <div className="card mt-5 text-center">
            <img src={ detalle.sprites.front_default } alt={ detalle.name } className="img-fluid" />
            <div className="card-body">
                <div className="card-title text-uppercase">{ detalle.name }</div>

                <p className="card-text">
                    Ancho: { detalle.height } |
                    Alto: { detalle.weight }
                </p>
            </div>

        </div>
    );
};

export default PokeDetail;
