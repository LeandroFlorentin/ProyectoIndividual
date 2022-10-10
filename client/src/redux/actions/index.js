import axios from "axios";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getVideogames = () => async (dispatch) => {
    return await axios.get('http://localhost:3001/videogames')
        .then(array => dispatch({ type: GET_VIDEOGAMES, payload: array.data }))
}