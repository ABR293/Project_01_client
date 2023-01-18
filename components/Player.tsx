import { Pause, PlayArrow } from "@mui/icons-material";
import { Grid, IconButton, Slide } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Player.module.sass";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import VolumeVidjet from "./VolumeVidjet";
import { baseURL } from "../api/apiConfig";

let audio: HTMLAudioElement;
const Player: React.FC = () => {
  const { currentTime, duration, active, volume, pause, isSoundOn } =
    useTypedSelector((state) => state.player);
  const {
    playTrack,
    pauseTarack,
    setVolume,
    setCurrentTime,
    setDuration,
    toggleSound,
  } = useActions();

  const setAudio = () => {
    if (active) {
      audio.src = `${baseURL}${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      !pause && playTrack();
      !pause && audio.play();
    }
  }, [active]);

  useEffect(() => {
    pause ? audio.pause() : audio.play();
  }, [pause]);

  useEffect(() => {
    if (Math.abs(audio.currentTime - currentTime) > 2) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTarack();
      audio.pause();
    }
  };

  const changeVolume = (value: number) => {
    if (isSoundOn) {
      audio.volume = value / 100;
    }
    setVolume(value);
  };
  const toggleVolume = (val: boolean) => {
    toggleSound(val);
    audio.volume = val ? volume / 100 : 0;
  };
  const changeCuttentTime = (value: number) => {
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Slide
      in={!!active}
      direction="up"
      style={{ transitionDuration: "1000ms" }}
      data-testid="Player"
    >
      <div className={styles.container}>
        <div className={styles.block}>
          <IconButton onClick={play}>
            {pause ? <PlayArrow /> : <Pause />}
          </IconButton>
          <Grid container direction="column">
            <h3>{active?.name}</h3>
            <h5>{active?.artist}</h5>
          </Grid>
        </div>
        <TrackProgress
          left={currentTime}
          right={duration}
          onChange={changeCuttentTime}
        />
        <VolumeVidjet
          onChange={changeVolume}
          toggleSound={toggleVolume}
          isSoundOn={isSoundOn}
          volume={volume}
        />
      </div>
    </Slide>
  );
};

export default Player;
