import { Card, Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../types/tracks'
import styles from '../styles/TrackItem.module.sass'
import { Add, Delete, HdrPlus, Pause, PlayArrow, PlusOne } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useActions } from '../hooks/useActions'
import { baseURL } from '../api'
import { useTypedSelector } from '../hooks/useTypedSelector'
import TrackProgress from './TrackProgress'

interface ITrackItemProps {
    track: ITrack;
    active?: boolean 
}
const TrackItem:React.FC<ITrackItemProps> = ({track}) => {
    const {playTrack, pauseTarack, setActiveTrack, setCurrentTime} = useActions();

    const {
        currentTime,
        duration,
        active,
        pause,
    } = useTypedSelector(state => state.player) 


    const isActive = active?._id === track._id

    const play = (e:React.MouseEvent) => {
        // e.stopPropagation()
        if (!isActive) {
            setActiveTrack(track);
            playTrack()
        } else {
            if(pause){
                playTrack()
            } else {
                pauseTarack()
            }
        }
        
    }

    return (
        <Card className={styles.track} onClick={() => {}}>
            <IconButton onClick={play}>
                {   isActive && !pause
                    ?  <Pause/>
                    :  <PlayArrow/>
                }
            </IconButton>
            <img width={60} height={60} src={`${baseURL}${track.picture}`} alt=''/>
            <Box>
                <Grid container direction='column'>
                    <h3>{track.name}</h3>
                    <h5>{track.artist}</h5>
                </Grid>
            </Box>
            <Box m={5}>
                { isActive && <TrackProgress 
                    left={currentTime} 
                    right={duration}
                    onChange={setCurrentTime}
                />}
            </Box>
            <IconButton onClick={()=>{}}>
                <Add/>
            </IconButton>
            

        </Card>
    )
}

export default TrackItem