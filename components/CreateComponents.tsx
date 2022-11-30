import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'
import styles from '../styles/CreateContainer.module.sass';

interface CreateContainerProps {
    children: JSX.Element
}
export const CreateContainer:React.FC<CreateContainerProps> = ({children}) => {
    return (
        <Grid container direction='column' className={styles.container}>
            {children}
        </Grid>
    )
}

export default CreateContainer