import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGame, getVideogames } from '../../redux/actions'

const CreateGame = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.videoGames)
    let generos = [...new Set(state.map(ele => ele.genres).flat())]
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
        if (!text.name.length) console.log("nombre vacio")
        else if (!text.description_raw.length) console.log("descipcion vacia")
        else if (!text.platforms.length) console.log("Sin plataformas")
        else if (text.rating < 0 && text.rating > 5) console.log("Rating fuera de rango")
        else if (!text.genres.length) console.log("Necesita introducir generos")
        else {
            dispatch(createGame(text))
            console.log("creado")
        }
    }

    useEffect(() => {
        dispatch(getVideogames())
    }, [])

    return (
        <div>
            <form onSubmit={(e) => submitGame(e, text)}>
                <label>Nombre</label>
                <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={text.name}
                />
                <label>Background</label>
                <input
                    type='text'
                    name='background_image'
                    onChange={handleChange}
                    value={text.background_image}
                />
                <label>Plataformas</label>
                <select onChange={handleChange} name="platforms">
                    {platforms?.map(ele => <option value={ele}>{ele}</option>)}
                </select>
                <label>Generos</label>
                <select onChange={handleChange} name="genres">
                    {generos?.map(ele => <option>{ele}</option>)}
                </select>
                <label>Rating</label>
                <input
                    type='text'
                    name='rating'
                    onChange={handleChange}
                    value={text.rating}
                />
                <label>Released</label>
                <input
                    type='text'
                    name='released'
                    onChange={handleChange}
                    value={text.released}
                />
                <label>Descripcion</label>
                <textarea
                    type='text'
                    name='description_raw'
                    onChange={handleChange}
                    value={text.description_raw}
                />
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default CreateGame;