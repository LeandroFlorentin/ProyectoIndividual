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
    const [buscar, setBuscar] = useState({
        input: ""
    })

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
        videoGames.forEach(ele => {
            if (ele.genres.includes(nombre)) arrayFiltrado.push(ele)
        })
        setArray([...arrayFiltrado])
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

    const valorInput = (e) => {
        e.preventDefault()
        setBuscar({
            ...buscar,
            [e.target.name]: e.target.value
        })
    }
    console.log(array)

    const buscarJuegos = (e, texto, array) => {
        e.preventDefault()
        let textoMin = texto.toLowerCase().split(" ").join("")
        let arrayNombre = array.map(ele => {
            let eleMin = ele.name.toLowerCase().split(" ").join("")
            if (eleMin.includes(textoMin)) return ele
        })
        let arrayDevolver = arrayNombre.filter(ele => ele !== undefined)
        setArray([...arrayDevolver])
    }

    const juegosCreados = (arr) => {
        setArray(arr.filter(ele => typeof (ele.id) === "string"))
    }

    return (
        <>
            <form onSubmit={(e) => buscarJuegos(e, buscar.input, videoGames)}>
                <input type='text' placeholder='Buscar' name='input' onChange={(e) => valorInput(e)} value={buscar.input} />
                <button type="submit">Buscar</button>
            </form>
            <div>
                <button onClick={() => ordenarLetrasAZ(array)}>A-Z</button>
                <button onClick={() => ordenarLetrasZA(array)}>Z-A</button>
                <button onClick={() => ordenarRatingMas(array)}>rating -</button>
                <button onClick={() => ordenarRatingMenos(array)}>rating +</button>
                <button onClick={() => juegosCreados(array)}>Juegos creados</button>
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
                        typeof (juego.id) === "string" ?
                            <div key={juego.id}>
                                <h1>{juego.name}</h1>
                                <div className="card">
                                    <img className="card-image" src={juego.background_image} alt='img' onClick={() => navigateToGame(juego.id)} />
                                </div>
                                <h4>{juego.Generos.map(gen => <p>{gen.nombre}</p>)}</h4>
                                <button onClick={() => navigateToGame(juego.id)}>Ver mas</button>
                            </div>
                            :
                            <div key={juego.id}>
                                <h1>{juego.name}</h1>
                                <div className="card">
                                    <img className="card-image" src={juego.background_image} alt='img' onClick={() => navigateToGame(juego.id)} />
                                </div>
                                <h4>{juego.genres?.join(", ")}</h4>
                                <button onClick={() => navigateToGame(juego.id)}>Ver mas</button>
                            </div>
                    )
                })
            }
        </>
    )
}

export default VideoGames;