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

// import { Store } from 'redux'

const Index = () => {
    const router = useRouter();

    const state = useTypedSelector(state => state)
    console.log('state', state);
    const {error, tracks} = state.tracks;

   // const tracks: ITrack [] = [
    //     {_id: '1', name: 'Track1', artist: 'Rammstein', text:'Sonne', listens: 4, picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg', audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3', comments:[]},
    //     {_id: '2', name: 'Track2', artist: 'Till Lindeman', text:'Aaaaa', listens: 4, picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg', audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3', comments:[]},
    //     {_id: '3', name: 'Track3', artist: 'Rammstein', text:'HEYYY', listens: 4, picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg', audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3', comments:[]},
    // ]

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
     // regular stuff
  store.dispatch(actionCreators.fetchTracks());
  // end the saga
  store.dispatch(END);
  await store.sagaTask.toPromise();
})
