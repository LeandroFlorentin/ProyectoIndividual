import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import './Videogames.css'
import Cargando from '../Cargando/Cargando.js'
import inicio from '../../img/inicio.png'
import { buscarJuegos, filtrar, getVideogames } from '../../redux/actions'
import anterior from '../../img/anterior.png'
import siguiente from '../../img/siguiente.png'

const VideoGames = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { videoGames, genres, videoGameActu } = useSelector(state => state)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [botones, setBotones] = useState([0])
    const [buscar, setBuscar] = useState({
        input: ""
    })
    const [abrirMenu, setAbrirMenu] = useState(false)

    const longiLoad = () => {
        setLoading(false)
        let paginas = Math.ceil(videoGameActu.length / 15)
        let arrayPaginas = [];
        for (let i = 1; i < paginas + 1; i++) {
            arrayPaginas.push(i)
        }
        setBotones(arrayPaginas)
    }

    useEffect(() => {
        videoGames.length && genres.length && longiLoad()
    }, [videoGames, videoGameActu])

    const navigateToGame = (id) => {
        history.push(`/videogames/${id}`)
    }

    const navigateToCreate = () => {
        history.push('/createvideogame')
    }

    const volverLanding = () => {
        history.push('/')
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

    const moverPagina = (num) => {
        console.log(num)
        let numIni = 0;
        if (num === 1) setCurrentPage(numIni)
        else setCurrentPage(15 * (num - 1))
    }

    const paginaAnterior = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 15)
    }

    const paginaSiguiente = () => {
        if (currentPage + 15 >= videoGameActu.length) setCurrentPage(currentPage)
        else setCurrentPage(currentPage + 15)
    }

    const ordenarLetrasZA = (e) => {
        e.preventDefault()
        dispatch(filtrar(videoGames.sort((ant, next) => next.name.localeCompare(ant.name))))
    }

    const ordenarLetrasAZ = (e) => {
        e.preventDefault()
        dispatch(filtrar(videoGames.sort((ant, next) => ant.name.localeCompare(next.name))))
    }

    const ordenarRatingMas = (e) => {
        e.preventDefault()
        dispatch(filtrar(videoGames.sort((ant, next) => ant.rating - next.rating)))
    }

    const ordenarRatingMenos = (e) => {
        e.preventDefault()
        dispatch(filtrar(videoGames.sort((ant, next) => next.rating - ant.rating)))
    }

    const juegosCreados = (e) => {
        e.preventDefault()
        dispatch(filtrar(videoGames.filter(game => typeof game.id === "string")))
    }

    const filtrarGenero = (nombre) => {
        dispatch(filtrar(videoGames.filter(game => {
            if (typeof game.id === "string") {
                for (const ele of game.Generos) {
                    if (ele.nombre === nombre) return game
                }
            } else {
                if (game.genres.includes(nombre)) return game
            }
        })))
    }

    const mostrarTodos = () => {
        videoGames.length ? dispatch(filtrar(videoGames)) : dispatch(getVideogames())
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
                                            <div className="containerText">
                                                <h3 className="tituloFil">Filtros</h3>
                                                <div className="containBoton">
                                                    <button className="btnFil" onClick={ordenarLetrasZA}>Z-A</button>
                                                    <button className="btnFil" onClick={ordenarLetrasAZ}>A-Z</button>
                                                    <button className="btnFil" onClick={ordenarRatingMas}>rating -</button>
                                                    <button className="btnFil" onClick={ordenarRatingMenos}>rating +</button>
                                                    <button className="btnFil" onClick={juegosCreados}>Juegos creados</button>
                                                    <button className="btnFil" onClick={mostrarTodos}>Todos los juegos</button>
                                                </div>
                                                <div className="containerParrafo">
                                                    <h3 className="h3Genero">Generos</h3>
                                                    {genres.map((gen, ubi) => <p key={ubi} className="parrafoGen" onClick={() => filtrarGenero(gen.nombre)} key={gen.id}>{gen.nombre}</p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            <button className="crearJuego" onClick={navigateToCreate}>Crear juego</button>
                        </header>
                        <h4 className="volverLanding" onClick={volverLanding}>Volver al landing</h4>
                        <form onSubmit={busquedaJuegos} className='containerBuscar'>
                            <input className="buscarInput" type='text' placeholder='Buscar' name='input' onChange={(e) => valorInput(e)} value={buscar.input} />
                            <button className="btnBuscar" type="submit" >Buscar</button>
                        </form>
                    </div>
                    <div>
                        <div className="containerHidden">
                            <div className="containerBtnPag">
                                <div className="lineaArriba"></div>
                                <img src={anterior} className="btnAnterior" onClick={paginaAnterior} />
                                {
                                    botones.length ?
                                        botones.map((boton, ubi) => <p key={ubi} className="botonNum" onClick={() => moverPagina(boton)}>{boton}</p>)
                                        :
                                        <p className="botonNum">1</p>
                                }
                                <img src={siguiente} className="btnSiguiente" onClick={paginaSiguiente} />
                                <div className="lineaAbajo"></div>
                            </div>
                        </div>
                        {
                            videoGameActu.length ?
                                <div className="containerJueguitos">
                                    {
                                        videoGameActu.slice(currentPage, currentPage + 15).map(juego => {
                                            return (
                                                typeof (juego.id) === "string" ?
                                                    <div className="containerGloJue" key={juego.id}>
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
                                                    <div className="containerGloJue" key={juego.id}>
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
                                :
                                <>
                                    {
                                        videoGames.length ?
                                            <div className="divHola">
                                                <h5>No se encontraron juegos con este genero.</h5>
                                            </div>
                                            :
                                            <div className="divHola">
                                                <h5>No se encontraron juegos con este nombre.</h5>
                                            </div>
                                    }
                                </>
                        }
                        <footer className="footer">

                        </footer>
                    </div>
                </>
            }
        </>
    )
}

export default VideoGames;