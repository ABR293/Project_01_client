import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Api from '../api';
import { useRouter } from 'next/router';
import { useFormValidation } from '../hooks/useFormValidation';
import { useState } from 'react';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import { AccordionSummary, AccordionDetails} from '@mui/material';
import { styled } from '@mui/material/styles';
const theme = createTheme();

const SignIn:React.FC = () => {

    const validation = useFormValidation();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState<string | null>(null)
    const router = useRouter()

    const submitAxiosError = (err:any) => {
        if (err instanceof AxiosError) {
            const message:string = err?.response?.data?.message
            setError(message)
            setLoading(false)
        } else {
            console.log(err)
        }
    }

    const handleSubmitMail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const L_data = new FormData(event.currentTarget);
        validation.validate(L_data, async ()=> {
            try {
                setLoading(true)
                const res = await Api.fogotPassword(L_data.get('login') as string)
                setLogin(res.data.response)
                setLoading(false)
            } catch(err) {
                submitAxiosError(err)
            }
        })
    };
    const handleSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const P_data = new FormData(event.currentTarget);
    validation.validate(P_data, async ()=> {
          P_data.append('login', login as string)
          P_data.delete('passwordRepeat')
        try {
            setLoading(true)
            const res = await Api.resetPassword(P_data)
            setLoading(false)
            router.push('./')
        } catch(err){
            submitAxiosError(err)
        }
    })
   
    const data = new FormData(event.currentTarget);

  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Your Password
          </Typography>
            <Accordion expanded={!login}>
                <div hidden={true}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"></AccordionSummary>
                </div>
                <AccordionDetails>
                    <Box component="form" onSubmit={handleSubmitMail} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={!!validation.errors.login}
                        helperText={validation.errors.login}
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Email Address"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        onFocus={() => setError(null)}
                    /> 
                    <Typography color={'#c80000'}>
                        {error ? error : ' '}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    {loading ? <CircularProgress/> 
                    : <Box height={40} padding={1}
                    >Send e-mail With secret code</Box>}
                    </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={!!login}>
                <div hidden={true}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"></AccordionSummary>
                </div>
                <AccordionDetails>
                    <Box component="form" onSubmit={handleSubmitPassword} noValidate sx={{ mt: 1 }}>
                    <h1>{login}</h1>
                    <Typography>
                        Sdcret Code was sended On your e-mail
                    </Typography>
                    <TextField
                        error={!!validation.errors.password}
                        helperText={validation.errors.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onFocus={() => setError(null)}

                    />
                    <TextField
                        error={!!validation.errors.passwordRepeat}
                        helperText={validation.errors.passwordRepeat}
                        margin="normal"
                        required
                        fullWidth
                        name="passwordRepeat"
                        label="Repear password"
                        type="password"
                        id="passwordRepeat"
                        autoComplete="current-password"
                        onFocus={() => setError(null)}

                    />
                    <TextField
                        error={!!validation.errors.secretCode}
                        helperText={validation.errors.secretCode}
                        margin="normal"
                        required
                        fullWidth
                        id="secretCode"
                        label="Secret Code"
                        name="secretCode"
                        autoComplete="email"
                        autoFocus
                        onFocus={() => setError(null)}
                    />
                    <Typography color={'#c80000'}>
                        {error ? error : ' '}
                    </Typography>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    {loading 
                        ? <CircularProgress/> 
                        : <Box height={40} 
                            padding={1}
                        >Reset Password Up</Box>}
                    </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    border: `0px`,
    '&:before': {
      display: 'none',
    },
  }));

export default SignIn





import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { Router } from '@mui/icons-material';
import { AxiosError } from 'axios';

export function CircularIntegration() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}



