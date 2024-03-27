import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, Button, Container, FormControl, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgbackgrad, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';
import Giftimg from '../../../assets/images/gift-removebg-preview.png'

function Gift() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container sx={style.container}>
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => goBack()}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">Gift</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ width: '95%', marginLeft: '2.5%', background: zubgmid, borderRadius: '10px', padding: '10px', mt: '10px', }}>
          <Box component={'img'} src={Giftimg} sx={{ width: '100%', height: '23 vh' }}></Box>
        </Box>
        <Box sx={{ width: '95%', marginLeft: '2.5%', background: zubgmid, borderRadius: '10px', padding: '10px', mt: '10px', }}>
          <Typography variant="body1" color="initial" className="loginlabel">Hi</Typography>
          <Typography variant="body1" color="initial" className="loginlabel">We have a gift for you</Typography>
          <Box mt={2} component='form'>
            <FormControl fullWidth sx={{ mt: '10px' }}>
              <Stack direction="row" className="loginlabel">
                <Typography variant="h3">Please enter the gift code below *</Typography>
              </Stack>
              <TextField id="mob" name="mob" type="mobile" placeholder="Please enter gift code *" className="withdrawalfield" />
            </FormControl>
            <Button sx={style.paytmbtntwo}>Withdrawal </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Gift;


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
    '&>p': { color: 'white', fontSize: '13px', marginLeft: '0px', fontWeight: '500', mt: '20px', },
    '&>div>div>svg': { color: 'white', fontSize: '24px', }, '&>div>svg': { color: 'white', fontSize: '24px', },
  },
  notificationStack: { alignItems: 'center', justifyContent: 'space-between', },
  paytmbtntwo: { borderRadius: '5px', textTransform: 'capitalize', mb: 2, background: zubgbackgrad, color: 'white !important', width: '100%', mt: '20px', border: "1px solid white", padding: '10px', '&:hover': { background: zubgbackgrad, border: "1px solid transparent", } },

};
