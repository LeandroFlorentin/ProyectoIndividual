import { GET_VIDEOGAMES, GET_GENRES } from "../actions";

const initialState = {
    videoGames: [],
    genres: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;