import { Card, Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../types/tracks'
import styles from '../styles/TrackItem.module.sass'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useActions } from '../hooks/useActions'
import { baseURL } from '../api'

interface ITrackItemProps {
    track: ITrack;
    active?: boolean 
}
const TrackItem:React.FC<ITrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTarack, setActiveTrack} = useActions();

    const play = (e:React.MouseEvent) => {
        e.stopPropagation()
        setActiveTrack(track);
        playTrack()
    }

    const pause = (e:React.MouseEvent) => {
        e.stopPropagation()
        pauseTarack()
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/'+ track._id)}>
            {/* {track.name} */}
            <IconButton onClick={play}>
                { active
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={`${baseURL}${track.picture}`} alt='нет изображения'/>
            <Box p={1}>
                <Grid container direction='column'>
                    <h3>{track.name}</h3>
                    <h4>{track.artist}</h4>
                </Grid>
            </Box>
            <IconButton onClick={pause}>
                <Delete />
            </IconButton>
            

        </Card>
    )
}

export default TrackItem