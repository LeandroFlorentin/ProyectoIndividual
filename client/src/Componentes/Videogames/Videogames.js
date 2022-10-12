import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import './Videogames.css'

const VideoGames = () => {
    const history = useHistory()
    const { videoGames, genres } = useSelector(state => state)
    const [array, setArray] = useState([])
    const [arrayCortado, setArrayCortado] = useState([])
    const [arrayCantPag, setArrayCantPag] = useState([])

    const arraySeteado = () => {
        if (!arrayCortado.length) setArray(videoGames.sort((prev, next) => prev.name.localeCompare(next.name)))
        setArrayCortado(array.slice(0, 15))
        let numeroDePag = Math.ceil(array.length / 15)
        let arrayPag = []
        for (let i = 1; i <= numeroDePag; i++) {
            arrayPag.push(i)
        }
        setArrayCantPag(arrayPag)
    }

    const cambiarPag = (num) => {
        let numIni = 0;
        let numFin = 15;
        if (num !== 1) setArrayCortado(array.slice(numFin * (num - 1), numFin * num))
        else setArrayCortado(array.slice(numIni, numFin))
    }

    const filtrado = (nombre) => {
        let arrayFiltrado = []
        array.forEach(ele => {
            if (ele.genres.includes(nombre)) arrayFiltrado.push(ele)
        })
        setArray(arrayFiltrado)
    }

    const sacarFiltro = () => {
        setArray([...videoGames])
    }

    useEffect(() => {
        genres.length && videoGames.length && arraySeteado()
    }, [videoGames, genres, array])

    const ordenarLetrasAZ = (arr) => {
        let arrayOrdenado = arr.sort((prev, next) => prev.name.localeCompare(next.name))
        setArray([...arrayOrdenado])
    }

    const ordenarLetrasZA = (arr) => {
        let arrayOrdenado = arr.sort((prev, next) => prev.name.localeCompare(next.name))
        setArray([...arrayOrdenado].reverse())
    }

    const ordenarRatingMas = (arr) => {
        let arratOrdenado = arr.sort((prev, next) => prev.rating - next.rating)
        setArray([...arratOrdenado])
    }

    const ordenarRatingMenos = (arr) => {
        let arratOrdenado = arr.sort((prev, next) => prev.rating - next.rating)
        setArray([...arratOrdenado].reverse())
    }

    const navigateToGame = (id) => {
        history.push(`/videogames/${id}`)
    }

    return (
        <>
            <div>
                <button onClick={() => ordenarLetrasAZ(array)}>A-Z</button>
                <button onClick={() => ordenarLetrasZA(array)}>Z-A</button>
                <button onClick={() => ordenarRatingMas(array)}>rating -</button>
                <button onClick={() => ordenarRatingMenos(array)}>rating +</button>
            </div>
            <div>
                {arrayCantPag.map(ele => <button onClick={() => cambiarPag(ele)} key={ele.id}>{ele}</button>)}
                <button onClick={sacarFiltro}>Sacar filtros</button>
            </div>
            <div>
                {genres.map(gen => <button onClick={() => filtrado(gen.nombre)} key={gen.id}>{gen.nombre}</button>)}
            </div>
            {
                arrayCortado.map(juego => {
                    return (
                        <div key={juego.id}>
                            <h1>{juego.name}</h1>
                            <div className="card">
                                <img className="card-image" src={juego.background_image} alt='img' />
                            </div>
                            <h4>{juego.genres.join(", ")}</h4>
                            <button onClick={() => navigateToGame(juego.id)}>Ver mas</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default VideoGames;