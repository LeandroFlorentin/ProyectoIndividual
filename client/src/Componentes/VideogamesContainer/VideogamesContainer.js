import { useSelector, useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions'
import { useEffect } from 'react';
import VideoGames from '../Videogames/Videogames.js'

const VideogamesContainer = () => {
    const dispatch = useDispatch()
    const arrayCien = useSelector(state => state.videoGames)
    useEffect(() => {
        dispatch(getVideogames())
    }, [])
    return (
        <VideoGames arrayCien={arrayCien} />
    )
}

export default VideogamesContainer;