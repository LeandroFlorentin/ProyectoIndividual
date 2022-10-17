import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGame, getVideogames } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import './createGame.css'
import Cargando from '../Cargando/Cargando.js'

const CreateGame = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [load, setLoad] = useState(true)
    const state = useSelector(state => state.videoGames)
    const [errorNombre, setErrorNombre] = useState({ errors: true })
    const [errorDescrip, setErrorDescrip] = useState({ errors: true })
    const [errorPlat, setErrorPlat] = useState({ errors: true })
    const [errorRating, setErrorRating] = useState({ errors: true })
    let generos = [...new Set(state.map(ele => ele.genres).flat())]
    let platforms = [...new Set(state.map(ele => ele.platforms).flat())]
    console.log(errorNombre)
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
            setText({
                ...text,
                [e.target.name]: [...text[e.target.name], e.target.value]
            })
        }
        else {
            setText({
                ...text,
                [e.target.name]: e.target.value
            })
        }
    }

    const submitGame = (e, text) => {
        e.preventDefault()
        if (!text.name.length) setErrorNombre({ erros: false })
        else setErrorNombre({ errors: true })
        if (!text.description_raw.length) setErrorDescrip({ errors: false })
        else setErrorDescrip({ errors: true })
        if (!text.platforms.length) setErrorPlat({ errors: false })
        else setErrorPlat({ errors: true })
        if (Number(text.rating) > 0 && Number(text.rating) < 5) setErrorRating({ errors: false })
        else setErrorRating({ erros: true })
        if (text.name.length && text.description_raw.length && text.platforms.length && Number(text.rating) > 0 && Number(text.rating) < 5) {
            dispatch(createGame(text))
            alInicio()
            console.log("creado")
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
        dispatch(getVideogames())
        state.length && setLoad(false)
    }, [state, errorNombre])

    return (
        <>
            {
                load ?
                    <Cargando />
                    :
                    <div className='containerForm'>
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
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                        value={text.name}
                                    />
                                </div>
                                <div className='columLabel'>
                                    <label className='textLabel'>Background</label>
                                    <input
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
                                        type='text'
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
                                            {platforms?.map((ele, ubi) => <option key={ubi} value={ele}>{ele}</option>)}
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
                                            {generos?.map(ele => <option>{ele}</option>)}
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
                            <p hidden={errorDescrip.errors} className='pRequired'>Es boligatorio ingresar una descripcion</p>
                            <p hidden={errorPlat.errors} className='pRequired'>Es obligatorio ingresar al menos una plataforma</p>
                            <p hidden={errorRating.errors} className='pRequired'>El valor del rating debe ser mayor a 0 y menor a 5</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default CreateGame;