import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useTransition } from 'react'
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { wrapper } from '../../store';
import { ITrack } from '../../types/tracks';
import actionCreators from '../../store/actionCreators';
// import {store} from '../../store';
import {END} from 'redux-saga';
import { GetServerSideProps } from 'next';

// import { Store } from 'redux'

const Index = () => {
    const router = useRouter();

    const state = useTypedSelector(state => state)
    const {error, tracks} = state.tracks;

    if(error){
        return <MainLayout><h1>{error}</h1></MainLayout>
    }

    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{width: '80%'}}>
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => {router.push('/tracks/create')}}>Загрузить</Button>
                        </Grid>
                    </Box>
                    
                </Card>
            </Grid>
            <TrackList tracks={tracks} /> 
        </MainLayout>

    )
}

export default Index

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
     // regular stuff
  store.dispatch(actionCreators.fetchTracks());
  // end the saga
  store.dispatch(END);
  await store.sagaTask.toPromise();
})
