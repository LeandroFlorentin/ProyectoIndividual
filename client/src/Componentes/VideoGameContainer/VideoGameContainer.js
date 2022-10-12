import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getGame } from '../../redux/actions';
import VideoGame from '../VideoGame/VideoGame';
import { useDispatch } from 'react-redux';

const VideoGameContainer = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGame(id))
    }, [])
    return (
        <VideoGame />
    )
}

export default VideoGameContainer;