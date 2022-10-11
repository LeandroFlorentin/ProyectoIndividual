import axios from "axios";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';

export const getVideogames = () => async (dispatch) => {
    return await axios.get('http://localhost:3001/videogames')
        .then(array => dispatch({ type: GET_VIDEOGAMES, payload: array.data }))
}

export const getGenres = () => async (dispatch) => {
    return await axios.get('http://localhost:3001/genres')
        .then(arrayGenres => dispatch({ type: GET_GENRES, payload: arrayGenres.data }))
}