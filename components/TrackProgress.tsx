import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'

interface ITrackProgressProps {
    left: number
    right: number
    onChange: (e:any) => void
}
const TrackProgress:React.FC<ITrackProgressProps> = ({left, right, onChange}) => {
    return (
        <div style={{display: 'flex'}}>
            <input 
                type='range'
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    )
}

export default TrackProgress