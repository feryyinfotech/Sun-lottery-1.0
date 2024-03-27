import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Box, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';

function Notification() {
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
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>


        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon />
          </Stack>
          <Typography variant="body1" color="initial">2024-03-13 10:09:31</Typography>
          <Typography variant="body1" color="initial">Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>

      </Container>
    </Layout>
  );
}

export default Notification;


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
