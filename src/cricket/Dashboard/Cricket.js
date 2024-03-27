import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { zubgcrickorange } from '../../Shared/color';
import team1 from './../../assets/images/club-1-copyright.png';
import team10 from './../../assets/images/club-10-copyright.png';
import team2 from './../../assets/images/club-2-copyright.png';
import team4 from './../../assets/images/club-4-copyright.png';
import team5 from './../../assets/images/club-5-copyright.png';
import team7 from './../../assets/images/club-7-copyright.png';
import team8 from './../../assets/images/club-8-copyright.png';
import banner from './../../assets/images/cricketbanner.jpg';

function Cricket() {

  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Container sx={style.container}>
      <Box sx={style.mainbox}>
        <Box component='img' src={banner} sx={style.banner}></Box>
        <Box sx={style.root}>
          <Box sx={style.content}>
            <Typography variant="body1" color="initial" sx={style.heading}>BECOME A BETTING CHAMP!</Typography>
            <Typography variant="body1" color="initial" sx={style.text}>
              The easiest way to make a sports bet
            </Typography>
            <Button component={NavLink} to='/cricket/user-profile' className="playnow !cursor-pointer" role="Button" sx={style.button} >Play Now</Button>
          </Box>
          {/* <Box sx={style.sidebar}>
            <Box sx={style.sidebarItem}>
              <Box component='img' src={wallet} width={25}></Box>
            </Box>
            <Box sx={style.sidebarItem}>
              <Box component='img' src={rules} width={25}></Box>
            </Box>
            <Box sx={style.sidebarItem} component={NavLink} to='/cricket/user-profile'>
              <Box component='img' src={avatar} width={25}></Box>
            </Box>
          </Box> */}
          <Typography variant="body1" color="initial" sx={style.title}>Cricket</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '95%', marginLeft: "2.5%", py: 2, }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Live Now" className={value === 0 ? 'live' : 'upcoming'} />
          <Tab label="Upcoming" className={value === 1 ? 'live' : 'upcoming'} />
        </Tabs>
      </Box>
      {value === 0 &&
        <Box sx={style.events}>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team1} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team2} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team10} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team4} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team5} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team7} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team7} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team8} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
        </Box>
      }
      {value === 1 &&
        <Box sx={style.events}>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team5} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team7} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
          <Box sx={style.eventItem}>
            <Typography variant="body1" color="initial" sx={style.eventDate}>Aug 25, 2023</Typography>
            <Stack direction='row' sx={style.eventDetails}>
              <Box component={'img'} src={team7} sx={style.teamLogo}></Box>
              <Box sx={style.teamDetails}>
                <Typography variant="body1" color="initial" sx={style.score}>140 - 150 </Typography>
                <Typography variant="body1" color="initial" sx={style.league}>Premier League</Typography>
                <Typography variant="body1" color="initial" sx={style.location}>Bentleigh</Typography>
              </Box>
              <Box component={'img'} src={team8} sx={style.teamLogo}></Box>
            </Stack>
          </Box>
        </Box>
      }
    </Container>
  );
}

export default Cricket;

const style = {
  container: { background: '#fff' },
  mainbox: { height: '70vh', position: 'relative' },
  banner: { width: '100%', filter: 'brightness(0.5)', height: '100%', position: 'absolute', top: 0, left: '0px', objectFit: 'cover', objectPosition: 'center' },
  root: { position: 'relative', height: "100%", paddingTop: '15px' },
  stack: { alignItems: 'start', justifyContent: 'space-between', borderRadius: '5px', padding: '10px 5px' },
  content: { width: '95%', marginLeft: '2.5%', marginTop: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  heading: { color: 'white', fontSize: '15px', fontWeight: '500', mt: 5 },
  text: { color: 'white', fontSize: '45px', fontWeight: '600', mt: 1, mb: 3, width: "90%", lineHeight: '45px', },
  button: { mt: 5, },
  sidebar: { position: 'absolute', top: '40%', right: '0px', width: "10%", display: 'flex', flexDirection: 'column' },
  sidebarItem: { background: zubgcrickorange, padding: '10px', borderRadius: '5px', display: 'flex', alignItems: "center", justifyContent: "center", mb: '5px' },
  title: { fontWeight: 800, fontSize: '80px', color: '#ffffff45', textAlign: 'center', position: "absolute", width: '100%', height: '15vh', bottom: "0", left: '0' },
  events: { width: '95%', marginLeft: '2.5%', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  eventItem: { width: '100%', padding: "20px", border: `1px solid ${zubgcrickorange}`, background: zubgcrickorange, borderRadius: '5px', mb: 2 },
  eventDate: { textAlign: 'center', fontSize: '17px', fontWeight: "500", color: 'white' },
  eventDetails: { alignItems: 'start', justifyContent: 'space-between' },
  teamLogo: { width: '80px' },
  teamDetails: {},
  score: { textAlign: 'center', fontSize: '20px', fontWeight: "500", color: 'white' },
  league: { textAlign: 'center', fontSize: '15px', fontWeight: "500", color: 'white' },
  location: { textAlign: 'center', fontSize: '15px', fontWeight: "500", color: 'white' },
};
