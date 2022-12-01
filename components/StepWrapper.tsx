import { Box } from '@mui/system'
import React from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/MainLayout'
import { Button, Card, Container, Grid, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { JsxElement } from 'typescript';

interface IStepWrapperProps {
    activeStep: number;
    children: JSX.Element
}
const steps=['Информация о треке', 'Загрузите обложку', 'Загрузите трек']
const StepWrapper:React.FC<IStepWrapperProps> = ({activeStep, children}) => {
    const router = useRouter()
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, i) => 
                    <Step 
                        key={i}
                        completed={ activeStep > i }
                    >
                        <StepLabel>

                        </StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent='center' style={{margin:'70px 0', height:270}} >
                <Card style={{width:600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    )
}

export default StepWrapper