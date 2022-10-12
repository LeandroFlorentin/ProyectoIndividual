import { GET_VIDEOGAMES, GET_GENRES, GET_GAME } from "../actions";

const initialState = {
    videoGames: [],
    genres: [],
    game: {}
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
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;