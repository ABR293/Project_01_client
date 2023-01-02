import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormValidation } from '../hooks/useFormValidation';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const theme = createTheme();

interface ISignInProps {
  onChangeReg: Function
}

const SignUp:React.FC<ISignInProps> = ({onChangeReg}) => {

  const {registrationUser} = useActions()
  const {error, loading} = useTypedSelector(state => state.auth)
  const validation = useFormValidation();
  const [showErr, setShowErr] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let  data = new FormData(event.currentTarget);
    validation.validate(data, async() => {
      try { 
        registrationUser(data)
      }catch(err){
        console.log(err)
  
      }
    })
    setShowErr(true)
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!validation.errors.login}
                  helperText={validation.errors.login}
                  required
                  fullWidth
                  id="login"
                  label="Email Address"
                  name="login"
                  autoComplete="email"
                  onFocus={() => setShowErr(false)}

                />
              </Grid>
              {/* <Typography variant="caption" >Enter the password</Typography> */}
              <Grid item xs={12}>
                <TextField
                  error={!!validation.errors.password}
                  helperText={validation.errors.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onFocus={() => setShowErr(false)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   error={!!validation.errors.passwordRepeat}
                   helperText={validation.errors.passwordRepeat}
                  required
                  fullWidth
                  name="passwordRepeat"
                  label="Repeat password"
                  type="password"
                  id="passwordRepeat"
                  autoComplete="new-password"
                  onFocus={() => setShowErr(false)}

                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
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
                  >Sign Up</Box>}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => onChangeReg()}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp