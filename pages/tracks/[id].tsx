import { Box } from '@mui/system'
import React from 'react'
import { IComment, ITrack } from '../../types/tracks'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import { Button, Grid, TextField } from '@mui/material';

interface ITrackPageProps {
    track: ITrack;
}
const TrackPage:React.FC = () => {
    const track =  {_id: '1', name: 'Track1', artist: 'Rammstein', text:'Sonne', listens: 4, picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg', audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3', comments:[]};
    const router = useRouter()
    return (
        <MainLayout>
            <Button 
                onClick={() => router.push('/tracks')}
                variant='outlined'
                >
                К списку
            </Button>
            <Grid container >
                <img src={track.picture} width={200} height={200}/>
                <div>
                    <h1>{track.name}</h1>
                    <h1>{track.artist}</h1>
                    <h1>{track.listens}</h1>
                </div>
            </Grid>
            <h1>Текст песни </h1>
            <p>{track.text}</p>
            <Grid container>
                <TextField 
                    label='Ваше имя'
                    fullWidth
                />
                <TextField 
                    label='Комментарий'
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button>Отправить</Button>
            </Grid>
            {/* <div>
                {track.comments.map(comment =>
                    <div key={comment._id}>
                        <h4>Автор - {comment.username}</h4>
                        <p>Комментарий - {comment.text}</p>
                    </div>
                )}
            </div> */}
        </MainLayout>
        // <>TrackPage</>
        // <Card className={styles.track} onClick={() => router.push('/tracks/'+ track._id)}>
        //     {/* {track.name} */}
        //     <IconButton>
        //         { active
        //             ? <Pause/>
        //             : <PlayArrow/>
        //         }
        //     </IconButton>
        //     <img width={70} height={70} src={track.picture} alt='нет изображения'/>
        //     <Box p={1}>
        //         <Grid direction='column'>
        //             <h3>{track.name}</h3>
        //             <h4>{track.artist}</h4>
        //         </Grid>
        //     </Box>
        //     <IconButton>
        //         <Delete />
        //     </IconButton>
            

        // </Card>
    )
}

export default TrackPage