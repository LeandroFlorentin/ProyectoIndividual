import axios from "axios";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME = 'GET_GAME';
export const FILTER = 'FILTER';
export const CLEAR_GAME = 'CLEAR_GAME';
export const DELETE_GAME = 'DELETE_GAME';

export const getVideogames = () => async (dispatch) => {
    return await axios.get('http://localhost:3001/videogames')
        .then(array => dispatch({ type: GET_VIDEOGAMES, payload: array.data }))
}

export const getGenres = () => async (dispatch) => {
    return await axios.get('http://localhost:3001/genres')
        .then(arrayGenres => dispatch({ type: GET_GENRES, payload: arrayGenres.data }))
}

export const getGame = (id) => async (dispatch) => {
    return await axios.get(`http://localhost:3001/videogames/${id}`)
        .then(juego => dispatch({ type: GET_GAME, payload: juego.data }))
}

export const createGame = (obj) => async () => {
    await axios.post('http://localhost:3001/videogames', obj)
}

export const buscarJuegos = (query) => async (dispatch) => {
    return await axios.get(`http://localhost:3001/videogames?name=${query}`)
        .then(arrayJuegos => dispatch({ type: GET_VIDEOGAMES, payload: arrayJuegos.data }))
}

export const filtrar = (arr) => (dispatch) => {
    return dispatch({ type: FILTER, payload: arr })
}

export const clearGame = () => (dispatch) => {
    return dispatch({ type: CLEAR_GAME, payload: {} })
}

export const eliminarJuego = (id) => async (dispatch) => {
    return await axios.delete(`http://localhost:3001/videogames/${id}`)
        .then(arrayNuevo => dispatch({ type: DELETE_GAME, payload: arrayNuevo.data }))
}