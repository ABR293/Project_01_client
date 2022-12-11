import React from 'react';
import { Grid, Typography, Slider, Input, makeStyles, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeDown, VolumeMute, VolumeOff, VolumeUp } from '@mui/icons-material'


type InputSliderProps = {
  onChange: Function
  toggleSound: Function
  isSoundOn: boolean
  volume: number
}
export default function InputSlider(props:InputSliderProps) {

  const {onChange, toggleSound, isSoundOn, volume} = props
  const [value, setValue] = React.useState<number | string | Array<number | string>>(volume);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
    onChange(newValue)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  // console.log(2, isSoundOn)
  return (
    <div style={{width: 250}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={() => toggleSound(!isSoundOn)}>
                  { isSoundOn
                        ?  
                        <>
                          {value === 0 && <VolumeMute />}
                          {value !== 0 && value < 50 && <VolumeDown />}
                          {value > 50 && <VolumeUp />}
                        </> 
                        : 
                        <VolumeOff />
                         
                  }
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            // className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}