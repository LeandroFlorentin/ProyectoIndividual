import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './VideoGame.css'
import anterior from '../../img/anterior.png'

const VideoGame = () => {
    const history = useHistory()
    const navigateToGames = () => {
        history.push(`/videogames`)
    }

    const state = useSelector(state => state.game)

    return (
        <>
            <div className='containerGameUni'>
                <img className='anteriorDetail' src={anterior} alt='img' onClick={navigateToGames} />
                <div className='divIzqImg'>
                    <img className='imgJuego' src={state.background_image} />
                </div>
                <div className='divDerText'>
                    <h3 className='h3Titulo'>{state.name}</h3>
                    <div className='containerGeneros'>
                        <h4 className='tituloGen'>Genres: </h4>
                        {state.genres?.map(ele => <h5 className='h5Descrip'>{ele}</h5>)}
                    </div>
                    <div className='containerPlat'>
                        <h4 className='tituloGen'>Platforms: </h4>
                        {state.platforms?.map(ele => <h5 className='h5Descrip'>{ele}</h5>)}
                    </div>
                    <div className='containerDescrip'>
                        <h4 className='tituloDes'>Description</h4>
                        <p className='pDescrip'>{state.description_raw}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoGame;