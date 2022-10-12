import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getGame } from '../../redux/actions';
import './VideoGameContainer.css'

const VideoGameContainer = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const state = useSelector(state => state.game)
    useEffect(() => {
        dispatch(getGame(id))
    }, [])
    return (
        <div>
            <h3>{state.name}</h3>
            <img src={state.background_image} alt='img' />
            <div>
                <h5>Generos</h5>
                <h5>{state.genres}</h5>
            </div>
            {/* <h5>Plataformas: {state.platforms}</h5> */}
        </div>
    )
}

export default VideoGameContainer;