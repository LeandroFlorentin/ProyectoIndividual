import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getGame } from '../../redux/actions';
import VideoGame from '../VideoGame/VideoGame';

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