import * as React from 'react';
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CircularProgress } from '@mui/material';
const theme = createTheme();

interface ISignInProps {
  onChangeReg: Function
}


const SignIn:React.FC<ISignInProps> = ({onChangeReg}) => {
  const {loginUser, } = useActions()
  const {error, loading} = useTypedSelector(state => state.auth)
  const [showErr, setShowErr] = useState(false);
  // const validation = useFormValidation()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser(data)
    setShowErr(true)

  };
  console.log('F_error', error)
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Email Address"
              name="login"
              autoComplete="email"
              autoFocus
              onFocus={() => setShowErr(false)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={() => setShowErr(false)}
            />
            <Box height={12}>
              <Typography color={'#c80000'}>
                {showErr ? error : ' '}
              </Typography>
            </Box>
            
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
                  >Sign In</Box>}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="auth/passwordReset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => onChangeReg()}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn