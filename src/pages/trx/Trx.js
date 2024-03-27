import CachedIcon from '@mui/icons-material/Cached';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import { zubgback, zubgbackgrad, zubgmid } from '../../Shared/color';
import cip from '../../assets/cip.png';
import Timeactive from '../../assets/images/fast-time (1).png';
import Timeinactive from '../../assets/images/fast-time.png';
import balance from '../../assets/images/send.png';
import Layout from '../../component/Layout/Layout';
import { endpoint } from '../../services/urls';
import TrxWin1Min from './Component/TrxWin1Min';
import TrxWin3Min from './Component/TrxWin3Min';
import TrxWin5Min from './Component/TrxWin5Min';



function Trx() {

  const [Tab, setTab] = useState(1);
  const navigate = useNavigate()
  const login_data = localStorage.getItem("logindata");
  const user_id = JSON.parse(login_data).UserID;
  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const walletamount = async () => {
    try {
      const response = await axios.get(
        `${endpoint.userwallet}?userid=${user_id}`
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };
  const amount = data?.data?.data?.wallet || 0;
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout footer={false}>
      <Container>
        <Box sx={styles.root}>
          <Box sx={{ padding: 2, }}>
            <Stack direction="row" sx={styles.depositWithdrawContainer}>
              <Box></Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="initial" className="b-val">
                  TRX
                </Typography>
              </Box>
              <Box ></Box>
            </Stack>
          </Box>
          <Box sx={{ background: zubgmid, borderRadius: '10px', padding: '20px', width: '95%', margin: 'auto', mb: '10px', }}>
            <Stack direction='row' sx={{ alignItems: 'center', }}>
              <Box component='img' src={balance} width={50}></Box>
              <Typography variant="body1" color="initial" sx={{ fontSize: '16px ', fontWeight: 500, color: 'white', ml: '10px' }}> Balance</Typography>
            </Stack>
            <Stack direction='row' sx={{ alignItems: 'center', mt: '10px' }}>
              <Typography variant="body1" color="initial" sx={{ fontSize: '30px ', fontWeight: '600', color: 'white', mr: '10px', }}> ₹3,069.32
              </Typography>
              <CachedIcon sx={{ color: 'white' }} />
            </Stack>
            <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', mt: '20px' }}>
              <Box component='img' src={cip} width={50}></Box>
              <Typography variant="body1" color="initial" sx={{ fontSize: '14px ', color: 'white', ml: '10px' }}>**** **** **** ****</Typography>
            </Stack>
          </Box>
          <Stack direction='row' sx={{ background: zubgmid, borderRadius: '10px', padding: "5px", width: '95%', marginLeft: '2.5%' }}>
            <VolumeUpIcon sx={{ width: '10%', '&>path': { color: 'white !important' } }} />
            <Typography variant="body1" color="initial" sx={{ width: '90%', fontSize: '13px', color: 'white !important' }}>
              Please Remember The Upi Id Of Your Payment And Fill In The Correct Utr Number And Amount To Submit. When You Need To Continue Recharging,
            </Typography>
          </Stack>
          <Box sx={{ background: zubgbackgrad, width: '95%', marginLeft: '2.5%', borderRadius: '10px', padding: '5px', mt: '10px' }}>
            <Stack direction='row' >
              <Box component={NavLink} onClick={() => setTab(1)} className={Tab === 1 ? 'activewinNav Winnav' : 'Winnav'}>
                {Tab === 1 ? <Box component='img' src={Timeinactive} width={50}></Box> : <Box component='img' src={Timeactive} width={50}></Box>}
                <Typography variant="h3" color="initial">Win Go 1Min</Typography>
              </Box>
              <Box component={NavLink} onClick={() => setTab(2)} className={Tab === 2 ? 'activewinNav Winnav' : ' Winnav'}>
                {Tab === 2 ? <Box component='img' src={Timeinactive} width={50}></Box> : <Box component='img' src={Timeactive} width={50}></Box>}
                <Typography variant="h3" color="initial">Win Go 3Min</Typography>
              </Box>
              <Box component={NavLink} onClick={() => setTab(3)} className={Tab === 3 ? 'activewinNav Winnav' : ' Winnav'}>
                {Tab === 3 ? <Box component='img' src={Timeinactive} width={50}></Box> : <Box component='img' src={Timeactive} width={50}></Box>}
                <Typography variant="h3" color="initial">Win Go 5Min</Typography>
              </Box>
            </Stack>
          </Box>
          {
            Tab === 1 &&
            <TrxWin1Min />
          }
          {
            Tab === 2 &&
            <TrxWin3Min />
          }
          {
            Tab === 3 &&
            <TrxWin5Min />
          }
        </Box>
      </Container>
    </Layout>
  );
}

export default Trx;

const styles = {
  root: { background: zubgback },
  dashboardTitle: { textAlign: 'center', color: 'white !important', fontSize: '21px', fontWeight: '500' },
  swiperImage: { width: '100%', height: 'auto' },
  depositWithdrawContainer: { alignItems: 'center', justifyContent: 'space-between', mt: 0, },
  depositWithdrawIcon: { width: '30px', height: '30px' },
  referralLinkContainer: { background: '#3A3A3A', padding: '15px 15px', borderRadius: '5px', mt: 4 },
  referralLinkTitle: { color: 'white !important', fontSize: '14px', fontWeight: '500 !important' },
  referralLinkInputContainer: { alignItems: 'center' },
  referralLinkInput: { width: '100%' },
  referralLinkButton: { marginLeft: 2 },
  socialButtonsContainer: { alignItems: 'center', justifyContent: 'space-between', mt: 4 },
  telegramButton: { fontSize: '14px', color: 'white !important', textTransform: 'capitalize', fontWeight: '400' },
  supportButton: { fontSize: '14px', color: 'white !important', textTransform: 'capitalize', fontWeight: '400' },
  socialButtonIcon: { margin: 'auto', background: 'white', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  socialIcon: { fontSize: '20px', '&>path': { color: "#6da7f4 !important" } },
  socialIconinfo: { fontSize: '20px', margin: 'auto', '&>path': { color: "white !important" } },
  socialButtonText: { color: 'white !important', textTransform: 'capitalize', fontWeight: '400', fontSize: '14px' },
  gameImage: { width: '90px', height: '80px', position: 'absolute', top: '-20px', right: '0px' },
  gameTitle: { fontSize: '22px', fontWeight: '600', color: 'white !important', transition: 'all 0.3s' },
  gameDescription: { fontSize: '15px', fontWeight: '400', color: 'white !important', mt: 2, transition: 'all 0.3s' },
  userImage: { width: '50px', height: '50px' },

};










