import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGame, getVideogames, getGenres } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import './createGame.css'
import Cargando from '../Cargando/Cargando.js'
import anterior from '../../img/anterior.png'

const CreateGame = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state => state.videoGames)
    const genre = useSelector(state => state.genres)
    const [load, setLoad] = useState(true)
    const [errorNombre, setErrorNombre] = useState({ errors: false })
    const [errorDescrip, setErrorDescrip] = useState({ errors: false })
    const [errorPlat, setErrorPlat] = useState({ errors: false })
    const [errorRating, setErrorRating] = useState({ errors: false })
    const [errorRepeatPlat, setErrorRepeatPlat] = useState({ errors: true })
    const [errorRepeatGen, setErrorRepeatGen] = useState({ errors: true })
    let generos = [...new Set(genre.map(ele => ele).flat())]
    let platforms = [...new Set(state.map(ele => ele.platforms).flat())]
    const [text, setText] = useState({
        name: "",
        background_image: "",
        platforms: [],
        genres: [],
        rating: "",
        released: "",
        description_raw: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        if (String(e.target.name) === "platforms" || String(e.target.name) === "genres") {
            if (text.platforms.includes(e.target.value)) setErrorRepeatPlat(false)
            else if (text.genres.includes(e.target.value)) setErrorRepeatGen(false)
            else {
                setText({
                    ...text,
                    [e.target.name]: [...text[e.target.name], e.target.value]
                })
            }
        }
        else {
            setText({
                ...text,
                [e.target.name]: e.target.value
            })
            if (String(e.target.name) === "name") {
                if (!e.target.value.length) setErrorNombre({ errors: false })
                else setErrorNombre({ errors: true })
            }
            if (String(e.target.name) === "description_raw") {
                if (!e.target.value.length) setErrorDescrip({ errors: false })
                else setErrorDescrip({ errors: true })
            }
            if (String(e.target.name) === "platforms") {
                if (!e.target.value.length) setErrorPlat({ errors: false })
                else setErrorPlat({ errors: true })
            }
            if (String(e.target.name === "rating")) {
                if (parseFloat(e.target.value) > 0 && parseFloat(e.target.value) <= 5) setErrorRating({ errors: true })
                else setErrorRating({ errors: false })
            }
        }
    }

    const submitGame = (e, text) => {
        e.preventDefault()
        if (text.name.length && text.description_raw.length && text.platforms.length && parseInt(text.rating) > 0 && parseInt(text.rating) <= 5) {
            dispatch(createGame(text))
            alInicio()
        }
    }

    const deleteGen = (genero) => {
        setText({
            ...text,
            genres: text.genres.filter(ele => ele !== genero)
        })
    }

    const deletePlat = (plat) => {
        setText({
            ...text,
            platforms: text.platforms.filter(ele => ele !== plat)
        })
    }

    const alInicio = () => {
        history.push('/videogames')
    }

    useEffect(() => {
        !state.length && dispatch(getVideogames())
        !genre.length && dispatch(getGenres())
        genre.length && state.length && setLoad(false)
    }, [genre, state])

    return (
        <>
            {
                load ?
                    <Cargando />
                    :
                    <div className='containerForm'>
                        <img src={anterior} className='botonAnteriorCreate' alt='img' onClick={alInicio} />
                        <div className='divIzqSup'></div>
                        <div className='divIzqInf'></div>
                        <div className='divDerSup'></div>
                        <div className='divDerInf'></div>
                        <form className='form' onSubmit={(e) => submitGame(e, text)}>
                            <div className='formSup'>
                                <div className='columLabel'>
                                    <label className='textLabel'>Nombre</label>
                                    <input
                                        className='inputSup'
                                        placeholder='Ingrese un nombre'
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                        value={text.name}
                                    />
                                </div>
                                <div className='columLabel'>
                                    <label className='textLabel'>Background</label>
                                    <input
                                        placeholder='Ingrese link de imagen'
                                        className='inputSup'
                                        type='text'
                                        name='background_image'
                                        onChange={handleChange}
                                        value={text.background_image}
                                    />
                                </div>
                                <div className='columLabel'>
                                    <label className='textLabel'>Rating</label>
                                    <input
                                        placeholder='Ingrese un rating'
                                        className='inputSup'
                                        type='text'
                                        name='rating'
                                        onChange={handleChange}
                                        value={text.rating}
                                    />
                                </div>
                                <div className='columLabel'>
                                    <label className='textLabel'>Released</label>
                                    <input
                                        className='inputSup'
                                        type='date'
                                        name='released'
                                        onChange={handleChange}
                                        value={text.released}
                                    />
                                </div>
                            </div>
                            <div className='formInf'>
                                <div className='columLabel'>
                                    <label className='textLabel'>Descripcion</label>
                                    <textarea
                                        placeholder='Ingrese la descripcion'
                                        className='textAreaCreate'
                                        type='text'
                                        name='description_raw'
                                        onChange={handleChange}
                                        value={text.description_raw}
                                    />
                                </div>
                                <div className='rowLabel'>
                                    <div className='columLabel'>
                                        <label className='textLabel'>Plataformas</label>
                                        <select className='selectCrear' onChange={handleChange} name="platforms">
                                            {platforms?.map((ele, ubi) => <option className='optionCrear' key={ubi} value={ele}>{ele}</option>)}
                                        </select>
                                        <div className='containerSeleccion'>
                                            {
                                                text.platforms.length ?
                                                    <div className='containerSelecciones'>
                                                        {
                                                            text.platforms.map((plat, ubi) => {
                                                                return (
                                                                    <div key={ubi} className='containerSelecPlat'>
                                                                        <span className='textSelecPlat'>{plat}</span>
                                                                        <button className='btnSelecPlat' onClick={() => deletePlat(plat)}>X</button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className='containerTextNo'>
                                                        <span className='textGenNo'>No eligio ninguna plataforma.</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='columLabel'>
                                        <label className='textLabel'>Generos</label>
                                        <select className='selectCrear' onChange={handleChange} name="genres">
                                            {generos?.map((ele, ubi) => <option key={ubi} className='optionCrear'>{ele}</option>)}
                                        </select>
                                        <div className='containerSeleccion'>
                                            {
                                                text.genres.length ?
                                                    <div className='containerSelecciones'>
                                                        {
                                                            text.genres.map((gen, ubi) => {
                                                                return (
                                                                    <div key={ubi} className='containerSelecPlat'>
                                                                        <span className='textSelecPlat'>{gen}</span>
                                                                        <button className='btnSelecPlat' onClick={() => deleteGen(gen)}>X</button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className='containerTextNo'>
                                                        <span className='textGenNo'>No eligio ningun genero.</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='btnCrear' type='submit'>Crear</button>
                        </form>
                        <div className='containRequired'>
                            <p hidden={errorNombre.errors} className='pRequired'>Es obligatorio ingresar un nombre</p>
                            <p hidden={errorDescrip.errors} className='pRequired'>Es obligatorio ingresar una descripcion</p>
                            <p hidden={errorPlat.errors} className='pRequired'>Es obligatorio ingresar al menos una plataforma</p>
                            <p hidden={errorRating.errors} className='pRequired'>El valor del rating debe ser mayor a 0 y menor o igual a 5</p>
                            <p hidden={errorRepeatPlat.errors} className='pRequired'>No se pueden repetir plataformas</p>
                            <p hidden={errorRepeatGen.errors} className='pRequired'>No se pueden repetir generos</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default CreateGame;