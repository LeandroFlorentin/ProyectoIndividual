import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres } from '../../redux/actions'
import { useEffect } from 'react';
import VideoGames from '../Videogames/Videogames.js'

const VideogamesContainer = () => {
    const dispatch = useDispatch()
    const { videoGames, videoGameActu } = useSelector(state => state)

    useEffect(() => {
        if (videoGames.length === videoGameActu.length) {
            dispatch(getVideogames())
            dispatch(getGenres())
        }
    }, [])
    return (
        <VideoGames />
    )
}

export default VideogamesContainer;