import React from 'react'
import { useSelector } from 'react-redux'

const VideoGame = () => {
    const state = useSelector(state => state.game)
    console.log(state)
    return (
        <div>
            <h3>{state.name}</h3>
            <img src={state.background_image} style={{ width: "600px", height: "auto" }} />
            {state.genres?.map(ele => <h5>{ele}</h5>)}
            {state.platforms?.map(ele => <h5>{ele}</h5>)}
            <p>{state.description_raw}</p>
        </div>
    )
}

export default VideoGame;