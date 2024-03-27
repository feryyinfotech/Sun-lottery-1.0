import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgbackgrad, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';

function Feedback() {
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
          <Typography variant="body1" color="initial">Feedback</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ width: '95%', marginLeft: '2.5%', background: zubgmid, borderRadius: '10px', padding: '10px', mt: '10px', }}>
          <Box mt={2} component='form'>
            <Box mt={2}>
              <FormControl fullWidth>
                <TextField placeholder="Enter Mail" className="loginfields"
                  sx={{ '&>div>textarea': { color: 'white !important', fontSize: '14px' } }}
                  multiline
                  rows={15}
                  defaultValue="Welcome to feedback, please give feedback-please describe the problem in detail when providing
                   feedback,  preferably attach a screenshot of the problem you encountered, we will immediately process your feedback!"
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '95%', marginLeft: '2.5%', background: zubgmid, borderRadius: '10px', padding: '10px', mt: '10px', }}>
          <Button sx={style.paytmbtntwo}>Feedback Submit</Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Feedback;


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
