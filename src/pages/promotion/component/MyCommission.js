import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, Container, FormControl, Select, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { zubgback, zubgmid } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';


function MyCommission() {


  return (
    <Layout>
      <Container sx={{ background: zubgback, width: '100%', height: '100vh', overflow: 'auto' }}>
        <Box sx={style.header}>
          <Box component={NavLink} to='/promotion/'>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">Commission detail</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Box component='form'>
            <Stack sx={{ padding: 2, justifyContent: 'space-between' }} direction='row'>
              <FormControl variant="outlined" sx={{ width: '48%' }} className='Select'>
                <Select multiple sx={{ '&>div': { background: zubgmid, color: 'white' } }}></Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ width: '48%' }} className='Select'>
                <Select multiple sx={{ '&>div': { background: zubgmid, color: 'white' } }}></Select>
              </FormControl>
            </Stack>
          </Box>
        </Box>
      </Container >
    </Layout >
  )
}

export default MyCommission

const style = {
  header: {
    padding: '15px 8px',
    background: zubgmid,
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
};
