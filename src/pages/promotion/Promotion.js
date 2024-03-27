import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { Box, Container, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { zubgback, zubgbackgrad, zubgmid } from '../../Shared/color';
import customer from '../../assets/images/24-hours-service.png';
import copyIimage from '../../assets/images/copy.png';
import data from '../../assets/images/data-analytics.png';
import sort from '../../assets/images/data-flow.png';
import donut from '../../assets/images/database.png';
import book from '../../assets/images/rules.png';
import money from '../../assets/images/salary.png';
import coin from '../../assets/images/settings.png';
import Layout from '../../component/Layout/Layout';
import { MyProfileDataFn } from '../../services/apicalling';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import copy from "clipboard-copy";


function Promotion() {

  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const result = data?.data?.data;

  const functionTOCopy = (value) => {
    console.log("function hit")
    copy(value);
    toast.success("Copied to clipboard!");
  };
  return (
    <Layout>
      <Container>
        <Box sx={style.header}>
          <Typography variant="body1" color="initial"> </Typography>
          <Typography variant="body1" color="initial" className='!text-white'>Agency</Typography>
          <Box component={NavLink} to='/promotion/Subordinate/'>
            <Box component='img' src={sort} width={30}></Box>
          </Box>
        </Box>
        <Box sx={style.commitionboxOuter}>
          <Box sx={style.commitionbox}>
            <Typography variant="body1" color="initial" className='!text-white'>0</Typography>
            <Typography variant="body1" color="initial" className='!text-white'>Yesterday's total commission</Typography>
            <Typography variant="body1" color="initial" className='!text-white'>Upgrade the level to increase commission income</Typography>
          </Box>
          <Box sx={style.subcordinateBox}>
            <Stack direction='row' sx={{ width: '100%', }}>
              <Box sx={style.subordinatesleft}>
                <EmojiPeopleOutlinedIcon />
                <Typography variant="body1" color="initial"> Direct subordinates</Typography>

              </Box>
              <Box sx={style.subordinatesRight}>
                <Groups2OutlinedIcon />
                <Typography variant="body1" color="initial" >Team subordinates</Typography>
              </Box>
            </Stack>
            <Box sx={style.boxStyles}>
              <Box sx={style.innerBoxStyles}>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial" className='!text-white'>0</Typography>
                  <Typography variant="body1" color="initial" className='!text-white'> number of register</Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial" className='!text-white'>0</Typography>
                  <Typography variant="body1" color="initial" className='!text-white'>  Number of Deposit Members</Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial" className='!text-white'>0</Typography>
                  <Typography variant="body1" color="initial" className='!text-white'> Deposit amount</Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial" className='!text-white'>0</Typography>
                  <Typography variant="body1" color="initial" className='!text-white'>  Number of people making first deposit</Typography>
                </Box>
              </Box>

              <Box sx={style.innerBoxStylestwo}>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial"> number of register </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">  Number of Deposit Members</Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial"> Deposit amount</Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">  Number of people making first deposit</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={style.invitebtn}>
              <NavLink to="/promotion/PromotionShare">
                <Typography sx={{}}>INVITATION LINK</Typography>
              </NavLink>
            </Box>
          </Box>
          <Box sx={style.invitebutton} className="invitebutton">
            <Box sx={style.invitbox}>
              <Stack direction='row'>
                {/* <Box component='img' src={copycode}></Box> */}
                <Box component='img' src={copyIimage}
                className='!cursor-pointer'
                onClick={()=>functionTOCopy(result?.referral_code)}
                ></Box>
                <Typography variant="body1" color="initial">Copy invitation code</Typography>
              </Stack>
              <Stack direction='row'>
                <Typography variant="body1" color="initial">{result?.referral_code}</Typography>
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
            <NavLink to='/promotion/TeamReport'>
              <Box sx={style.invitbox}>
                <Stack direction='row'>
                  {/* <Box component='img' src={team_port}></Box> */}
                  <Box component='img' src={donut}></Box>
                  <Typography variant="body1" color="initial">Subordinate data</Typography>
                </Stack>
                <Stack direction='row'>
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <NavLink to='/promotion/MyCommission'>
              <Box sx={style.invitbox}>
                <Stack direction='row'>
                  <Box component='img' src={coin}></Box>
                  <Typography variant="body1" color="initial">Commission detail</Typography>
                </Stack>
                <Stack direction='row'>
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <NavLink to='/promotion/PromotionRule'>
              <Box sx={style.invitbox}>
                <Stack direction='row'>
                  {/* <Box component='img' src={invite_reg}></Box> */}
                  <Box component='img' src={book}></Box>
                  <Typography variant="body1" color="initial">Invitation rules</Typography>
                </Stack>
                <Stack direction='row'>
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <NavLink to='/promotion/customerLine/'>
              <Box sx={style.invitbox}>
                <Stack direction='row'>
                  {/* <Box component='img' src={server}></Box> */}
                  <Box component='img' src={customer}></Box>
                  <Typography variant="body1" color="initial">Agent line customer service</Typography>
                </Stack>
                <Stack direction='row'>
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <NavLink to='/promotion/RebateRatio/'>
              <Box sx={style.invitbox}>
                <Stack direction='row'>
                  {/* <Box component='img' src={rebateRatio}></Box> */}
                  <Box component='img' src={money}></Box>
                  <Typography variant="body1" color="initial">Rebate ratio</Typography>
                </Stack>
                <Stack direction='row'>
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <Box sx={style.promotionBoxOuter}>
              <Box sx={style.promotionBox}>
                <Stack direction='row'>
                  {/* <Box component='img' src={download}></Box> */}
                  <Box component='img' src={data}></Box>
                  <Typography variant="body1" color="initial">promotion data</Typography>
                </Stack>
              </Box>
              <Stack direction='row'>
                <Box>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">This Week</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">Total commission</Typography>
                </Box>
              </Stack>
              <Stack direction='row'>
                <Box>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">direct subordinate</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="initial">0</Typography>
                  <Typography variant="body1" color="initial">Total number of <br />subordinates in the team</Typography>
                </Box>
              </Stack>
            </Box>
            <Box sx={style.promotionBoxOutertwo}>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Promotion

const style = {
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
  },
  commitionboxOuter: { width: '100%', height: '20vh', background: zubgmid, '&>img': { width: '100%', height: '100%' }, },
  commitionbox: { margin: 'auto', width: '70%', textAlign: 'center', py: 2, '&>p:nth-child(1)': { fontSize: '25px', fontWeight: '500' }, '&>p:nth-child(2)': { fontSize: '13px', fontWeight: '400', padding: '5px 0px', background: zubgbackgrad, borderRadius: '20px' }, '&>p:nth-child(3)': { fontSize: '13px', fontWeight: '400', marginTop: '5px' } },
  subordinatesleft: { width: '50%', textAlign: 'center', py: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: zubgbackgrad, borderTopLeftRadius: '10px', borderRight: '2px solid black', '&>svg': { color: 'white', fontSize: '25px', marginRight: '10px' }, '&>p': { color: 'white', fontSize: '14px', fontWeight: '500' } },
  subordinatesRight: {
    width: '50%', textAlign: 'center', py: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: zubgbackgrad, borderTopRightRadius: '10px',
    '&>svg': { color: 'white', fontSize: '25px', marginRight: '10px' },
    '&>p': { color: 'white', fontSize: '14px', fontWeight: '500', }
  },
  boxStyles: { background: zubgmid, padding: '15px', display: 'flex', borderRadius: ' 0px 0px 10px 10px' },
  innerBoxStyles: { width: '50%', borderRight: '1px solid black', borderBottomLeftRadius: '10px', padding: '0px 0px' },
  innerBoxStylestwo: { width: '50%', padding: '0px 0px' },
  subcordinatelist: { textAlign: 'center', '&>p': { color: 'white !important', fontSize: '13px', }, mb: 1 },
  subcordinateBox: { width: '100%', padding: '20px 10px', background: zubgback },
  invitebutton: {
    width: '100%', background: zubgback,
  },
  invitebtn: { mt: '20px', '&>a>p': { width: '80%', marginLeft: '10%', borderRadius: '20px', textAlign: 'center', padding: '10px', background: zubgbackgrad, color: 'white', fontSize: '17px', fontWeight: 600 } },
  invitbox: {
    width: '95%', background: zubgmid, padding: '10px', mb: '20px', borderRadius: '10px', marginLeft: '2.5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    '&>div>img': { width: '30px', marginRight: '10px' },
    '&>div>p': { fontSize: "14px", color: 'white !important' },
    '&>div': { alignItems: 'center' },
    '&>div:nth-child(2)>p': { marginRight: '20px', color: 'white !important' },
    '&>div:nth-child(2)>svg': {  fontSize: "14px", marginRight: '10px', color: 'white !important' }
  },
  promotionBox: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    '&>div:nth-child(1)': { alignItems: 'center' },
    '&>div:nth-child(1)>img': { width: '35px', marginRight: '10px' },
    '&>div:nth-child(1)>p': { fontSize: '17px', fontWeight: 500, color: 'white !important' },
  },
  promotionBoxOuter: {
    width: '95%', background: zubgmid, padding: '10px', mt: '20px', borderRadius: '5px', marginLeft: '2.5%', paddingBottom: '15px',
    '&>div:nth-child(2)>div:nth-child(1)': { my: '10px', borderRight: '1px solid gray', width: '50%', textAlign: "center" },
    '&>div:nth-child(2)>div:nth-child(2)': { my: '10px', width: '50%', textAlign: "center" },
    '&>div:nth-child(2)>div>p:nth-child(1)': { color: 'white !important' },
    '&>div:nth-child(2)>div>p:nth-child(2)': {  fontSize: '13px', fontWeight: 500, color: 'white !important' },
    '&>div:nth-child(3)>div:nth-child(1)': { my: '10px', borderRight: '1px solid gray', width: '50%', textAlign: "center" },
    '&>div:nth-child(3)>div:nth-child(2)': { my: '10px', width: '50%', textAlign: "center" },
    '&>div:nth-child(3)>div>p:nth-child(1)': { color: 'white !important' },
    '&>div:nth-child(3)>div>p:nth-child(2)': {  fontSize: '13px', fontWeight: 500, color: 'white !important' },
  },
  promotionBoxOutertwo: {
    width: '90%', background: zubgback, padding: '10px', borderRadius: '5px', marginLeft: '5%', paddingBottom: '70px',
  },
};