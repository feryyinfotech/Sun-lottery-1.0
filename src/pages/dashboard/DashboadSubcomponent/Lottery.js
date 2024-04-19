import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import go from "../../../assets/images/go.png";
import scr1 from '../../../assets/images/src1.png';
import scr2 from '../../../assets/images/src2.png';
import scr3 from '../../../assets/images/src3.png';
import scr4 from '../../../assets/images/src4.png';
import epicWin from "../../../assets/images/win1/epicWin.jpg";
import jackpot from "../../../assets/images/win1/jackpot.jpg";
import kind from "../../../assets/images/win1/kind.jpg";
import megawin from "../../../assets/images/win1/megawin.jpg";
import toast from "react-hot-toast";



const Lottery = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ transition: '0.3s !important' }}>
      <Box sx={style.root}>
        <Box sx={style.roottwo} component={NavLink} to={"/win"}>
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={scr1} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', opacity: '0.2' }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" className="gametitle">
                  Win Go
                </Typography>
                <Typography variant="body1" color="initial" sx={style.textone}>
                  Guess Number Green/Red/Voilet to win
                </Typography>
              </Box>
              <Box>
                <Box component="img" width={65} src={go}></Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={epicWin}></Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink}  onClick={()=>toast("Comming Soon !")}>
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={scr2} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', opacity: '0.2' }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" className="gametitle">
                  K3 Lottery
                </Typography>
                <Typography variant="body1" color="initial" sx={style.textone}>
                  Guess Number Big /Small / Odd/ Even
                </Typography>
              </Box>
              <Box>
                <Box component="img" width={65} src={go}></Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={jackpot}></Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink} onClick={()=>toast("Comming Soon !")}>
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={scr3} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', opacity: '0.2' }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" className="gametitle">
                  5D Lottery
                </Typography>
                <Typography variant="body1" color="initial" sx={style.textone}>
                  Guess Number Green/Red/Voilet to win
                </Typography>
              </Box>
              <Box>
                <Box component="img" width={65} src={go}></Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={megawin}></Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink} to={"/trx"}>
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={scr4} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', opacity: '0.2' }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" className="gametitle">
                  Trx Win
                </Typography>
                <Typography variant="body1" color="initial" sx={style.textone}>
                  Guess Number Green/Red/Purple to win
                </Typography>
              </Box>
              <Box>
                <Box component="img" width={65} src={go}></Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={kind}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Lottery;

const style = {
  root: {
    width: "95%",
    marginLeft: "2.5%",
    background: zubgmid,
    marginTop: "20px",
    padding: "1px 10px 10px 10px",
    borderRadius: "10px",
  },
  roottwo: {
    width: "100%",
    height: "14vh",
    background: zubgback,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mt: '10px'
  },

  titleBox: {
    width: "100%",
    padding: "10px 0px 0px 10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'relative',
  },

  title: {
    lineHeight: "1.5",
    textAlign: "start",
    color: "white",
    fontSize: "35px",
    fontWeight: "900 !important",
    fontFamily: "Trade Winds !important",
    background: zubgbackgrad,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  imgtwo: { width: "100%", height: "100%", borderRadius: "0px 10px 10px 0px" },
  imgone: { width: "100%", height: "100%", borderRadius: "0px 0px 0px 10px" },
  textone: { color: "white", fontSize: "13px" },
  texttow: { color: "white", fontSize: "10px", mr: "5px" },
  btmbox: {
    width: "100%",
    height: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
};
