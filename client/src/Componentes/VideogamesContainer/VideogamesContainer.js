import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres } from '../../redux/actions'
import { useEffect } from 'react';
import VideoGames from '../Videogames/Videogames.js'

const VideogamesContainer = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [])
    return (
        <VideoGames />
    )
}

export default VideogamesContainer;