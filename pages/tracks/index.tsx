import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState, useTransition } from "react";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { store, wrapper } from "../../store";
import { ITrack } from "../../types/tracks";
import actionCreators from "../../store/actionCreators";
// import {store} from '../../store';
import { END } from "redux-saga";
import { GetServerSideProps } from "next";
import { useActions } from "../../hooks/useActions";
import { useInput } from "../../hooks/useInput";

// import { Store } from 'redux'

const Index = () => {
  const router = useRouter();

  const { error, tracks } = useTypedSelector((state) => state.tracks);

  const { getTracks } = useActions();
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (tracks.length === 0) {
      getTracks();
    }
  }, []);

  //   const { getTracks } = useActions();
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: "80%" }}>
          <Box p={2}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button
                onClick={() => {
                  router.push("/tracks/create");
                }}
              >
                Загрузить
              </Button>
            </Grid>
          </Box>
        </Card>
        <TextField
          fullWidth
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            if (timer) {
              clearTimeout(timer);
            }
            setTimer(setTimeout(() => getTracks(e.target.value), 500));
          }}
        />
      </Grid>
      <TrackList tracks={tracks} />
    </MainLayout>
  );
};

export default Index;

// export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
//      // regular stuff
//   store.dispatch(actionCreators.getTracks(''));
//   // end the saga
//   store.dispatch(END);
//   await store.sagaTask.toPromise();
// })
