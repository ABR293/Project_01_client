import { Pause, PlayArrow, VolumeUp, VolumeDown} from '@mui/icons-material'
import { Grid, IconButton, Slider} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'
import styles from '../styles/Player.module.sass'
import TrackProgress from './TrackProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { baseURL } from '../api'
import VolumeVidjet from './VolumeVidjet'
let audio: any;

const Player:React.FC = () => {

    const {
        currentTime,
        duration,
        active,
        volume,
        pause,
        isSoundOn,
    } = useTypedSelector(state => state.player)
    const {
        playTrack,
        pauseTarack,
        setVolume,setCurrentTime,
        setDuration,
        toggleSound,
    } = useActions();

    useEffect(() =>{
        console.log('Player', active)

        if(!audio){
            audio = new Audio();
        } else {
            setAudio()
            !pause && playTrack()
            !pause && audio.play()
        }
    }, [active]);

    useEffect(() =>{
            pause ? audio.pause() : audio.play()
    }, [pause]);

    useEffect(() =>{
        if(Math.abs(audio.currentTime - currentTime) > 2 ){
            audio.currentTime = currentTime
        }
    }, [currentTime]);

    const setAudio = () => {
        if(active){
            audio.src = `${baseURL}${active.audio}`
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if(pause){
            playTrack()
            audio.play()
        } else {
            pauseTarack()
            audio.pause()
        }
    }

    const changeVolume = (value: number ) => {
        if (isSoundOn){ 
            audio.volume = value / 100
        }
        setVolume(value)
    }
    const toggleVolume = (val:boolean) => {
            toggleSound(val)
            audio.volume = val ? volume / 100 : 0
    }
    const changeCuttentTime = (value:number) => {
            audio.currentTime = value ;
            setCurrentTime(value)
    } 

    if(!active){
        return null
    }
    return (
        <div className={styles.container}>
                <div className={styles.block}>
                    <IconButton onClick={play}>
                    { pause
                        ? <PlayArrow /> 
                        : <Pause />
                    }
                </IconButton>
                <Grid direction='column'>
                    <h3>{active?.name}</h3>
                    <h5>{active?.artist}</h5>
                </Grid>
                </div>
            <TrackProgress 
                left={currentTime} 
                right={duration}
                onChange={changeCuttentTime}
            />
            <VolumeVidjet 
                onChange={changeVolume} 
                toggleSound={toggleVolume} 
                isSoundOn={isSoundOn}
                volume={volume}
            />
        </div>
          
    )
}

export default Player
