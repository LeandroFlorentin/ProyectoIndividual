import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Videogames.css'

const VideoGames = () => {
    let { videoGames, genres } = useSelector(state => state)
    const [filtroOn, setFiltoOn] = useState(false)
    const [array, setArray] = useState([])
    const [arrayCantPag, setArrayCantPag] = useState([])
    const funcion = () => {
        let arrayCantPagFalso = []
        setArray(filtroOn ? array.slice(0, 15) : videoGames.slice(0, 15))
        let cantidadDePaginas = Math.ceil(videoGames.length / 15)
        for (let i = 1; i < cantidadDePaginas + 1; i++) {
            arrayCantPagFalso.push(i)
        }
        setArrayCantPag(arrayCantPagFalso)
    }


    useEffect(() => {
        videoGames.length && genres.length && funcion()
    }, [videoGames, genres])

    const cambiarPagina = (num) => {
        let numIni = 0;
        let numFin = 15;
        if (num !== 1) setArray(filtroOn ? array.slice(numFin * (num - 1), numFin * num) : videoGames.slice(numFin * (num - 1), numFin * num))
        else setArray(filtroOn ? array.slice(numIni, numFin) : videoGames.slice(numIni, numFin))
    }

    const filtroGenero = (nombre) => {
        setFiltoOn(true)
        let arrNew = videoGames.map(game => {
            if (game.genres.includes(nombre)) return game
        })
        let arrGen = arrNew.filter(ele => ele !== undefined)
        setArray(arrGen)
        let arrayCantPagFalso = []
        let cantidadDePaginas = Math.ceil(arrGen.length / 15)
        for (let i = 1; i < cantidadDePaginas + 1; i++) {
            arrayCantPagFalso.push(i)
        }
        setArrayCantPag(arrayCantPagFalso)
    }

    console.log(array)
    return (
        <>
            <div>
                {arrayCantPag.map(ele => <button onClick={() => cambiarPagina(ele)} >{ele}</button>)}
            </div>
            <div>
                {genres.map(gen => <button onClick={() => filtroGenero(gen.nombre)} >{gen.nombre}</button>)}
            </div>
            {
                array.map(juego => {
                    return (
                        <div>
                            <h1>{juego.name}</h1>
                            <div className="card">
                                <img className="card-image" src={juego.background_image} alt='img' />
                            </div>
                            <h4>{juego.genres.join(", ")}</h4>
                        </div>
                    )
                })
            }
        </>
    )
}

export default VideoGames;