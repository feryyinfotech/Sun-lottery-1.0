import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import home from '../../../../assets/images/home.png';
import homeact from '../../../../assets/images/homeact.png';
import promotionact from '../../../../assets/images/megaphone (1).png';
import promotion from '../../../../assets/images/megaphone.png';
import puzzleact from '../../../../assets/images/puzzle (1).png';
import puzzle from '../../../../assets/images/puzzle.png';
import useract from '../../../../assets/images/user (1).png';
import user from '../../../../assets/images/user.png';
import walletact from '../../../../assets/images/wallet-filled-money-tool (1).png';
import wallet from '../../../../assets/images/wallet-filled-money-tool.png';


function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={style.root}>
        <Stack direction="row" sx={style.stack}>
          <Box sx={style.nav} onClick={() => navigate("/dashboard")}>
            {location.pathname == "/dashboard" && <Box component='img' src={homeact} width={25} />}
            {location.pathname !== "/dashboard" && <Box component='img' src={home} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Home
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/activity")}>
            {location.pathname == "/activity" && <Box component='img' src={puzzleact} width={25} />}
            {location.pathname !== "/activity" && <Box component='img' src={puzzle} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Activity
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/promotion")}>
            {location.pathname == "/promotion" && <Box component='img' src={promotionact} width={25} />}
            {location.pathname !== "/promotion" && <Box component='img' src={promotion} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Promotion
            </Typography>
          </Box>
          <Box onClick={() => navigate("/wallet")} sx={style.nav}>
            {location.pathname == "/wallet" && <Box component='img' src={walletact} width={25} />}
            {location.pathname !== "/wallet" && <Box component='img' src={wallet} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Wallet
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/account")}>
            {location.pathname == "/account" && <Box component='img' src={useract} width={25} />}
            {location.pathname !== "/account" && <Box component='img' src={user} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Account
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;

const style = {
  root: {
    background: '#0f0232',
    borderRadius: "10px 10px 0px 0px",
    padding: "10px 20px",
    maxWidth: "575px",
    margin: "auto",
  },
  icon: { fontSize: "25px", "&>path": { color: "white !important" } },
  text: { fontSize: "13px", fontWeight: 500, color: "white !important" },
  stack: { alignItems: "center", justifyContent: "space-between" },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
