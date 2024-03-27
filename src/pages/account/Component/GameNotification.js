import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Box, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';
import promotion from '../../../assets/images/marketing (1).png'

function GameNotification() {
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
          <Typography variant="body1" color="initial">Notification</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <Box component={'img'} src={promotion} sx={{ width: '30px', height: '30px' }}></Box>
              <Typography variant="body1" color="initial">About Withdrawal - Sun Lottery Notify</Typography>
            </Stack>
          </Stack>
          <Typography variant="body1" color="initial">
            Please Fill In The Correct Bank Card Information. The Platform Will Process Withdrawals Within 1-24 Hours Or More. The Withdrawal Status Is "Completed" And The Transaction Has Been Approved By The Platform. The Bank Will Complete The Transfer Within 1-7 Working Days, But Delays May Occur, Especially During Holidays. But You Are Guaranteed To Receive Your Funds.
          </Typography>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
        </Box>
      </Container>
    </Layout>
  );
}

export default GameNotification;


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
  }, notificationStack: { alignItems: 'center', justifyContent: 'space-between', },
};
