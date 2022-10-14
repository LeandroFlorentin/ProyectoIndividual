import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import './Videogames.css'
import Cargando from '../Cargando/Cargando.js'
import inicio from '../../img/inicio.png'
import { buscarJuegos } from '../../redux/actions'

const VideoGames = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { videoGames, genres } = useSelector(state => state)
    const [array, setArray] = useState([])
    const [arrayCortado, setArrayCortado] = useState([])
    const [arrayCantPag, setArrayCantPag] = useState([])
    const [loading, setLoading] = useState(true)
    const [buscar, setBuscar] = useState({
        input: ""
    })
    const [abrirMenu, setAbrirMenu] = useState(false)

    const arraySeteado = () => {
        console.log(videoGames)
        if (!arrayCortado.length) setArray(videoGames.sort((prev, next) => prev.name.localeCompare(next.name)))
        setArrayCortado(videoGames.slice(0, 15))
        let numeroDePag = Math.ceil(array.length / 15)
        let arrayPag = []
        for (let i = 1; i <= numeroDePag; i++) {
            arrayPag.push(i)
        }
        setArrayCantPag(arrayPag)
        setLoading(false)
    }

    const cambiarPag = (num) => {
        let numIni = 0;
        let numFin = 15;
        if (num !== 1) setArrayCortado(array.slice(numFin * (num - 1), numFin * num))
        else setArrayCortado(array.slice(numIni, numFin))
    }

    const sacarFiltro = () => {
        setArray([...videoGames])
    }

    useEffect(() => {
        console.log("useeffect")
        genres.length && videoGames.length && arraySeteado()
        genres.length && videoGames.length && console.log("se cumple")
    }, [videoGames, genres, array])

    const filtrado = (nombre, arr) => {
        let arrayFiltrado = []
        arr.forEach(ele => {
            if (typeof (ele.id) === "string") {
                ele.Generos.forEach(el => {
                    if (el.nombre === nombre) arrayFiltrado.push(ele)
                })
            }
            else {
                if (ele.genres.includes(nombre)) arrayFiltrado.push(ele)
            }
        })
        setArray(arrayFiltrado)
    }

    const ordenarLetrasAZ = () => {
        let arrayOrdenado = videoGames.sort((prev, next) => prev.name.localeCompare(next.name))
        setArray([...arrayOrdenado])
    }

    const ordenarLetrasZA = () => {
        let arrayOrdenado = videoGames.sort((prev, next) => prev.name.localeCompare(next.name))
        setArray([...arrayOrdenado].reverse())
    }

    const ordenarRatingMas = () => {
        let arratOrdenado = videoGames.sort((prev, next) => prev.rating - next.rating)
        setArray([...arratOrdenado])
    }

    const ordenarRatingMenos = () => {
        let arratOrdenado = videoGames.sort((prev, next) => prev.rating - next.rating)
        setArray([...arratOrdenado].reverse())
    }

    const navigateToGame = (id) => {
        history.push(`/videogames/${id}`)
    }

    const valorInput = (e) => {
        e.preventDefault()
        setBuscar({
            ...buscar,
            [e.target.name]: e.target.value
        })
    }

    const busquedaJuegos = (e) => {
        e.preventDefault()
        dispatch(buscarJuegos(buscar.input))
    }

    const juegosCreados = (arr) => {
        setArray(videoGames.filter(ele => typeof (ele.id) === "string"))
    }

    const mostrarMenu = () => {
        setAbrirMenu(!abrirMenu)
    }

    const pararPropa = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            {loading ?
                <Cargando />
                :
                <>
                    <div className="containerSup">
                        <header className="headerVid">
                            <img src={inicio} onClick={mostrarMenu} className='inicio' alt='inicio' />
                            {
                                abrirMenu ?
                                    <div className="backgroundMenu" onClick={mostrarMenu}>
                                        <div className="menu" onClick={pararPropa}>
                                            <button className="botonMenu" onClick={mostrarMenu}>X</button>
                                            <div className="containBoton">
                                                <button className="btnFil" onClick={() => ordenarLetrasAZ(array)}>A-Z</button>
                                                <button className="btnFil" onClick={() => ordenarLetrasZA(array)}>Z-A</button>
                                                <button className="btnFil" onClick={() => ordenarRatingMas(array)}>rating -</button>
                                                <button className="btnFil" onClick={() => ordenarRatingMenos(array)}>rating +</button>
                                                <button className="btnFil" onClick={() => juegosCreados(array)}>Juegos creados</button>
                                            </div>
                                            <div className="containerParrado">
                                                {genres.map(gen => <p className="parrafoGen" onClick={() => filtrado(gen.nombre, videoGames)} key={gen.id}>{gen.nombre}</p>)}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </header>
                        <form onSubmit={busquedaJuegos}>
                            <input type='text' placeholder='Buscar' name='input' onChange={(e) => valorInput(e)} value={buscar.input} />
                            <button type="submit">Buscar</button>
                        </form>
                        <div>
                            {arrayCantPag.map(ele => <button onClick={() => cambiarPag(ele)} key={ele.id}>{ele}</button>)}
                            <button onClick={sacarFiltro}>Sacar filtros</button>
                        </div>
                    </div>
                    <div className="containerJueguitos">
                        {
                            arrayCortado.map(juego => {
                                return (
                                    typeof (juego.id) === "string" ?
                                        <div className="containerGloJue">
                                            <div key={juego.id} className='containerJueguito'>
                                                <h3 className="tituloJueguito">{juego.name}</h3>
                                                <div className="card">
                                                    <img className="card-image" src={juego.background_image} alt='img' onClick={() => navigateToGame(juego.id)} />
                                                </div>
                                                <div className="generoString">{juego.Generos.map(gen => <p>{gen.nombre}</p>)}</div>
                                                <button className="botonVideo" onClick={() => navigateToGame(juego.id)}>Ver mas</button>
                                            </div>
                                            <div className="divSup"></div>
                                            <div className="divMed"></div>
                                            <div className="divInf"></div>
                                        </div>
                                        :
                                        <div className="containerGloJue">
                                            <div key={juego.id} className='containerJueguito'>
                                                <h3 className="tituloJueguito">{juego.name}</h3>
                                                <div className="card">
                                                    <img className="card-image" src={juego.background_image} alt='img' onClick={() => navigateToGame(juego.id)} />
                                                </div>
                                                <h4 className="genero">{juego.genres?.join(", ")}</h4>
                                                <button className="botonVideo" onClick={() => navigateToGame(juego.id)}>Ver mas</button>
                                            </div>
                                            <div className="divSup"></div>
                                            <div className="divMed"></div>
                                            <div className="divInf"></div>
                                        </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default VideoGames;