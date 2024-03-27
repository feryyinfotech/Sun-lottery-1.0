import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgbackgrad, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';
import Giftimg from '../../../assets/images/gift-removebg-preview.png'
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginPassword() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const [showoldPassword, setShowoldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [show_confirm_password, set_show_confirm_password] =
    React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowoldPassword = () => setShowoldPassword((show) => !show);
  const handle_confirm_ClickShowPassword = () =>
    set_show_confirm_password(!show_confirm_password);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Layout>
      <Container sx={style.container}>
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => goBack()}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">Change login passwords</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ width: '95%', marginLeft: '2.5%', background: zubgback, borderRadius: '10px', padding: '10px', mt: '10px', }}>
          <Box mt={2} component='form'>
            <Box mt={2}>

              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">Old password</Typography>
                </Stack>
                <OutlinedInput
                  placeholder="Enter password"
                  name="password"
                  className="loginfieldspass"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowoldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showoldPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box mt={2}>

              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">Set new password</Typography>
                </Stack>
                <OutlinedInput
                  placeholder="Enter new password"
                  name="password"
                  className="loginfieldspass"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">Confirm new password</Typography>
                </Stack>
                <OutlinedInput
                  className="loginfieldspass"
                  name="confirmed_password"
                  placeholder="Enter new confirm password"
                  type={show_confirm_password ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handle_confirm_ClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show_confirm_password ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Button sx={style.paytmbtntwo}>Change Password </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPassword;


export const style = {
  container: { background: zubgback, width: '100%', height: '100vh', overflow: 'auto', },
  header: {
    padding: '15px 8px',
    background: zubgback,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > p': {
      fontSize: '20px',
      fontWeight: '600',
      textAlign: 'center',
      color: 'white',
    },
    '& > a > svg': {
      color: 'white',
      fontSize: '35px'
    }
  },
  notificationBox: {
    width: '95%', marginLeft: '2.5%', borderRadius: '10px', background: zubgmid, padding: '10px', mt: '10px',
    '&>div>div>p': { color: 'white', fontSize: '14px', marginLeft: '10px', fontWeight: '500', },
    '&>p': { color: 'white', fontSize: '13px', marginLeft: '0px', fontWeight: '500', mt: '10px', },
    '&>div>div>svg': { color: 'white', fontSize: '24px', }, '&>div>svg': { color: 'white', fontSize: '24px', },
  },
  notificationStack: { alignItems: 'center', justifyContent: 'space-between', },
  paytmbtntwo: { borderRadius: '5px', textTransform: 'capitalize', mb: 2, background: zubgmid, color: 'white !important', width: '100%', mt: '20px', border: "1px solid white", padding: '10px', '&:hover': { background: zubgbackgrad, border: "1px solid transparent", } },

};
