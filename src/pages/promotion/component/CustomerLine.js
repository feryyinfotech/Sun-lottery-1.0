import { Container, Typography, Box, Stack, } from '@mui/material'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import empty from '../../../assets/images/empty.png'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Layout from '../../../component/Layout/Layout';
import { NavLink } from 'react-router-dom';
import Customer from '../../../assets/images/customerBg.png'
import { zubgback, zubgbackgrad, zubgmid } from '../../../Shared/color';
import customer from '../../../assets/images/supportgirls.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function Subordinate() {


  const [value, setValue] = React.useState(0);
  console.log(value)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Layout>
      <Container sx={{ background: zubgback, width: '100%', height: '100vh', overflow: 'auto' }}>
        <Box sx={style.header}>
          <Box component={NavLink} to='/promotion/'>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">Agent line customer service</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ background: zubgmid, width: '95%', marginLeft: '2.5%', borderRadius: '5px', marginTop: '10px', padding: '10px 10px 0px 10px' }}>
          <Typography variant="body1" color="initial" sx={{ fontSize: '16px', fontWeight: '500', color: 'white', textAlign: 'center', mt: 2, mb: 3 }}>How can we help you today</Typography>
          <Box sx={{ height: '50vh', width: '100%', overflow: 'hidden', }} className="customer-care">
            <Box component='img' src={customer} sx={{ mt: 3, width: '100%', height: '100%', margin: 'auto', objectFit: 'cover', objectPosition: 'top', }}></Box>
          </Box>
        </Box>
        <Box component={NavLink}>
          <Stack direction='row' sx={{ background: zubgmid, width: '95%', marginLeft: '2.5%', borderRadius: '5px', marginTop: '10px', padding: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ color: 'white', fontSize: '20px', fontWeight: '400', }}>
              Live Now
            </Typography>
            <Typography variant="body1" color="initial">
              <ArrowForwardIcon sx={{ color: 'white' }} />
            </Typography>
          </Stack>
        </Box>
      </Container >
    </Layout>
  )
}

export default Subordinate

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







