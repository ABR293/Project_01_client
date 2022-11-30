import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'
import styles from '../styles/Player.module.sass'
import TrackProgress from './TrackProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { baseURL } from '../api'

let audio: any;

const Player:React.FC = () => {
//     const track = {_id: '1',
//     name: 'Track1',
//     artist: 'Rammstein',
//     text:'Sonne',
//     listens: 4,
//     picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg',
//     audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3',
//     comments:[]
// };
    const {
        currentTime,
        duration,
        active,
        volume,
        pause
    } = useTypedSelector(state => state.player)
    const {
        playTrack,
        pauseTarack,
        setVolume,setCurrentTime,
        setDuration,
        setActiveTrack,
    } = useActions();

    useEffect(() =>{
        if(!audio){
            audio = new Audio();
        } else {
            setAudio();
            audio.play()
        }
    }, [active]);

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

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = +e.target.value;
            audio.volume = value / 100;
            setVolume(value)
    }
    const changeCuttentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = +e.target.value;
            audio.currentTime = value ;
            setCurrentTime(value)
    } 

    if(!active){
        return null
    }
    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                { pause
                    ? <PlayArrow /> 
                    : <Pause />
                }
            </IconButton>
            <Grid direction='column'>
                <h4>{active?.name}</h4>
                <h5>{active?.artist}</h5>
            </Grid>
            <TrackProgress 
                left={currentTime} 
                right={duration}
                onChange={changeCuttentTime}
            />
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress 
                left={volume} 
                right={100} 
                onChange={changeVolume}
            />
        </div>
          
        // <Grid container direction='column'>
        //     <Box>
        //         {tracks.map(track => 
        //             <TrackItem key={track._id} track={track}/>
        //         )}
        //     </Box>
        // </Grid>
    )
}

export default Player