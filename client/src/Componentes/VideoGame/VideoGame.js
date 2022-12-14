import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './VideoGame.css'
import { clearGame } from '../../redux/actions';
import anterior from '../../img/anterior.png'
import Cargando from '../Cargando/Cargando.js'
import img from '../../img/nohayimage.jpg'

const VideoGame = () => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(true)
    const state = useSelector(state => state.game)
    const history = useHistory()
    const navigateToGames = () => {
        dispatch(clearGame())
        history.push(`/videogames`)
    }

    useEffect(() => {
        state.name && setLoad(false)
    }, [state])

    return (
        <>
            {
                load ?
                    <Cargando />
                    :
                    <>
                        <div className='containerGameUniGlo'>
                            <div className='containerGameUni'>
                                <img className='anteriorDetail' src={anterior} alt='img' onClick={navigateToGames} />
                                <div className='divIzqImg'>
                                    <img className={state.background_image.length ? 'imgJuego' : 'imgNot'} src={state.background_image.length ? state.background_image : img} />
                                    <div className='containerRaRe'>
                                        <h3>Rating: {state.rating ? state.rating : "no hay rating"}</h3>
                                        <h3>Released: {state.released?.length ? state.released : "No hay fecha de lanzamiento"}</h3>
                                    </div>
                                </div>
                                <div className='divDerText'>
                                    <div className='h3Contain'>
                                        <h3 className='h3Titulo'>{state.name}</h3>
                                    </div>
                                    <div className='containerGeneros'>
                                        <h4 className='tituloGen'>Genres: </h4>
                                        {
                                            typeof state.id === "string" ?
                                                state.Generos.length ? state.Generos?.map((ele, ubi) => <h5 key={ubi} className='h5Descrip'>{ele.nombre}</h5>) : <h5 className='h5Descrip'>Sin generos</h5>
                                                :
                                                state.genres.length ? state.genres?.map((ele, ubi) => <h5 key={ubi} className='h5Descrip'>{ele}</h5>) : <h5 className='h5Descrip'>Sin generos</h5>
                                        }
                                    </div>
                                    <div className='containerPlat'>
                                        <h4 className='tituloGen'>Platforms: </h4>
                                        {state.platforms?.map((ele, ubi) => <h5 key={ubi} className='h5Descrip'>{ele}</h5>)}
                                    </div>
                                    <div className='containerDescrip'>
                                        <h4 className='tituloDes'>Description</h4>
                                        <p className='pDescrip'>{state.description_raw}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default VideoGame;