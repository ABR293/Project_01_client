import { Box } from "@mui/system";
import React, { useState } from "react";
import { IComment, ITrack } from "../../types/tracks";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import Api from "../../api";
import { useInput } from "../../hooks/useInput";
import { baseURL } from "../../api/apiConfig";

interface ITrackPageProps {
  serverTrack: ITrack;
}
const TrackPage: React.FC<ITrackPageProps> = ({ serverTrack }) => {
  // const track =  {_id: '1', name: 'Track1', artist: 'Rammstein', text:'Sonne', listens: 4, picture: 'http://localhost:4000/image/459d481c-9f25-43eb-8b78-6fd805356da0.jpeg', audio: 'http://localhost:4000/audio/a01cbead-da79-4051-a90c-c70a8fd5fb8b.mp3', comments:[]};

  const [track, setTrack] = useState(serverTrack);

  const router = useRouter();

  const userName = useInput("userName");
  const text = useInput("text");

  const addComment = async () => {
    try {
      const res = await Api.addComment({
        userName: userName.value as string,
        text: text.value as string,
        trackId: track._id as string,
      });
      setTrack({ ...track, comments: [...track.comments, res.data] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout title={`${track.name}-${track.artist}`}>
      <Button onClick={() => router.push("/tracks")} variant="outlined">
        К списку
      </Button>
      <Grid container>
        {/* eslint-disable-next-line*/}
        <img src={`${baseURL}${track.picture}`} width={200} height={200} />
        <div>
          <h1>{track.name}</h1>
          <h1>{track.artist}</h1>
          <h1>{track.listens}</h1>
        </div>
      </Grid>
      <h1>Текст песни </h1>
      <p>{track.text}</p>
      <Grid container>
        <TextField {...userName} label="Ваше имя" fullWidth />
        <TextField {...text} label="Комментарий" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <h4>Автор - {comment.userName}</h4>
            <p>Комментарий - {comment.text}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await Api.getTrack(params?.id);
  return {
    props: {
      serverTrack: res.data,
    },
  };
};
