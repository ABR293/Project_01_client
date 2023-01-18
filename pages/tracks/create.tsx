import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Api from "../../api";
import FileUploader from "../../components/FileUploader";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import styles from "../../styles/create.module.sass";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = async () => {
    if (activeStep !== 2) {
      setActiveStep((prew) => prew + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      picture && formData.append("picture", picture);
      audio && formData.append("audio", audio);
      setLoading(true);
      try {
        axios.post("http://localhost:4000/tracks", formData);
        await Api.createTrack(formData);
        setLoading(false);
        router.push("/tracks");
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  const back = () => {
    setActiveStep((prew) => prew - 1);
  };
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep} data-testid="create">
        {activeStep === 0 && (
          <Grid container flexDirection="column" className={styles.container}>
            <TextField
              {...name}
              className={styles.input}
              label={"Название трека"}
            />
            <TextField
              {...artist}
              className={styles.input}
              label={"Исполнитель"}
            />
            <TextField
              {...text}
              className={styles.input}
              label={"Слова песни"}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <div>
            <FileUploader setFile={setPicture} accept="image/*">
              <Button>Загрузите обложку</Button>
            </FileUploader>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <FileUploader setFile={setAudio} accept="audio/*">
              <Button>Загрузите аудио</Button>
            </FileUploader>
          </div>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button disabled={activeStep === 3} onClick={next}>
          Вперед
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
