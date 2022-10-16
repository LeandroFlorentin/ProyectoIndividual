import { GET_VIDEOGAMES, GET_GENRES, GET_GAME, FILTER, CLEAR_GAME } from "../actions";

const initialState = {
    videoGames: [],
    genres: [],
    game: {},
    videoGameActu: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: action.payload,
                videoGameActu: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: [...action.payload]
            }
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            }
        case FILTER:
            return {
                ...state,
                videoGameActu: [...action.payload]
            }
        case CLEAR_GAME:
            return {
                ...state,
                game: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;