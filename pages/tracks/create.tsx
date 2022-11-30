import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import FileUploader from '../../components/FileUploader';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import styles from '../../styles/create.module.sass';

const Create = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);

    const next = () => {
        setActiveStep(prew => prew+1)
    }
    const back = () => {
        setActiveStep(prew => prew-1)
    }
    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}> 
                {activeStep === 0 && 
                    <Grid container flexDirection='column' className={styles.container}>
                        <TextField className={styles.input} label={'Название трека'}/>
                        <TextField className={styles.input} label={'Исполнитель'}/>
                        <TextField className={styles.input}label={'Слова песни'}/>
                    </Grid>
                }
                {activeStep === 1 &&
                    <div>
                        <FileUploader setFile={setPicture} accept='image/*' >
                            <Button>Загрузите обложку</Button>
                        </FileUploader>
                    </div>
                }
                {activeStep === 2 &&  
                    <div>
                        <FileUploader setFile={setAudio} accept='audio/*' >
                            <Button>Загрузите аудио</Button>
                        </FileUploader>
                    </div>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back} >Назад</Button>
                <Button disabled={activeStep === 3} onClick={next} >Вперед</Button> 
            </Grid>
        </MainLayout>

    )
}


export default Create