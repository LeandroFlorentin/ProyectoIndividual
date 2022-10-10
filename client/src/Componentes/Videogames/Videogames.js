import { useState, useEffect } from "react";
import './Videogames.css'

const VideoGames = ({ arrayCien }) => {
    const [array, setArray] = useState([])
    console.log(array)

    const [arrayCantPag, setArrayCantPag] = useState([])

    const funcion = () => {
        let arrayCantPagFalso = []
        setArray(arrayCien.slice(0, 15))
        let cantidadDePaginas = Math.ceil(arrayCien.length / 15)
        for (let i = 1; i < cantidadDePaginas + 1; i++) {
            arrayCantPagFalso.push(i)
        }
        setArrayCantPag(arrayCantPagFalso)
    }

    useEffect(() => {
        arrayCien.length && funcion()
    }, [arrayCien])

    const cambiarPagina = (num) => {
        let numIni = 0;
        let numFin = 15;
        if (num !== 1) setArray(arrayCien.slice(numFin * (num - 1), numFin * num))
        else setArray(arrayCien.slice(numIni, numFin))
    }
    return (
        <>
            <div>
                {arrayCantPag.map(ele => <button onClick={() => cambiarPagina(ele)} >{ele}</button>)}
            </div>
            {
                array.map(juego => {
                    return (
                        <div>
                            <h1>{juego.name}</h1>
                            <div className="card">
                                <img className="card-image" src={juego.background_image} alt='img' />
                            </div>
                            <h4>{juego.genres.join(" ")}</h4>
                        </div>
                    )
                })
            }
        </>
    )
}

export default VideoGames;