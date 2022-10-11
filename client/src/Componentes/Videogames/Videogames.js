import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Videogames.css'

const VideoGames = () => {
    const { videoGames, genres } = useSelector(state => state)
    const [array, setArray] = useState([])
    const [arrayCortado, setArrayCortado] = useState([])
    const [arrayCantPag, setArrayCantPag] = useState([])

    const arraySeteado = () => {
        if (!arrayCortado.length) setArray(videoGames)
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
        setArray(videoGames)
    }

    useEffect(() => {
        genres.length && videoGames.length && arraySeteado()
    }, [videoGames, genres, array])

    console.log(array)

    return (
        <>
            <div>
                {arrayCantPag.map(ele => <button onClick={() => cambiarPag(ele)}>{ele}</button>)}
                <button onClick={sacarFiltro}>Sacar filtros</button>
            </div>
            <div>
                {genres.map(gen => <button onClick={() => filtrado(gen.nombre)}>{gen.nombre}</button>)}
            </div>
            {
                arrayCortado.map(juego => {
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