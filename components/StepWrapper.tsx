import { Box } from "@mui/system";
import React from "react";
import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";

interface IStepWrapperProps {
  activeStep: number;
  children?: React.ReactNode;
}
const steps = ["Информация о треке", "Загрузите обложку", "Загрузите трек"];
const StepWrapper: React.FC<IStepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={i} completed={activeStep > i}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 270 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
