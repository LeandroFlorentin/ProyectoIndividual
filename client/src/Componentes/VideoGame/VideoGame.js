import React from 'react'
import { useSelector } from 'react-redux';

const VideoGame = () => {
    const state = useSelector(state => state.game)
    return (
        <div>
            <h3>{state.name}</h3>
            <img src={state.background_image} alt='img' />
            <div>
                <h5>Generos</h5>
                <h5>{state.genres}</h5>
            </div>
            <h5>Plataformas: {state.platforms}</h5>
            <h5>Rating: {state.rating}</h5>
            <h5>{state.released}</h5>
            <p>{state.description_raw}</p>
        </div>
    )
}

export default VideoGame;