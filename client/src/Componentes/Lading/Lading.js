import React from 'react'
import './Lading.css'
import img from '../../img/lading.jpg'
import { useHistory } from 'react-router-dom'

const Lading = () => {
    const history = useHistory()

    const navigateToGames = () => {
        history.push('/videogames')
    }
    return (
        <div className='containerDivImg'>
            <div className='divImgLad'>
                <div className='containerMovi'>
                    <h1 className='tituloLad' onClick={navigateToGames}>PROYECTO INDIVIDUAL VIDEOGAMES</h1>
                    <h1 className='nombreLad' onClick={navigateToGames}>Florentín Leandro</h1>
                </div>
                <button className='botonLad' onClick={navigateToGames}>Inicio de la pagina</button>
                <img className='imgLad' src={img} alt='img' />
            </div>
        </div>
    )
}

export default Lading;