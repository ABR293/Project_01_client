import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'

interface ITrackListProps {
    tracks: ITrack[]
}
const TrackList:React.FC<ITrackListProps> = ({tracks}) => {
    return (
        <Grid container direction='column'>
            <Box>
                {tracks.map(track => 
                    <TrackItem key={track._id} track={track}/>
                )}
            </Box>
        </Grid>
    )
}

export default TrackList