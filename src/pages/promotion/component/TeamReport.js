import { Container, Typography, Box, IconButton, InputAdornment, OutlinedInput, FormControl, Select, Stack, Button } from '@mui/material'
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Layout from '../../../component/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { zubgback, zubgmid } from '../../../Shared/color';


function TeamReports() {

  return (
    <Layout>
      <Container sx={{ background: zubgback, width: '100%', height: '100vh', overflow: 'auto' }}>
        <Box sx={style.header}>
          <Box component={NavLink} to='/promotion/'>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">Subordinate data</Typography>
          <Typography variant="body1" color="initial"> </Typography>
        </Box>
        <Box sx={{ padding: 2, width: '100%' }}>
          <Box component='form'>
            <FormControl variant="outlined" fullWidth>
              <Stack direction='row'>
                <OutlinedInput className='search'
                  placeholder='Search subordinate UID' fullWidth
                />
                <Button sx={{ width: '70px', height: '55px', borderRadius: '10px', background: zubgmid, color: 'white', marginLeft: '20px' }}>
                  <SearchIcon />
                </Button>
              </Stack>
            </FormControl>
          </Box>
          <Stack sx={{ padding: '20px 0px', justifyContent: 'space-between' }} direction='row'>
            <FormControl variant="outlined" sx={{ width: '48%' }} className='Select'>
              <Select multiple sx={{ '&>div': { background: zubgmid, color: 'white' } }} ></Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ width: '48%' }} className='Select'>
              <Select multiple sx={{ '&>div': { background: zubgmid, color: 'white' } }}></Select>
            </FormControl>
          </Stack>
        </Box>
        <Box sx={{ padding: 2, }}>
          <Box sx={{
            backgroundColor: zubgmid, borderRadius: '10px', padding: '30px 20px',
            '&>div': { mb: 2 },
            '&>div>div:nth-child(1)': { borderRight: '1px solid black', width: '50%', textAlign: 'center', },
            '&>div>div:nth-child(2)': { width: '50%', textAlign: 'center' },
            '&>div>div>p': { color: 'white', fontSize: '14px', fontWeight: 500 },
          }}>
            <Stack direction='row'>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">Deposit number</Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">Deposit amount</Typography>
              </Box>
            </Stack>
            <Stack direction='row'>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">Number of bettors</Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">Total bet</Typography>
              </Box>
            </Stack>
            <Stack direction='row'>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">Number of people making first deposit</Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="initial">0</Typography>
                <Typography variant="body1" color="initial">First deposit amount</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default TeamReports

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
